-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CHIEF', 'VICE_CHIEF', 'SPECIAL_FORCE_SECURITY', 'BHZ_COUNTERMEASURE_FORCE', 'SCIENTIFIC_FIRST_CLASS', 'SCIENTIFIC_SECOND_CLASS', 'OBSERVER', 'PROFESSOR', 'BACHELOR', 'ACADEMICIAN');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('FREE', 'PROGRESS', 'DONE', 'WAITING', 'ERROR');

-- CreateEnum
CREATE TYPE "LectureStatus" AS ENUM ('OPENED', 'WAITING', 'CLOSED');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ACADEMICIAN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reward" TEXT NOT NULL,
    "conditions" TEXT[],
    "status" "TaskStatus" NOT NULL DEFAULT 'FREE',
    "imagePath" TEXT NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_done" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "imagePaths" TEXT[],
    "intervention" TEXT NOT NULL,
    "staffs" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_done_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecture" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "status" "LectureStatus" NOT NULL DEFAULT 'OPENED',

    CONSTRAINT "lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecture_report" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "intervention" TEXT NOT NULL,
    "staffs" TEXT[],
    "imagePaths" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "lecture_id" INTEGER NOT NULL,

    CONSTRAINT "lecture_report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_done_task_id_key" ON "task_done"("task_id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_done" ADD CONSTRAINT "task_done_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture_report" ADD CONSTRAINT "lecture_report_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
