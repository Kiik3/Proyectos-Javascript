import {UI} from './interfaz.js';
import {API} from './api.js';

let ui = new UI();
let api = new API();

let formulario = document.getElementById('formulario');
let artista = document.getElementById('artista');
let cancion = document.getElementById('cancion');
let buscar = document.getElementById('buscar');

//Cargando DOM
document.addEventListener('DOMContentLoaded', () => {
    ui.domLoaded(buscar);
});

//Eventos
artista.addEventListener('blur', () => {
    ui.validacionInput(artista);
});

cancion.addEventListener('blur', () => {
    ui.validacionInput(cancion);

});

formulario.addEventListener('input', () => {
    ui.validacionBoton(artista, cancion, buscar);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    api.consumirApi(artista.value, cancion.value);
    //ui.agregarLetra(objetoCancion);
})


