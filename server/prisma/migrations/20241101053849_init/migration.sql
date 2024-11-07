/*
  Warnings:

  - You are about to drop the column `avatar` on the `movies` table. All the data in the column will be lost.
  - Added the required column `ageRestriction` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cast` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterUrl` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitles` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailerUrl` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movies` DROP COLUMN `avatar`,
    ADD COLUMN `ageRestriction` VARCHAR(191) NOT NULL,
    ADD COLUMN `cast` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` MEDIUMTEXT NOT NULL,
    ADD COLUMN `director` VARCHAR(191) NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `language` VARCHAR(191) NOT NULL,
    ADD COLUMN `posterUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `releaseDate` DATETIME(3) NOT NULL,
    ADD COLUMN `subtitles` VARCHAR(191) NOT NULL,
    ADD COLUMN `trailerUrl` TEXT NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
