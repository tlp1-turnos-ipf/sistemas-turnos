const tablaTurnos = document.querySelector("#listaTurnos");
const idUser = parseInt(tablaTurnos.dataset.id);

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // El mes es 0-indexado, por lo que le sumamos 1 y lo formateamos
const day = String(today.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;


// Función para obtener los usaurios
const obtenerTurnos = async () => {
  const response = await fetch("http://localhost:3000/api/turno");

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

const mostrarTurnos = (Turnos) => {
  console.log(Turnos);
  if (Turnos.length === 0) {
    tablaTurnos.innerHTML = `
            <tr>
                <td colspan="5">No hay Turnos</td>
            </tr>
        `;
  }

  Turnos.forEach((turnos) => {
    //Datos del horario y fecha
    const fecha = turnos.Doctor_Fecha;

    //Datos del Doctor
    const doctorUsuario = fecha.Doctor.Usuario;

    //Datos del paciente
    const usuarioPaciente = turnos.Paciente.Usuario;
    const personaPaciente = usuarioPaciente.Persona;

    if (doctorUsuario.usuario_id === idUser && fecha.fecha === formattedDate && turnos.estado_turno === true) {
      tablaTurnos.innerHTML += `
      <tr>
          <td>${personaPaciente.nombres} ${personaPaciente.apellidos}</td>
          <td>Turno ${fecha.descripcion}</td>
          <td>${fecha.horario_inicio}</td>
          <td>
              <a href="/doctor/turno/atender/${turnos.turno_id}/:idDevolucion/${personaPaciente.persona_id}" class="btn btn-warning btn-sm">Atender</a>
              <button onclick=eliminarRegistro(event) class="btn btn-primary btn-sm" data-id="${turnos.turno_id}">No asistió</button>
          </td>
      </tr>
  `;
    }
  });
};

// Programar el evento cuando se carga toda la vista
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const turnos = await obtenerTurnos();

  // Mostrar Turnos en la tabla
  mostrarTurnos(turnos);
});

//Eliminar Turno
const eliminar = async (event) => {
  //Obtengo el ID
  const id = event.target.dataset.id;
  console.log(id);

  try {
    const res = await fetch(`http://localhost:3000/api/turno/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Excelente",
      text: data.message,
    });

    setTimeout(() => {
      window.location.reload();
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
