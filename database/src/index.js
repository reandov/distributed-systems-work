const { Kafka } = require('kafkajs')
const { prismaClient } = require('./prisma')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'certificate-group' })

async function database() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'issue-certificate' }).then(success => console.log('Consumer ready.'))

  await consumer.run({
    eachMessage: async ({ message }) => {
      const newMessage = await JSON.parse(message.value.toString());

      await prismaClient.message.create({
        data: {
          messageId: String(newMessage.messageId),
          clientId: String(newMessage.clientId),
          clientType: String(newMessage.clientType),
          latitude: String(newMessage.latitude),
          longitude: String(newMessage.longitude),
          event: String(newMessage.event)
        }
      })
    },
  })
}

database();