-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_opportunity_skills" (
    "skillId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,

    PRIMARY KEY ("skillId", "opportunityId"),
    CONSTRAINT "opportunity_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "opportunity_skills_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_opportunity_skills" ("opportunityId", "skillId") SELECT "opportunityId", "skillId" FROM "opportunity_skills";
DROP TABLE "opportunity_skills";
ALTER TABLE "new_opportunity_skills" RENAME TO "opportunity_skills";
CREATE TABLE "new_opportunities" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    CONSTRAINT "opportunities_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_opportunities" ("amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title") SELECT "amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title" FROM "opportunities";
DROP TABLE "opportunities";
ALTER TABLE "new_opportunities" RENAME TO "opportunities";
CREATE TABLE "new_user_skills" (
    "skillId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("skillId", "userId"),
    CONSTRAINT "user_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_user_skills" ("skillId", "userId") SELECT "skillId", "userId" FROM "user_skills";
DROP TABLE "user_skills";
ALTER TABLE "new_user_skills" RENAME TO "user_skills";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
