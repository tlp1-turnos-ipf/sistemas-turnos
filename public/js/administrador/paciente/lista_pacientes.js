const tablaPacientes = document.querySelector("#listaPacientes");

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

//Mostrar pacientes
const mostrarPacientes = (Pacientes) => {
  tablaPacientes.innerHTML = "";

  if (Pacientes.length === 0) {
    tablaPacientes.innerHTML = `
            <tr>
                <td colspan="3">No hay Pacientes</td>
            </tr>
        `;
  }

  Pacientes.forEach((pacientes) => {
    const usuario = pacientes.Usuario; // Objeto de usuario dentro de paciente
    const persona = usuario.Persona; //Objeto persona dentro de usuario

    let botonesHtml = ""; // Esta variable almacenará los botones HTML

    botonesHtml = `
              <td>
                  <button onclick="eliminarRegistro(event)" class="btn btn-danger btn-sm" data-id="${usuario.usuario_id}">Eliminar</button>
                  <a href="/paciente/editar/${persona.persona_id}" class="btn btn-warning btn-sm">Editar</a>
              </td>
        `;

    tablaPacientes.innerHTML += `
                    <tr>
                        <td>${persona.dni}</td>
                        <td>${persona.nombres}  ${persona.apellidos}</td>
                        ${botonesHtml}
                    </tr>
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

/* ***************************************************************
                        Eliminar Pacientes activos
*****************************************************************/

//Eliminar Paciente
const eliminar = async (event) => {
  //Obtengo el ID
  const id = event.target.dataset.id;

  try {
    const res = await fetch(`http://localhost:3000/api/paciente/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Registro eliminado",
      text: data.message,
    });

    setTimeout(() => {
      window.location.href = "/lista_pacientes";
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
