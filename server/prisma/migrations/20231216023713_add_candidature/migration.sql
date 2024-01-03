-- CreateTable
CREATE TABLE "canidatures" (
    "createdAt" DATETIME NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "opportunityId"),
    CONSTRAINT "canidatures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "canidatures_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
