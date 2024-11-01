/*
  Warnings:

  - Added the required column `cinemaId` to the `cinema_facilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cinema_facilities` ADD COLUMN `cinemaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `cinema_facilities` ADD CONSTRAINT `cinema_facilities_cinemaId_fkey` FOREIGN KEY (`cinemaId`) REFERENCES `cinemas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
