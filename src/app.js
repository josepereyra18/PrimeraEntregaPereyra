const express = require('express');

const ProductRouter = require('./routes/products.router.js');
const CartRouter = require('./routes/cart.router.js');
const { dirname } = require('path');

const app = express();
const port = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( __dirname +'/public'));
app.use('/api/productos', ProductRouter);
app.use('/api/carrito', CartRouter);



// app.get('/', (req, res) => {
//     res.send(`
//         <h1> Hola Mundo! </h1>
//         <p>/productos --> todos los productos</p>
//         <p>/productos?limit=2 --> los primeros 2 productos </p>
//         <p>/productos/:id --> el producto con ese id</p>
//     `);
// });

app.get('/api/productos', (req, res) => {
    res.send('get productos');
})

app.post('/api/productos', (req, res) => {
    res.send('post productos');
})

app.put('/api/productos', (req, res) => {
    res.send('put productos');
})

app.delete('/api/productos', (req, res) => {
    res.send('delete productos');
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/api/carrito', (req, res) => {
    res.send('get productos');
})

app.post('/api/carrito', (req, res) => {
    res.send('post productos');
})

// app.get('/api/productos', async (req, res) => {
//     const limit = req.query.limit;
//     res.json(await productManager.getProducts(limit));
// });

// app.get('api/productos/:pid', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const encontrado = await productManager.getProductById(id);
//         res.json(encontrado);
//     } catch (error) {
//         res.status(404).send(error.message);
//     }
// });


// app.post('/api/productos', async (req, res) => {
//     const { title, description, price, thumbnail, code, stock } = req.body;
//     try {
//         const nuevoProducto = await productManager.addProduct(title, description, price, thumbnail, code, stock);
//         res.json(nuevoProducto);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });
