-- Migration: add the optional date-only field.
ALTER TABLE todos ADD COLUMN due_date DATE NULL;
