class CalculadoraBasica extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

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

    this.shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#calcular').addEventListener('click', () => {
      const num1 = this.shadowRoot.querySelector('#num1').value.trim();
      const num2 = this.shadowRoot.querySelector('#num2').value.trim();
      const operacion = this.shadowRoot.querySelector('#operacion').value;
      const resultadoDiv = this.shadowRoot.querySelector('#resultado');

      if (num1 === '' || num2 === '' || isNaN(num1) || isNaN(num2)) {
        resultadoDiv.textContent = 'Error: Ingrese números válidos.';
        resultadoDiv.className = 'alert alert-danger text-center';
        return;
      }

      const a = parseFloat(num1);
      const b = parseFloat(num2);
      let resultado;

      if (operacion === '/' && b === 0) {
        resultadoDiv.textContent = 'Error: División por cero no permitida.';
        resultadoDiv.className = 'alert alert-danger text-center';
        return;
      }

      switch (operacion) {
        case '+': resultado = a + b; break;
        case '-': resultado = a - b; break;
        case '*': resultado = a * b; break;
        case '/': resultado = a / b; break;
      }

      resultadoDiv.textContent = `Resultado: ${resultado}`;
      resultadoDiv.className = 'alert alert-info text-center';
    });
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);
