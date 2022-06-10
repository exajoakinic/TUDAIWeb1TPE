"use strict"
let tableMenuTbody
let formulario
let menu = [
    {
        "nombre": "Lasagna",
        "precio": 350,
        "origen": "Italia",
        "apto_veg": false,
        "apto_celiacos": false
    },
    {
        "nombre": "Pizza Napolitana",
        "precio": 370,
        "origen": "Italia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Calzone de Verdura",
        "precio": 280,
        "origen": "Italia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Bruschetta",
        "precio": 330,
        "origen": "Italia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Ratatouille",
        "precio": 500,
        "origen": "Italia",
        "apto_veg": true,
        "apto_celiacos": true
    },
    {
        "nombre": "Briami Grigo",
        "precio": 540,
        "origen": "Grecia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Musaka",
        "precio": 290,
        "origen": "Grecia",
        "apto_veg": false,
        "apto_celiacos": false
    },
    {
        "nombre": "Risotto",
        "precio": 360,
        "origen": "Grecia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Albondigas Con Salsa de Limón",
        "precio": 450,
        "origen": "Grecia",
        "apto_veg": false,
        "apto_celiacos": false
    },
    {
        "nombre": "Ensalada César Sin Gluten",
        "precio": 520,
        "origen": "México",
        "apto_veg": false,
        "apto_celiacos": true
    },
    {
        "nombre": "Gazpacho Andaluz Tradicional",
        "precio": 330,
        "origen": "España",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Falafel",
        "precio": 390,
        "origen": "India",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Bacalao Dorado",
        "precio": 600,
        "origen": "Portugal",
        "apto_veg": false,
        "apto_celiacos": true
    }
];

document.addEventListener("DOMContentLoaded", function() {
    tableMenuTbody = document.querySelector("#table-menu tbody");
    formulario = document.querySelector("#form_menu");
    inicializarTabla();
    formulario.btn_agregar.addEventListener("click", function () {
        if (formulario.reportValidity()) {
            addFormAsRow();
        }
    });
    formulario.btn_agregarx3.addEventListener("click", function () {
        if (formulario.reportValidity()) {
            for (let i = 0; i < 3; i++) {
                addFormAsRow();
            }
        }
    });
    formulario.btn_limpiar.addEventListener("click", function () {
        tableMenuTbody.innerHTML="";
        menu = [];
    });
});

// FUNCIONES INICIALIZACIÓN Y LLENADO DE TABLA DESDE JSON
function inicializarTabla() {
    let filas = "";

    for (let elem of menu) {
        if (elem.origen == "Italia") {
            filas+= "<tr class='fila_resaltada'>"
        } else {
            filas+= "<tr>"
        }
        filas += htmlMenuRow(elem) + "</tr>";
    }
    tableMenuTbody.innerHTML = filas;
}
function htmlMenuRow(plato) {
    let r 
    r = "<td>" + plato.nombre + "</td>";
    r += "<td>$" + plato.precio + "</td>";
    r += "<td>" + htmlCampoOrigen(plato.origen) + "</td>";
    r += "<td>" + htmlCampoApto(plato) + "</td>";
    return r
}
function htmlCampoOrigen(origen) {
    //origen debe estar en minúsicolas para que tome correctamente la clase:
    let pais = origen.toLowerCase();
    //Necesario para el caso de 'méxico' que debe quedar 'mexico'
    pais = eliminarAcentos(pais);
    //Vamos almacenando en lo que va a devolver la función
    let r = "<span class='origen origen_" + pais + "' title='" + origen + "'>";
    r += origen;
    r += "</span>";
    
    //Devuelvemos el valor de r, con el html del campo origen
    return r;
}

//Se generó por 'méxico' que debía quedar 'mexico'
function eliminarAcentos(s) {
    s = s.replace("á", "a");
    s = s.replace("é", "e");
    s = s.replace("í", "i");
    s = s.replace("ó", "o");
    s = s.replace("ú", "u");
    return s;
}

function htmlCampoApto(plato) {
    //Vamos almacenando en lo que va a devolver la función
    let r = "";
    if (plato.apto_veg) {
        r += "<span class='apto apto_veg' title='Vegetarianos'>";
        r += "Vegetarianos";
        r += "</span>";
    }
    
    if (plato.apto_celiacos) {
        r += "<span class='apto apto_celiacos' title='Celiacos'>";
        r += "Celiacos";
        r += "</span>";
    }
    
    return r;
}
// FIN FUNCIONES INICIALIZACIÓN Y LLENADO DE TABLA DESDE JSON

function addFormAsRow() {
    let plato = {
        "nombre": formulario.nombre.value,
        "precio": formulario.precio.value,
        "origen": formulario.origen.value,
        "apto_veg": formulario.apto_veg.checked,
        "apto_celiacos": formulario.apto_celiacos.checked
    };
    addToTable(plato);
}
function addToTable(plato) {
    let fila = document.createElement("tr");
    fila.innerHTML  = htmlMenuRow(plato);
    if (plato.origen=="Italia") {
        fila.classList.add("fila_resaltada");
    }
    menu.push(plato);
    tableMenuTbody.appendChild(fila);
}