CREATE TABLE IF NOT EXISTS "note" (
    "id" UUID NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "createDate" TIMESTAMP WITH TIME ZONE,
    "updateDate" TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- ⚡ Electrify the tables
ALTER TABLE note ENABLE ELECTRIC;
