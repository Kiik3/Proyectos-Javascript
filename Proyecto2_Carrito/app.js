let carrito = document.querySelector('#carrito');
let vaciar = document.querySelector('#vaciar');


document.addEventListener('DOMContentLoaded', mostrarLocalStorage);
document.addEventListener('click', agregarCarrito);
carrito.addEventListener('click', eliminarProducto);
vaciar.addEventListener('click', vaciarCarrito);

function agregarCarrito(e){
	e.preventDefault();
	let agregar = e.target;

	if(e.target.className === 'btn btn-primary btn-block mt-3'){

		let tabla = document.querySelector('#tabla');
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let td4 = document.createElement('td');
		let img = document.createElement('img');
		let input = document.createElement('button');
		
		let imagen = agregar.parentElement.previousElementSibling.children[0].src;
		let producto = agregar.previousElementSibling.previousElementSibling.children[1].textContent;
		let precio = agregar.previousElementSibling.children[1].textContent;

		img.src = imagen;
		img.width = '100';
		img.height = '75';
		input.className = 'boton';
		input.innerText = 'X';
		td1.appendChild(img);
		td2.textContent = producto;
		td3.textContent = precio;
		td4.appendChild(input);
		tabla.appendChild(tr);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);

		let arreglo = obtenerLocalStorage();
		let id;
		if(arreglo !== null){
			arreglo.forEach( element => id = element.id + 1);
		}
		else {
			id = 1;
		}
		
		tr.id = id;

		agregarLocalStorage(agregar);

	}
}

function eliminarProducto(e){
	e.preventDefault();

	if(e.target.className === 'boton'){
		let x = e.target;
		x.parentElement.parentElement.remove();
		eliminarProductoLocalStorage(x);
	}
}

function vaciarCarrito(e){
	e.preventDefault();
	let longitudTabla = vaciar.parentElement.children[0].children;
	let contenidoTabla = vaciar.parentElement.children[0];
	let i=1;
	console.log(contenidoTabla);

	while(i<longitudTabla.length){
		contenidoTabla.children[longitudTabla.length-1].remove();
	}
	vaciarLocalStorage();
}

function agregarLocalStorage(agregar){
	let imagen = agregar.parentElement.previousElementSibling.children[0].src;
	let nombre = agregar.previousElementSibling.previousElementSibling.children[1].textContent;
	let precio = agregar.previousElementSibling.children[1].textContent;
	let id;

	let productos = obtenerLocalStorage();

	if(productos !== null){
		productos.forEach( element => id = element.id + 1);
	}
	else {
		id = 1;
	}

	let producto = {
			id: id,
			nombre: nombre,
			precio: precio,
			imagen: imagen,
		}
	
	//console.log(productos[0]);

	if(productos === null){
		let arreglo = [producto];
		localStorage.setItem('localProductos', JSON.stringify(arreglo));
	}
	else{
		productos.push(producto);
		localStorage.setItem('localProductos', JSON.stringify(productos));
	}
}

function obtenerLocalStorage(){
	let productos = JSON.parse(localStorage.getItem('localProductos'));

	return productos;
}

function mostrarLocalStorage(){
	let productos = obtenerLocalStorage();
	let tabla = document.querySelector('#tabla');

	if(productos != null){
		productos.forEach( function(element, index) {
		
			let tr = document.createElement('tr');
			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			let td3 = document.createElement('td');
			let td4 = document.createElement('td');
			let img = document.createElement('img');
			let input = document.createElement('button');

			img.src = element.imagen;
			td2.textContent = element.nombre;
			td3.textContent = element.precio;

			img.width = '100';
			img.height = '75';
			input.className = 'boton';
			input.innerText = 'X';
			td1.appendChild(img);
			td4.appendChild(input);
			tabla.appendChild(tr);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.id = element.id;
		});
	}
}

function eliminarProductoLocalStorage(x){
	let productos = obtenerLocalStorage();
	let borrar = x.parentElement.parentElement;

	let imagen = borrar.children[0].children[0].src;
	let nombre = borrar.children[1].textContent;
	let precio = borrar.children[2].textContent;
	let i = productos.length+1;

	//Esto es para eliminar todos los productos repetidos
	/*
	while(i>productos.length){
		i = productos.length;
		productos.forEach( function(element, index){
			if(element.imagen === imagen && element.nombre === nombre && element.precio === precio){
				productos.splice(index, 1);
			}
		})
	}*/
	
	//Esto es para eliminar el producto por su id
	productos.forEach( (element, index) => {
		if(element.id == borrar.id){
			productos.splice(index, 1);
		}
	});

	localStorage.setItem('localProductos', JSON.stringify(productos));
}

function vaciarLocalStorage(){
	let productos = obtenerLocalStorage();
	localStorage.removeItem('localProductos');
}