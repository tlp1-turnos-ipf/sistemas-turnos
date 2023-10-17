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
    <div class="shadow m-4 p-3 bg-body rounded border text-center" style="min-width: 300px; max-width: 300px">
       <h3 class="fw-bold">${devolucion.titulo_turno}</h3>   
       <p>${devolucion.descripcion_turno}</p>
       <div class="p-3 d-flex flex-wrap justify-content-center">
        <button class="btn btn-sm btn-primary m-1">Imprimir</button>
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
