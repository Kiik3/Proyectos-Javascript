export class UI {
    constructor(){

    }

    agregarCitas(cita){
        let citas = document.getElementById('citas');
        let div = document.createElement('div');

        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <table>
                        <tbody>
                            <tr>
                                <td>Nombre:</td>
                                <td>${cita.duenio}</td>
                            </tr>
                            <tr>
                                <td>Mascota:</td>
                                <td>${cita.mascota}</td>
                            </tr>
                            <tr>
                                <td>Teléfono:</td>
                                <td>${cita.telefono}</td>
                            </tr>
                            <tr>
                                <td>Fecha:</td>
                                <td>${cita.fecha}</td>
                            </tr>
                            <tr>
                                <td>Hora:</td>
                                <td>${cita.hora}</td>
                            </tr>
                            <tr>
                                <td>Síntomas:</td>
                                <td>${cita.sintoma}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-center">
                        <input type="submit" name="" id="${cita.key}" class="btn btn-danger mt-3" value="Eliminar">
                    </div>
                </div>
            </div>
            `;
        citas.appendChild(div);
    }

    validacionInput(input){
        input.addEventListener('blur', () => {
            if(input.value.trim() === ''){
                input.style.borderColor = 'red';
            }
            else{
                input.style.borderColor = 'green';
            }
        });
    }

    validacionSubmit(dueño, mascota, telefono, fecha, hora, sintoma, boton){
        if(dueño.value.trim() === '' || mascota.value.trim() === '' || telefono.value.trim() === '' || 
            fecha.value.trim() === '' || hora.value.trim() === '' || sintoma.value.trim() === ''){
                boton.disabled = true;
            }
        else{
            boton.disabled = false;
        }
    }
}