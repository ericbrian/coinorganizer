/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "FK_collection_user";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "user_old" (
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
CREATE UNIQUE INDEX "Users_email_key" ON "user_old"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "user_old"("username");

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "FK_collection_user" FOREIGN KEY ("owner_id") REFERENCES "user_old"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "Roles_roleId_fkey" FOREIGN KEY ("role_id") REFERENCES "user_old"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "user_old"("id") ON DELETE SET NULL ON UPDATE CASCADE;
