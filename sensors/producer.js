const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ["localhost:9092"]
})

const producer = kafka.producer()

const runProducer = async () => {
	await producer.connect()
	let i = 0

	setInterval(async () => {

    const message = {
      id: i,
      latitude: -4.9466923,
      longitude: -37.9766002,
      event: "none"
    };

		try {
			await producer.send({
				topic: 'issue-certificate',
				messages: [
					{
						key: String(i),
						value: JSON.stringify(message),
					},
				],
			})

			console.log("sent: ", JSON.stringify(message, null, 2));
			i++;
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, 1000)
}

runProducer();
