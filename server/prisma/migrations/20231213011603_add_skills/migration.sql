-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_skills" (
    "skillId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("skillId", "userId"),
    CONSTRAINT "user_skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_id_key" ON "skills"("id");
