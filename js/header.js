header =document.getElementById("header")
header.innerHTML = `<nav>
                        <ul>
                            <li><a href="#"><img src="./img/Filmopolis.png" alt="logo-FilmoPolis" width="120"></a></li>
                            <li><a href="peliculas.html"><i class='bx bx-movie icono'></i>Catalogo</a></li>
                            <li><span href="index.html" class="logout"><i class='bx bx-log-out'></i>Log out</span></li>
                        </ul>
                    </nav>`

header.addEventListener("click", ()=>{
    localStorage.clear()
    window.location.href="index.html"
})
