const formEditar = document.querySelector("#formEditarEspecialidad");
const descripcion_especialidad = document.getElementById("descripcion_especialidad");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado");

  try {
    const response = await fetch(
      `http://localhost:3000/api/especialidad/${formEditar.dataset.id}`
    );

    // Si hubo un error al obtener los datos de un usuario
    if (!response.ok) {
      throw {
        message: "Error al obtener la especialidad",
      };
    }

    const data = await response.json();
    console.log(data)
    descripcion_especialidad.value = data.descripcion_especialidad

    
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});


// Escuchar el evento submit
formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // Se crea un objeto con los datos del formulario
    const formData = {
      descripcion_especialidad: e.target.descripcion_especialidad.value,
    };
  
    try {
      // Se envia la peticion al servidor
      const resp = await fetch(
        `http://localhost:3000/api/especialidad/${formEditar.dataset.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (resp.status !== 200) {
        throw {
          message: "Error al editar la especialidad",
        };
      }
  
      const data = await resp.json();
  
      Swal.fire({
        icon: "success",
        title: data.message,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/lista_especialidades";
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        timer: 2000,
      });
    }
  });
  