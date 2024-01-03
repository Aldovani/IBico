/*
  Warnings:

  - You are about to drop the column `describtion` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `description` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    CONSTRAINT "reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviews_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reviews" ("authorId", "createdAt", "id", "opportunityId", "rating") SELECT "authorId", "createdAt", "id", "opportunityId", "rating" FROM "reviews";
DROP TABLE "reviews";
ALTER TABLE "new_reviews" RENAME TO "reviews";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
