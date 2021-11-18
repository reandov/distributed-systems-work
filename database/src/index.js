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
      const newMessage = JSON.parse(message.value.toString());

      await prismaClient.message.create({
        data: {
          latitude: String(newMessage.latitude),
          longitude: String(newMessage.longitude),
          event: String(newMessage.event)
        }
      })
    },
  })
}

database();