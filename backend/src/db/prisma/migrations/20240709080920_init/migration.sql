/*
  Warnings:

  - You are about to drop the column `organizationId` on the `MedicalCenter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedicalCenter" DROP CONSTRAINT "MedicalCenter_organizationId_fkey";

-- AlterTable
ALTER TABLE "MedicalCenter" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "medicalCenters" TEXT[];
