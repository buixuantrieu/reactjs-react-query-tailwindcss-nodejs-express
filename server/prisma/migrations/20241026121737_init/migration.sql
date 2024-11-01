-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `provinces`(`province_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `districts`(`district_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_wardId_fkey` FOREIGN KEY (`wardId`) REFERENCES `wards`(`wards_id`) ON DELETE SET NULL ON UPDATE CASCADE;
