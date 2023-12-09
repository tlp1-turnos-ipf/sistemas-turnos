const formBuscadorPaciente = document.querySelector(
  "[name='formBuscadorPaciente']"
);
const formNuevoTurno = document.querySelector("#formNuevoTurno");

//Agregar Turno
formNuevoTurno.addEventListener("submit", async (e) => {
  e.preventDefault();

  const paciente_id = document.querySelector("#paciente_id").value;

  //Crea al turno
  const responseTurno = await fetch(
    `http://localhost:3000/api/turno/${formNuevoTurno.dataset.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paciente_id,
      }),
    }
  );

  const respToJson = await responseTurno.json();

  if (responseTurno.status !== 201 && responseTurno.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJson.message,
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Turno creado",
    text: respToJson.message,
  });

  formNuevoTurno.reset();

  setTimeout(() => {
    window.location.href = "/lista_turnos";
  }, 2000);
});

// Función para obtener los usaurios
const obtenerPacientes = async () => {
  const response = await fetch("http://localhost:3000/api/paciente");

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

const mostrarPacientes = (Pacientes) => {
  if (Pacientes.length === 0) {
    formBuscadorPaciente.innerHTML = `
            <tr>
                <td colspan="3">No hay Pacientes</td>
            </tr>
        `;
  }

  Pacientes.forEach((pacientes) => {
    const usuario = pacientes.Usuario; // Objeto de usuario dentro de paciente
    const persona = usuario.Persona; //Objeto persona dentro de usuario

    formBuscadorPaciente.innerHTML += `
                <option value="${pacientes.paciente_id}">${persona.dni} - ${persona.nombres}  ${persona.apellidos}</option>
 
                `;
  });
};

// Programar el evento cuando se carga toda la vista (sin los datos de usuarios)
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const usuarios = await obtenerPacientes();

  // Mostrar Pacientes en la tabla
  mostrarPacientes(usuarios);
});
