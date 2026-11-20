
const express = require('express');

const {
    connectToMongoDB,
    disconnectFromMongoDB
} = require('./src/mongodb');

const app = express();
const PORT = 3000;

// Middleware para trabajar con JSON y UTF-8
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenidos al servidor de frutas'
    });
});

// Obtener todas las frutas
app.get('/frutas', async (req, res) => {
    const client = await connectToMongoDB();

    if (!client) {
        return res.status(500).json({
            mensaje: 'Error al conectar con MongoDB'
        });
    }

    try {
        const db = client.db('frutasDB');
        const collection = db.collection('frutas');

        const frutas = await collection.find({}).toArray();

        res.status(200).json(frutas);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener las frutas'
        });

    } finally {
        await disconnectFromMongoDB();
    }
});

// Obtener una fruta por su ID
app.get('/frutas/:id', async (req, res) => {
    const client = await connectToMongoDB();

    if (!client) {
        return res.status(500).json({
            mensaje: 'Error al conectar con MongoDB'
        });
    }

    try {
        const id = Number(req.params.id);

        const db = client.db('frutasDB');
        const collection = db.collection('frutas');

        const fruta = await collection.findOne({ id: id });

        if (!fruta) {
            return res.status(404).json({
                mensaje: 'No se encontró la fruta'
            });
        }

        res.status(200).json(fruta);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al buscar la fruta'
        });

    } finally {
        await disconnectFromMongoDB();
    }
});
app.get('/frutas/nombre/:nombre', async (req, res) => {
    const client = await connectToMongoDB();

    if (!client) {
        return res.status(500).json({ mensaje: 'Error al conectar con MongoDB' });
    }

    try {
        const nombre = req.params.nombre;
        const db = client.db('frutasDB');
        const collection = db.collection('frutas');

        const frutas = await collection.find({
            nombre: new RegExp(nombre, 'i')
        }).toArray();

        res.status(200).json(frutas);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al buscar frutas por nombre' });

    } finally {
        await disconnectFromMongoDB();
    }
});
app.get('/frutas/importe/:precio', async (req, res) => {
    const client = await connectToMongoDB();

    if (!client) {
        return res.status(500).json({ mensaje: 'Error al conectar con MongoDB' });
    }

    try {
        const precio = Number(req.params.precio);
        const db = client.db('frutasDB');
        const collection = db.collection('frutas');

        const frutas = await collection.find({
            importe: { $gte: precio }
        }).toArray();

        res.status(200).json(frutas);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al buscar frutas por importe' });

    } finally {
        await disconnectFromMongoDB();
    }
});
app.post('/frutas', async (req, res) => {

    const nuevaFruta = req.body;

    if (!nuevaFruta || Object.keys(nuevaFruta).length === 0) {
        return res.status(400).json({
            mensaje: 'Faltan los datos de la fruta'
        });
    }

    const client = await connectToMongoDB();

    if (!client) {
        return res.status(500).json({
            mensaje: 'Error al conectar con MongoDB'
        });
    }

    try {
        const db = client.db('frutasDB');
        const collection = db.collection('frutas');

        const resultado = await collection.insertOne(nuevaFruta);

        res.status(201).json({
            mensaje: 'Fruta creada correctamente',
            id: resultado.insertedId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear la fruta'
        });

    } finally {
        await disconnectFromMongoDB();
    }
});
app.put('/frutas/:id', async (req, res) => {

    const id = Number(req.params.id);
    const datosActualizar = req.body;

    if (!datosActualizar || Object.keys(datosActualizar).length === 0) {
        return res.status(400).json({
            mensaje: 'Faltan los datos para actualizar'
        });
    }

    const client = await connectToMongoDB();

    if (!client) {
        return res.status(500).json({
            mensaje: 'Error al conectar con MongoDB'
        });
    }

    try {
        const db = client.db('frutasDB');
        const collection = db.collection('frutas');

        const resultado = await collection.updateOne(
            { id: id },
            { $set: datosActualizar }
        );

        res.status(200).json({
            mensaje: 'Fruta actualizada correctamente',
            modificados: resultado.modifiedCount
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar la fruta'
        });

    } finally {
        await disconnectFromMongoDB();
    }
});
app.delete('/frutas/:id', async (req, res) => {
    const id = Number(req.params.id);

    // Validar el ID
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'El ID proporcionado no es válido'
        });
    }

    const client = await connectToMongoDB();

    if (!client) {
        return res.status(500).json({
            mensaje: 'Error al conectar con MongoDB'
        });
    }

    try {
        const db = client.db('frutasDB');
        const collection = db.collection('frutas');

        const resultado = await collection.deleteOne({ id: id });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                mensaje: 'No se encontró la fruta'
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al eliminar la fruta'
        });
    } finally {
        await disconnectFromMongoDB();
    }
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
