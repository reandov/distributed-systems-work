const { Kafka } = require('kafkajs')
const { v4: uuid } = require('uuid')

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ["localhost:9092"]
})

const producer = kafka.producer()

const runSensor = async () => {
	await producer.connect();

	const acc = 0.05;
	let latitude = -4.9466923;
	let longitude = -37.9766002;

	const client = {
		id: uuid(),
		type: 'plane'
	};

	setInterval(async () => {

		const message = {
			messageId: uuid(),
			clientId: client.id,
			clientType: client.type,
			latitude,
			longitude,
			event: "none"
		};

		try {
			await producer.send({
				topic: 'issue-certificate',
				messages: [
					{
						key: uuid(),
						value: JSON.stringify(message),
					},
				],
			})

			console.log("sent: ", JSON.stringify(message, null, 2));
		} catch (err) {
			console.error("could not write message " + err);
		}

		latitude = latitude += acc;
		longitude = longitude += acc;
	}, 1000)
}

runSensor();
