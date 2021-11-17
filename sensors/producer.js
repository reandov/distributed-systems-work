const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9092']
})

const producer = kafka.producer()

async function runProducer() {
  await producer.connect()
  
  await producer.send({
    topic: 'issue-certificate',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  await producer.disconnect()
}

runProducer();
