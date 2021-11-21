# distributed-systems-work a

To run the images in the docker, follow the commands below:

```
docker build -t cc/database1.0 .
docker build -t cc/sensor1.0 .
docker build -t cc/processor1.0 .
docker build -t cc/analyser1.0 .

docker run --network=host cc/database1.0
docker run --network=host cc/sensor1.0
docker run --network=host cc/processor1.0
docker run --network=host cc/analyser1.0
```
