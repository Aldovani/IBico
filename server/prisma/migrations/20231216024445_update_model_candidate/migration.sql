/*
  Warnings:

  - The primary key for the `canidatures` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `canidatures` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_canidatures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "canidatures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "canidatures_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_canidatures" ("createdAt", "opportunityId", "userId") SELECT "createdAt", "opportunityId", "userId" FROM "canidatures";
DROP TABLE "canidatures";
ALTER TABLE "new_canidatures" RENAME TO "canidatures";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
