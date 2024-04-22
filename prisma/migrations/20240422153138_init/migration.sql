-- CreateTable
CREATE TABLE "engineer" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "engineer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "robot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "engineerId" INTEGER NOT NULL,

    CONSTRAINT "robot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "engineer_username_key" ON "engineer"("username");

-- AddForeignKey
ALTER TABLE "robot" ADD CONSTRAINT "robot_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "engineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
