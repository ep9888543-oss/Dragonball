// Importa la clase 'Personaje' desde el archivo 'Personaje.js'
import Personaje from "./Personaje.js";

// Define la clase 'Acciones', que hereda atributos y métodos de 'Personaje'
class Acciones extends Personaje {

    constructor(nombre, personaje) {
        super(nombre, personaje);
    }

    /**
     * Ataque básico: consume 5 de energía y 10 de ki, quita 10 de vida al oponente.
     */
    atkBasico(oponente) {
        this.setEnergia(Math.max(0, this.getEnergia() - 5));
        this.setKi(Math.max(0, parseInt(this.getKi() - 10)));

        if (oponente) {
            oponente.setVida(Math.max(0, oponente.getVida() - 10));
        }

        this.mostrarEstadisticas();
    }

    /**
     * Ataque especial: consume 15 de energía y 20 de ki, quita 25 de vida al oponente.
     * Devuelve false si no alcanza el ki o la energía, y true si el ataque se realizó.
     */
    atkEspecial(oponente) {
        const COSTO_ENERGIA = 15;
        const COSTO_KI = 20;

        if (this.getKi() < COSTO_KI || this.getEnergia() < COSTO_ENERGIA) {
            return false;
        }

        this.setEnergia(this.getEnergia() - COSTO_ENERGIA);
        this.setKi(parseInt(this.getKi() - COSTO_KI));

        if (oponente) {
            oponente.setVida(Math.max(0, oponente.getVida() - 25));
        }

        this.mostrarEstadisticas();
        return true;
    }

    /**
     * Restaura vida, ki y energía a cambio de 1 semilla.
     * Devuelve false si no quedan semillas.
     */
    curacion() {
        if (this.getSemilla() > 0) {
            this.setEnergia(100);
            this.setKi(100);
            this.setVida(100);
            this.setSemilla(this.getSemilla() - 1);
            this.mostrarEstadisticas();
            return true;
        }
        console.log("¡No te quedan semillas del ermitaño!");
        return false;
    }

    /**
     * Recarga energía (+15) y ki (+10) sin pasar de 100.
     */
    cargaEnergia() {
        this.setEnergia(Math.min(100, this.getEnergia() + 15));
        this.setKi(Math.min(100, this.getKi() + 10));
        this.mostrarEstadisticas();
    }

    /**
     * Método reservado para la lógica defensiva (pendiente de implementar)
     */
    defensa() {
        // TODO: Agregar reducción de daño o postura defensiva
    }
}

// Exporta la clase 'Acciones' para su uso en el juego o simulador
export default Acciones;