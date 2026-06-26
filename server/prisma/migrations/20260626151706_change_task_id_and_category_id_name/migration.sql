/*
  Warnings:

  - You are about to drop the column `task_id` on the `subtask` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subtask" DROP CONSTRAINT "subtask_task_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_category_id_fkey";

-- AlterTable
ALTER TABLE "subtask" DROP COLUMN "task_id",
ADD COLUMN     "taskId" BIGINT;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "category_id",
ADD COLUMN     "categoryId" BIGINT;

-- AddForeignKey
ALTER TABLE "subtask" ADD CONSTRAINT "subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
