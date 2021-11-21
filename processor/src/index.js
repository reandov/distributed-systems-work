const { Kafka } = require("kafkajs");
var colors = require("colors");

const kafka = new Kafka({
  clientId: "processor",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "module-processor" });

async function process() {
  await consumer.connect();
  await consumer.subscribe({ topic: "messages" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const newMessage = await JSON.parse(message.value.toString());

      if (newMessage.event === "none") {
        console.log(
          colors.green(
            `ID: ${newMessage.clientId} | Lat: ${newMessage.latitude}, Lon: ${
              newMessage.longitude
            } | Status: ${
              newMessage.event === "none" ? "OK" : newMessage.event
            }`
          )
        );
      } else {
        console.log(
          colors.red(
            `ID: ${newMessage.clientId} | Lat: ${newMessage.latitude}, Lon: ${
              newMessage.longitude
            } | Status: ${
              newMessage.event === "none" ? "OK" : newMessage.event
            }`
          )
        );
      }
    },
  });
}

process();
