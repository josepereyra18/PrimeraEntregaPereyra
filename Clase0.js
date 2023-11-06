// class ContadorClass{
//     static totalDeContadores = 0; // se refiere a la clase
//     constructor( nombre ){ // siempre se inicializa automaticamente, se puede llamar constructor
//         this.nombre = nombre; // se refiere a este especifico nombre
//         this.contador = 0;
//     }

//     getResponsable(){
//         return this.nombre;
//     }

//     contar(){
//         this.contador++;
//         ContadorClass.totalDeContadores++;
//     }
//     getCuentaIndividual (){
//         return this.contador;
//     }

//     getCuentaTotal(){
//         return ContadorClass.totalDeContadores;
//     }
// }

// const contador = new ContadorClass('Josefina');

// // instanciar una clase, la inicio, le paso 
// //parametros, y se crea un objeto con esos parametros.
// //en este caso contador que le paso por parametro Josefina



// console.log(contador); //Contador { nombre: 'Josefina', contador: 0 }
// //>> Contador { nombre: 'Josefina', contador: 0 }
// //console.log(contador.nombre);
// //>> Josefina

// console.log(contador.getResponsable()); //Josefina
// console.log(contador.getCuentaIndividual()); //0
// console.log(contador.getCuentaTotal()); //0
// contador.contar(); // contador--> 1
// console.log(contador) //Contador { nombre: 'Josefina', contador: 1 }

// //! node Clase0.js


class Product {
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
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }


    addProduct(title, description, price, thumbnail, code, stock) {

        const codeExists = this.products.some(product => product.code === code);

        if (codeExists) {
            throw new Error("El código de producto está repetido.");
        }


        const id = this.generateUniqueId();
        const newProduct = new Product(title, description, price, thumbnail, code, stock);
        newProduct.id = id;

        this.products.push(newProduct);

        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error("Producto no encontrado.");
        }

        return product;
    }

    generateUniqueId() {
        return Math.random().toString(36);
    }
}


const manager = new ProductManager();
console.log(manager.getProducts());
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 1234);
console.log(manager.getProducts());

try {
    manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 1234);
} catch (error) {
    console.log(error.message);
}

try {
    const foundProduct = manager.getProductById(manager.getProducts()[0].id);
    console.log("Producto encontrado:", foundProduct);
} catch (error) {
    console.log(error.message);
}