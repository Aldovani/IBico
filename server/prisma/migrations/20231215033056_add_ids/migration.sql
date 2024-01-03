-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "opportunities_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_opportunities" ("amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title") SELECT "amount", "authorId", "candidateId", "createdAt", "description", "endDateTime", "id", "local", "opportunityClosedTime", "startDateTime", "status", "timeLoad", "title" FROM "opportunities";
DROP TABLE "opportunities";
ALTER TABLE "new_opportunities" RENAME TO "opportunities";
CREATE TABLE "new_skills" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_skills" ("id", "name") SELECT "id", "name" FROM "skills";
DROP TABLE "skills";
ALTER TABLE "new_skills" RENAME TO "skills";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("active", "avatar", "cellphone", "cpf", "createdAt", "id", "name", "password", "rating", "username") SELECT "active", "avatar", "cellphone", "cpf", "createdAt", "id", "name", "password", "rating", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
