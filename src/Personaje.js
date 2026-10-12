// Personaje.js - CLASE BASE (Sin importaciones de Acciones)

class Personaje {
    // --- Atributos privados (#) ---
    #vida = 100;       // Puntos de salud iniciales
    #nombre;           // Nombre del personaje
    #ki = 100;         // Puntos de ki iniciales
    #energia = 100;    // Puntos de energía iniciales
    #semilla = 2;      // Cantidad inicial de semillas
    #personaje = "";

    /**
     * Constructor de la clase
     * @param {string} nombre - Nombre asignado al personaje
     * @param {string} tipoPersonaje - Personaje seleccionado
     */
    constructor(nombre, tipoPersonaje = "") {
        this.#nombre = nombre;
        this.#personaje = tipoPersonaje; // Corregido para usar el parámetro recibido
        this.mostrarEstadisticas();
    }

    /**
     * Imprime en consola los valores actuales de los atributos del personaje
     */
    mostrarEstadisticas() {
        console.log(`
            nombre: ${this.#nombre},
            personaje: ${this.#personaje},
            ki: ${this.#ki},
            vida: ${this.#vida},
            energia: ${this.#energia},
            semilla: ${this.#semilla}
        `);
    }

    // ==========================================
    // MÉTODOS GETTERS 
    // ==========================================

    getNombre() {
        return this.#nombre;
    }
    
    getPersonaje(){
        return this.#personaje; // Corregido para devolver el personaje y no la vida
    }

    getVida() {
        return this.#vida;
    }

    getKi() {
        return this.#ki;
    }

    getEnergia() {
        return this.#energia;
    }

    getSemilla() {
        return this.#semilla;
    }

    // ==========================================
    // MÉTODOS SETTERS 
    // ==========================================

    setVida(vida) {
        this.#vida = Math.max(0, vida);
    }

    setKi(ki) {
        this.#ki = Math.max(0, ki);
    }

    setEnergia(energia) {
        this.#energia = Math.max(0, energia);
    }

    setSemilla(semilla) {
        this.#semilla = Math.max(0, semilla);
    }
}

// Exporta la clase base
export default Personaje;
