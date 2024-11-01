/*
  Warnings:

  - You are about to drop the column `isDelete` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `halls` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `isDelete`,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
