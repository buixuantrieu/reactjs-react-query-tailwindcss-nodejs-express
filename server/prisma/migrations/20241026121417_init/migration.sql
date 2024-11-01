-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `dateOfBirth` DATE NULL,
    `gender` INTEGER NULL,
    `avatar` MEDIUMTEXT NULL,
    `address` VARCHAR(191) NULL,
    `districtId` INTEGER NULL,
    `provinceId` INTEGER NULL,
    `wardId` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profiles_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
