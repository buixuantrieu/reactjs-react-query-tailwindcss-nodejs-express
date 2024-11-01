/*
  Warnings:

  - You are about to drop the column `cinemaId` on the `cinema_seat_prices` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `cinemas` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `cinemas` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `cinemas` table. All the data in the column will be lost.
  - You are about to drop the column `wardId` on the `cinemas` table. All the data in the column will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShowTime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `facilityId` to the `cinema_seat_prices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `seat_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Room` DROP FOREIGN KEY `Room_cinemaId_fkey`;

-- DropForeignKey
ALTER TABLE `Seat` DROP FOREIGN KEY `Seat_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `ShowTime` DROP FOREIGN KEY `ShowTime_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `ShowTime` DROP FOREIGN KEY `ShowTime_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `cinema_seat_prices` DROP FOREIGN KEY `cinema_seat_prices_cinemaId_fkey`;

-- DropForeignKey
ALTER TABLE `cinemas` DROP FOREIGN KEY `cinemas_districtId_fkey`;

-- DropForeignKey
ALTER TABLE `cinemas` DROP FOREIGN KEY `cinemas_provinceId_fkey`;

-- DropForeignKey
ALTER TABLE `cinemas` DROP FOREIGN KEY `cinemas_wardId_fkey`;

-- AlterTable
ALTER TABLE `cinema_seat_prices` DROP COLUMN `cinemaId`,
    ADD COLUMN `facilityId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cinemas` DROP COLUMN `districtId`,
    DROP COLUMN `location`,
    DROP COLUMN `provinceId`,
    DROP COLUMN `wardId`;

-- AlterTable
ALTER TABLE `seat_types` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `Movie`;

-- DropTable
DROP TABLE `Room`;

-- DropTable
DROP TABLE `Seat`;

-- DropTable
DROP TABLE `ShowTime`;

-- CreateTable
CREATE TABLE `cinema_facilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `provinceId` INTEGER NOT NULL,
    `districtId` INTEGER NOT NULL,
    `wardId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `halls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `columns` INTEGER NOT NULL,
    `rows` INTEGER NOT NULL,
    `facilityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hallId` INTEGER NOT NULL,
    `row` VARCHAR(191) NOT NULL,
    `seatNumber` INTEGER NOT NULL,
    `typeId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `avatar` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `show_times` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facilityId` INTEGER NOT NULL,
    `hallId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cinema_facilities` ADD CONSTRAINT `cinema_facilities_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `provinces`(`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cinema_facilities` ADD CONSTRAINT `cinema_facilities_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `districts`(`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cinema_facilities` ADD CONSTRAINT `cinema_facilities_wardId_fkey` FOREIGN KEY (`wardId`) REFERENCES `wards`(`wards_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cinema_seat_prices` ADD CONSTRAINT `cinema_seat_prices_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `cinema_facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `halls` ADD CONSTRAINT `halls_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `cinema_facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seats` ADD CONSTRAINT `seats_hallId_fkey` FOREIGN KEY (`hallId`) REFERENCES `halls`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seats` ADD CONSTRAINT `seats_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `seat_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `show_times` ADD CONSTRAINT `show_times_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `cinema_facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `show_times` ADD CONSTRAINT `show_times_hallId_fkey` FOREIGN KEY (`hallId`) REFERENCES `halls`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `show_times` ADD CONSTRAINT `show_times_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
