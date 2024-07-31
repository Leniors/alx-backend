import redis from "redis";
const { promisify } = require('util')

// Creates a client which listens on local host by default
// with the port 6379
const client = redis.createClient();

const asyncGet = promisify(client.get).bind(client);

// Executes when the connection is executed correctly
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Executes when there's an error in the conection
client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print());
}

async function displaySchoolValue(schoolName) {
    console.log(await asyncGet(schoolName));
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
