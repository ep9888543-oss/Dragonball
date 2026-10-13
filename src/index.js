import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from "sweetalert2";
import Acciones from "./Acciones.js";
import { atk_basico, atk_especial, cargar_ki, usar_semilla } from './interfaz.js';

const btn_player1 = document.getElementById("btn_player1");
const btn_player2 = document.getElementById("btn_player2");
const player1 = document.getElementById("py1");
const player2 = document.getElementById("py2");
const nombre1 = document.getElementById("player1");
const nombre2 = document.getElementById("player2");
const nombres = document.getElementById("nombres");
const batalla = document.getElementById("batalla");

// Elementos visuales
const username1 = document.getElementById("username1");
const personaje1 = document.getElementById("personaje1");
const img1 = document.getElementById("img1");

const username2 = document.getElementById("username2");
const personaje2 = document.getElementById("personaje2");
const img2 = document.getElementById("img2");

// Barras
const vida1 = document.getElementById("vida1");
const energia1 = document.getElementById("energia1");
const ki1 = document.getElementById("ki1");

const vida2 = document.getElementById("vida2");
const energia2 = document.getElementById("energia2");
const ki2 = document.getElementById("ki2");

// Contadores de semillas
const semillas1 = document.getElementById("semillas1");
const semillas2 = document.getElementById("semillas2");

// Botones de acción Jugador 1
const btn_atk1 = document.getElementById("atq_basico1");
const btn_esp1 = document.getElementById("atq_esp1");
const btn_ki1 = document.getElementById("cargar_ki1");
const btn_semilla1 = document.getElementById("semilla1");

// Botones de acción Jugador 2
const btn_atk2 = document.getElementById("atq_basico2");
const btn_esp2 = document.getElementById("atq_esp2");
const btn_ki2 = document.getElementById("cargar_ki2");
const btn_semilla2 = document.getElementById("semilla2");

const botones1 = [btn_atk1, btn_esp1, btn_ki1, btn_semilla1];
const botones2 = [btn_atk2, btn_esp2, btn_ki2, btn_semilla2];

let pj1 = "", pj2 = "";
let jugador1, jugador2;
let combate_iniciado = false;
let combate_terminado = false;
let turno = 1;
// Turnos jugados por cada jugador (el ataque especial se habilita desde el 2.º turno)
const turnos_jugados = { 1: 0, 2: 0 };

const msj_error = (msj) => {
    Swal.fire({
        icon: "warning",
        title: "Error!",
        text: msj
    });
};

const actualizar_barra = (barra, valor) => {
    barra.style.width = `${valor}%`;
    barra.innerText = `${valor}%`;
};

const barras = () => {
    if (jugador1) {
        actualizar_barra(vida1, jugador1.getVida());
        actualizar_barra(energia1, jugador1.getEnergia());
        actualizar_barra(ki1, jugador1.getKi());
        semillas1.innerText = jugador1.getSemilla();
    }

    if (jugador2) {
        actualizar_barra(vida2, jugador2.getVida());
        actualizar_barra(energia2, jugador2.getEnergia());
        actualizar_barra(ki2, jugador2.getKi());
        semillas2.innerText = jugador2.getSemilla();
    }
};

// Activa los botones del jugador al que le toca y bloquea los del otro
const asignar_turno = (numero) => {
    turno = numero;
    botones1.forEach((boton) => { boton.disabled = numero !== 1; });
    botones2.forEach((boton) => { boton.disabled = numero !== 2; });

    // El ataque especial queda bloqueado hasta el segundo turno de cada jugador
    if (turnos_jugados[1] < 1) btn_esp1.disabled = true;
    if (turnos_jugados[2] < 1) btn_esp2.disabled = true;
};

const pasar_turno = () => {
    asignar_turno(turno === 1 ? 2 : 1);
};

// Revisa si algún jugador se quedó sin vida y, de ser así, termina el combate
const finalizar_si_corresponde = () => {
    if (jugador1.getVida() > 0 && jugador2.getVida() > 0) return false;

    combate_terminado = true;
    [...botones1, ...botones2].forEach((boton) => { boton.disabled = true; });

    let texto;
    if (jugador1.getVida() <= 0 && jugador2.getVida() <= 0) {
        texto = "¡Empate! Ambos quedaron sin vida";
    } else {
        const ganador = jugador1.getVida() > 0 ? nombre1.value : nombre2.value;
        texto = `${ganador} es el ganador`;
    }

    // Espera a que termine la alerta del ataque (1500 ms)
    setTimeout(() => {
        Swal.fire({
            title: "¡Fin del combate!",
            text: texto,
            icon: "success",
            confirmButtonText: "Jugar de nuevo",
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => location.reload());
    }, 1600);

    return true;
};

// Actualiza las barras, revisa el fin del combate y, si sigue, pasa el turno
const terminar_accion = () => {
    turnos_jugados[turno]++;
    barras();
    if (finalizar_si_corresponde()) return;
    pasar_turno();
};

const cuenta_regresiva = () => {
    let segundos = 3;
    let intervalo;

    return Swal.fire({
        title: "¡El combate comenzará en!",
        html: `<h1 id="contador" style="font-size: 5rem; font-weight: bold; color: #dc3545;">${segundos}</h1>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            const contador = Swal.getHtmlContainer().querySelector("#contador");
            intervalo = setInterval(() => {
                segundos--;
                if (segundos > 0) {
                    contador.textContent = segundos;
                }
            }, 1000);
        },
        willClose: () => clearInterval(intervalo)
    });
};

const iniciar_juego = async () => {
    username1.innerText = nombre1.value;
    personaje1.innerText = pj1;
    img1.src = `./public/img/${pj1}/base.png`;

    username2.innerText = nombre2.value;
    personaje2.innerText = pj2;
    img2.src = `./public/img/${pj2}/base.png`;

    barras();

    // Cuenta regresiva antes de mostrar el área de batalla
    await cuenta_regresiva();

    // Aviso de inicio
    await Swal.fire({
        title: "¡PELEA!",
        icon: "success",
        timer: 800,
        showConfirmButton: false
    });

    // Empieza el jugador 1: los botones del jugador 2 quedan bloqueados
    asignar_turno(1);
    batalla.classList.remove("d-none");
    combate_iniciado = true;
};

const remover_seleccion = (color, ...elementos) => {
    elementos.forEach((elemento) => {
        elemento.classList.remove("bg-warning");
        elemento.classList.add("bg-" + color);
    });
};

const juego_listo = () => {
    // Si el combate ya terminó, no se permite ninguna acción
    if (combate_terminado) return false;
    if (jugador1 && jugador2 && combate_iniciado) return true;
    msj_error("¡El juego no ha comenzado!");
    return false;
};

// Solo letras y números en los nombres
nombre1.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/g, "");
});
nombre2.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/g, "");
});

// Selección de personajes
[...player1.querySelectorAll("img")].forEach((imagen) => {
    imagen.addEventListener("click", (event) => {
        remover_seleccion("danger", ...player1.querySelectorAll("img"));
        event.target.classList.remove("bg-danger");
        event.target.classList.add("bg-warning");
        pj1 = event.target.alt;
    });
});

[...player2.querySelectorAll("img")].forEach((imagen) => {
    imagen.addEventListener("click", (event) => {
        remover_seleccion("primary", ...player2.querySelectorAll("img"));
        event.target.classList.remove("bg-primary");
        event.target.classList.add("bg-warning");
        pj2 = event.target.alt;
    });
});

// Confirmar jugadores
btn_player1.addEventListener("click", () => {
    if (nombre1.value == "") {
        return msj_error("El jugador 1 no ha ingresado un nombre de usuario!");
    } else if (pj1 == "") {
        return msj_error("El jugador 1 debe seleccionar un personaje!");
    }
    jugador1 = new Acciones(nombre1.value, pj1);
    nombre1.disabled = true;
    player1.classList.add("d-none");
    if (jugador1 && jugador2) {
        nombres.classList.add("d-none");
        iniciar_juego();
    }
});

btn_player2.addEventListener("click", () => {
    if (nombre2.value == "") {
        return msj_error("El jugador 2 no ha ingresado un nombre de usuario!");
    } else if (pj2 == "") {
        return msj_error("El jugador 2 debe seleccionar un personaje!");
    }
    jugador2 = new Acciones(nombre2.value, pj2);
    nombre2.disabled = true;
    player2.classList.add("d-none");
    if (jugador1 && jugador2) {
        nombres.classList.add("d-none");
        iniciar_juego();
    }
});

// --- ACCIONES JUGADOR 1 ---
btn_atk1.addEventListener("click", () => {
    if (!juego_listo()) return;
    atk_basico(jugador1, jugador2);
    terminar_accion();
});

btn_esp1.addEventListener("click", () => {
    if (!juego_listo()) return;
    if (!atk_especial(jugador1, jugador2)) {
        return msj_error("No tienes suficiente Ki o Energía para el ataque especial");
    }
    terminar_accion();
});

btn_ki1.addEventListener("click", () => {
    if (!juego_listo()) return;
    cargar_ki(jugador1);
    terminar_accion();
});

btn_semilla1.addEventListener("click", () => {
    if (!juego_listo()) return;
    if (!usar_semilla(jugador1)) {
        return msj_error("¡No te quedan semillas del ermitaño!");
    }
    terminar_accion();
});

// --- ACCIONES JUGADOR 2 ---
btn_atk2.addEventListener("click", () => {
    if (!juego_listo()) return;
    atk_basico(jugador2, jugador1);
    terminar_accion();
});

btn_esp2.addEventListener("click", () => {
    if (!juego_listo()) return;
    if (!atk_especial(jugador2, jugador1)) {
        return msj_error("No tienes suficiente Ki o Energía para el ataque especial");
    }
    terminar_accion();
});

btn_ki2.addEventListener("click", () => {
    if (!juego_listo()) return;
    cargar_ki(jugador2);
    terminar_accion();
});

btn_semilla2.addEventListener("click", () => {
    if (!juego_listo()) return;
    if (!usar_semilla(jugador2)) {
        return msj_error("¡No te quedan semillas del ermitaño!");
    }
    terminar_accion();
});