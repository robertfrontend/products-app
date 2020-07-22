// Almacenando los datos de los inputs
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// clase para manejar la INTERFAZ
class UI {
    addProduct(product) {

        // elegimos el contenedor donde va a ir las tarjetas de los productos
        const productList = document.getElementById('product-list');

        // Crear producto para el html
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center m-2" >
                <div class="card-body">
                    <div>
                        <strong>Prdouct Name</strong>: ${product.name} 
                    </div>
                    <div>
                        <strong>Prdouct Price</strong>: ${product.price} 
                    </div>
                    <div>
                        <strong>Prdouct Year</strong>: ${product.year} 
                    </div>
                    <div>
                        <button name="delete" class="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
        // agregamos el producto al html
        productList.appendChild(element);

        // resetear campos despues que se agrega un producto
        this.resetForm()
    }

    // resetear formulario
    resetForm() {
        document.getElementById('product-form').reset();
    }

    // verificar precios
    verifyPrice(name, price) {
        if(name === 'Apple' || name === 'apple'){
            if(price < 100 ) {
                this.showMessage('Este producto es muy barato', 'warning')
            }
        }
    }

    // eliminar producto
    deleteProduct(element) {
        // para elegir el boton delete
        if(element.name === 'delete') {
            console.log('eliminando');
            element.parentElement.parentElement.parentElement.remove();

            // mostrando mensaje de eliminado
            this.showMessage('Producto eliminado', 'danger')
        }
    }

    // mandar mensajes
    showMessage(message, cssClass ) {

        const div = document.createElement('div');
        div.className = `alert text-white bg-${cssClass} m-2 `;
        div.appendChild(document.createTextNode(message))

        // mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');

        // insertar antes de un elemento (#App)
        container.insertBefore(div, app)

        setTimeout(() => {
            document.querySelector('.alert').remove();
        },3000)
        
    }
}

// DOM Event
document.getElementById('product-form')
    .addEventListener('submit', (e) =>{
    e.preventDefault();

    // Obtener el valor de los inputs
    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    const year = document.getElementById('year').value

    // Almacenar los valores en la clase Product
    const product = new Product(name, price, year);

    // le mandamos los datos de los inputs a la clase addProduct
    const ui = new UI()
    ui.addProduct(product)

    // verificar precio
    ui.verifyPrice(name, price)

    ui.showMessage('Producto Agregado', 'success')
} )

// event para eliminar producto
document.getElementById('product-list').addEventListener('click', (e) => {

    const ui = new UI();
    ui.deleteProduct(e.target)
})