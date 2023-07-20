/*
  Warnings:

  - The `owner_id` column on the `collection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `user_id` column on the `role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role_id` column on the `role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "FK_collection_user";

-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "Roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "Roles_userId_fkey";

-- AlterTable
ALTER TABLE "collection" DROP COLUMN "owner_id",
ADD COLUMN     "owner_id" INTEGER;

-- AlterTable
ALTER TABLE "role" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER,
DROP COLUMN "role_id",
ADD COLUMN     "role_id" INTEGER;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50),
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "provider" VARCHAR(50),
    "audience" VARCHAR(50),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "FK_collection_user" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
