
// Importamos dotenv y configuramos las variables de entorno
require('dotenv').config();

// Importamos el driver oficial de MongoDB
const { MongoClient } = require('mongodb');

// Definimos la URI de conexión
const uri = process.env.MONGODB_URI;

// Creamos una instancia del cliente MongoDB
const client = new MongoClient(uri);

// Función para conectarnos a MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
        return client;
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        return null;
    }
}

// Función para desconectarnos de MongoDB
async function disconnectFromMongoDB() {
    try {
        await client.close();
        console.log('Desconectado de MongoDB');
    } catch (error) {
        console.error('Error al desconectar de MongoDB:', error);
    }
}

// Exportamos las funciones
module.exports = {
    connectToMongoDB,
    disconnectFromMongoDB
};
