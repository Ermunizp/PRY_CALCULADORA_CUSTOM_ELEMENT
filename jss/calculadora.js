// Primero, definimos la clase que representará nuestro elemento personalizado
// Esta clase debe extender de HTMLElement para ser un elemento HTML válido
class CalculadoraBasica extends HTMLElement {
  // El constructor se ejecuta cuando se crea una instancia del elemento
  constructor() {
    super(); // Llamamos al constructor de la clase padre
    // Creamos un shadow DOM para encapsular el estilo y la estructura del componente
    this.attachShadow({ mode: 'open' });
    // Creamos la plantilla de la calculadora
    const template = `
      <link rel="stylesheet" href="/css/bootstrap.min.css">
      <div class="card p-4 shadow rounded">
        <div class="mb-3">
          <input type="text" id="num1" class="form-control" placeholder="Número 1">
        </div>
        <div class="mb-3">
          <input type="text" id="num2" class="form-control" placeholder="Número 2">
        </div>
        <div class="mb-3">
          <select id="operacion" class="form-select">
            <option value="+">Sumar</option>
            <option value="-">Restar</option>
            <option value="*">Multiplicar</option>
            <option value="/">Dividir</option>
          </select>
        </div>
        <div class="d-grid mb-3">
          <button id="calcular" class="btn btn-primary">Calcular</button>
        </div>
        <div id="resultado" class="alert alert-info text-center" role="alert">
          Resultado: -
        </div>
      </div>
    `;
    // Asignamos la plantilla al shadow DOM
    // Esto permite que el estilo y la estructura no afecten al DOM principal
    this.shadowRoot.innerHTML = template;
  }
  // Luego definimos el método connectedCallback
  // Este método se ejecuta cuando el elemento se añade al DOM
  connectedCallback() {
    this.shadowRoot.querySelector('#calcular').addEventListener('click', () => {
      // Obtenemos los valores de los inputs o números y el select de la operación
      const num1 = this.shadowRoot.querySelector('#num1').value.trim();
      const num2 = this.shadowRoot.querySelector('#num2').value.trim();
      const operacion = this.shadowRoot.querySelector('#operacion').value;
      // Obtenemos el div donde mostraremos el resultado
      const resultadoDiv = this.shadowRoot.querySelector('#resultado');

      // Validamos que los números sean válidos
      // Si no son válidos, mostramos un mensaje de error
      if (num1 === '' || num2 === '' || isNaN(num1) || isNaN(num2)) {
        resultadoDiv.textContent = 'Error: Ingrese números válidos.';
        resultadoDiv.className = 'alert alert-danger text-center';
        return;
      }

      // Convertimos los números a flotantes y realizamos la operación
      const a = parseFloat(num1);
      const b = parseFloat(num2);
      let resultado;

      // Validamos la operación de división por cero
      // Si la operación es división y el segundo número es cero, mostramos un mensaje de error
      if (operacion === '/' && b === 0) {
        resultadoDiv.textContent = 'Error: División por cero no permitida.';
        resultadoDiv.className = 'alert alert-danger text-center';
        return;
      }

      // Realizamos la operación según el tipo seleccionado
      // Usamos un switch para determinar la operación a realizar
      switch (operacion) {
        case '+': resultado = a + b; break;
        case '-': resultado = a - b; break;
        case '*': resultado = a * b; break;
        case '/': resultado = a / b; break;
      }

      // Mostramos el resultado en el div correspondiente
      // Cambiamos el texto y la clase del div para mostrar el resultado
      resultadoDiv.textContent = `Resultado: ${resultado}`;
      resultadoDiv.className = 'alert alert-info text-center';
    });
  }
}

// Finalmente, definimos el nombre del elemento personalizado
// Usamos customElements.define para registrar el nuevo elemento
customElements.define('calculadora-basica', CalculadoraBasica);
