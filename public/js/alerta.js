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
