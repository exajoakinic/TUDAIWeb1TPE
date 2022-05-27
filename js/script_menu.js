let menu = [
    {
        "nombre": "Lasagna",
        "precio": "350",
        "origen": "Italia",
        "apto_veg": false,
        "apto_celiacos": false
    },
    {
        "nombre": "Pizza Napolitana",
        "precio": "370",
        "origen": "Italia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Calzone de Verdura",
        "precio": "280",
        "origen": "Italia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Bruschetta",
        "precio": "330",
        "origen": "Italia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Ratatouille",
        "precio": "500",
        "origen": "Italia",
        "apto_veg": true,
        "apto_celiacos": true
    },
    {
        "nombre": "Briami Grigo",
        "precio": "540",
        "origen": "Grecia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Musaka",
        "precio": "290",
        "origen": "Grecia",
        "apto_veg": false,
        "apto_celiacos": false
    },
    {
        "nombre": "Risotto",
        "precio": "360",
        "origen": "Grecia",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Albondigas Con Salsa de Limón",
        "precio": "450",
        "origen": "Grecia",
        "apto_veg": false,
        "apto_celiacos": false
    },
    {
        "nombre": "Ensalada César Sin Gluten",
        "precio": "520",
        "origen": "Grecia",
        "apto_veg": false,
        "apto_celiacos": true
    },
    {
        "nombre": "Gazpacho Andaluz Tradicional",
        "precio": "330",
        "origen": "España",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Falafel",
        "precio": "390",
        "origen": "India",
        "apto_veg": true,
        "apto_celiacos": false
    },
    {
        "nombre": "Bacalao Dorado",
        "precio": "600",
        "origen": "Portugal",
        "apto_veg": false,
        "apto_celiacos": true
    }
];

let tableMenuTbody = document.querySelector("#table-menu tbody");
inicializarTabla()
// FUNCIONES INICIALIZACIÓN Y LLENADO DE TABLA DESDE JSON
function inicializarTabla() {
    let filas = "";
    for (elem of menu) {
        filas += htmlMenuRow(elem);
    }
    tableMenuTbody.innerHTML = filas;
}
function htmlMenuRow(plato) {
    //Vamos almacenando en lo que va a devolver la función
    let r = "<tr>";
    r += htmlMenuRowWithoutTR(plato);
    r += "</td>"
    //Devuelvemos el valor de r, con el html de la fila
    return r;
}
function htmlMenuRowWithoutTR(plato) {
    let r 
    r = "<td>" + plato.nombre + "</td>";
    r += "<td>$" + plato.precio + "</td>";
    r += "<td>" + htmlCampoOrigen(plato.origen) + "</td>";
    r += "<td>" + htmlCampoApto(plato);
    return r
}
function htmlCampoOrigen(origen) {
    //origen debe estar en minúsicolas para que tome correctamente la clase:
    pais = origen.toLowerCase();

    //Vamos almacenando en lo que va a devolver la función
    let r = "<span class='origen origen_" + pais + "' title='" + origen + "'>";
    r += origen;
    r += "</span>";

    //Devuelvemos el valor de r, con el html del campo origen
    return r;

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

let formulario = document.querySelector("#form_menu");
formulario.addEventListener("submit", function (event) {
    debugger
    event.preventDefault();
    let plato = {
        "nombre": formulario.nombre.value,
        "precio": formulario.precio.value,
        "origen": formulario.origen.value,
        "apto_veg": formulario.apto_veg.checked,
        "apto_celiacos": formulario.apto_celiacos.checked
    };
    addToTable(plato);
});

function addToTable(plato) {
    fila = document.createElement("tr");
    fila.innerHTML  = htmlMenuRowWithoutTR(plato)
    tableMenuTbody.appendChild(fila);
}