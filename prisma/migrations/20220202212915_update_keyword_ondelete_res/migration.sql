-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `fk_reservation_user1`;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `fk_reservation_user1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
