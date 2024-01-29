let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 0;

document.querySelector('#btn-comenzar').onclick = function(){
    desactivarBotonComenzar();
    manejarRonda();
}

function manejarRonda(){
    actualizarMensaje('Turno de la maquina');
    secuenciaJugador = [];
    ronda++;
    actualizarRonda(ronda);
    secuenciaMaquina.push(obtenerNuevaCelda());
    mostrarSecuenciaMaquina();
    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length+1)*1000
    setTimeout(function(){
        actualizarMensaje('Turno del Jugador');
        activarInputJugador();
    }, RETRASO_TURNO_JUGADOR);
}

function mostrarSecuenciaMaquina(){
    for (let i = 0; i < secuenciaMaquina.length; i++) {
        const RETRASO_RESALTAR_CELDA = 1000*(i+1);
        setTimeout(function(){
            resaltarCelda(secuenciaMaquina[i])
        }, RETRASO_RESALTAR_CELDA);
    }
}

function manejarInputJugador(event){
    let celda = event.target;
    resaltarCelda(celda);
    secuenciaJugador.push(celda);
    if(celda.id !== secuenciaMaquina[secuenciaJugador.length-1].id){
        actualizarMensaje('Fin del juego', true);
        desactivarInputJugador();
        setTimeout(function(){
            reiniciarJuego();
        }, 2000);
        return;
    }
    if(secuenciaJugador.length === secuenciaMaquina.length){
        desactivarInputJugador();
        setTimeout(function(){
            manejarRonda();
        }, 1000);
    }
}

function reiniciarJuego(){
    actualizarMensaje("Presiona 'Comenzar' para jugar");
    actualizarRonda('-');
    resetearDatos();
    activarBotonComenzar();
}

function resetearDatos(){
    secuenciaMaquina = [];
    secuenciaJugador = [];
    ronda = 0;
}

function actualizarMensaje(texto, error=false){
    let mensaje = document.querySelector('#mensaje');
    mensaje.textContent = texto;
    if(error){
        mensaje.classList.remove('alert-primary');
        mensaje.classList.add('alert-danger');
    }else{
        mensaje.classList.remove('alert-danger');
        mensaje.classList.add('alert-primary');
    }
}

function desactivarInputJugador(){
    let celdas = document.querySelectorAll('.celda');
    celdas.forEach(celda => {
        celda.onclick = ()=>{};
    });
}

function activarInputJugador(){
    let celdas = document.querySelectorAll('.celda');
    celdas.forEach(celda => {
        celda.onclick = manejarInputJugador;
    });
}

function obtenerNuevaCelda(){
    let numeroCelda = Math.round(Math.random()*3)+1;
    return document.querySelector(`#celda-${numeroCelda}`);
}

function resaltarCelda(celda){
    celda.style.opacity = 1;
    celda.style.border = '1px solid black'
    setTimeout(function(){
        celda.style.opacity = 0.5
        celda.style.border = 'none';
    }, 500)
}

function actualizarRonda(numeroRonda){
    document.querySelector('#ronda').textContent = numeroRonda.toString();
}

function desactivarBotonComenzar(){
    document.querySelector('#btn-comenzar').disabled = true;
}

function activarBotonComenzar(){
    document.querySelector('#btn-comenzar').disabled = '';
}
