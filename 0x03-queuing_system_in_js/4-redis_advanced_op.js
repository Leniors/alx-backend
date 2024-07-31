import redis from "redis";

// Creates a client which listens on local host by default
// with the port 6379
const client = redis.createClient();

const KEY = 'HolbertonSchools'
const keys = ['Portland', 'Seattle', 'New York', 'Bogota', 'Cali', 'Paris'];
const values = [50, 80, 20, 20, 40 ,2]

// Executes when the connection is executed correctly
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Executes when there's an error in the conection
client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

keys.forEach((key, index) => {
    client.hset(KEY, key, values[index], redis.print());
});
