import {Cita} from './cita.js';
import {UI} from './ui.js';

const formulario = document.getElementById('formulario');
const dueño = document.getElementById('dueño');
const mascota = document.getElementById('mascota');
const telefono = document.getElementById('telefono');
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora');
const sintoma = document.getElementById('sintomas');
const boton = document.getElementById('boton');

let citas = document.getElementById('citas');

//Globales
let DB;

document.addEventListener('DOMContentLoaded', () => {

    //Habilitar-deshabilitar boton agregar
    ui.validacionSubmit(dueño, mascota, telefono, fecha, hora, sintoma, boton);

    //Creando la DB, el '1' es la versión
    let crearDB = window.indexedDB.open('Cita', 1);

    //Función que verifica si se ha creado satisfactoriamente, tiene que ser igual a un callback (function())
    crearDB.onsuccess = function(){
        console.log('exito');
        DB = crearDB.result;
        
        //Trayendo los datos de la db
        let transaccion = DB.transaction('cita', 'readonly');
        let objectStore = transaccion.objectStore('cita');

        //Cursor es para recorrer todos los registros
        objectStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;

            if(cursor){
                let ui = new UI();
                ui.agregarCitas(cursor.value);

                cursor.continue(); //sin .continue() solo traería el primer registro
            }
        }
    }

    //Verifica si hay error
    crearDB.onerror = function(){
        console.log('error');
    }

    crearDB.onupgradeneeded = function(e) {
        console.log(e.target.result);

        //Pasa a db la base de datos existente
        let db = e.target.result;

        //Se tiene que crear un objectStore dentro de la base de datos
        let objectStore = db.createObjectStore('cita', {keyPath: 'key', autoIncrement: true});

        //Se crean los indices de la tabla 'cita' dentro del objectStore
        objectStore.createIndex('duenio', 'duenio');
        objectStore.createIndex('mascota', 'mascota');
        objectStore.createIndex('telefono', 'telefono');
        objectStore.createIndex('fecha', 'fecha');
        objectStore.createIndex('hora', 'hora');
        objectStore.createIndex('sintoma', 'sintoma');
    }
    //let transaccion = DB.transaction('cita', 'readwrite');
    //let objectStore = DB.objectStore('cita');
    //let get = crearDB.objectStore.get();
    console.log(DB);
});

//Agregar una cita
formulario.addEventListener('submit', e => {
    e.preventDefault();

    let cita = new Cita(dueño.value, mascota.value, telefono.value, fecha.value, hora.value, sintoma.value);
    let ui = new UI();
    ui.agregarCitas(cita);

    //Agregando cada registro a la db, con solo pasar el objeto se agrega cada valor en su indice correspondiente
    //Esto debido a que al crear el indice se le pone un key, entonces el objeto al tener un key tambien, lo busca
    //y coloca el valor
    let transaccion = DB.transaction('cita', 'readwrite');
    let objectStore = transaccion.objectStore('cita');
    let add = objectStore.add(cita);

    add.onsuccess = function() {
        formulario.reset();
        ui.validacionSubmit(dueño, mascota, telefono, fecha, hora, sintoma, boton);
        console.log('Introducido');
    }

    console.log(cita);

});

//Elimnar una cita
citas.addEventListener('click', e => {
    e.preventDefault();

    let elemento = e.target;
    if(elemento.className === 'btn btn-danger mt-3'){
        elemento.parentElement.parentElement.remove();
        console.log(e.target);

        //Obtenemos la db cita y su objeto (tabla) cita
        let transaccion = DB.transaction('cita', 'readwrite');
        let objectStore = transaccion.objectStore('cita');
        
        objectStore.delete(Number(elemento.id)); //el parametro es el key del elemento a borrar
            
    }
    console.log(e.target);
});

//Validar campos
let ui = new UI();
ui.validacionInput(dueño);
ui.validacionInput(mascota);
ui.validacionInput(telefono);
ui.validacionInput(fecha);
ui.validacionInput(hora);
ui.validacionInput(sintoma);

//Habilitar-deshabilitar boton agregar
formulario.addEventListener('input', () => {
    ui.validacionSubmit(dueño, mascota, telefono, fecha, hora, sintoma, boton);
})


