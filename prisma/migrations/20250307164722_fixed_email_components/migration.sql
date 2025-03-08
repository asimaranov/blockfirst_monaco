-- CreateTable
CREATE TABLE "EmailCode" (
    "id" TEXT NOT NULL,
    "confirmation_type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    "sent_at" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailCode_pkey" PRIMARY KEY ("id")
);
