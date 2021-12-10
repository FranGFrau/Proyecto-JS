class Personajes {
  constructor(id, asesinatos, muertes, asistencias, promedio) {
    this.id = id;
    this.asesinatos = asesinatos;
    this.asistencias = asistencias;
    this.muertes = muertes;
    this.promedio = promedio;
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

for (let vuelta = 0; vuelta != partidas; vuelta++) {
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

  let id = vuelta + 1;
  let asesinatos = pedirAsesinatos();
  let muertes = pedirMuertes();
  let asistencias = pedirAsistencias();
  let promedio = (parseInt(asesinatos) + parseInt(asistencias)) / muertes;

  let PartidaIngresada = new Personajes(
    id,
    asesinatos,
    muertes,
    asistencias,
    promedio
  );
  arrayPartidas.push(PartidaIngresada);
}

/* for (let contador = 0; contador != arrayPartidas.length; contador++) {
  let promedio =
    (parseInt(arrayPartidas[contador].asesinatos) +
      parseInt(arrayPartidas[contador].asistencias)) /
    arrayPartidas[contador].muertes;
  alert(`El promedio de la partida ${contador + 1} es de ${promedio}`);
} */

console.log(arrayPartidas);

/* interactuar con el dom */

const container = document.getElementById("2doContainer");

arrayPartidas.forEach((Personajes) => {
  let displayInfo = document.createElement("div");
  displayInfo.innerHTML = `<div>Partida ${Personajes.id} </div>
  <div>Asesinatos ${Personajes.asesinatos}</div>
  <div>Muertes ${Personajes.muertes}</div>
  <div>Asistencias ${Personajes.asistencias}</div>
  <div>Promedio ${Personajes.promedio}</div>`;
  container.appendChild(displayInfo);
});
