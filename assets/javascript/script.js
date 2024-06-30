var menu = document.getElementById("menuMobile");

function Menu() {
  menu.classList.toggle("menuMobileOpen");
}

// FILTRO POR INGRESO EN TABLA DE PRODUCTOS

function FiltrarporTabla() {
  let input = document.getElementById("text");
  input = input.value.toLowerCase();
  let tbody = document.getElementById("resultado"); // cuerpo de api
  let filas = tbody.getElementsByTagName("tr"); // filas de datos
  var hayResultados = false;

  for (let i = 0; i < filas.length; i++) {
    if (filas[i].innerText.toLowerCase().indexOf(input) > -1) {
      filas[i].removeAttribute('style');
      hayResultados = true;
    } else {
      filas[i].setAttribute('style', 'display:none');
    }
  }
  let mensajenoresultado = document.getElementById("mensajenoresultado");
  let thead = document.getElementById("thead");
  if (hayResultados == false) {
    mensajenoresultado.setAttribute('style', 'display: block');
    thead.setAttribute('style', 'display: none');
  }
  else {
    mensajenoresultado.setAttribute('style', 'display: none');
    thead.removeAttribute('style');
  }
}

// FILTRO POR CATEGORIAS DEL INDEX

function FiltrarporCategoria() {
  let input = document.getElementById("texto");
  input = input.value.toLowerCase();

  let contenedor = document.getElementById("grid-container");
  let items = contenedor.getElementsByTagName("div");
  let hayResultados = false;

  for (let i = 0; i < items.length; i++) {
    if (items[i].innerText.toLowerCase().indexOf(input) > -1) {
      items[i].removeAttribute('style');
      hayResultados = true;
    } else {
      items[i].setAttribute('style', 'display:none');
    }
  }
  let mensajenoresultado = document.getElementById("mensajenoresultado");
  if (hayResultados == false) {
    mensajenoresultado.setAttribute('style', 'display: block');
  }
  else {
    mensajenoresultado.setAttribute('style', 'display: none');
  }
}

// CARGA DE TABLA DE PRODUCTOS EN CATALOGOs

window.addEventListener('load', Obtenercatalogo);
const url2 = "https://api.yumserver.com/16640/products";

function Obtenercatalogo() {
  fetch(url2)
    .then(response => response.json()) // Trata la respuesta como JSON
    .then(data => {
      let html = '';
      for (let i = 0; i < data.length; i++) {
        html += `
        <div id="caja${i + 1}" class="caja">
          <h3 class="tituloproducto espaciado">${data[i].titulo.toUpperCase()}</h3>
          <h4 class="espaciado">AR$ ${data[i].precioPeso}</h4>
          <h4 class="espaciado">U$S ${data[i].precioDolar}</h4>
          <p class="fechaproducto espaciado">${data[i].fecha}</p>
        </div>`
      }
      document.getElementById('contenedor').innerHTML = html;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// FILTRO POR INGRESO EN CATALOGO

function FiltrarporCatalogo() {
  let input = document.getElementById("textos");
  input = input.value.toLowerCase();

  let contenedor = document.getElementById("contenedor");
  let items = contenedor.getElementsByTagName("div");
  let hayResultados = false;

  for (let i = 0; i < items.length; i++) {
    if (items[i].innerText.toLowerCase().indexOf(input) > -1) {
      items[i].removeAttribute('style');
      hayResultados = true;
    } else {
      items[i].setAttribute('style', 'display:none');
    }
  }
  let mensajenoresultado = document.getElementById("mensajenoresultado");
  if (hayResultados == false) {
    mensajenoresultado.setAttribute('style', 'display: block');
  }
  else {
    mensajenoresultado.setAttribute('style', 'display: none');
  }
}