let pantallaP = document.getElementById('pantallaPresupuesto');
let pantallaG = document.getElementById('pantallaGasto');
let ingresar = document.getElementById('ingresar');
let formulario = document.getElementById('formulario');
let nombreGasto = document.getElementById('gasto');
let cantidad = document.getElementById('cantidad');
let eliminar = document.getElementById('eliminar');

document.addEventListener('DOMContentLoaded', validarPresupuesto);
ingresar.addEventListener('click', ingresarPresupuesto);
formulario.addEventListener('submit', ingresarGasto);
eliminar.addEventListener('click', eliminarPresupuesto);

nombreGasto.addEventListener('blur', function(){
	if (nombreGasto.value.trim() === '') {
		nombreGasto.style.borderColor = 'red';
		nombreGasto.style.borderBottomColor = 'red';
		nombreGasto.style.borderBottomWidth = '2px';
	}
	else{
		nombreGasto.style.borderColor = 'green';
		nombreGasto.style.borderBottomColor = 'green';
		nombreGasto.style.borderBottomWidth = '2px';
	}
});

cantidad.addEventListener('blur', function(){
	if (cantidad.value.trim() === '') {
		cantidad.style.borderColor = 'red';
		cantidad.style.borderBottomColor = 'red';
		cantidad.style.borderBottomWidth = '2px';
	}
	else{
		cantidad.style.borderColor = 'green';
		cantidad.style.borderBottomColor = 'green';
		cantidad.style.borderBottomWidth = '2px';
	}
})


class Gasto{
	constructor(nombre, precio){
		this.nombre = nombre;
		this.precio = precio;
	}
}

function validarPresupuesto(){
	let presupuesto = obtenerPresupuestoLocalStorage();

	if (presupuesto !== null) {
		pantallaG.hidden = false;
		pantallaP.hidden = true;

		let table = document.getElementsByTagName('table')[0];

		let div1 = document.createElement('div');
		let div2 = document.createElement('div');
		let div3 = document.createElement('div');
		

		div1.innerHTML = `<div id="pre" class="alert alert-success">Presupuesto: $${presupuesto}</div>`;

		let gastos = obtenerGastoLocalStorage();
		let sumaGastos = 0;

		if (gastos !== null) {
			gastos.forEach(function(element, index){
			sumaGastos += Number(element.precio);

			let tr = document.createElement('tr');
			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			let tbody = document.createElement('tbody');

			td1.textContent = element.nombre;
			td2.textContent = '$' + element.precio;
			tr.appendChild(td1);
			tr.appendChild(td2);
			tbody.appendChild(tr);
			table.appendChild(tbody);
		});
		}
		
		let restante = presupuesto - sumaGastos;
		div2.innerHTML = `<div id="restante" class="alert ${cambioColor(presupuesto, restante)}">Restante: $${restante}</div>`;

		listado.appendChild(div1);
		listado.appendChild(div2);
	}
	else{
		pantallaG.hidden = true;
		pantallaP.hidden = false;
	}
}

function ingresarPresupuesto(e){
	e.preventDefault();

	let presupuesto = document.getElementById('presupuesto');
	let listado = document.getElementById('listado');

	if (presupuesto.value.trim() === '') {
		presupuesto.style.borderColor = 'red';
		presupuesto.style.borderBottomColor = 'red';
		presupuesto.style.borderBottomWidth = '2px';
	}
	else{
		pantallaP.hidden = true;
		pantallaG.hidden = false;

		let div = document.createElement('div');
		div.innerHTML = `<div id="pre" class="alert alert-success">Presupuesto: $${presupuesto.value}</div>`;
		listado.appendChild(div);

		agregarPresupuestoLocalStorage(presupuesto.value);
		presupuesto.value = '';
	}
}

function eliminarPresupuesto(e){
	e.preventDefault();

	let resAnterior = document.getElementById('restante');
	let presupuesto = document.getElementById('pre');
	let tbody = document.getElementsByTagName('tbody')[0];

	localStorage.removeItem('presupuesto');
	localStorage.removeItem('gastos');

	presupuesto.remove();
	if(resAnterior !== null){
		resAnterior.remove();
		
	}
	if (tbody !== undefined) {
		tbody.remove();
	}

	pantallaG.hidden = true;
	pantallaP.hidden = false;
}

function agregarPresupuestoLocalStorage(presupuesto){
	localStorage.setItem('presupuesto', presupuesto);
}

function obtenerPresupuestoLocalStorage(){
	return localStorage.getItem('presupuesto', presupuesto);
}

function agregarGastoLocalStorage(gasto){
	let gastos = obtenerGastoLocalStorage();
	let arreglo = [gasto];

	if (gastos === null) {
		localStorage.setItem('gastos', JSON.stringify(arreglo));
	}
	else{
		gastos.push(gasto);
		localStorage.setItem('gastos', JSON.stringify(gastos));
	}
}

function obtenerGastoLocalStorage(){
	return JSON.parse(localStorage.getItem('gastos', presupuesto));
}

function ingresarGasto(e){
	e.preventDefault();

	let listado = document.getElementById('listado');
	let presupuesto = obtenerPresupuestoLocalStorage();
	let nombreGasto = document.getElementById('gasto');
	let cantidad = document.getElementById('cantidad');
	let table = document.getElementsByTagName('table')[0];
	let resAnterior = document.getElementById('restante');

	let gasto = new Gasto(nombreGasto.value, cantidad.value);

	let divRestante = document.createElement('div');

	let tbody = document.createElement('tbody');
	let tr = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');

	if (nombreGasto.value.trim() !== '' && cantidad.value.trim() !== '') {
		td1.textContent = gasto.nombre;
		td2.textContent = '$' + gasto.precio;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tbody.appendChild(tr);
		table.appendChild(tbody);

		if (resAnterior !== null) {
			let restante = resAnterior.textContent;
			let restanteValor = restante.substring(restante.indexOf('$')+1);

			let restanteFinal = Number(restanteValor) - gasto.precio;
			console.log(restanteFinal);
			resAnterior.remove();
			divRestante.innerHTML = `<div id="restante" class="alert ${cambioColor(presupuesto, restanteFinal)}">
				Restante: $${restanteFinal}
			</div>`;
		}
		else{
			let restanteFinal = presupuesto - gasto.precio;
			divRestante.innerHTML = `<div id="restante" class="alert ${cambioColor(presupuesto, restanteFinal)}">
				Restante: $${restanteFinal}
			</div>`;
	}

	listado.appendChild(divRestante);
	formulario.reset();

	agregarGastoLocalStorage(gasto);
	}
	
}

function cambioColor(presupuesto, restanteFinal){
	if (restanteFinal <= (presupuesto * 0.25)) {
		return 'alert-danger';
	}
	else if (restanteFinal <= (presupuesto * 0.5)){
		return 'alert-warning';
	}
	else{
		return 'alert-primary';
	}
}