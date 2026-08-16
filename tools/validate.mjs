#!/usr/bin/env node

import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import process from "node:process";

const projectRoot = resolve(process.argv[2] ?? process.cwd());
const specRoot = join(projectRoot, "spec");
const errors = [];
const specs = new Map();
const ignoredDirectories = new Set([".git", "node_modules", "dist", "build"]);
const typePrefixes = {
  project: "PROJ",
  product: "REQ",
  design: "DES",
  architecture: "ARCH",
  api: "API",
  domain: "DOM",
  test: "TEST",
};
const statuses = new Set(["draft", "review", "approved", "deprecated"]);

async function walk(directory) {
  if (!existsSync(directory)) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return nested.flat();
}

function parseList(block, key) {
  const match = new RegExp(`^  ${key}:\\s*\\[([^\\]]*)\\]\\s*$`, "m").exec(block);
  if (!match) return [];
  return match[1].split(",").map((item) => item.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
}

function parseMetadata(file, text) {
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1];
  if (!block || !/^spec:\s*$/m.test(block)) {
    errors.push(`${file}: missing spec frontmatter`);
    return null;
  }

  const value = (key) => new RegExp(`^  ${key}:\\s*["']?([^\\n"']+?)["']?\\s*$`, "m").exec(block)?.[1].trim();
  const metadata = {
    id: value("id"),
    type: value("type"),
    version: value("version"),
    status: value("status"),
    owner: value("owner"),
    source: value("source"),
    depends_on: parseList(block, "depends_on"),
    artifacts: parseList(block, "artifacts"),
  };
  const prefix = typePrefixes[metadata.type];
  const idPattern = /^[A-Z]{2,6}-[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!metadata.id?.match(idPattern) || (prefix && !metadata.id.startsWith(`${prefix}-`))) {
    errors.push(`${file}: invalid spec.id for type ${metadata.type ?? "<missing>"}`);
  }
  if (!prefix) errors.push(`${file}: invalid or missing spec.type`);
  if (!metadata.version?.match(/^\d+\.\d+\.\d+$/)) errors.push(`${file}: invalid or missing spec.version`);
  if (!statuses.has(metadata.status)) errors.push(`${file}: invalid or missing spec.status`);
  if (!metadata.owner) errors.push(`${file}: missing spec.owner`);

  const specDirectory = dirname(file);
  const relativeSpecPath = relative(specRoot, specDirectory).split("/");
  if (relativeSpecPath.length !== 2 || relativeSpecPath[1] !== metadata.id || relativeSpecPath[0] !== metadata.type) {
    errors.push(`${file}: expected spec/<type>/<spec.id>/README.md`);
  }
  for (const source of [metadata.source, ...metadata.artifacts]) {
    if (source && !existsSync(resolve(specDirectory, source))) errors.push(`${file}: missing source/artifact ${source}`);
  }
  return metadata;
}

function checkMarkdownLinks(file, text) {
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split("#", 1)[0];
    if (!target || /^(?:https?:\/\/|mailto:)/.test(target)) continue;
    if (!existsSync(resolve(dirname(file), target))) errors.push(`${file}: broken link ${match[1]}`);
  }
}

function collectReferences(value, found = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectReferences(item, found);
  } else if (value && typeof value === "object") {
    for (const key of ["x-requirements", "x-spec-id"]) {
      if (value[key] !== undefined) collectReferences(value[key], found);
    }
  } else if (typeof value === "string" && value.trim()) {
    found.push(value.trim());
  }
  return found;
}

const specFiles = await walk(specRoot);
const readmeFiles = specFiles.filter((file) => basename(file) === "README.md");
if (readmeFiles.length === 0) errors.push(`${specRoot}: no Spec README files found`);

for (const file of specFiles.filter((candidate) => extname(candidate) === ".md")) {
  checkMarkdownLinks(file, await readFile(file, "utf8"));
}

for (const file of readmeFiles) {
  const text = await readFile(file, "utf8");
  const metadata = parseMetadata(file, text);
  if (metadata?.id) {
    if (specs.has(metadata.id)) errors.push(`${file}: duplicate spec.id ${metadata.id}`);
    else specs.set(metadata.id, { file, metadata });
  }
}

for (const { file, metadata } of specs.values()) {
  for (const dependency of metadata.depends_on) {
    if (!specs.has(dependency)) errors.push(`${file}: unresolved depends_on ${dependency}`);
  }
}

const mapFile = join(projectRoot, "spec-map.yml");
if (existsSync(mapFile)) {
  const map = await readFile(mapFile, "utf8");
  for (const match of map.matchAll(/^\s+specs:\s*\[([^\]]*)\]/gm)) {
    for (const id of match[1].split(",").map((item) => item.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean)) {
      if (!specs.has(id)) errors.push(`${mapFile}: unresolved mapped Spec ${id}`);
    }
  }
}

for (const file of await walk(projectRoot)) {
  if (extname(file) !== ".json") continue;
  let data;
  try {
    data = JSON.parse(await readFile(file, "utf8"));
  } catch {
    errors.push(`${file}: invalid JSON`);
    continue;
  }
  if (!data.openapi) continue;
  for (const reference of collectReferences(data)) {
    const id = reference.split("#", 1)[0];
    if (!specs.has(id)) errors.push(`${file}: requirement reference ${reference} does not resolve`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`spec validate: ${specs.size} Spec(s), no errors`);
}
