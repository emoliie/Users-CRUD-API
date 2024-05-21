/*
  Warnings:

  - Added the required column `image` to the `LikedCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `LikedCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `OwnedCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OwnedCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LikedCard` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `OwnedCard` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
