function login() {
  let intentos = 0;
  let identificar = true;
  const usuarioCorrecto = "eltanobienpiola";
  const contrasenaCorrecta = "1234"; 

  do {
    let usuario = prompt("Ingrese su usuario:");
    if (usuario === null) break;

    let contrasena = prompt("Ingrese su contraseña:");
    if (contrasena === null) break;

    if (usuario.trim().toLowerCase() === usuarioCorrecto && contrasena === contrasenaCorrecta) {
      alert("Bienvenido a TanoGames 🎮");
      identificar = false;
    } else {
      alert("Usuario o contraseña incorrectos.");
      intentos++;

      if (intentos >= 3) {
        alert("Usted superó los 3 intentos.");
        break;
      }
    }
  } while (identificar);
}

login();