-- DropForeignKey
ALTER TABLE `_LinkToTag` DROP FOREIGN KEY `_LinkToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_LinkToTag` DROP FOREIGN KEY `_LinkToTag_B_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_linkId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `links` DROP FOREIGN KEY `links_userId_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `votes_linkId_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `votes_userId_fkey`;
