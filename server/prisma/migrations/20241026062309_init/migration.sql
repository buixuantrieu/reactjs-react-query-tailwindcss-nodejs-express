-- AlterTable
ALTER TABLE `users` ADD COLUMN `failedAttempt` INTEGER NOT NULL DEFAULT 0;
