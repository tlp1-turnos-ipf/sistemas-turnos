const tablaPacientes = document.querySelector("#listaPacientes");

// Función para obtener los usaurios
const obtenerPacientes = async () => {
 
  const response = await fetch("http://localhost:3000/api/paciente/completo");

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

    if (!usuario.estado) {
      botonesHtml = `<td><button onclick="cambiarEstado(event)" class="btn btn-secondary btn-sm" data-id="${usuario.usuario_id}">Desactivado</button></td>`;
    } else {
      botonesHtml = `
      <td><button onclick="eliminarPaciente(event)" class="btn btn-success btn-sm" data-id="${usuario.usuario_id}">Activado</button></td>
        `;
    }
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

/*****************************************************************
                  Eliminar Pacientes Completos
*****************************************************************/

//Ventana Emergente para antes de eliminar un paciente
const eliminarPaciente = (event) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estás seguro de eliminar el paciente?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminar(event);
    } else {
      window.location.href = "/lista_pacientes";
    }
  });
};

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
      title: "Paciente eliminado",
      text: data.message,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2200);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

/* ***************************************************************
                        Activar Pacientes 
*****************************************************************/

//Ventana Emergente para antes de activar un paciente
const cambiarEstado = (event) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estás seguro de activar el paciente?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      modificarEstado(event);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 2200);
    }
  });
};

//Modificar estado Paciente
const modificarEstado = async (event) => {
  //Obtengo el ID
  const id = event.target.dataset.id;

  try {
    const res = await fetch(`http://localhost:3000/api/paciente/estado/${id}`, {
      method: "PUT",
    });

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Me modificó el estado",
      text: data.message,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2200);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};
