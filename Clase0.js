const fs = require('fs');
class Product{
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Si hay un error al leer el archivo (por ejemplo, si el archivo no existe), inicializa products como un array vacío.
            return [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {
            throw new Error("Todos los parámetros son obligatorios.");
        }
        const codeExists = this.products.some(product => product.code === code);

        if (codeExists) {
            throw new Error("El código de producto está repetido.");
        }
        const id = this.generateUniqueId();
        const newProduct = new Product(title, description, price, thumbnail, code, stock);
        newProduct.id = id;

        this.products.push(newProduct);
        this.saveProducts();
        // invoca saveProducts después de realizar la operación para mantener la persistencia en el archivo.
        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error("Producto no encontrado.");
        }

        return product;
    }

    updateProduct(id, newData) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        this.products[productIndex] = { ...this.products[productIndex], ...newData };
        this.saveProducts();
        // invoca saveProducts después de realizar la operación para mantener la persistencia en el archivo.

        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        const deletedProduct = this.products.splice(productIndex, 1)[0];
        this.saveProducts();
        // invoca saveProducts después de realizar la operación para mantener la persistencia en el archivo.

        return deletedProduct;
    }

    generateUniqueId() {
        return Math.random().toString(36);
    }
}

// uso de la clase ProductManager
const manager = new ProductManager('products.json');

console.log(manager.getProducts());

console.log(manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 1234));

console.log(manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 1234)); // Debería arrojar una excepción pq esta repetido

console.log(manager.getProductById(manager.getProducts()[0].id));

console.log(manager.updateProduct(manager.getProducts()[0].id, { price: 250 }));

console.log(manager.deleteProduct(manager.getProducts()[0].id));