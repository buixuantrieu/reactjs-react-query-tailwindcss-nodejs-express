-- AlterTable
ALTER TABLE `cinema_facilities` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `cinemas` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT false;
