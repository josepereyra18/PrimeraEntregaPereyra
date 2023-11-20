const express = require('express');
const ProductManager = require('./Clase0');

const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./products.json');

app.get('/', (req, res) => {
    res.send(`
        <h1> Hola Mundo! </h1>
        <p>/productos --> todos los productos</p>
        <p>/productos?limit=2 --> los primeros 2 productos </p>
        <p>/productos/:id --> el producto con ese id</p>
    `);
});

app.get('/productos', async (req, res) => {
    const limit = req.query.limit;
    res.json(await productManager.getProducts(limit));
});

app.get('/productos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const encontrado = await productManager.getProductById(id);
        res.json(encontrado);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});