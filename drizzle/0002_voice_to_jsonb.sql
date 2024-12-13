-- First, create a temporary column
ALTER TABLE "agents" ADD COLUMN "voice_jsonb" jsonb;

-- Update the temporary column with converted data
UPDATE "agents" 
SET "voice_jsonb" = json_build_object(
  'id', "voice",
  'name', CASE 
    WHEN "voice" = 'zT03pEAEi0VHKciJODfn' THEN 'Raju'
    WHEN "voice" = '90ipbRoKi4CpHXvKVtl0' THEN 'Anika'
    ELSE 'Unknown'
  END
)::jsonb
WHERE "voice" IS NOT NULL;

-- Drop the old column
ALTER TABLE "agents" DROP COLUMN "voice";

-- Rename the new column to voice
ALTER TABLE "agents" RENAME COLUMN "voice_jsonb" TO "voice"; 