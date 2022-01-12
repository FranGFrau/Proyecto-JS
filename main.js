class Personajes {
  constructor(asesinatos, muertes, asistencias, promedio, id) {
    this.asesinatos = asesinatos;
    this.asistencias = asistencias;
    this.muertes = muertes;
    this.promedio = promedio;
    this.id = id;
  }
}

const arrayPartidas = [];
const arrayEntrarTop = [];
const arrayTop = [
  { id: 1, promedio: 9 },
  { id: 2, promedio: 5 },
  { id: 3, promedio: 8 },
  { id: 4, promedio: 11 },
  { id: 5, promedio: 7 },
  { id: 6, promedio: 8.5 },
  { id: 7, promedio: 9.2 },
];

const guardarLocal = (nombre, valor) => {
  localStorage.setItem(nombre, valor);
};

for (const promedio of arrayTop) {
  guardarLocal(promedio.id, JSON.stringify(promedio));
}

/* interactuar con el dom */

$("#containerInputs").submit(sacarCalculoPromedio);

function sacarCalculoPromedio(e) {
  e.preventDefault();
  let formulario = e.target;
  let asesinatos = formulario.children[1].value;
  let muertes = formulario.children[3].value;
  let asistencias = formulario.children[5].value;
  let promedio = (parseInt(asesinatos) + parseInt(asistencias)) / muertes;
  promedio = promedio.toFixed(1);

  let partidaIngresada = new Personajes(
    asesinatos,
    muertes,
    asistencias,
    promedio
  );
  arrayPartidas.push(partidaIngresada);

  arrayPartidas.forEach((Personajes) => {
    $("#2doContainer")
      .append(`<div class="boxInfo"><div class="boxEstilo">Asesinatos ${Personajes.asesinatos}</div>
  <div class="boxEstilo">Muertes ${Personajes.muertes}</div>
  <div class="boxEstilo">Asistencias ${Personajes.asistencias}</div>
  <div class="boxEstilo" id="promedio">Promedio ${Personajes.promedio}</div></div>`);
  });

  arrayTop.push({
    id: arrayTop.length + 1,
    promedio: partidaIngresada.promedio,
  });

  actualizarTablaPosiciones();

  arrayPartidas.splice(0, 1);
}

//

const actualizarTablaPosiciones = () => {
  arrayTop.sort(function (a, b) {
    return b.promedio - a.promedio;
  });

  $("#4toContainer")[0].innerHTML = "";
  arrayTop.forEach((Top) => {
    let posicion = arrayTop.indexOf(Top);
    $("#4toContainer")
      .append(`<div class="boxInfo"><div class="boxPosicion">Posicion ${
      posicion + 1
    }</div>
    <div class="boxEstilo">Promedio ${Top.promedio}</div></div>`);
  });
};

actualizarTablaPosiciones();
/* sliders banner */

$("#sliderBanner1").append(`
  <div id="sliderTransparente1" class="slider1">
    <div>icono</div>
    <p>texto de ejemplo</p>
  </div>`);

$("#sliderBanner2").append(`
  <div id="sliderTransparente2" class="slider2">
    <div>icono</div>
    <p>texto de ejemplo distinto 60</p>
  </div>`);

$("#sliderBanner3").append(`
  <div id="sliderTransparente3" class="slider3">
    <div>icono</div>
    <p>texto de ejemplo distinto 120</p>
  </div>`);

$("#sliderBanner1").hover(() => {
  $("#sliderTransparente1").slideUp("fast");
});
$("#sliderBanner1").mouseleave(() => {
  $("#sliderTransparente1").slideDown("fast");
});

$("#sliderBanner2").hover(() => {
  $("#sliderTransparente2").slideUp("fast");
});
$("#sliderBanner2").mouseleave(() => {
  $("#sliderTransparente2").slideDown("fast");
});

$("#sliderBanner3").hover(() => {
  $("#sliderTransparente3").slideUp("fast");
});
$("#sliderBanner3").mouseleave(() => {
  $("#sliderTransparente3").slideDown("fast");
});
