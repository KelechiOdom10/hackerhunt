-- AlterTable
ALTER TABLE "links" ADD COLUMN     "image" TEXT,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "description" DROP NOT NULL;
