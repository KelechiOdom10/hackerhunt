/*
  Warnings:

  - Added the required column `text` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "text" TEXT NOT NULL;
