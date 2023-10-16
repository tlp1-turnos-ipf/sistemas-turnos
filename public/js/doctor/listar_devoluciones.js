const listadoDevoluciones = document.querySelector("#ListadoDevoluciones");

//Para obtener el id del turno
const form = document.querySelector("#crearDevolucion");
const turnoID = parseInt(form.dataset.id);

//Obtiene el ID del paciente para traer sus datos
const DatoPaciente = document.querySelector("#DatoPaciente");
const pacienteID = parseInt(DatoPaciente.dataset.id);

// Función para obtener las devoluciones
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

// Función para obtener las devoluciones
const obtenerPaciente = async () => {
  const response = await fetch(
    `http://localhost:3000/api/paciente/${pacienteID}`
  );

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
  listadoDevoluciones.innerHTML = "";

  if (Devoluciones.length === 0) {
    listadoDevoluciones.innerHTML = `
              <tr>
                  <td colspan="3">No hay Devoluciones</td>
              </tr>
          `;
  }
  Devoluciones.forEach((devolucion) => {
    if (devolucion.turno_id === turnoID) {
      listadoDevoluciones.innerHTML += `
      <div class="card m-1" style="max-width: 18rem" >
        <div class="card-body">
            <h5 class="card-title">${devolucion.titulo_turno}</h5>
            <a href="/doctor/turno/atender/${turnoID}/${devolucion.id}/${pacienteID}" class="btn btn-primary"
            >Editar</a
            >
            <button onClick=eliminarRegistro(event) data-id="${devolucion.id}" class="btn btn-danger"
            >Eliminar</button>
        </div>
      </div>
                  `;
    }
  });
};
//Mostrar devoluciones
const mostrarPaciente = (Paciente) => {
  DatoPaciente.innerHTML = "";

  DatoPaciente.innerHTML += `
      <div class="d-flex flex-wrap m-4">
              <p><b>DNI: </b></p>
              <p>${Paciente.dni}</p>
            </div>
            <div class="d-flex flex-wrap m-4">
              <p><b>Fecha Nacimiento: </b></p>
              <p>${Paciente.nombres} ${Paciente.apellidos}</p>
            </div>
            <div class="d-flex flex-wrap m-4">
              <p><b>Fecha Nacimiento: </b></p>
              <p>${Paciente.fecha_nacimiento}</p>
            </div>
            <div class="d-flex flex-wrap m-4">
              <p><b>Teléfono: </b></p>
              <p>${Paciente.telefono}</p>
            </div>
                  `;
};

// Programar el evento cuando se carga toda la vista
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const devoluciones = await obtenerDevoluciones();
  const paciente = await obtenerPaciente();
  // Mostrar devoluciones en la tabla
  mostrarDevoluciones(devoluciones);
  mostrarPaciente(paciente);
});

/* ***************************************************************
                        Eliminar devoluciones
*****************************************************************/

//Eliminar Devolucion
const eliminar = async (event) => {
  //Obtengo el ID
  const id = event.target.dataset.id;
  console.log(id);

  try {
    const res = await fetch(`http://localhost:3000/api/devolucion/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Excelente",
      text: data.message,
    });

    setTimeout(() => {
      window.location.href = `/doctor/turno/atender/${turnoID}/:idDevolucion/${pacienteID}`;
    }, 1500);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};
