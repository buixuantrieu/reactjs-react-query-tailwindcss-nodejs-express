/*
  Warnings:

  - Added the required column `name` to the `cinema_facilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cinema_facilities` ADD COLUMN `name` VARCHAR(191) NOT NULL;
