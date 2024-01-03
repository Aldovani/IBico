-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_skills" (
    "skillId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("skillId", "userId"),
    CONSTRAINT "user_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_skills" ("skillId", "userId") SELECT "skillId", "userId" FROM "user_skills";
DROP TABLE "user_skills";
ALTER TABLE "new_user_skills" RENAME TO "user_skills";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
