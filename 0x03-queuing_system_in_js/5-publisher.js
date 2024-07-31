import redis from "redis";

// Creates a client which listens on local host by default
// with the port 6379
const publisher = redis.createClient();

// Executes when the connection is executed correctly
publisher.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Executes when there's an error in the conection
publisher.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

function publishMessage(message, time) {
    setTimeout(() => {
        console.log(`About to send ${message}`);
        publisher.publish('holberton school channel', message);
    }, time)
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
