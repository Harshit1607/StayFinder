/*
  Warnings:

  - The `image_url` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `booking_id` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - Made the column `guest_id` on table `bookings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_guest_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_listing_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_booking_id_fkey";

-- DropIndex
DROP INDEX "payments_booking_id_key";

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "payment_id" INTEGER,
ALTER COLUMN "guest_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "image_url",
ADD COLUMN     "image_url" TEXT[];

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "booking_id";

-- CreateIndex
CREATE UNIQUE INDEX "bookings_payment_id_key" ON "bookings"("payment_id");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
