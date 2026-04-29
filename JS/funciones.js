// =========================
//   ESTADO GLOBAL
// =========================
let imagenActual = "reina.png";
let contador = 0;
let solActual = 0;   // índice en SOLUCIONES (0-based)

// Las 92 soluciones del problema de las 8 reinas
// Cada array: columna de la reina en la fila [0..7]
const SOLUCIONES = [
    [0,4,7,5,2,6,1,3],[0,5,7,2,6,3,1,4],[0,6,3,5,7,1,4,2],[0,6,4,7,1,3,5,2],
    [1,3,5,7,2,0,6,4],[1,4,6,0,2,7,5,3],[1,4,6,3,0,7,5,2],[1,5,0,6,3,7,2,4],
    [1,5,7,2,0,3,6,4],[1,6,2,5,7,4,0,3],[1,6,4,7,0,3,5,2],[1,7,5,0,2,4,6,3],
    [2,0,6,4,7,1,3,5],[2,4,1,7,0,6,3,5],[2,4,1,7,5,3,6,0],[2,4,6,0,3,1,7,5],
    [2,4,7,3,0,6,1,5],[2,5,1,4,7,0,6,3],[2,5,1,6,0,3,7,4],[2,5,3,0,7,4,6,1],
    [2,5,3,1,7,4,6,0],[2,5,7,0,3,6,4,1],[2,5,7,0,4,6,1,3],[2,5,7,1,3,0,6,4],
    [2,6,1,7,4,0,3,5],[2,6,1,7,5,3,0,4],[2,7,3,6,0,5,1,4],[3,0,4,7,1,6,2,5],
    [3,0,4,7,5,2,6,1],[3,1,4,7,5,0,2,6],[3,1,6,2,5,7,0,4],[3,1,6,2,5,7,4,0],
    [3,1,6,4,0,7,5,2],[3,1,7,4,6,0,2,5],[3,1,7,5,0,2,4,6],[3,5,0,4,1,7,2,6],
    [3,5,7,1,6,0,2,4],[3,6,0,7,4,1,5,2],[3,6,2,7,1,4,0,5],[3,6,4,1,5,0,2,7],
    [3,6,4,2,0,5,7,1],[3,7,0,2,5,1,6,4],[3,7,0,4,6,1,5,2],[3,7,4,2,0,6,1,5],
    [4,0,3,5,7,1,6,2],[4,0,7,3,1,6,2,5],[4,0,7,5,2,6,1,3],[4,1,3,5,7,2,0,6],
    [4,1,3,6,2,7,5,0],[4,1,5,0,6,3,7,2],[4,1,7,0,3,6,2,5],[4,2,0,5,7,1,3,6],
    [4,2,0,6,1,7,5,3],[4,2,7,3,6,0,5,1],[4,6,0,2,7,5,3,1],[4,6,0,3,1,7,5,2],
    [4,6,1,3,7,0,2,5],[4,6,1,5,2,0,3,7],[4,6,1,5,2,0,7,3],[4,6,3,0,2,7,5,1],
    [4,7,3,0,2,5,1,6],[4,7,3,0,6,1,5,2],[5,0,4,1,7,2,6,3],[5,1,6,0,2,4,7,3],
    [5,1,6,0,3,7,4,2],[5,2,0,6,4,7,1,3],[5,2,0,7,3,1,6,4],[5,2,0,7,4,1,3,6],
    [5,2,4,6,0,3,1,7],[5,2,4,7,0,3,1,6],[5,2,6,1,3,7,0,4],[5,2,6,1,7,4,0,3],
    [5,2,6,3,0,7,1,4],[5,3,0,4,7,1,6,2],[5,3,1,7,4,6,0,2],[5,3,6,0,2,4,1,7],
    [5,3,6,0,7,1,4,2],[5,7,1,3,0,6,4,2],[6,0,2,7,5,3,1,4],[6,1,3,0,7,4,2,5],
    [6,2,0,5,7,4,1,3],[6,2,7,1,4,0,5,3],[6,3,1,4,7,0,2,5],[6,3,1,7,5,0,2,4],
    [6,4,2,0,5,7,1,3],[7,1,3,0,6,4,2,5],[7,1,4,2,0,6,3,5],[7,2,0,5,1,4,6,3],
    [7,3,0,2,5,1,6,4],[7,4,2,5,1,6,0,3]
];

// =========================
//   GENERAR TABLERO
// =========================
function generarTablero() {
    const table = document.getElementById("tablero");
    table.innerHTML = "";

    for (let r = 0; r < 8; r++) {
        const tr = document.createElement("tr");
        for (let c = 0; c < 8; c++) {
            const td = document.createElement("td");
            td.addEventListener("click",      () => cellClick(td));
            td.addEventListener("mouseover",  () => cambiar(r, c));
            td.addEventListener("mouseleave", () => limpiar());
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    generarIconosInferiores();
}

// =========================
//   ÍCONOS INFERIORES
// =========================
function generarIconosInferiores() {
    const cont = document.getElementById("reinas-disponibles");
    cont.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        const div = document.createElement("div");
        div.className = "reina-ico";
        div.id = `ico-${i}`;
        div.style.backgroundImage = `url("IMG/${imagenActual}")`;
        cont.appendChild(div);
    }
}

function actualizarIconos() {
    for (let i = 0; i < 8; i++) {
        const ico = document.getElementById(`ico-${i}`);
        if (!ico) continue;
        ico.style.backgroundImage = `url("IMG/${imagenActual}")`;
        ico.classList.toggle("usada", i < contador);
    }
}

// =========================
//   CLICK EN CELDA
// =========================
function cellClick(celda) {
    if (!celda.classList.contains("reina")) {
        if (contador < 8) {
            // Insertar img directamente en lugar de usar ::before
            const img = document.createElement("img");
            img.src = `IMG/${imagenActual}`;
            img.className = "img-reina";
            celda.appendChild(img);
            celda.classList.add("reina");
            contador++;
            actualizarIconos();
        }
    } else {
        celda.querySelector(".img-reina")?.remove();
        celda.classList.remove("reina");
        contador--;
        actualizarIconos();
    }
}


// =========================
//   HOVER
// =========================
function cambiar(r, c) {
    const table = document.getElementById("tablero");
    limpiar();

    const marcar = (row, col) => {
        if (row >= 0 && row < 8 && col >= 0 && col < 8)
            table.rows[row].cells[col].classList.add("hover-mark");
    };

    for (let i = 0; i < 8; i++) {
        marcar(r, i);
        marcar(i, c);
    }
    // diagonales
    for (let d = -7; d <= 7; d++) {
        marcar(r + d, c + d);
        marcar(r + d, c - d);
    }
}

function limpiar() {
    document.querySelectorAll(".hover-mark").forEach(td => td.classList.remove("hover-mark"));
}

// =========================
//   ELEGIR TIPO DE REINA
// =========================
function elegirReina(nombre, btn) {
    imagenActual = nombre;
    document.querySelectorAll(".btn-reina").forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");

    // Actualizar imágenes ya colocadas
    document.querySelectorAll(".img-reina").forEach(img => {
        img.src = `IMG/${nombre}`;
    });

    actualizarIconos();
}

// =========================
//   COLORES DEL TABLERO
// =========================
function cambiarColor1(valor) {
    document.documentElement.style.setProperty("--color-celda1", valor);
}
function cambiarColor2(valor) {
    document.documentElement.style.setProperty("--color-celda2", valor);
}

// =========================
//   REINICIAR
// =========================
function reiniciarTablero() {
    const table = document.getElementById("tablero");
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const td = table.rows[r].cells[c];
            td.classList.remove("reina");
            td.style.removeProperty("--img-reina");
            td.querySelector(".img-reina")?.remove(); // ← agrega esta línea
        }
    }
    contador = 0;
    limpiar();
    actualizarIconos();
}
// =========================
//   SOLUCIONES (92)
// =========================
function actualizarContador() {
    document.getElementById("sol-counter").textContent =
        `${solActual + 1} / ${SOLUCIONES.length}`;
}

function mostrarSolucionActual() {
    reiniciarTablero();
    const sol = SOLUCIONES[solActual];
    const table = document.getElementById("tablero");
    sol.forEach((col, row) => {
        const td = table.rows[row].cells[col];
        cellClick(td);
    });
}

function solAnterior() {
    solActual = (solActual - 1 + SOLUCIONES.length) % SOLUCIONES.length;
    actualizarContador();
    mostrarSolucionActual();
}

function solSiguiente() {
    solActual = (solActual + 1) % SOLUCIONES.length;
    actualizarContador();
    mostrarSolucionActual();
}

// =========================
//   INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
    generarTablero();
    actualizarContador();
});
