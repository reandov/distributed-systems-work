const { Kafka } = require('kafkajs')
var colors = require('colors');

const kafka = new Kafka({
  clientId: 'analyser',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'module-analyser' })

function identifyProblem(problem) {
  switch (problem) {
    case "engine problem":
      return "Engine problem identified, responsible team activated."
    case "route problem":
      return "Route problem identified, need to manually reconnect routes."
    case "internal problem":
      return "Internal problem identified, staff team activated."
    case "unidentified problem":
      return "Unidentified problem. Trying to establish contact with staff team."

    default:
      break;
  }
}

async function analyse() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'issue-certificate' })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const newMessage = await JSON.parse(message.value.toString());

      if (newMessage.event !== 'none') {
        console.log(colors.red(`Problem identified in ${newMessage.clientType} with ID: ${newMessage.clientId}`));
        console.log(colors.red(`Problem: ${newMessage.event}`));
        console.log(colors.red(`Action: ${identifyProblem(newMessage.event)}\n`));
      }
    },
  })
}

analyse();