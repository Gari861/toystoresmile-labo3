const url = "https://api.yumserver.com/16640/products";

function Mostrar() {
  let buscador = document.getElementById('buscador');
  buscador.classList.toggle('visible');
  buscador.classList.toggle('visible2');
  let tabla = document.getElementById('tabla');
  tabla.classList.toggle('visible');
  Obtener();
}
function MostrarTODO() {
  let buscador = document.getElementById('buscador');
  buscador.classList.add('visible');
  buscador.classList.add('visible2');
  let tabla = document.getElementById('tabla');
  tabla.classList.add('visible');
  Obtener();
}
function Agregar() {
  let agregar = document.getElementById('agregar');
  agregar.classList.toggle('visible');
}
function ModificarTabla() { //hace visible el formulario
  let modificarportabla = document.getElementById('modificarportabla');
  modificarportabla.classList.toggle('visible');
}
function Modificar() {
  let modificar = document.getElementById('modificar');
  modificar.classList.toggle('visible');
  MostrarTODO();
}
function Eliminar() {
  let eliminar = document.getElementById('eliminar');
  eliminar.classList.toggle('visible');
  MostrarTODO();
}

function Obtener() {
  fetch(url)
    .then(response => response.json()) // Trata la respuesta como JSON
    .then(data => {
      let html = '';
      for (let i = 0; i < data.length; i++) {
        html += `
        <tr>
          <td>${data[i].idcod}</td>
          <td><strong>${data[i].titulo.toUpperCase()}</strong></td>
          <td>${data[i].precioPeso}</td>
          <td>${data[i].precioDolar}</td>
          <td>${data[i].fecha}</td>
          <td><button onclick="EliminarporTabla('${data[i].idcod}')">Borrar</button></td>
          <td><button onclick="ModificarporTabla('${data[i].idcod}', '${data[i].titulo}', '${data[i].precioPeso}', 
          '${data[i].precioDolar}', '${data[i].fecha}')">Modificar</button></td>
        </tr>`;
      }
      document.getElementById('resultado').innerHTML = html;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function ObtenerporId() { //es un modificar por id
  const id = document.getElementById('modificarIDIngreso').value; //obtiene el id ingresado
  fetch(`${url}/${id}`)
    .then(response => response.json()) // Trata la respuesta como JSON
    .then(data => {
      if (data) {
        // si se encuentra guarda sus valores y llama a la otra funcion
        let modificar = document.getElementById('modificarportabla');
        modificar.classList.remove('oculto'); // ocultamos el anterior formulario
        ModificarporTabla(data.idcod, data.titulo, data.precioPeso, data.precioDolar, data.fecha);
        //lLAMA AL OTRO FORMULARIO
      } else {
        alert('Producto no encontrado');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al buscar el producto');
    });
}

function GuardarProducto() {
  var productoNuevo = {
    titulo: document.getElementById('agregarTitulo').value,
    precioPeso: document.getElementById('agregarPrecioP').value,
    precioDolar: document.getElementById('agregarPrecioD').value,
    fecha: document.getElementById('agregarFecha').value
  }
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productoNuevo)
  })
    .then(response => response.text()) // Trata la respuesta como texto
    .then(data => {
      console.log(data); // Imprime el string de respuesta
      if (data === 'OK') {
        alert('Producto agregado con éxito');
        MostrarTODO();
      } else {
        alert('Error: ' + data);
      }
      // Restablece los valores
      document.getElementById('agregarTitulo').value = '';
      document.getElementById('agregarPrecioP').value = '';
      document.getElementById('agregarPrecioD').value = '';
      document.getElementById('agregarFecha').value = '';
    }) //si algo sale mal al conectarse con la API
    .catch(error => {
      console.error('Error:', error);
    });
}

function EliminarporTabla(id) {
  console.log(id); // Imprime el ID para depuración
  var productoEliminado = {
    idcod: id
  }
  var confirmacion = confirm("¿Está seguro de que desea eliminar el elemento seleccionado?");

  if (confirmacion) {
    fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }, // Indica que estamos enviando JSON
      body: JSON.stringify(productoEliminado)
    })
      .then(response => response.text()) // Trata la respuesta como texto
      .then(data => {
        if (data === 'OK') {
          alert('Producto eliminado con éxito');
          Obtener();
        } else {
          alert('Error: ' + data); // Muestra un mensaje de error si la respuesta no es 'OK'
        }
      })
      .catch(error => {
        console.error('Error:', error); // Imprime el error en la consola para depuración
      });
  } else {
    alert('Operación de eliminar producto cancelada');
  }
}

function EliminarProducto() {
  var productoEliminado = {
    idcod: document.getElementById('eliminarID').value,
  }
  var confirmacion = confirm("¿Está seguro de que desea eliminar el elemento seleccionado?");
  if (confirmacion) {
    fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }, // Indica que estamos enviando JSON
      body: JSON.stringify(productoEliminado)
    })
      .then(response => response.text()) // Trata la respuesta como texto
      .then(data => {
        console.log(data); // Imprime el string de respuesta
        if (data === 'OK') {
          alert('Producto eliminado con éxito');
          Obtener();
        } else {
          alert('Error: ' + data);
        }
        // Restablece los valores
        document.getElementById('eliminarID').value = '';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    alert('Operación de eliminar producto cancelada');
  }
}

function ModificarporTabla(_id, _titulo, _precioPeso, _precioDolar, _fecha) {
  // llegando al input 
  let modificar = document.getElementById('modificar');
  modificar.classList.remove('visible'); // ocultamos el anterior formulario

  let idcod = document.getElementById('modificarID');
  let titulo = document.getElementById('modificarTitulo');
  let precioPeso = document.getElementById('modificarPrecioPeso');
  let precioDolar = document.getElementById('modificarPrecioDolar');
  let fecha = document.getElementById('modificarFecha');

  // insertando valores de la tabla en los input
  idcod.value = _id;
  titulo.value = _titulo;
  precioPeso.value = _precioPeso;
  precioDolar.value = _precioDolar;
  fecha.value = _fecha;

  ModificarTabla(); //llama a formulario modificar y lo hace visible
}

function ModificarProducto() {
  var productoModificado = {
    idcod: document.getElementById('modificarID').value,
    titulo: document.getElementById('modificarTitulo').value,
    precioPeso: document.getElementById('modificarPrecioPeso').value,
    precioDolar: document.getElementById('modificarPrecioDolar').value,
    fecha: document.getElementById('modificarFecha').value
  } // Toma los valores de los campos
  fetch(url, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    }, // Indica que estamos enviando JSON
    body: JSON.stringify(productoModificado)
  })
    .then(response => response.text()) // Trata la respuesta como texto
    .then(data => {
      if (data === 'OK') {
        alert('Producto modificado con éxito');
        // Restablece los valores de los campos
        document.getElementById('modificarID').value = '';
        document.getElementById('modificarTitulo').value = '';
        document.getElementById('modificarPrecioPeso').value = '';
        document.getElementById('modificarPrecioDolar').value = '';
        document.getElementById('modificarFecha').value = '';
        Obtener();
        ModificarTabla(); // oculta el formulario
      } else {
        alert('Error: ' + data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


