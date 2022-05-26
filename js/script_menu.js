let menu = [
    {   "plato" :"Lasagna",
        "precio":"350",
        "origen":"Italia",
        "apto"  :{  "vegetarianos":false,
                    "celiacos":false}
    },
    {   "plato" :"Pizza Napolitana",
        "precio":"370",
        "origen":"Italia",
        "apto"  :{  "vegetarianos":true, 
                    "celiacos":false}
    },
    {   "plato" :"Calzone de Verdura",
        "precio":"280",
        "origen":"Italia",
        "apto"  :{  "vegetarianos":true, 
                    "celiacos":false}
    },
    {   "plato" :"Bruschetta",
        "precio":"330",
        "origen":"Italia",
        "apto"  :{  "vegetarianos":true, 
                    "celiacos":false}
    },
    {   "plato" :"Ratatouille",
        "precio":"500",
        "origen":"Italia",
        "apto"  :{  "vegetarianos":true, 
                    "celiacos":true}
    },
    {   "plato" :"Briami Grigo",
        "precio":"540",
        "origen":"Grecia",
        "apto"  :{  "vegetarianos":true, 
                    "celiacos":false}
    },
    {   "plato" :"Musaka",
        "precio":"290",
        "origen":"Grecia",
        "apto"  :{  "vegetarianos":false, 
                    "celiacos":false}
    },
    {   "plato" :"Risotto",
        "precio":"360",
        "origen":"Grecia",
        "apto"  :{  "vegetarianos":true, 
                    "celiacos":false}
    },
    {   "plato" :"Albondigas Con Salsa de Limón",
        "precio":"450",
        "origen":"Grecia",
        "apto"  :{  "vegetarianos":false, 
                    "celiacos":false}
    },
    {   "plato" :"Ensalada César Sin Gluten",
        "precio":"520",
        "origen":"Grecia",
        "apto"  :{  "vegetarianos":false, 
                    "celiacos":true}
    },
    {   "plato" :"Gazpacho Andaluz Tradicional",
        "precio":"330",
        "origen":"España",
        "apto"  :{  "vegetarianos":true, 
                    "celiacos":false}
    },
    {   "plato" :"Falafel",
        "precio":"390",
        "origen":"India",
        "apto"  :{  "vegetarianos":true, 
                    "celiacos":false}
    },
    {   "plato" :"Bacalao Dorado",
        "precio":"600",
        "origen":"Portugal",
        "apto"  :{  "vegetarianos":false, 
                    "celiacos":true}
    }
];

let tableMenuTbody = document.querySelector("#table-menu tbody");
inicializarTabla()

function inicializarTabla() {
    let filas = "";
    for (elem of menu) {
        console.table(elem);
        filas += htmlMenuRow(elem);
    }
    tableMenuTbody.innerHTML = filas;
}
function htmlMenuRow(plato) {
    //Vamos almacenando en lo que va a devolver la función
    let r="<tr>";
    r+="<td>" + plato.plato + "</td>";
    r+="<td>$" + plato.precio + "</td>";
    r+="<td>" + htmlCampoOrigen(plato.origen) + "</td>";
    r+="<td>" + htmlCampoApto(plato.apto) + "</td>";
    
    //Devuelvemos el valor de r, con el html de la fila
    return r;
}
function htmlCampoOrigen(origen) {
    //origen debe estar en minúsicolas para que tome correctamente la clase:
    pais = origen.toLowerCase();
    
    //Vamos almacenando en lo que va a devolver la función
    let r="<span class='origen origen_" + pais + "' title='" + origen + "'>";
    r += origen;
    r += "</span>";

    //Devuelvemos el valor de r, con el html del campo origen
    return r;

}
function htmlCampoApto(apto) {
    //Vamos almacenando en lo que va a devolver la función
    let r="";
    if (apto.vegetarianos) {
        r += "<span class='apto apto_veg' title='Vegetarianos'>";
        r += "Vegetarianos";
        r += "</span>";
    }

    if (apto.celiacos) {
        r += "<span class='apto apto_celiacos' title='Celiacos'>";
        r += "Celiacos";
        r += "</span>";
    }

    return r;
}
