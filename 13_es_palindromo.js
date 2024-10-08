function esPalindromo(ejemplo) {
    var resultado = false;
    for (let i = 0; i < ejemplo.length; i++) {
      if (ejemplo.charAt(ejemplo[i]) === ejemplo.charAt(ejemplo.length - 1)) {
        resultado = true;
        console.log(resultado);
      } else {
        resultado = false;
        break;
      }
    }

    return resultado;
  }

  var ejemplo = "somos";
    console.log(esPalindromo(ejemplo));