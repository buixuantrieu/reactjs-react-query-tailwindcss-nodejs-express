/*
  Warnings:

  - You are about to alter the column `ageRestriction` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `movies` MODIFY `ageRestriction` INTEGER NOT NULL;
