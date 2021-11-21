-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "messages" (
    "messageId" TEXT NOT NULL PRIMARY KEY,
    "clientType" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "messages_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
