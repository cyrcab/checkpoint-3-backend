/*
  Warnings:

  - You are about to drop the column `nbrGest` on the `reservation` table. All the data in the column will be lost.
  - Added the required column `nbrGuest` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `nbrGest`,
    ADD COLUMN `nbrGuest` INTEGER NOT NULL;
