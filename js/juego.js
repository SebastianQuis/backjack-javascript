
/*
    2E = DOS DE ESPADAS
    2T = DOS DE TREBOL
    2C = DOS DE CORAZONES
    2D = DOS DE DIAMANTES
*/

let cartas     = [];
var tipos      = ['E','T','C','D',]; // ESPADAS - TREBOL - CORAZONES - DIAMANTES
var especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// REFERENCIA AL HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const smalls = document.querySelectorAll('small');

const divJugadorCartas     = document.querySelector('#jugador-cartas');
const divComputadoraCartas = document.querySelector('#computadora-cartas');

const crearCartas = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            cartas.push( i + tipo); // 2E, 2T, 2C, 2D..
        }
    }
    
    for (let especial of especiales) {
        for (let tipo of tipos) {
            cartas.push( especial + tipo );
        }
    }

    cartas = _.shuffle(cartas); // BARAJEAR CARTAS
    // console.log(cartas);
    
    return cartas;
};

crearCartas();

const pedirCarta = () => {
    if (cartas.length === 0) {
        throw 'No hay carta en la baraja';
    }

    const carta = cartas.pop();
    // console.log(carta);
    return carta;
}

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1); // 2 = 2 | 10 = 10

    return ( isNaN( valor ) ) // is not a number => return bool
        ? ( valor === 'A') ? 11 : 10 // A es 11, los demas son 10 - J Q K
        : valor * 1;
};

const turnoComputadora = () => {
    do {
        const carta = pedirCarta();
    
        puntosComputadora += valorCarta(carta);
        smalls[1].innerText = puntosComputadora;

        // <img class="carta" src="assets/cartas/5C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src =  `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );

        divComputadoraCartas.append(imgCarta);
        
        if (puntosJugador > 21) {
            break;
        }

    } while ( puntosComputadora < puntosJugador && puntosJugador <= 21 );

    setTimeout(() => {
        if (puntosComputadora === puntosJugador) {
            alert('Nadie gana');
        } else if ( puntosJugador > 21 ) {
            alert('Computadora gana');
        } else if ( puntosComputadora > 21 ) {
            alert('Jugador gana');
        } else {
            alert('Computadora gana');
        }
    }, 20);
    
}

btnDetener.addEventListener( 'click', ( ) => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
    turnoComputadora();
    
});

btnPedir.addEventListener( 'click', () => {
    const carta = pedirCarta();
    
    puntosJugador += valorCarta(carta);
    smalls[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src =  `assets/cartas/${ carta }.png`;
    imgCarta.classList.add( 'carta' );

    divJugadorCartas.append(imgCarta);

    if ( puntosJugador > 21 ) {
        console.warn('Perdiste jugador!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();
    } else if ( puntosJugador == 21 ) {
        console.warn('Llegaste a 21, genial!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();
    } 
});

btnNuevo.addEventListener('click', () => {
    cartas = [];
    cartas = crearCartas();

    smalls[0].innerText = 0;
    smalls[1].innerText = 0;

    puntosJugador     = 0;
    puntosComputadora = 0;

    divJugadorCartas.innerHTML     = '';
    divComputadoraCartas.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
});