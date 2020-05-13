 export class API {
    constructor(){

    }
    consumirApi(artista, cancion){
        let xhr = new XMLHttpRequest();

        xhr.open('GET', `https://api.lyrics.ovh/v1/${artista}/${cancion}`, true);

        xhr.onload = function() {
            let parent = document.getElementsByClassName('shadow')[0];
            let div = document.createElement('div');

            let mayusArtista = artista.substring(0, 1).toUpperCase();
            let minusArtista = artista.substring(1);
            let artistaOk = mayusArtista.concat(minusArtista);

            let mayusCancion = cancion.substring(0, 1).toUpperCase();
            let minusCancion = cancion.substring(1);
            let cancionOk = mayusCancion.concat(minusCancion);

            if(this.status === 200){
                let objeto = JSON.parse(this.responseText);

                if(parent.children[1].classList.contains('alert')){
                    parent.children[1].remove();
                }
                if(parent.children[2] !== undefined){
                    parent.children[2].remove();
                }
                let letra = objeto.lyrics.replace(/\n/g, '<br>');
                div.innerHTML = `
                <h3>
                    ${artistaOk}<br>
                    <p>${cancionOk}</p>
                    </h3>
                    ${letra}`;

                div.className = 'text-center mt-5 pb-5 mt-md-0';

                parent.appendChild(div);
            }

            else{
                if(parent.children[1].classList.contains('alert')){
                    parent.children[1].remove();
                }
                if(parent.children[2] !== undefined){
                    parent.children[2].remove();
                }

                div.innerHTML = 'No se ha encontrado la letra';

                div.className = 'text-center m-3 alert alert-danger';

                parent.appendChild(div);
                parent.insertBefore(div, parent.children[1]);
            }
        };
        
        xhr.send();
    }
}