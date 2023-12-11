header =document.getElementById("header")
header.innerHTML = `<nav>
                        <ul>
                            <li><a href="#"><img src="./img/Filmopolis.png" alt="logo-FilmoPolis" width="120"></a></li>
                            <li><a href="peliculas.html"><i class='bx bx-movie icono'></i>Catalogo</a></li>
                            <li><a href="index.html" class="logout"><i class='bx bx-log-out'></i>Log out</a></li>
                        </ul>
                    </nav>`

footer = document.getElementById("footer") 
footer.innerHTML = `<img class="footer-logo" src="./img/Filmopolis.png" alt="logo-FilmoPolis" width="110">
<a href="https://github.com/Franco-Schendel/CRUD-ProyectoFinal" target="_blank"><i class='bx bxl-github icono'></i></a>
<span>Copyright &copy 2023 Filmópolis</span>`
