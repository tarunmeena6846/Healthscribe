/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminValues" AS ENUM ('global_admin', 'local_admin', 'not_admin');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DOCTOR', 'NURSE', 'SUPPORT_STAFF', 'PATIENT');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('in_progress', 'complete');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "referringProviderId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "admin" "AdminValues" NOT NULL,
    "specialty" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Support" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin" "AdminValues" NOT NULL,

    CONSTRAINT "Support_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareTeam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "members" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CareTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "members" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PeerGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCenter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicalCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "patientId" INTEGER NOT NULL,
    "assignedToId" INTEGER,
    "status" "StatusType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferringProvider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferringProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CareTeamToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MedicalCenterToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MedicalCenterToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MedicalCenterToSupport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_email_key" ON "Provider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Support_email_key" ON "Support"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ReferringProvider_email_key" ON "ReferringProvider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CareTeamToPatient_AB_unique" ON "_CareTeamToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_CareTeamToPatient_B_index" ON "_CareTeamToPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MedicalCenterToPatient_AB_unique" ON "_MedicalCenterToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_MedicalCenterToPatient_B_index" ON "_MedicalCenterToPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MedicalCenterToProvider_AB_unique" ON "_MedicalCenterToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_MedicalCenterToProvider_B_index" ON "_MedicalCenterToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MedicalCenterToSupport_AB_unique" ON "_MedicalCenterToSupport"("A", "B");

-- CreateIndex
CREATE INDEX "_MedicalCenterToSupport_B_index" ON "_MedicalCenterToSupport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_referringProviderId_fkey" FOREIGN KEY ("referringProviderId") REFERENCES "ReferringProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareTeamToPatient" ADD CONSTRAINT "_CareTeamToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "CareTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareTeamToPatient" ADD CONSTRAINT "_CareTeamToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalCenterToPatient" ADD CONSTRAINT "_MedicalCenterToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "MedicalCenter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalCenterToPatient" ADD CONSTRAINT "_MedicalCenterToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalCenterToProvider" ADD CONSTRAINT "_MedicalCenterToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "MedicalCenter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalCenterToProvider" ADD CONSTRAINT "_MedicalCenterToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalCenterToSupport" ADD CONSTRAINT "_MedicalCenterToSupport_A_fkey" FOREIGN KEY ("A") REFERENCES "MedicalCenter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalCenterToSupport" ADD CONSTRAINT "_MedicalCenterToSupport_B_fkey" FOREIGN KEY ("B") REFERENCES "Support"("id") ON DELETE CASCADE ON UPDATE CASCADE;
