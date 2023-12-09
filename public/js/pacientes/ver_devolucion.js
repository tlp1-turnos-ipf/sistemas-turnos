const listaDevolucion = document.querySelector("#listaDevolucion");
const turnoID = parseInt(listaDevolucion.dataset.id);

// Función para obtener los usaurios
const obtenerDevoluciones = async () => {
  const response = await fetch("http://localhost:3000/api/devolucion");

  if (response.status === 404) {
    return [];
  }

  if (response.status !== 200) {
    const { message } = await response.json();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
    return;
  }

  const data = await response.json();

  return data;
};

//Mostrar devoluciones
const mostrarDevoluciones = (Devoluciones) => {
  listaDevolucion.innerHTML = "";

  Devoluciones.forEach((devolucion) => {
    if (devolucion.turno_id === turnoID) {
      listaDevolucion.innerHTML += `
      <div class="shadow m-4 p-3 bg-body rounded border text-center" style="min-width: 300px; max-width: 500px">
        <h3 class="fw-bold banana">${devolucion.titulo_turno}</h3>   
        <p class="perro">${devolucion.descripcion_turno}</p>
        <div class="p-3 d-flex flex-wrap justify-content-center align-items-end">
          <button class="btn btn-sm btn-primary m-1" onclick="imprimirContenido()">Imprimir</button>
          <button class="btn btn-sm btn-success m-1">PDF</button>
        </div>
      </div>
                    `;
    }
  });
};

// Programar el evento cuando se carga toda la vista
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const devoluciones = await obtenerDevoluciones();

  // Mostrar Turnos en la tabla
  mostrarDevoluciones(devoluciones);
});

function imprimirContenido() {
  var contenido = document.querySelector(".banana");
  var contenido2 = document.querySelector(".perro");
  var ventanaImpresion = window.open();
  ventanaImpresion.document.write(
    "<html><head><title>Imprimir</title></head><body>"
  );
  ventanaImpresion.document.write(contenido.innerHTML, "<br>");
  ventanaImpresion.document.write(contenido2.innerHTML);
  ventanaImpresion.document.write("</body></html>");
  ventanaImpresion.document.close();
  ventanaImpresion.print();
  ventanaImpresion.close();
}
