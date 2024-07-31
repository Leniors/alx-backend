import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const listProducts = [
    {'itemId': 1, 'name': 'Suitcase 250', 'price': 50, 'stock': 4},
    {'itemId': 2, 'name': 'Suitcase 450', 'price': 100, 'stock': 10},
    {'itemId': 3, 'name': 'Suitcase 650', 'price': 350, 'stock': 2},
    {'itemId': 4, 'name': 'Suitcase 1050', 'price': 550, 'stock': 5}
];

function getItemById(id) {
    return listProducts.filter((item) => item.itemId === id)[0];
}

//==============================================================================
// Redis
//==============================================================================

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error.message}`);
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

function reserveStockById(itemId, stock) {
    client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
    const stock = await getAsync(`item.${itemId}`);
    return stock;
}

//==============================================================================
// Express
//==============================================================================

const app = express();
const port = 1245;

const notFound = { status: 'Product not found' };

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

app.get('/list_products', (req, res) => {
    res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = Number(req.params.itemId);
    const item = getItemById(itemId);

    if (!item) {
        res.json(notFound);
        return;
    }

    const currentStock = await getCurrentReservedStockById(itemId);
    if (!currentStock) {
        await reserveStockById(itemId, item.initialAvailableQuantity);
        item.currentQuantity = item.initialAvailableQuantity;
    } else item.currentQuantity = currentStock;
    res.json(item);
});


app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = Number(req.params.itemId);
    const item = getItemById(itemId);
    const noStock = { status: 'Not enough stock available', itemId };
    const reservationConfirmed = { status: 'Reservation confirmed', itemId };

    if (!item) {
        res.json(notFound);
        return;
    }

    let currentStock = await getCurrentReservedStockById(itemId);
    if (currentStock === null) currentStock = item.initialAvailableQuantity;

    if (currentStock <= 0) {
        res.json(noStock);
        return;
    }

    reserveStockById(itemId, Number(currentStock) - 1);

    res.json(reservationConfirmed);
});
