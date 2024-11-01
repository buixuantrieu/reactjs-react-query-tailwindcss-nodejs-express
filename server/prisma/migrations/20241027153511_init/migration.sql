/*
  Warnings:

  - You are about to drop the column `isBooked` on the `seats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `seats` DROP COLUMN `isBooked`;

-- CreateTable
CREATE TABLE `seat_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `showTimeId` INTEGER NOT NULL,
    `seatId` INTEGER NOT NULL,
    `isBooked` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `seat_status` ADD CONSTRAINT `seat_status_showTimeId_fkey` FOREIGN KEY (`showTimeId`) REFERENCES `show_times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seat_status` ADD CONSTRAINT `seat_status_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `seats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
