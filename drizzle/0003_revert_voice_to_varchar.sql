-- First, create a temporary column
ALTER TABLE "agents" ADD COLUMN "voice_varchar" varchar(50);

-- Update the temporary column with the ID from the jsonb
UPDATE "agents" 
SET "voice_varchar" = (voice->>'id')::varchar
WHERE voice IS NOT NULL;

-- Drop the jsonb column
ALTER TABLE "agents" DROP COLUMN "voice";

-- Rename the new column to voice
ALTER TABLE "agents" RENAME COLUMN "voice_varchar" TO "voice"; 