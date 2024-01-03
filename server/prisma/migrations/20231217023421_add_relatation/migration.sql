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
    CONSTRAINT "opportunities_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_opportunities" ("amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title") SELECT "amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title" FROM "opportunities";
DROP TABLE "opportunities";
ALTER TABLE "new_opportunities" RENAME TO "opportunities";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
