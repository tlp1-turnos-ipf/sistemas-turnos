const formNuevoDoctor = document.querySelector("#formNuevoDoctor");

formNuevoDoctor.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombres = document.querySelector("#nombres").value;
  const apellidos = document.querySelector("#apellidos").value;
  const fecha_nac = document.querySelector("#fecha_nac").value;
  const dni = document.querySelector("#dni").value;
  const direccion = document.querySelector("#direccion").value;
  const telefono = document.querySelector("#telefono").value;
  const sexo = document.querySelector("#sexo").value;
  const especialidad = document.querySelector("#especialidad").value;

  const nombre_usuario = document.querySelector("#nombre_usuario").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Las contraseñas no coinciden",
    });
    return;
  }

  const responseIdPersona = await fetch(
    "http://localhost:3000/api/persona/registro",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        fecha_nac,
        dni,
        direccion,
        telefono,
        sexo,
        email,
      }),
    }
  );

  const responseUsuario = await fetch(
    "http://localhost:3000/api/usuario/doctor",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_usuario,
        email,
        password,
      }),
    }
  );

  //Crea al doctor
  const responseDoctor = await fetch("http://localhost:3000/api/doctor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      especialidad,
    }),
  });

  const respToJson = await responseDoctor.json();

  if (responseDoctor.status !== 201 && responseDoctor.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJson.message,
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Doctor creado",
    text: respToJson.message,
  });

  formNuevoDoctor.reset();

  setTimeout(() => {
    window.location.href = "/lista_doctores";
  }, 2000);
});
