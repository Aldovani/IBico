-- AlterTable
ALTER TABLE "password_codes" ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "password_resets" ALTER COLUMN "used" SET DEFAULT false;
