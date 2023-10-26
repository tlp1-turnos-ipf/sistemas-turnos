const formNuevoAdmin = document.querySelector("#formNuevoAdmin");

formNuevoAdmin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombres = document.querySelector("#nombres").value;
  const apellidos = document.querySelector("#apellidos").value;
  const fecha_nac = document.querySelector("#fecha_nac").value;
  const dni = document.querySelector("#dni").value;
  const direccion = document.querySelector("#direccion").value;
  const telefono = document.querySelector("#telefono").value;
  const sexo = document.querySelector("#sexo").value;

  const nombre_usuario = document.querySelector("#nombre_usuario").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;
  const rol = 2;

  //Verifica que las contraseñas coincidan
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Las contraseñas no coinciden",
    });
    return;
  }

  // SE CREA LA PERSONA
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

  const respToJsonPersona = await responseIdPersona.json();

  if (respToJsonPersona.status !== 201 && respToJsonPersona.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJsonPersona.message,
    });
    return;
  }

  // SE CREA EL USUARIO
  const responseUsuario = await fetch(
    "http://localhost:3000/api/usuario",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_usuario,
        email,
        password,
        rol
      }),
    }
  );

  const respToJsonUsuario = await responseUsuario.json();

  if (respToJsonUsuario.status !== 201 && respToJsonUsuario.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJsonUsuario.message,
    });
    return;
  }
});
