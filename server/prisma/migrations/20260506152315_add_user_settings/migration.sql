-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "avoidedIngredients" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "preferredIngredients" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "preferredUnits" TEXT NOT NULL DEFAULT 'metric';
