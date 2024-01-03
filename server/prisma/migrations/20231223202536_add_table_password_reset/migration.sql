-- CreateTable
CREATE TABLE "password_resets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL,
    "passwordCodeId" TEXT NOT NULL,
    CONSTRAINT "password_resets_passwordCodeId_fkey" FOREIGN KEY ("passwordCodeId") REFERENCES "password_codes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
