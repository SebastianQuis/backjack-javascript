/*
    2E = DOS DE ESPADAS
    2T = DOS DE TREBOL
    2C = DOS DE CORAZONES
    2D = DOS DE DIAMANTES
*/

const miModulo = (() => {
    'use strict';

    let cartas     = [];
    var tipos      = ['E','T','C','D',], // ESPADAS - TREBOL - CORAZONES - DIAMANTES
        especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    // REFERENCIA AL HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartas');

    const init = ( num = 2 ) => {
        cartas = crearCartas();

        puntosJugadores = [];
        for (let i = 0; i < num; i++) {
            puntosJugadores.push(0); // agregando puntaje 0
            puntosHTML[i].innerText = 0;
            divCartasJugadores[i].innerHTML = '';
        }

        btnPedir.disabled   = false; // activando los botones
        btnDetener.disabled = false;
    }

    const crearCartas = () => {
        cartas = [];
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

        return _.shuffle(cartas); // CARTAS BARAJEADAS
    };

    const pedirCarta = () => (cartas.length === 0) ? 'No hay carta en la baraja' : cartas.pop(); // retornando carta escogida

    const valorCarta = ( carta ) => {
        // const valor = carta.substring(0, carta.length - 1); // 2 = 2 | 10 = 10
        const valor = carta.slice(0,-1);
        return ( isNaN( valor ) ) // no es un number?
            ? ( valor === 'A') ? 11 : 10 // A es 11, los demas son 10 - J Q K
            : valor * 1; // valor*1 para que sea un number 
    };

    // TURNO: 0 = primero jugador y el ultimo será la computadora
    const acumularPuntos = ( turno, carta ) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCartaImg = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src   = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );

        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana');
            } else if ( puntosComputadora > 21 ) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 20);
    }

    const turnoComputadora = ( puntosMinimos ) => { // puntosMinimos = puntosJugador
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( puntosJugadores.length -1, carta);
            crearCartaImg( carta, puntosJugadores.length -1);

        } while ( puntosComputadora < puntosMinimos && puntosMinimos <= 21 );        
        
        determinarGanador();
    }

    btnPedir.addEventListener( 'click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( 0, carta );
        crearCartaImg( carta, 0);

        if ( puntosJugador > 21 ) {
            console.warn('Perdiste jugador!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if ( puntosJugador == 21 ) {
            console.warn('Llegaste a 21, genial!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } 
    });
    
    btnDetener.addEventListener( 'click', ( ) => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        
        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevo.addEventListener('click', () => {
        init();
    });

    return { // para acceder desde html
        nuevoJuego: init,
    }; 

})();