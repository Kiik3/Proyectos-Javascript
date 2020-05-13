let marker = [];
class UI {
    constructor(){
        this.mapa = this.inicializarMapa();
    }
    inicializarMapa(){
        var map = L.map('map').setView([19.4284706, -99.1276627], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        
        let gasolineras = api();

        gasolineras.then(data => {
            data.results.forEach((element, index) => {
                marker.push(L.marker([element.latitude, element.longitude]).addTo(map)
                .bindPopup(`<p>Gasolinera: ${element.razonsocial}</p>
                            <p>Calle: ${element.calle}</p>`));
            })
        })
        .catch(error => console.log(error));
            
        return map;
    }
}

let ui = new UI();


//consumiendo API
async function api(){
    let fet = await fetch('https://api.datos.gob.mx/v1/precio.gasolina.publico');
    let datos = fet.json();

    return datos;
}
let buscador = document.getElementById('buscador');
let buscar = document.getElementById('buscar');
function buscadorGasolinera(mapa){
    
    let busqueda = buscador.value;
    let gasolineras = api();

    gasolineras.then(data => {
        
        marker.forEach((element, index) => {
            mapa.removeLayer(element);
        });

        data.results.forEach((element, index) => {
            if(element.calle.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(busqueda) || 
                element.razonsocial.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(busqueda)){

                    marker.push(L.marker([element.latitude, element.longitude]).addTo(mapa)
                        .bindPopup(`<p>Gasolinera: ${element.razonsocial}</p>
                                    <p>Calle: ${element.calle}</p>`));
                }
        });
    })
    .catch(error => console.log(error));
}


buscar.addEventListener('click', () => {
    //let ui = new UI();
    buscadorGasolinera(ui.mapa);

})

