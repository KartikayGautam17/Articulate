/*
  Warnings:

  - You are about to drop the column `age` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "age",
DROP COLUMN "tags",
ADD COLUMN     "links" TEXT[] DEFAULT ARRAY[]::TEXT[];
