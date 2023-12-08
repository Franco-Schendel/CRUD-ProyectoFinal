// script.js
let url = "https://francoschendel.pythonanywhere.com"
document.getElementById("header").innerHTML = `
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand">Navbar</a>
      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
              <li class="nav-item dropdown">
                  <a class="nav-link" href="#">CRUD</a>
              </li>
          </ul>
          <form id="searchForm" class="d-flex my-2 my-lg-0">
              <input class="form-control me-sm-2" type="text" placeholder="Search">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
      </div>
    </div>
  </nav>
`;  

document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const contenidoTabla = document.getElementById("tableBody") 
  let busqueda = document.getElementById("searchForm").querySelector("input").value;
  busqueda = formatear(busqueda)
  contenidoTabla.innerHTML = ""
  fetch(url + "/peliculas")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let titulo
        let j
        for(let i = 0; i < data.length; i++) {
            j = 0
            titulo = data[i].nombre
            titulo = formatear(titulo)
            while(j != -1 && j < busqueda.length) {
                busqueda[j] == titulo[j]? j++ : j = -1
            }
            if(j != -1) {
                contenidoTabla.innerHTML += `
                <tr class=""  v-for="pelicula in peliculas">
                    <td scope="row">${data.id}</td>
                    <td>${data[i].nombre}</td>
                    <td>${data[i].descripcion}</td>
                    <td>
                        <img width="60" src="${data[i].imagen}" alt="${data[i].nombre}">
                    </td>
                    <td>
                <a class="btn btn-primary" :href="'pelicula_update.html?id='+ pelicula.id" >Editar</a>
                        <button type="button" class="btn btn-danger" v-on:click="eliminar(${data[i].id})" >Eliminar</button>
                    </td>
                </tr>`
            }
        }
    })
    .catch(err => {
        console.error(err);          
    })
});

function formatear(cadena) {
    cadena = cadena.toLowerCase()
    return cadena.replace(/\s/g, '');
}