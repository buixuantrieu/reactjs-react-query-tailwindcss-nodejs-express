/*
  Warnings:

  - You are about to alter the column `status` on the `seats` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `seats` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;
