-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_commentId_fkey";

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
