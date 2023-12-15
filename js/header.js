header = document.getElementById("header")
header.innerHTML = `<nav>
                        <ul class="menu-normal">
                            <li><a href="#"><img src="./img/Filmopolis.png" alt="logo-FilmoPolis" width="120"></a></li>
                            <li class="pelis"><a href="peliculas.html"><i class='bx bx-movie icono'></i>Lista Peliculas</a></li>
                            <li><span href="index.html" class="logout" id="logout"><i class='bx bx-log-out'></i>Log out</span></li>
                        </ul>
                        <ul class="menu-hamburguesa">
                            <li><a href="#"><img src="./img/Filmopolis.png" alt="logo-FilmoPolis" width="120"></a></li>
                            <li id="hamburguesa"><i class='bx bx-menu icono hamburguesa'></i></li>
                        </ul>
                    </nav>`



logout = document.getElementById("logout")

logout.addEventListener("click", ()=>{
    localStorage.clear()
    window.location.href="index.html"
})

hamburguesa = document.getElementById("hamburguesa")
let menu_visible = false

hamburguesa.addEventListener("click", ()=>{
    menu_visible = !menu_visible
    if(menu_visible) {
        hamburguesa.innerHTML = "<i class='bx bx-menu icono hamburguesa'></i>"
    } else{ 
        hamburguesa.innerHTML += `<div class="contenido-hamburguesa">
                                <ul>
                                    <li><a href="peliculas.html"><i class='bx bx-movie icono'></i>Lista Peliculas</a></li>
                                    <li><span href="index.html" class="logout" id="logout"><i class='bx bx-log-out'></i>Log out</span></li>
                                </ul>
                                </div>`
    }
})