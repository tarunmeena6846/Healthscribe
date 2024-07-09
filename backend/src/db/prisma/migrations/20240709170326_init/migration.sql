/*
  Warnings:

  - You are about to drop the column `firstName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "allergies" TEXT[],
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "insuranceNumber" TEXT,
ADD COLUMN     "medications" TEXT[];
