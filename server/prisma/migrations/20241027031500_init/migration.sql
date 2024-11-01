/*
  Warnings:

  - You are about to drop the column `color` on the `seats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `seat_types` ADD COLUMN `color` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `seats` DROP COLUMN `color`;
