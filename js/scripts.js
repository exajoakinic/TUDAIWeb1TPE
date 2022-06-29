"use strict"


// --------------------------------- MENU NAV ----------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    let elementosMenu = document.querySelector(".nav_bar");
    let dinamicBodyContent = document.querySelector("#dinamicBodyContent");

    document.querySelector(".btn_menu_nav").addEventListener("click", function () {
        elementosMenu.classList.toggle("show");
    });

    document.querySelector("#nav_opt_home").addEventListener("click", click_nav_opt_home);
    document.querySelector("#nav_opt_menu").addEventListener("click", click_nav_opt_menu);
    document.querySelector("#nav_opt_ubicacion").addEventListener("click", click_nav_opt_ubicacion);
    document.querySelector("#nav_opt_form_contacto").addEventListener("click", click_nav_opt_form_contacto);

    click_nav_opt("./home.html", inicializarHome);
})


function click_nav_opt_home() {
    click_nav_opt("./home.html", inicializarHome);
};

function click_nav_opt_menu() {
    click_nav_opt("./menu.html", inicializarMenu);
};

function click_nav_opt_ubicacion() {
    click_nav_opt("./ubicacion.html", null);
};

function click_nav_opt_form_contacto() {
    if (document.querySelector("#form_contacto")) {
        window.location.href = "#form_contacto";
    } else {
        click_nav_opt("./home.html", function () {
            inicializarHome();
            window.location.href = "#form_contacto";
        })
    }
};

async function click_nav_opt(url, funcionInicializar) {

    const contenido_error = "<div class='content'>Error al cargar la página</div>"

    fetch(url)
        .then(response => {
            if (response.ok) {
                response.text().then(text => {
                    dinamicBodyContent.innerHTML = text;
                    refrescarVerCuriosidad();
                    if (funcionInicializar) { //Llama a la función sólo si fue pasada por parámetro
                        funcionInicializar();
                    }
                })
            } else {
                dinamicBodyContent.innerHTML = contenido_error;
            }
        })

        .catch(response => {
            dinamicBodyContent.innerHTML = contenido_error;
        })
}

function refrescarVerCuriosidad() {
    let cont_opcional = document.querySelector(".btn_cont_opcional")
    if (cont_opcional) { //verifica cont_opcional no sea null para no generar error
        cont_opcional.addEventListener("click", function () {
            document.querySelector(".cont_opcional").classList.toggle("show");
        });
    }
}


// --------------------------------- HOME ----------------------------------------------

function inicializarHome() {
    let pregunta = document.querySelector("#label_captcha");
    let respuesta = document.querySelector("#respuesta_captcha");
    let sumaCaptcha;
    let btn = document.querySelector(".btn_submit");
    randomizeCaptcha();


    function randomizeCaptcha() {
        let n1 = Math.floor(Math.random() * 100 + 1);
        let n2 = Math.floor(Math.random() * 100 + 1);
        sumaCaptcha = n1 + n2;
        pregunta.innerHTML = "Ingrese la suma de " + n1 + " y " + n2;
    }

    let mensajeAlEnviar = document.querySelector("#mensaje_al_enviar");

    document.querySelector("#form_contacto").addEventListener("submit", function (e) {
        e.preventDefault();
        validarFormulario();
    });

    function validarFormulario() {
        if (sumaCaptcha == respuesta.value) {
            mensajeAlEnviar.innerHTML = "Has verificado correctamente el captcha. El formulario se ha enviado correctamente.";
            mensajeAlEnviar.classList.add("captchaOK");
            mensajeAlEnviar.classList.remove("captchaBad");

            btn.disabled = true;
            btn.classList.add("btn_disabled");

        }
        else {
            mensajeAlEnviar.innerHTML = "Respuesta de captcha inválida. El formulario no se ha enviado";
            mensajeAlEnviar.classList.remove("captchaOK");
            mensajeAlEnviar.classList.add("captchaBad");
            randomizeCaptcha();
        }
    }
}

// --------------------------------- MENU ----------------------------------------------
async function inicializarMenu() {
    const urlMockapi = "https://62b88fd6f4cb8d63df5fce28.mockapi.io/api/v1/platos/"
    let tableMenuTbody = document.querySelector("#table-menu tbody");
    let form_agregar_plato = document.querySelector("#form_agregar_plato");
    let form_editar_plato = document.querySelector("#form_editar_plato");   
    let div_form_menu =  document.querySelector(".div_form_menu");   

    form_editar_plato.id.disabled = true;

    recargarTabla(await jsonMenuFromMockapi());

    form_editar_plato.addEventListener("submit", function(e){
        e.preventDefault();
        modificarPlato();
    });
    form_editar_plato.btn_cancelar.addEventListener("click", ocultarEdicionPlato);
    //form_editar_plato.addEventListener("focusout", ocultarEdicionPlato);

    form_agregar_plato.btn_agregar.addEventListener("click", function () {
        if (formulario.reportValidity()) {
            addFormAsRow();
        }
    });
    form_agregar_plato.btn_agregarx3.addEventListener("click", function () {
        if (form_agregar_plato.reportValidity()) {
            for (let i = 0; i < 3; i++) {
                addFormAsRow();
            }
        }
    });
    form_agregar_plato.btn_limpiar.addEventListener("click", async function () {
        try {
            let menu = await jsonMenuFromMockapi();
            for (let plato of menu) {
                deletePlatoFromMenu(plato.id);
            }
            
            recargarTabla(await jsonMenuFromMockapi());
            //corregir con mockapi
        }
        catch(e) {
            console.log("Error al intentar eliminar todos los platos");
            console.log(e);
        }
    });
    
    async function jsonMenuFrom(url) {
        try {
            let res = await fetch(url);
            if (res.ok) {
                let menu = await res.json();
                return menu;
            } else {
                console.log("Error al comunicarse con mockapi / response not ok");
                return [];
            }
        }
        catch (error) {
            console.log("Error al comunicarse con mockapi");
            console.log(error);
            return [];
        }
    }
    async function jsonPlatoFromMockapi(id) {
        return jsonMenuFrom(urlMockapi + id);
    }
    async function jsonMenuFromMockapi() {
        return jsonMenuFrom(urlMockapi);
    }
    async function jsonMenuFromLocal() {
        return jsonMenuFrom("./json/menu.json");
    }
    // FUNCIONES INICIALIZACIÓN Y LLENADO DE TABLA DESDE JSON
    function recargarTabla(menu) {
        for (let plato of menu) {
            let fila = crearFila(plato);
            tableMenuTbody.appendChild(fila);
        }
    };

    //crea la fila y la devuelve, sin agregarla a la tabla
    function crearFila(plato) {
        let fila = document.createElement("tr");
        fila.id = plato.id;
        if (plato.origen == "Italia") {
            fila.classList.add("fila_resaltada");
        }
        fila.innerHTML = htmlMenuRow(plato);
        addButtonsModifyAndDelete(fila, plato);
        return fila;
    }

    function addButtonsModifyAndDelete(fila, plato){
        let celda = document.createElement("td");
        celda.classList.add("btn_row");
        let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Modificar";
        btnEditar.addEventListener("click", function() {
            cargarFormEditarPlato(plato)
        })
        celda.appendChild(btnEditar);
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar";
        celda.appendChild(btnEliminar);
        btnEliminar.addEventListener("click", async function() {
            if (await deletePlatoFromMenu(plato.id)) {
                   tableMenuTbody.removeChild(fila);
                }
        })
        fila.appendChild(celda);
    };

    async function deletePlatoFromMenu(id) {
        try {
            let res = await fetch(urlMockapi + id, {
                method: 'DELETE',
                body : ""
            });
            if (res.ok) {
                console.log("Plato eliminado");
                return true;
            }
        }
        catch {
            console.log("no se pudo eliminar el plato")
            return false;
        }
    }

    async function cargarFormEditarPlato(plato) {
        let f = form_editar_plato;
        f.id.value = plato.id;
        f.nombre.value = plato.nombre;
        f.precio.value = plato.precio;
        f.origen.value = plato.origen;
        f.apto_veg.checked = plato.apto_veg;
        f.apto_celiacos.checked = plato.apto_celiacos;
        div_form_menu.classList.add("mostrar");
        f.nombre.focus(); //llevo el foco al input nombre
    }
    function ocultarEdicionPlato() {
        div_form_menu.classList.remove("mostrar");
    }
    async function modificarPlato() {
            let f = form_editar_plato;
        let plato = {
            "id" : f.id.value,
            "nombre" : f.nombre.value,
            "precio" : f.precio.value,
            "origen" : f.origen.value,
            "apto_veg" : f.apto_veg.checked,
            "apto_celiacos" : f.apto_celiacos.checked
        };

        try {
            let res = await fetch(urlMockapi + plato.id, {
                method: 'PUT',
                body: JSON.stringify(plato),
                headers: {
                    'content-type':'application/json'
                }
            });
            if (res.ok) {
                console.log("Plato actualizado");
                actualizarPlatoEnTabla(plato.id);
            }
        }
        catch {
            console.log("no se pudo actualizar el plato")
        }
    }
    async function actualizarPlatoEnTabla(id) {
        try {
            let plato = await jsonPlatoFromMockapi(id);
            let actualizado = false;
            let fila = tableMenuTbody.firstElementChild;
            while(fila && !actualizado) {
                if (fila.id == id) {
                    actualizado = true;
                    tableMenuTbody.insertBefore(crearFila(plato), fila);
                    tableMenuTbody.removeChild(fila);
                    ocultarEdicionPlato();
                } else {
                    fila = fila.nextElementSibling;
                }

            }
        }
        catch(e) {
            console.log("error al solicitar el plato con id " + id)
            console.log(e);
        }
    }


    function reescribirMockapi() {
        let filas = "";

        for (let elem of menu) {
            if (elem.origen == "Italia") {
                filas += "<tr class='fila_resaltada'>"
            } else {
                filas += "<tr>"
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
        fila.innerHTML = htmlMenuRow(plato);
        if (plato.origen == "Italia") {
            fila.classList.add("fila_resaltada");
        }
        menu.push(plato);
        tableMenuTbody.appendChild(fila);
    }

};

