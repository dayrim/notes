CREATE TABLE IF NOT EXISTS "note" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "plainContent" TEXT NOT NULL,
    "createDate" TIMESTAMP WITH TIME ZONE,
    "updateDate" TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "createDate" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- Add an index for username and email for faster search
CREATE INDEX "idx_user_email" ON "user" ("email");
-- ⚡ Electrify the tables
ALTER TABLE note ENABLE ELECTRIC;