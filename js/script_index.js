"use strict"

document.addEventListener("DOMContentLoaded", function() {
    let pregunta = document.querySelector("#label_captcha");
    let respuesta = document.querySelector("#respuesta_captcha");
    let sumaCaptcha;
    randomizeCaptcha();


    function randomizeCaptcha (){
        let n1 = Math.floor(Math.random() * 100 + 1 );
        let n2 = Math.floor(Math.random() * 100 + 1);
        sumaCaptcha = n1 + n2;
        pregunta.innerHTML = "Ingrese la suma de " + n1 + " y " + n2;
    }

    let mensajeAlEnviar = document.querySelector("#mensaje_al_enviar");
    validarFormulario();

    document.querySelector("#form_contacto").addEventListener("submit", function(e) {
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
        else{
            mensajeAlEnviar.innerHTML ="Respuesta de captcha inválida. El formulario no se ha enviado";
            mensajeAlEnviar.classList.remove("captchaOK");
            mensajeAlEnviar.classList.add("captchaBad");
            randomizeCaptcha();
            }    
    }


    document.querySelector(".btn_responsive").addEventListener("click", showNav);

    function showNav(event) {
        event.preventDefault();
        document.querySelector(".nav_bar").classList.toggle("show");
    }

    document.querySelector(".curiosidad").addEventListener("click",mostrarCuriosidad);

    function mostrarCuriosidad(event){
        event.preventDefault();
        document.querySelector(".cont_opcional").classList.toggle("mostrar");

    }
})
