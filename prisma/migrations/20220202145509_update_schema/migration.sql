-- CreateTable
CREATE TABLE `reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(0) NOT NULL,
    `nbrGest` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `idReservation_UNIQUE`(`id`),
    INDEX `fk_reservation_user1_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,

    UNIQUE INDEX `idRole_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastname` VARCHAR(45) NULL,
    `mail` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `firstname` VARCHAR(45) NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `idUser_UNIQUE`(`id`),
    UNIQUE INDEX `mail_UNIQUE`(`mail`),
    INDEX `fk_user_role_idx`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `fk_reservation_user1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
