/*
  Warnings:

  - You are about to drop the column `facilityId` on the `show_times` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `show_times` DROP FOREIGN KEY `show_times_facilityId_fkey`;

-- AlterTable
ALTER TABLE `show_times` DROP COLUMN `facilityId`;
