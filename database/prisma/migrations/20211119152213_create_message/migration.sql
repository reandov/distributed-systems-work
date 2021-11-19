-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "messages" (
    "messageId" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "clientType" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "event" TEXT NOT NULL
);
