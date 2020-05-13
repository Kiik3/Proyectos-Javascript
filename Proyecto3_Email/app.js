document.addEventListener('DOMContentLoaded', inhabilitado);

let para = document.getElementById('para');
let asunto = document.getElementById('asunto');
let mensaje = document.getElementById('mensaje');
let enviar = document.getElementById('enviar');
let reset = document.getElementById('reset');
let spinner = document.getElementById('spinner');
let email = document.getElementById('email');

document.addEventListener('input', habilitado);
para.addEventListener('blur', validacionEmail);
asunto.addEventListener('blur', asuntoValidacion);
mensaje.addEventListener('blur', mensajeValidacion);
reset.addEventListener('click', limpiar);

enviar.addEventListener('click', cargarSpinner);

function inhabilitado(){
	enviar.disabled = true;
}

function habilitado(e){
	e.preventDefault();

	if(para.value.trim() != '' && para.value.indexOf('@') !== -1 && asunto.value.trim() != '' && mensaje.value.trim() != ''){
		enviar.disabled = false;
	}
	else{
		enviar.disabled = true;
	}
}

function cargarSpinner(e){
	e.preventDefault();
	spinner.className = 'spinner-border mt-4 mb-4 text-dark';
	setTimeout(function(){
		spinner.className = '';
		cargarEmail();
	}, 2000)
}

function cargarEmail(){
	email.src = 'mail.gif';
	setTimeout(function(){
		email.src = '';
	}, 3000)
}

function validacionEmail(){

	if (para.value.trim() === '' || para.value.indexOf('@') === -1) {
		para.style.borderColor = 'red';
		para.style.borderBottomWidth = '3px';
	}
	else{
		para.style.borderColor = 'green';
		para.style.borderBottomWidth = '3px';
	}
}

function asuntoValidacion(){
	textoValidacion(asunto);
}

function mensajeValidacion(){
	textoValidacion(mensaje);
}

function textoValidacion(campo){

	if (campo.value.trim() === '') {
		campo.style.borderColor = 'red';
		campo.style.borderBottomWidth = '3px';
	}
	else{
		campo.style.borderColor = 'green';
		campo.style.borderBottomWidth = '3px';
	}
}

function limpiar(e){
	e.preventDefault();

	let campos = document.getElementsByClassName('form-control');

	for(i=0; i<campos.length; i++){
		campos[i].value = '';
	}
}