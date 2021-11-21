const { Kafka } = require("kafkajs");
const { v4: uuid } = require("uuid");
var colors = require("colors");

const kafka = new Kafka({
  clientId: "sensor",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

function generateProblem(num) {
  if (num <= 0.6) {
    return "none";
  } else if (num > 0.6 && num < 0.8) {
    return "engine problem";
  } else if (num > 0.7 && num < 0.9) {
    return "route problem";
  } else if (num > 0.8 && num < 1) {
    return "internal problem";
  } else if (num > 0.9) {
    return "unidentified problem";
  }
}

const runSensor = async () => {
  await producer.connect();

  const acc = 0.05;
  let latitude = -4.9466923;
  let longitude = -37.9766002;

  const client = {
    id: uuid(),
    type: Math.random() < 0.6 ? "plane" : "ship",
  };

  setInterval(async () => {
    const message = {
      messageId: uuid(),
      clientId: client.id,
      clientType: client.type,
      latitude,
      longitude,
      event: generateProblem(Math.random()),
    };

    try {
      await producer.send({
        topic: "messages",
        messages: [
          {
            key: uuid(),
            value: JSON.stringify(message),
          },
        ],
      });

      console.log(colors.green(`Sent message with ID: ${message.messageId}`));
    } catch (err) {
      console.error("Error while sending message: " + err);
    }

    latitude += acc;
    longitude += acc;
  }, 5000);
};

runSensor();
