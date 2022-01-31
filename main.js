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

/* carrito 3er container */

let productos = [];
$.ajax({
  url: "./data/productos.json",
  dataType: "json",
  success: (respuesta) => {
    subirProductos(respuesta);
  },
});

const subirProductos = (respuesta) => {
  productos = respuesta;
  const container = $("#3erContainer");
  container.innerHTML = "";

  productos.forEach((producto, indice) => {
    let tarj = document.createElement("div");
    tarj.classList.add("tarj");
    let html = `
  <img src="${producto.imagen}" class="tarj__img" alt="...">
  <div class="tarj__body">
    <h4 class="tarj__titulo">${producto.nombre}</h4>
    <p class="tarj__precio">$ARS ${producto.precio}</p>
    <button href="#cart" class="tarj__btn" onClick="agregarAlCarrito(${indice})">Comprar</button>
  </div>
  `;
    tarj.innerHTML = html;
    container.append(tarj);
  });
};

let carrito = document.getElementById("cart");

const armarCarrito = () => {
  let total = 0;
  carrito.className = "cart";
  carrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      const containerCarrito = document.createElement("div");
      containerCarrito.className = "productoDelCarrito";
      containerCarrito.innerHTML = `
      <img class="imgCarrito" src="${producto.imagen}">
      <div class="infoCarrito" >${producto.nombre}</div>
      <div class="infoCarrito" > Cantidad: ${producto.cantidad}</div>
      <div class="infoCarrito"> Precio: $ARS ${producto.precio}</div>
      <div class="infoCarrito"> Subtotal: $ARS ${
        producto.precio * producto.cantidad
      }</div>
      <button class="btnCarrito" onClick="quitarProducto(${indice})">Quitar producto</button>`;
      carrito.appendChild(containerCarrito);
    });
    const containerTotal = document.createElement("div");
    containerTotal.className = "carrito__total";
    containerTotal.innerHTML = `
    <div class= "total"> TOTAL: $ARS ${total}</div>
    <button class= "btn btn-danger finalizar" id="finalizar" onClick="terminarCompra()"> FINALIZAR COMPRA </button>`;
    carrito.appendChild(containerTotal);
  } else {
    carrito.classList.remove("cart");
  }
};

let cart = [];

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  armarCarrito();
}

const quitarProducto = (indice) => {
  cart.splice(indice, 1);
  actualizarStorage(cart);
  armarCarrito();
};

const agregarAlCarrito = (indiceProducto) => {
  const indiceEnElCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indiceProducto].id;
  });
  if (indiceEnElCarrito === -1) {
    const agregarProducto = productos[indiceProducto];
    agregarProducto.cantidad = 1;
    cart.push(agregarProducto);
    actualizarStorage(cart);
    armarCarrito();
  } else {
    cart[indiceEnElCarrito].cantidad += 1;
    actualizarStorage(cart);
    armarCarrito();
  }
};

const actualizarStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const terminarCompra = () => {
  carrito.innerHTML = "";
  const compraTerminada = `<div class="formularioCompra"><h3>Ingrese su informacion</h3>
  <div class="formContainer__compra">
  <div class="formContainer__item">
  <label>Nombre</label>
  <input type="text" id="nombre" placeholder="Nombre" required>
  </div>
  <div class="formContainer__item">
  <label>Apellido</label>
  <input type="text" id="apellido" placeholder="Apellido" required>
  </div>
  <div class="formContainer__item">
  <label>Cuenta de Paypal</label>
  <input type="text" id="payPal" placeholder="Cuenta de PayPal" required>
  </div>
  <div class="formContainer__item">
  <label>Cuenta de Steam</label>
  <input type="text" id="steam" placeholder="Cuenta de Steam" required>
  </div>
  <button type="button" class="formContainer__btn" onClick="mensajeCompraTerminada()">Confirmar</button>
  </div></div> `;
  carrito.innerHTML = compraTerminada;
};

const mensajeCompraTerminada = () => {
  const nombreCliente = document.getElementById("nombre").value;
  carrito.innerHTML = "";
  let texto = `<p class="textoFinal">Gracias por confiar en nosotros ${nombreCliente}, en breve le llegaran sus objetos a su cuenta</p>`;
  carrito.innerHTML = texto;
};

/* Calculador de pormedios */

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
    <i class="fas fa-cart-arrow-down fa-3x"></i>
    <p>Tienda de cajas de Counter Strike a su disposicion</p>
  </div>`);

$("#sliderBanner2").append(`
  <div id="sliderTransparente2" class="slider2">
    <i class="fas fa-clock fa-3x"></i>
    <p>Facil y rapido de usar</p>
  </div>`);

$("#sliderBanner3").append(`
  <div id="sliderTransparente3" class="slider3">
    <i class="fas fa-globe fa-3x"></i>
    <p>Totalmente en linea, sin necesidad de descargar nada</p>
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
