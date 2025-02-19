// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Variables globales
const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/; // Expresión regular para permitir solo letras y espacios
let listaAmigos = [];

// Elementos HTML
const nuevoNombre = document.getElementById("nuevoNombreAmigo");
const imprimirAmigos = document.getElementById("listaAmigos");
const imprimirSorteado = document.getElementById("resultado");
const botonAgregar = document.getElementById("botonAgregarAmigo");
const botonSortear = document.getElementById("botonSortearAmigo");


// Constantes para mensajes de error
const ERROR_NOMBRE_VACIO = "Por favor, inserte un nombre.";
const ERROR_CARACTERES_INVALIDOS =
  "El nombre no debe llevar números o caracteres especiales.";
const ERROR_NOMBRE_CORTO = "Por favor, inserte al menos 3 letras.";
const ERROR_NOMBRE_DUPLICADO =
  "El nombre ya se encuentra en la lista de amigos.";

// Eventos
document.addEventListener("DOMContentLoaded", function () {
  nuevoNombre.focus();
  nuevoNombre.addEventListener("input", actualizarEstadoBoton);
  document
    .getElementById("nuevoNombreAmigo")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter" && nuevoNombre.value.trim() !== "") {
        agregarAmigo();
      } else if (e.key === "Enter" && nuevoNombre.value.trim() === "") {
        sortearAmigo();
      }
    });
  
});

// Funciones
function agregarAmigo() {
  let inputNombre = nuevoNombre.value.trim();
  console.log("Agregando amigo...");
  if (verificarNombre(inputNombre)) {
    console.log("Paso la verificacion nombre.");
    listaAmigos.push(capitalizarNombre(inputNombre));
    actualizarLista();
    nuevoNombre.focus();
    nuevoNombre.value = "";
    botonSortear.disabled = false;
    botonSortear.style.backgroundColor = "#fe652b";
    botonAgregar.style.backgroundColor = "#c4c4c4";
    actualizarEstadoBoton();
  }
}

function verificarNombre(nombre) {
  if (nombre === "") {
    mostrarAlerta(ERROR_NOMBRE_VACIO);
    console.error(ERROR_NOMBRE_VACIO);
    return false;
  }
  if (!regex.test(nombre)) {
    mostrarAlerta(ERROR_CARACTERES_INVALIDOS);
    console.error(ERROR_CARACTERES_INVALIDOS);
    return false;
  }
  if (nombre.length < 3) {
    mostrarAlerta(ERROR_NOMBRE_CORTO);
    console.error(ERROR_NOMBRE_CORTO);
    return false;
  }
  if (listaAmigos.includes(capitalizarNombre(nombre))) {
    mostrarAlerta(ERROR_NOMBRE_DUPLICADO);
    console.error(ERROR_NOMBRE_DUPLICADO);
    return false;
  }
  return true;
}

function capitalizarNombre(str) {
  const excepciones = ["de", "la", "del", "y", "van", "los"];
  return str
    .split(" ")
    .map((palabra) => {
      if (excepciones.includes(palabra.toLowerCase())) {
        return palabra.toLowerCase();
      }
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    })
    .join(" ");
}

async function quitarAmigo(amigo) {
  let resultado = await pedirConfirmacion(
    `¿Estás seguro de eliminar a ${amigo}?`
  );
  if (resultado.isConfirmed) {
    listaAmigos = listaAmigos.filter((a) => a !== amigo);
    actualizarLista();
    console.log(`Amigo eliminado: ${amigo}`);
    console.log(`Lista actualizada: ${listaAmigos.join(", ")}`);

    if (listaAmigos.length === 0) {
      botonSortear.disabled = true;
      botonSortear.style.backgroundColor = "gray";
    }
  }
}

function actualizarLista() {
  imprimirAmigos.innerHTML = listaAmigos
  .map(
    (amigo) =>
      ` <li class="animate__animated animate__rubberBand">
          
          <span> ${amigo}</span>
          <i class="icono fa fa-trash fa-1x" aria-hidden="true" onclick="quitarAmigo('${amigo}')"></i>
        </li>`
  )
  .join("");
  console.log(`Lista actualizada: ${listaAmigos.join(", ")}`);
}

function sortearAmigo() {
  if (listaAmigos.length > 1) {
    const amigoSorteado = Math.floor(Math.random() * listaAmigos.length);
    imprimirSorteado.innerHTML = `¡Tu amigo secreto es: ${listaAmigos[amigoSorteado]}!`;
    mostrarAlerta(
      `¡Tu amigo secreto es:
      ${listaAmigos[amigoSorteado]}!`,
      "success"
    );
    console.log(`¡Tu amigo secreto es: ${listaAmigos[amigoSorteado]}!`);
    mostrarConfetti();
  } else if (listaAmigos.length === 1) {
    mostrarAlerta("Debe tener al menos 2 amigos para sortear.");
    console.error("Debe tener al menos 2 amigos para sortear.");
  } else {
    mostrarAlerta("No hay nombres en la lista de amigos.");
    console.error("No hay nombres en la lista de amigos.");
  }
}

function actualizarEstadoBoton() {
  let inputNombre = nuevoNombre.value.trim();
  if (
    inputNombre.length >= 3 &&
    regex.test(inputNombre) &&
    !listaAmigos.includes(capitalizarNombre(inputNombre))
  ) {
    botonAgregar.style.backgroundColor = "#4CdF50";
    botonAgregar.classList.add("entrada-valida");
    nuevoNombre.classList.add("entrada-valida");
  } else {
    botonAgregar.style.backgroundColor = "#C4C4C4";
    botonAgregar.classList.remove("entrada-valida");
    nuevoNombre.classList.remove("entrada-valida");
  }
}

function mostrarAlerta(mensaje, tipo = "info") {
  Swal.fire({
    title: mensaje,
    icon: tipo,
    confirmButtonText: "OK",
  });
}

function pedirConfirmacion(mensaje) {
  return Swal.fire({
    title: mensaje,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
}


function reiniciarJuego() {
  location.reload();
}
