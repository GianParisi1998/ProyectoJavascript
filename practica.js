/* let nombre = "Gianluca"



const pi= 3.14

"45" string ; . 
45 Number ; .

 */
//let  nombre = !"Juancito "

//if (nombre == "Adolfo")


//alert ("Vendo falopa, escucho ofertas")


 //   let ofertabase = 2300
    
    
    //let ofertaDelUsuario = parseFloat (prompt("Ingresa tu oferta: "))

  //  if(ofertaDeUsuario )

  // Solicitar un número al usuario

// Pedimos el número y convertimos a número
//let numero = Number(prompt("Ingresa un número:"));

// Verificamos que el usuario haya ingresado un número válido
/* if (!isNaN(numero)) { 
    if (numero > 9 && numero < 21) {
        document.write("El número ingresado es: " + numero);
   
} else {
    document.write("Por favor, ingresa un número válido.");
}}  */
  // Función para solicitar datos al usuario
// Función para solicitar datos al usuario
/* function solicitarDatos() {
  let monto = parseFloat(prompt("Ingrese el monto del préstamo:"));
  while (isNaN(monto) || monto < 1000) {
      monto = parseFloat(prompt("Monto inválido. Debe ser mayor a 1000. Ingrese nuevamente:"));
  }

  let plazo = parseInt(prompt("Ingrese el plazo en meses (12, 24, 36 o 48):"));
  while (![12, 24, 36, 48].includes(plazo)) {
      plazo = parseInt(prompt("Plazo inválido. Elija entre 12, 24, 36 o 48 meses:"));
  }

  let ingresos = parseFloat(prompt("Ingrese sus ingresos mensuales:"));
  while (isNaN(ingresos) || ingresos <= 0) {
      ingresos = parseFloat(prompt("Ingresos inválidos. Ingrese un valor positivo:"));
  }

  return { monto, plazo, ingresos };
}

function determinarTasaInteres(plazo) {
  if (plazo <= 12) return 0.15;
  else if (plazo <= 24) return 0.18;
  else if (plazo <= 36) return 0.20;
  else return 0.22;
}

function calcularCuotaMensual(monto, tasaInteres, plazo) {
  const tasaMensual = tasaInteres / 12;
  return (monto * tasaMensual * Math.pow(1 + tasaMensual, plazo)) / 
         (Math.pow(1 + tasaMensual, plazo) - 1);
}

function simularPrestamo() {
  let continuar = true;

  while (continuar) {
      console.log("=== SIMULADOR DE PRÉSTAMOS ===");
      
      const { monto, plazo, ingresos } = solicitarDatos();
      
      if (monto > ingresos * 10) {
          console.log("No es elegible. El monto excede 10 veces sus ingresos.");
      } else {
          const tasaInteres = determinarTasaInteres(plazo);
          const cuotaMensual = calcularCuotaMensual(monto, tasaInteres, plazo);
          
          console.log(`\nMonto: $${monto}`);
          console.log(`Plazo: ${plazo} meses`);
          console.log(`Tasa anual: ${(tasaInteres * 100)}%`);
          console.log(`Cuota mensual: $${cuotaMensual.toFixed(2)}`);
          
          let saldo = monto;
          console.log("\nPlan de pagos:");
          for (let mes = 1; mes <= plazo; mes++) {
              const interes = saldo * (tasaInteres / 12);
              const capital = cuotaMensual - interes;
              saldo -= capital;
              console.log(`Mes ${mes}: Cuota $${cuotaMensual.toFixed(2)} (Capital: $${capital.toFixed(2)}, Interés: $${interes.toFixed(2)}, Saldo: $${Math.max(0, saldo).toFixed(2)})`);
          }
      }

      continuar = prompt("¿Desea realizar otra simulación? (S/N)").toUpperCase() === 'S';
  }
  
  console.log("¡Gracias por usar el simulador!");
}

simularPrestamo(); */

