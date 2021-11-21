const { Kafka } = require("kafkajs");
const { prismaClient } = require("./prisma");

const kafka = new Kafka({
  clientId: "database",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "module-database" });

async function database() {
  await consumer.connect();
  await consumer.subscribe({ topic: "messages" });

  let connectedUsers = [];

  await consumer.run({
    eachMessage: async ({ message }) => {
      const newMessage = await JSON.parse(message.value.toString());

      if (!connectedUsers.includes(newMessage.clientId)) {
        connectedUsers.push(newMessage.clientId);

        await prismaClient.client.create({
          data: {
            id: newMessage.clientId,
            type: newMessage.clientType,
          },
        });
      }

      console.log(`Inserting new message: ${newMessage.messageId}`);
      console.log(`from client: ${newMessage.clientId} \n`);

      await prismaClient.message.create({
        data: {
          messageId: String(newMessage.messageId),
          clientId: String(newMessage.clientId),
          clientType: String(newMessage.clientType),
          latitude: String(newMessage.latitude),
          longitude: String(newMessage.longitude),
          event: String(newMessage.event),
        },
        include: {
          client: true,
        },
      });
    },
  });
}

database();
