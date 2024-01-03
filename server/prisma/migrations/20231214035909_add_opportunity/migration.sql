-- CreateTable
CREATE TABLE "opportunities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "local" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "startDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL,
    "timeLoad" TEXT NOT NULL,
    "opportunityClosedTime" DATETIME,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "opportunities_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "opportunity_skills" (
    "skillId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,

    PRIMARY KEY ("skillId", "opportunityId"),
    CONSTRAINT "opportunity_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "opportunity_skills_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_id_key" ON "opportunities"("id");
