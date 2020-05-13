let guardar = document.querySelector('#guardar');
let listado = document.querySelector('#listado');
let alerta = document.querySelector('#alert');

//EVENTOS
//Agregar
guardar.addEventListener('click', function(e){
	let comentario = document.querySelector('textarea').value;
	//let id = document.querySelector('textarea').id;

	if(comentario.trim() === ''){
		mostrarAlertaExito(comentario);
	}
	else{
		let array;
		let id;
		array = obtenerLocalStorage();

		if(array.length === 0){
			id = 0;
		}
		else{
			id = (array[array.length-1].id) + 1;
		}
		agregar(comentario, id);
		agregarLocalStorage(comentario);
		mostrarAlertaExito(comentario);
		console.log(comentario.innerText);
	}
	e.preventDefault();
});

//Eliminar
listado.addEventListener('click', function(e){
	e.preventDefault();

	if(e.target.classList.contains('btn')){
		let boton = e.target;
		let texto = boton.parentElement.previousElementSibling.children.item(0).textContent;
		let id = boton.parentElement.previousElementSibling.children.item(0).id;
		console.log(id);
		eliminarLocalStorage(texto, id);

		boton.parentElement.parentElement.remove();
		mostrarAlertaEliminar();
	}
});

//Cargar en el DOM
document.addEventListener('DOMContentLoaded', cargarLocalStorage);

//FUNCIONES

function agregar(com, id){

	let div = document.createElement('div');
	let div1 = document.createElement('div');
	let div2 = document.createElement('div');
	let elemento = document.createElement('div');
	let botonBorrar = document.createElement('input');

	div.className = 'row';
	div1.className = 'col-9 mb-2';
	div2.className = 'col-3 m-auto';
	div.appendChild(div1);
	div.appendChild(div2);
	listado.appendChild(div);

	elemento.textContent = com;
	elemento.id = id;
	elemento.className = 'card p-2';
	div1.appendChild(elemento);

	botonBorrar.id = 'eliminar';
	botonBorrar.className = 'btn btn-danger';
	botonBorrar.type = 'submit';
	botonBorrar.value = 'Eliminar';
	div2.appendChild(botonBorrar);
	
}

function cargarLocalStorage(){
	let array = obtenerLocalStorage();

	array.forEach( function(element, index) {
		agregar(element.com, element.id);
	});
}

function agregarLocalStorage(comentario){
	let array;
	let id;
	array = obtenerLocalStorage();

	if(array.length === 0){
		id = 0;
	}
	else{
		id = (array[array.length-1].id) + 1;
	}
	let objeto = {
		id : id,
		com : comentario
	}
	
	console.log(array.length);
	array.push(objeto);
	localStorage.setItem('comentarios', JSON.stringify(array));
}

function obtenerLocalStorage(){
	let array;

	if(localStorage.getItem('comentarios') === null){
		array = [];
	}
	else {
		array = JSON.parse(localStorage.getItem('comentarios'));
	}
	return array;
}

function eliminarLocalStorage(texto, id){
	let array = obtenerLocalStorage();
	console.log(array[0].id);
	array.forEach( function(element) {
		if (element.com === texto && element.id == id) {
			let i = array.indexOf(element);
			console.log(i);
			console.log('hola');
			array.splice(i, 1);
		}
	localStorage.setItem('comentarios', JSON.stringify(array));
	});
}

function mostrarAlertaExito(comentario){
	let divAlert = document.createElement('div');

	if(comentario.trim() === ''){
		divAlert.className = 'alert alert-warning m-3';
		divAlert.textContent = 'Comentario vacío, escriba algo';
		alerta.appendChild(divAlert);

		setTimeout(function(){
			alerta.appendChild(divAlert).remove();
		}, 2000);
	}
	else{
		divAlert.className = 'alert alert-success m-3';
		divAlert.textContent = 'Agregado con éxito';
		alerta.appendChild(divAlert);

		setTimeout(function(){
			alerta.appendChild(divAlert).remove();
		}, 2000);
	}
}

function mostrarAlertaEliminar(){
	let divAlert = document.createElement('div');

	divAlert.className = 'alert alert-danger m-3';
	divAlert.textContent = 'Eliminado con éxito';
	alerta.appendChild(divAlert);

	setTimeout(function(){
		alerta.appendChild(divAlert).remove();
	}, 2000);
}