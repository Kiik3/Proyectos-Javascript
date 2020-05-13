const autos = [
	{
		marca: 'BMW',
		modelo: 'Serie 3',
		year: 2012,
		precio: 30000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ marca: 'Audi', modelo: 'A4', year: 2018, precio: 40000, puertas: 4, color: 'Negro', transmision: 'automatico' },
	{
		marca: 'Ford',
		modelo: 'Mustang',
		year: 2015,
		precio: 20000,
		puertas: 2,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ marca: 'Audi', modelo: 'A6', year: 2010, precio: 35000, puertas: 4, color: 'Negro', transmision: 'automatico' },
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2016,
		precio: 70000,
		puertas: 4,
		color: 'Rojo',
		transmision: 'automatico'
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2015,
		precio: 25000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{
		marca: 'Chevrolet',
		modelo: 'Camaro',
		year: 2018,
		precio: 60000,
		puertas: 2,
		color: 'Rojo',
		transmision: 'manual'
	},
	{ marca: 'Ford', modelo: 'Mustang', year: 2019, precio: 80000, puertas: 2, color: 'Rojo', transmision: 'manual' },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2017,
		precio: 40000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ marca: 'Audi', modelo: 'A3', year: 2017, precio: 55000, puertas: 2, color: 'Negro', transmision: 'manual' },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2012,
		precio: 25000,
		puertas: 2,
		color: 'Rojo',
		transmision: 'manual'
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2018,
		precio: 45000,
		puertas: 4,
		color: 'Azul',
		transmision: 'automatico'
	},
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2019,
		precio: 90000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ marca: 'Ford', modelo: 'Mustang', year: 2017, precio: 60000, puertas: 2, color: 'Negro', transmision: 'manual' },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2015,
		precio: 35000,
		puertas: 2,
		color: 'Azul',
		transmision: 'automatico'
	},
	{
		marca: 'BMW',
		modelo: 'Serie 3',
		year: 2018,
		precio: 50000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2017,
		precio: 80000,
		puertas: 4,
		color: 'Negro',
		transmision: 'automatico'
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2018,
		precio: 40000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ 	marca: 'Audi', 
		modelo: 'A4', 
		year: 2016, 
		precio: 30000, 
		puertas: 4, 
		color: 'Azul', 
		transmision: 'automatico' 
	}
];

let formulario = document.getElementById('formulario');
let listaAutos = document.getElementById('autos');

document.addEventListener('DOMContentLoaded', () => {
	cargarArray(autos);
});

//Limpia los radio button y vuelve a poner el arreglo con todos los autos
formulario.addEventListener('submit', e => {
	e.preventDefault();

	formulario.reset();
	listaAutos.children[1].remove();
	let div1 = document.createElement('div');
	listaAutos.appendChild(div1);

	autos.forEach((element, index) => {
		
		let div = document.createElement('div');
		listaAutos.children[0].children[0].hidden = false;

		div.innerHTML = ` 
		<div class="row no-gutters" style="border-bottom: 1px solid gray";>
			<div class="col-1">
				<b>${index+1}</b>
			</div>
			<div class="col-10 col-md-5 mb-0 mb-md-3">
				Marca: ${element.marca}<br>
				Modelo: ${element.modelo}<br>
				Año: ${element.year}<br>
				Precio: $${element.precio}<br>
			</div>
			<div class="col-10 col-md-5 ml-3 mr-md-0 mb-3">
				Puertas: ${element.puertas}<br>
				Color: ${element.color}<br>
				Transmisión: ${element.transmision}
			</div>
		</div>
		`;
		div1.appendChild(div);
	});
})

//Hace el filtrado y lo muestra
formulario.addEventListener('input', (e) => {
	e.preventDefault();

	let valorMarca;
	let filterMarca;
	formulario.marcas.forEach(element => {
		if(element.checked){
			valorMarca = element.parentElement.innerText;
			filterMarca = element => element.marca === valorMarca;
		}
	});
	if(valorMarca === undefined){
		filterMarca = element => element.marca;
	}

	let valorModelo;
	let filterModelo;
	formulario.modelos.forEach(element => {
		if(element.checked){
			valorModelo = element.parentElement.innerText;
			filterModelo = element => element.modelo === valorModelo;
		}
	});
	if(valorModelo === undefined){
		filterModelo = element => element.modelo;
	}

	let valorAño;
	let filterAño;
	formulario.años.forEach(element => {
		if(element.checked){
			valorAño = element.parentElement.innerText;
			filterAño = element => element.year == valorAño;
		}
	});
	if(valorAño === undefined){
		filterAño = element => element.year;
	}

	let valorPrecioMin;
	let filterPrecioMin;
	formulario.precioMins.forEach(element => {
		if(element.checked){
			valorPrecioMin = element.parentElement.innerText;
			filterPrecioMin = element => element.precio >= valorPrecioMin;
		}
	});
	if(valorPrecioMin === undefined){
		filterPrecioMin = element => element.precio;
	}

	let valorPrecioMax;
	let filterPrecioMax;
	formulario.precioMaxs.forEach(element => {
		if(element.checked){
			valorPrecioMax = element.parentElement.innerText;
			filterPrecioMax = element => element.precio <= valorPrecioMax;
		}
	});
	if(valorPrecioMax === undefined){
		filterPrecioMax = element => element.precio;
	}

	let valorPuerta;
	let filterPuerta;
	formulario.puertas.forEach(element => {
		if(element.checked){
			valorPuerta = element.parentElement.innerText;
			filterPuerta = element => element.puertas == valorPuerta;
		}
	});
	if(valorPuerta === undefined){
		filterPuerta = element => element.puertas;
	}

	let valorColor;
	let filterColor;
	formulario.colors.forEach(element => {
		if(element.checked){
			valorColor = element.parentElement.innerText;
			filterColor = element => element.color === valorColor;
		}
	});
	if(valorColor === undefined){
		filterColor = element => element.color;
	}

	let valorTransmision;
	let filterTransmision;
	formulario.transmisions.forEach(element => {
		if(element.checked){
			valorTransmision = element.parentElement.innerText;
			filterTransmision = element => element.transmision === valorTransmision;
		}
	});
	if(valorTransmision === undefined){
		filterTransmision = element => element.transmision;
	}

	let filterAutos = autos.filter(filterMarca).filter(filterModelo).filter(filterAño).filter(filterPrecioMin)
		.filter(filterPrecioMax).filter(filterPuerta).filter(filterColor).filter(filterTransmision);

	listaAutos.children[1].remove();
	let div1 = document.createElement('div');
	listaAutos.appendChild(div1);
	
	filterAutos.forEach((element, index) => {
		
		let div = document.createElement('div');
		listaAutos.children[0].children[0].hidden = false;
	
		div.innerHTML = ` 
		<div class="row no-gutters" style="border-bottom: 1px solid gray";>
			<div class="col-1">
				<b>${index+1}</b>
			</div>
			<div class="col-10 col-md-5 mb-3 mb-0 mb-md-3">
				Marca: ${element.marca}<br>
				Modelo: ${element.modelo}<br>
				Año: ${element.year}<br>
				Precio: $${element.precio}<br>
			</div>
			<div class="col-10 col-md-5 ml-3 mr-md-0 mb-3 mb-3">
				Puertas: ${element.puertas}<br>
				Color: ${element.color}<br>
				Transmisión: ${element.transmision}
			</div>
		</div>
		`;
		div1.appendChild(div);
	});
	if(div1.children.length === 0){
		let divAlert = document.createElement('div');
		divAlert.className = 'alert alert-danger m-3';
		divAlert.textContent = 'No se encontraron resultados';
		div1.appendChild(divAlert);
	}
});

//Muestra el arreglo con todos los autos y manda a llamar la función que agrega los radio button
function cargarArray(autos){

	let marcaR = document.getElementById('marca');
	let marcas = autos.map(element => element.marca);
	arreglosSinDuplicados(marcas, marcaR);

	let modeloR = document.getElementById('modelo');
	let modelos = autos.map(element => element.modelo);
	arreglosSinDuplicados(modelos, modeloR);

	let añoR = document.getElementById('año');
	let años = autos.map(element => element.year);
	arreglosSinDuplicados(años, añoR);

	let precioMinR = document.getElementById('precioMin');
	let preciosMin = autos.map(element => element.precio);
	arreglosSinDuplicados(preciosMin, precioMinR);

	let precioMaxR = document.getElementById('precioMax');
	let preciosMax = autos.map(element => element.precio);
	arreglosSinDuplicados(preciosMax, precioMaxR);

	let puertaR = document.getElementById('puerta');
	let puertas = autos.map(element => element.puertas);
	arreglosSinDuplicados(puertas, puertaR);

	let colorR = document.getElementById('color');
	let colores = autos.map(element => element.color);
	arreglosSinDuplicados(colores, colorR);

	let transmisionR = document.getElementById('transmision');
	let transmisiones = autos.map(element => element.transmision);
	arreglosSinDuplicados(transmisiones, transmisionR);

	autos.forEach((element, index) => {
		
		let div = document.createElement('div');
		listaAutos.children[0].children[0].hidden = false;

		div.innerHTML = ` 
		<div class="row no-gutters" style="border-bottom: 1px solid gray";>
			<div class="col-1">
				<b>${index+1}</b>
			</div>
			<div class="col-10 col-md-5 mb-0 mb-md-3">
				Marca: ${element.marca}<br>
				Modelo: ${element.modelo}<br>
				Año: ${element.year}<br>
				Precio: $${element.precio}<br>
			</div>
			<div class="col-10 col-md-5 ml-3 mr-md-0 mb-3">
				Puertas: ${element.puertas}<br>
				Color: ${element.color}<br>
				Transmisión: ${element.transmision}
			</div>
		</div>
		`;
		listaAutos.children[1].appendChild(div);
	});
}

//Hacer esta función me costó bastante :( ---Muestra los radio button

function arreglosSinDuplicados(arreglo, nodeRadio){
	
	for(let i=0; i<arreglo.length; i++){
		for(let j=i+1; j<=arreglo.length; j++){
			if(arreglo[i] === arreglo[j]){
				arreglo.splice(j, 1);
				j--;
				//console.log(marcas);
			}
		}
	}
	arreglo.sort().forEach(element => {
		let div = document.createElement('div');
		div.innerHTML = ` 
		<div class="form-check">
			<label for="">
				<input type="radio" class="form-check-input" name="${nodeRadio.id}s">${element}
			</label>
		</div>
		`;
		nodeRadio.appendChild(div);
	});
}