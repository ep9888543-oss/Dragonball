class Main {
    constructor(nombre) {
        // Indica el método constructor de la clase
        this.nombre = nombre;

        this.#valorPrivado = "Otro dato";
    }

    #valorPrivado;

    mostrarDatos() {
        let saludo = "hola";

        console.log(saludo);
        console.log("Nombre:", this.nombre);
        console.log("Dato privado:", this.#valorPrivado);
    }
}

let personas = new Main("Danny");

console.log(persona.nombre);
persona.mostrarDatos();
// Creamos una clase llamada Main
class Main {

    // El constructor se ejecuta automáticamente
    // cuando creamos un nuevo objeto con "new Main()"
    constructor(nombre) {

        // Guardamos el nombre que recibimos como parámetro
        // dentro de la propiedad "nombre" del objeto.
        //
        // "this" hace referencia al objeto que estamos creando.
        this.nombre = nombre;

        // Guardamos un dato privado.
        // El símbolo "#" indica que esta propiedad
        // solamente puede utilizarse dentro de la clase.
        this.#valorPrivado = "Otro dato";
    }

    // Declaramos una propiedad privada de la clase.
    // Es necesario declararla porque estamos utilizando
    // "#valorPrivado" dentro del constructor.
    #valorPrivado;


    // Este es un método de la clase.
    // Los métodos son funciones que pertenecen a un objeto.
    mostrarDatos() {

        // Creamos una variable llamada "saludo"
        // y le asignamos el texto "Hola".
        let saludo = "Hola";

        // Mostramos el saludo en la consola.
        console.log(saludo);

        // Mostramos el nombre que guardamos anteriormente
        // en "this.nombre".
        console.log("Nombre:", this.nombre);

        // Mostramos el valor de la propiedad privada.
        // Podemos acceder a ella porque estamos dentro de la clase.
        console.log("Dato privado:", this.#valorPrivado);
    }
}


// Creamos un nuevo objeto utilizando la clase Main.
//
// "new" crea una nueva instancia de la clase.
// "Danny" se envía como argumento al constructor.
let persona = new Main("Danny");


// Mostramos el nombre del objeto en la consola.
//
// persona.nombre contiene "Danny".
console.log(persona.nombre);


// Llamamos al método "mostrarDatos()" del objeto.
// Esto ejecutará todo el código que está dentro del método.
persona.mostrarDatos();
