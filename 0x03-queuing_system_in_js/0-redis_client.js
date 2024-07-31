import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Explicitly connect the client
client.connect().catch(err => {
  console.error('Redis client not connected to the server:', err);
});
