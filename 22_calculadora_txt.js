const fs = require("fs");

// Función para calcular desde un archivo
function calcularDesdeArchivo(nombreArchivo) {
  fs.readFile(nombreArchivo, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }

    const lineas = data.split('\n').map(linea => linea.trim()).filter(linea => linea !== '');
    let resultado;
    let operador = null;

    // Validar formato y calcular
    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i];

      // Intentar convertir la línea en número
      const numero = parseFloat(linea);

      // Si la línea es un número
      if (!isNaN(numero)) {
        if (resultado === undefined) {
          // El primer número inicializa el resultado
          resultado = numero;
        } else if (operador) {
          // Si ya tenemos un operador almacenado, aplicamos la operación
          switch (operador) {
            case "+":
              resultado += numero;
              break;
            case "-":
              resultado -= numero;
              break;
            case "*":
              resultado *= numero;
              break;
            case "/":
              if (numero === 0) {
                console.error("Error: División por cero.");
                return;
              }
              resultado /= numero;
              break;
            default:
              console.error("Error: Operador no válido.");
              return;
          }
          operador = null; // Reseteamos el operador después de aplicarlo
        } else {
          console.error("Error: Formato incorrecto. Se esperaba un operador.");
          return;
        }
      } else {
        // Si la línea no es un número, debe ser un operador
        if (["+", "-", "*", "/"].includes(linea)) {
          if (operador !== null) {
            console.error("Error: Formato incorrecto. Dos operadores consecutivos.");
            return;
          }
          operador = linea; // Guardamos el operador
        } else {
          console.error("Error: Operador no reconocido:", linea);
          return;
        }
      }
    }

    // Al final, si todo fue correcto y no hay errores
    if (operador === null) {
      console.log("Resultado final:", resultado);
    } else {
      console.error("Error: Se esperaba un número al final.");
    }
  });
}

// Ejecutar el cálculo con el archivo Challenge21.txt
calcularDesdeArchivo("Challenge21.txt");
