class Personaje {
  constructor(asesinatos, muertes, asistencias) {
    this.asesinatos = asesinatos;
    this.asistencias = asistencias;
    this.muertes = muertes;
  }
}

const arrayPartidas = [];

function pedirPartidas() {
  let l = prompt("Inserte su cantidad de partidas jugadas");

  while (isNaN(l) || l == null || l == "") {
    l = prompt("Inserte un número");
  }
  return l;
}

let partidas = pedirPartidas();

for (let m = 0; m != partidas; m++) {
  function pedirAsesinatos() {
    let i = prompt("Inserte su cantidad de asesinatos");

    while (isNaN(i) || i == null || i == "") {
      i = prompt("Inserte un número");
    }
    return i;
  }
  function pedirMuertes() {
    let j = prompt("Inserte su cantidad de muertes");

    while (isNaN(j) || j == null || j == "") {
      j = prompt("Inserte un número");
    }
    return j;
  }
  function pedirAsistencias() {
    let k = prompt("Inserte su cantidad de asistencias");

    while (isNaN(k) || k == null || k == "") {
      k = prompt("Inserte un número");
    }
    return k;
  }

  let asesinatos = pedirAsesinatos();
  let muertes = pedirMuertes();
  let asistencias = pedirAsistencias();

  let PartidaIngresada = new Personaje(asesinatos, muertes, asistencias);
  arrayPartidas.push(PartidaIngresada);
}

console.log(arrayPartidas);

for (let contador = 0; contador != arrayPartidas.length; contador++) {
  let promedio =
    (parseInt(arrayPartidas[contador].asesinatos) +
      parseInt(arrayPartidas[contador].asistencias)) /
    arrayPartidas[contador].muertes;
  alert(`El promedio de la partida ${contador} es de ${promedio}`);
}
