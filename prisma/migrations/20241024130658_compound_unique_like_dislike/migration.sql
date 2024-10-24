/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `CommentDislike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,commentId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,userId]` on the table `Dislike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CommentDislike_userId_key";

-- DropIndex
DROP INDEX "CommentLike_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "CommentDislike_userId_commentId_key" ON "CommentDislike"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_userId_commentId_key" ON "CommentLike"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Dislike_postId_userId_key" ON "Dislike"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_postId_userId_key" ON "Like"("postId", "userId");
