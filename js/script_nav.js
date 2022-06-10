"use strict"
let elementoMenu
let elementoCuriosidad

document.addEventListener("DOMContentLoaded", function() {
    elementoMenu = document.querySelector(".nav_bar")
    elementoCuriosidad = document.querySelector(".cont_opcional")

    document.querySelector(".btn_menu_nav").addEventListener("click", function() {
        toggleShow(elementoMenu);
    });

    document.querySelector(".btn_cont_opcional").addEventListener("click", function() {
        toggleShow(elementoCuriosidad);
    });

})

function toggleShow(elemento){
    elemento.classList.toggle("show");
}
