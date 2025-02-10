/*
  Warnings:

  - You are about to drop the column `senha` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Favorito` table. All the data in the column will be lost.
  - Added the required column `hash` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "senha",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Favorito" DROP COLUMN "data";
