const tablaEspecialidades = document.querySelector("#listaEspecialidad");

// Función para obtener las especialidades
const obtenerEspecialidades = async () => {
  const response = await fetch("http://localhost:3000/api/especialidad");

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

//Mostrar especialidades
const mostrarEspecialidades = (Especialidades) => {
  tablaEspecialidades.innerHTML = "";

  if (Especialidades.length === 0) {
    tablaEspecialidades.innerHTML = `
            <tr>
                <td colspan="3">No hay Especialidades</td>
            </tr>
        `;
  }

  Especialidades.forEach((especialidad) => {


    tablaEspecialidades.innerHTML += `
                    <tr>
                        <td>${especialidad.descripcion_especialidad}</td>
                        <td><a href="/especialidad/editar/${especialidad.especialidad_id}" class="btn btn-warning btn-sm">Editar</a></td>
                    </tr>
                `;
  });
};

// Programar el evento cuando se carga toda la vista (sin los datos de usuarios)
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const especialidades = await obtenerEspecialidades();

  // Mostrar Pacientes en la tabla
  mostrarEspecialidades(especialidades);
});
