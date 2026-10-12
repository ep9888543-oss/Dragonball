class persona{
    #valorPrivado = "secreto";
    #nombre;

    constructor(nombre){
        this.#nombre = nombre,
        this.#valorPrivado = "otro dato"
    }

    mostrarDatos(){
        let saludo = "hola";
        console.log(`
            this.#nombre: ${this.#nombre}
            ${saludo}
        `);
    }

    #editarNombre(nombre){
        this.#nombre = nombre;
    }
    
    validarNombre(nombre){
        if(nombre!=""){
            this.#editarNombre(nombre);
        }else{
            console.log("Debes de ingresar un Nombre");
        }
    }

    getValorPrivado(){
        return this.#valorPrivado;
    }

    setValorPrivado(){
        this.#nombre = this.#nombre;
    }

}

export default persona;