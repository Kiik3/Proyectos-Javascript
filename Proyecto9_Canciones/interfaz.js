export class UI {
    constructor(){

    }
    validacionInput(input){
        if(input.value.trim() === ''){
            input.style.borderColor = 'red';
        }
        else{
            input.style.borderColor = 'green';
        }
    }
    validacionBoton(artista, cancion, boton){
        if(artista.value.trim() === '' || cancion.value.trim() === ''){
            boton.disabled = true;
        }
        else{
            boton.disabled = false;
        }
    }
    domLoaded(boton){
        boton.disabled = true;
    }

    agregarLetra(cancion){
        let parent = document.getElementsByClassName('shadow');
        let div = document.createElement('div');
        console.log(cancion);

        div.textContent = cancion.lyrics;
        parent.appendChild(div);
    }
}