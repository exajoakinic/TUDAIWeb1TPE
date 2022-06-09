"use strict"

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