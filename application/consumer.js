const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // repeat the element in the array in case of error
})

const consumer = kafka.consumer({ groupId: 'certificate-group' })

async function runConsumer() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'issue-certificate' }).then(success => console.log('Consumer ready.'))

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log({
        value: JSON.parse(message.value.toString()),
      })
    },
  })
}

runConsumer();