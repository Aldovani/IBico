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
    CONSTRAINT "opportunities_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "opportunities_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_opportunities" ("amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title") SELECT "amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title" FROM "opportunities";
DROP TABLE "opportunities";
ALTER TABLE "new_opportunities" RENAME TO "opportunities";
CREATE TABLE "new_reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    CONSTRAINT "reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reviews_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_reviews" ("authorId", "createdAt", "description", "id", "opportunityId", "rating") SELECT "authorId", "createdAt", "description", "id", "opportunityId", "rating" FROM "reviews";
DROP TABLE "reviews";
ALTER TABLE "new_reviews" RENAME TO "reviews";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
