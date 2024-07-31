import { createClient } from 'redis';

async function main() {
  // Create and connect the Redis client
  const client = createClient();

  client.on('error', (err) => {
    console.error('Redis client not connected to the server:', err);
  });

  client.on('connect', () => {
    console.log('Redis client connected to the server');
  });

  await client.connect();

  // Function to set a value for a given key in Redis
  async function setNewSchool(schoolName, value) {
    await client.set(schoolName, value);
    console.log(`Reply: OK`);
  }

  // Function to display the value of a given key in Redis
  async function displaySchoolValue(schoolName) {
    const value = await client.get(schoolName);
    console.log(value);
  }

  // Perform Redis operations
  await displaySchoolValue('Holberton');
  await setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

// Run the main function
main();
