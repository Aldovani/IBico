/*
  Warnings:

  - You are about to drop the `canidatures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "canidatures";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "candidatures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "candidatures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "candidatures_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_opportunities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "local" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL,
    "timeLoad" TEXT NOT NULL,
    "opportunityClosedTime" DATETIME,
    "createdAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    "candidateId" TEXT,
    CONSTRAINT "opportunities_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "opportunities_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_opportunities" ("amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title") SELECT "amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title" FROM "opportunities";
DROP TABLE "opportunities";
ALTER TABLE "new_opportunities" RENAME TO "opportunities";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
