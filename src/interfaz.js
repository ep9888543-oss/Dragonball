import Swal from "sweetalert2";

const atributosPersonaje = {
    "GOKU": {
        atk_basico: "Kame hame ha!",
        atk_especial: "¡Genkidama!",
        fondo: "rgb(7, 196, 238, 0.7)"
    },
    "VEGETA": {
        atk_basico: "¡Cañón de Destello!",
        atk_especial: "¡Final Flash!",
        fondo: "rgb(0, 0, 255, 0.7)"
    },
    "PICCOLO": {
        atk_basico: "¡Makankosappo!",
        atk_especial: "¡Cañón Explosivo de Demonio!",
        fondo: "rgb(0, 128, 0, 0.7)"
    },
    "GOHAN": {
        atk_basico: "¡Masenko!",
        atk_especial: "¡Kamehameha Padre e Hijo!",
        fondo: "rgb(255, 165, 0, 0.7)"
    },
    "VEGITTO": {
        atk_basico: "¡Espada de Espíritu Final!",
        atk_especial: "¡Kamehameha Final Flash!",
        fondo: "rgb(255, 215, 0, 0.7)"
    },
    "TRUNKS": {
        atk_basico: "¡Ataque Ardiente!",
        atk_especial: "¡Espada Ráfaga de Ira!",
        fondo: "rgb(128, 0, 128, 0.7)"
    },
    "CELL": {
        atk_basico: "¡Kamehameha Solar!",
        atk_especial: "¡Autodestrucción Celular!",
        fondo: "rgb(46, 139, 87, 0.7)"
    },
    "GOGETA": {
        atk_basico: "¡Explosión Big Bang!",
        atk_especial: "¡Kamehameha Estelar!",
        fondo: "rgb(255, 69, 0, 0.7)"
    }
};

const datosDe = (jugador) => {
    const key = jugador.getPersonaje() ? jugador.getPersonaje().toUpperCase() : "GOKU";
    return atributosPersonaje[key] || {
        atk_basico: "¡Ataque básico!",
        atk_especial: "¡Ataque especial!",
        fondo: "rgba(0, 0, 0, 0.5)"
    };
};

const mostrar_ataque = (texto, imagen, fondo) => {
    Swal.fire({
        text: texto,
        imageUrl: imagen,
        imageWidth: 400,
        imageHeight: 400,
        position: "center",
        width: 600,
        color: "#716add",
        background: "none",
        imageAlt: "Ataque",
        backdrop: fondo,
        showConfirmButton: false,
        timer: 1500
    });
};

const atk_basico = (j1, j2) => {
    j1.atkBasico(j2);
    const datos = datosDe(j1);
    mostrar_ataque(datos.atk_basico, `./public/img/${j1.getPersonaje()}/basico.png`, datos.fondo);
};

const atk_especial = (j1, j2) => {
    // atkEspecial devuelve false si no hay suficiente Ki o Energía
    if (!j1.atkEspecial(j2)) {
        return false;
    }
    const datos = datosDe(j1);
    mostrar_ataque(datos.atk_especial, `./public/img/${j1.getPersonaje()}/especial.png`, datos.fondo);
    return true;
};
const cargar_ki = (j1) => {
    j1.cargaEnergia();

    Swal.fire({
        icon: "success",
        title: "¡Cargando Ki!",
        text: `${j1.getNombre ? j1.getNombre() : "El jugador"} recuperó Ki y Energía`,
        timer: 1200,
        showConfirmButton: false
    });
};

export { atk_basico, atk_especial, cargar_ki };