import redis from "redis";

// Creates a client which listens on local host by default
// with the port 6379
const subscriber = redis.createClient();

// Executes when the connection is executed correctly
subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Executes when there's an error in the conection
subscriber.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

subscriber.subscribe('holberton school channel');

subscriber.on('message', (channel, message) => {
    if (channel === 'holberton school channel') console.log(message);
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe();
        subscriber.quit();
    }
});
