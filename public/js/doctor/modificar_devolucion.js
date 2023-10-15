const formEditar = document.querySelector("#modificarDevolucion");

if (formEditar) {
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM cargado");

    try {
      const response = await fetch(
        `http://localhost:3000/api/devolucion/${formEditar.dataset.id}`
      );

      // Si hubo un error al obtener los datos de un usuario
      if (!response.ok) {
        throw {
          message: "Error al obtener la especialidad",
        };
      }

      const data = await response.json();
      console.log(data);
      titulo_turno.value = data.titulo_turno;
      descripcion_turno.value = data.descripcion_turno;
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
      turno_id: e.target.turno_id.value,
      titulo_turno: e.target.titulo_turno.value,
      descripcion_turno: e.target.descripcion_turno.value,

    };

    try {
      // Se envia la peticion al servidor
      const resp = await fetch(
        `http://localhost:3000/api/devolucion/${formEditar.dataset.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (resp.status !== 200 && resp.status !== 201) {
        throw {
          message: "Error al editar la devolución",
        };
      }

      const data = await resp.json();

      Swal.fire({
        icon: "success",
        title: "Excelente",
        text: data.message,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = `/doctor/turno/atender/${turnoId}/:idDevolucion`;
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        timer: 2000,
      });
    }
  });
}
