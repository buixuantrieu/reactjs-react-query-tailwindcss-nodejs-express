/*
  Warnings:

  - You are about to drop the column `status` on the `seats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `seats` DROP COLUMN `status`,
    ADD COLUMN `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isBooked` BOOLEAN NOT NULL DEFAULT false;
