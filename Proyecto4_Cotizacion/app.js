//Estilo
let cotizar = document.querySelector('#cotizar');

cotizar.addEventListener('mouseenter', cambiarColor);
cotizar.addEventListener('mouseleave', colorOriginal);

function cambiarColor(){
	cotizar.style.backgroundColor = '#6D03E7';
}

function colorOriginal(){
	cotizar.style.backgroundColor = '#8D03E7';
}

//Funcionalidad
function Cotizacion(region, año, tipo){
	this.region = region;
	this.año = año;
	this.tipo = tipo;
}

//metodo de clase Cotizacion con prototype
Cotizacion.prototype.calculo = function(){
	let precioRegion;
	let precioTipo;
	let añoActual = new Date().getFullYear();

	//calculo de precio por region
	switch (this.region) {
		case 'Americano':
			precioRegion = 1000;
			break;
		case 'Europeo':
			precioRegion = 1100;
			break;
		case 'Asiático':
			precioRegion = 900;	
		}

	//calculo de precio por tipo
	if (this.tipo === 'Completo') {
		precioTipo = 500;
	}
	else{
		precioTipo = 300;
	}

	//calculo de precio por año
	num = añoActual-this.año;
		
	//calculo total cotizacion
	let descuento = (precioRegion + precioTipo) * (0.03*num);
	let total = precioRegion + precioTipo - descuento;

	return total.toFixed(2);
};

document.addEventListener('DOMContentLoaded', deshabilitado);
document.addEventListener('DOMContentLoaded', años);
document.addEventListener('input', validacion);

let formulario = document.getElementById('formulario');
let region = document.getElementById('region');
let año = document.getElementById('año');
let tipo = document.getElementById('tipo');

formulario.addEventListener('submit', agregarCotizacion);
formulario.addEventListener('submit', validacion);

function agregarCotizacion(e){
	e.preventDefault();

	//Obteniendo valores
	let valorRegion = region.options[region.selectedIndex].textContent;
	let valorAño = año.options[año.selectedIndex].textContent;
	let valorTipo;

	formulario.radio.forEach(function(element, index){
		if(element.checked === true){
			valorTipo = element.labels[0].innerText;
		}
	});

	//instanciando cotizacion
	let cotizacion = new Cotizacion(valorRegion, valorAño, valorTipo);

	//trayendo calculo de total de cotizacion
	let total = cotizacion.calculo();

	//Agregando en pantalla
	let table = document.getElementsByTagName('table')[0];

	let tbody = document.createElement('tbody');
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	let div1 = document.createElement('div');
	let div2 = document.createElement('div');
	let div3 = document.createElement('div');
	let div4 = document.createElement('div');

	div1.innerHTML = `<b>Región:</b> ${cotizacion.region}`;
	div2.innerHTML = `<b>Año:</b> ${cotizacion.año}`;
	div3.innerHTML = `<b>Tipo:</b> ${cotizacion.tipo}`;
	div4.innerHTML = `<b>Total Seguro:</b> $${total}`;

	if(table.children[1]){
		table.children[1].remove();
		table.hidden = true;
	}

	load(table);

	table.appendChild(tbody);
	tbody.appendChild(tr);
	tr.appendChild(td);
	td.appendChild(div1);
	td.appendChild(div2);
	td.appendChild(div3);
	td.appendChild(div4);

	formulario.reset();
}

function validacion(e){
	e.preventDefault();

	if(formulario.radio.value === ''){
		cotizar.disabled = true;
		cotizar.style.opacity = 0.5;
	}
	else{
		cotizar.disabled = false;
		cotizar.style.opacity = 1;
	}
}

function deshabilitado(){
	cotizar.disabled = true;
	cotizar.style.opacity = 0.5;
}

function años(){
	let añoActual = new Date().getFullYear();

	for(i=0; i<20; i++){
		let option = document.createElement('option');

		option.textContent = añoActual-i;
		año.appendChild(option);
	}
}

function load(table){
	let carga = document.getElementsByTagName('img')[0].parentElement;
	carga.hidden = false;

	setTimeout(function(){
		carga.hidden = true;
		table.hidden = false;
	}, 2000)
}