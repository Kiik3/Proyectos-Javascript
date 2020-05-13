let contenido = document.getElementById('contenido');
let formulario = document.getElementById('formulario');
let moneda = document.getElementById('moneda');
let monedas = document.getElementById('monedas');
let criptomoneda = document.getElementById('criptomoneda');
let criptomonedas = document.getElementById('criptomonedas');
let cotizar = document.getElementById('cotizar');
let tabla = document.getElementById('tabla');

document.addEventListener('DOMContentLoaded', traerDatos);

moneda.addEventListener('blur', () => {
    if(moneda.value.trim() === ''){
        moneda.className = 'selectVacio p-2';
    }
    else{
        moneda.className = 'selectLleno p-2';
    }
})

criptomoneda.addEventListener('blur', () => {
    if(criptomoneda.value.trim() === ''){
        criptomoneda.className = 'selectVacio p-2';
    }
    else{
        criptomoneda.className = 'selectLleno p-2';
    }
})

cotizar.addEventListener('click', e => {
    e.preventDefault();

    if(moneda.value.trim() === '' || criptomoneda.value.trim() === ''){

        if(document.getElementsByClassName('alert')[0] !== undefined){
            document.getElementsByClassName('alert')[0].remove();
        }
        let div = document.createElement('div');
        div.className = 'alert alert-danger';
        div.textContent = 'Llenar Campos faltantes';
        contenido.insertBefore(div, formulario);
    }
    else{

        if(document.getElementsByClassName('alert')[0] !== undefined){
            document.getElementsByClassName('alert')[0].remove();
        }

        let div = document.createElement('div');
        div.className = 'alert alert-success';
        div.textContent = 'Cargando...';
        contenido.insertBefore(div, formulario);

        setTimeout(() => document.getElementsByClassName('alert')[0].remove(), 2000);

        calculoCotizacion(criptomoneda.value, moneda.value);
    }
})

async function traerDatos(){
    let fet = await fetch('https://min-api.cryptocompare.com/data/all/coinlist');
    let data = await fet.json();

    for(ele in data.Data){
        let option = document.createElement('option');
        option.textContent = data.Data[ele].CoinName;
        option.value = data.Data[ele].Symbol;
        criptomonedas.appendChild(option);
    }
}

//Otra forma de traerDatos, pero con Promesas !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function traerDatosPromise(){
    fetch('https://min-api.cryptocompare.com/data/all/coinlist')
        .then(respuesta => respuesta.json())
        .then(data => {

            for(ele in data.Data){
                let option = document.createElement('option');
                option.textContent = data.Data[ele].CoinName;
                option.value = data.Data[ele].Symbol;
                criptomonedas.appendChild(option);
            }
        })
        .catch(error => console.log(error));
}

function calculoCotizacion(cripto, moneda){

    let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {

            if(data.Response === 'Error'){
                let div = document.createElement('div');
                div.className = 'alert alert-danger';
                div.textContent = 'Escoger una moneda y criptomoneda válida';
                setTimeout(() => contenido.insertBefore(div, formulario), 2000);
                

                if(tabla.children !== undefined){
                    tabla.children[0].remove();
                    tabla.children[0].remove();
                }
            }
            
            else{
                let precio;
                let datosCriptomoneda;
                let ultimaActualizacion;

                for(ele in data.RAW){
                    datosCriptomoneda = data.RAW[ele];
                    for(ele in datosCriptomoneda){
                        console.log(datosCriptomoneda[ele]);
                        precio = datosCriptomoneda[ele].PRICE;
                        ultimaActualizacion = new Date(datosCriptomoneda[ele].LASTUPDATE * 1000).toLocaleDateString('es-MX');
                        
                    }
                }

                setTimeout(() => {
                tabla.innerHTML = `
                    <thead>
                        <th>Resumen</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>El precio de criptomoneda ${cripto} a moneda ${moneda} es de:</td>
                        </tr>
                        <tr>
                            <td>${precio}</td>
                        </tr>
                        <tr>
                            <td>Última actualización: ${ultimaActualizacion}</td>
                        </tr>
                    </tbody>`;
                }, 2000);
            }
        })
        .catch(error => console.log(error));
        
}

function validacion(){
    if(moneda.value.trim() === ''){
        moneda.classList.add('selectVacio');
        criptomoneda.classList.add('selectVacio');
    }
    else{
        moneda.classList.add('selectLleno');
        criptomoneda.classList.add('selectLleno');
    }
}