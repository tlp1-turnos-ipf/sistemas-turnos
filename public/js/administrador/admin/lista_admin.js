const tablaAdmin = document.querySelector("#listaAdmin");

// Función para obtener los administradores
const obtenerAdmin = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/admin");

    if (response.status !== 200) {
      const { message } = await response.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener administradores:", error);
    return [];
  }
};

// Mostrar administradores
const mostrarAdmin = async () => {
  const Admin = await obtenerAdmin(); // Obtener los registros

  tablaAdmin.innerHTML = "";

  if (Admin.length === 0) {
    tablaAdmin.innerHTML = `
      <tr>
        <td colspan="3">No hay Administradores</td>
      </tr>
    `;
  }

  Admin.forEach((usuario) => {
    const persona = usuario.Persona; // Objeto persona dentro de usuario

    let botonesHtml = ""; // Esta variable almacenará los botones HTML

    botonesHtml = `
      <td>
        <button onclick="eliminarRegistro(event)" class="btn btn-danger btn-sm" data-id="${usuario.usuario_id}">Eliminar</button>
        <a href="/editar_admin/${persona.persona_id}" class="btn btn-warning btn-sm">Editar</a>
      </td>
    `;

    tablaAdmin.innerHTML += `
      <tr>
        <td>${persona.dni}</td>
        <td>${persona.nombres}  ${persona.apellidos}</td>
        ${botonesHtml}
      </tr>
    `;
  });
};

// Llamando a la función para mostrar los administradores
mostrarAdmin();



/* ***************************************************************
                        Eliminar administradores activos
*****************************************************************/

//Ventana Emergente para antes de eliminar un registro
const eliminarRegistro = (event) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estás seguro de eliminar el registro?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminar(event);
    } else {
      window.location.reload();
    }
  });
};


//Eliminar Paciente
const eliminar = async (event) => {
  //Obtengo el ID
  const id = event.target.dataset.id;

  try {
    const res = await fetch(`http://localhost:3000/api/admin/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Registro eliminado",
      text: data.message,
    });

    setTimeout(() => {
      window.location.href = "/lista_admin";
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
