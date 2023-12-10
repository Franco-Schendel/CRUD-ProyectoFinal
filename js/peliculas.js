function formatear(cadena) {
    cadena = cadena.toLowerCase()
    return cadena.replace(/\s/g, '');
}

const { createApp } = Vue
  createApp({
    data() {
      return {
        peliculas:[],
        url:'https://francoschendel.pythonanywhere.com',
        error:false,
        cargando:true,
        cargar:true,
        id:0,
        nombre:"", 
        imagen:"",
        descripcion:"",
        categoria:"",
        trailer:"",
        duracion:0,
        buscado:"",
        idioma:"",
        pelicula_seleccionada:{
            id:0,
            nombre:"", 
            imagen:"",
            descripcion:"",
            categoria:"",
            trailer:"",
            duracion:0,
            idioma:"",
        }
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url + "/peliculas")
                .then(response => response.json())
                .then(data => {
                    this.peliculas = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        fetchDataCategoria(categoria) {
            fetch(this.url + "/peliculas")
                .then(response => response.json())
                .then(data => {
                    this.peliculas=[]
                    for(let i = 0; i < data.length; i++) {
                        data[i].categoria==categoria?this.peliculas.push(data[i]):null;
                    }
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        fetchDataNombre() {
            buscado = formatear(this.buscado)
            fetch(this.url + "/peliculas")
                .then(response => response.json())
                .then(data => {
                    this.peliculas=[]
                    let nombre
                    for(let i = 0; i < data.length; i++) {
                        nombre = formatear(data[i].nombre)
                        if(nombre.includes(buscado) || buscado.includes(nombre)) {
                            this.peliculas.push(data[i])
                        }
                    }
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(id) {
            const url = this.url+'/peliculas/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let pelicula = {
                nombre:this.nombre,
                descripcion: this.descripcion,
                imagen:this.imagen,
                trailer:this.trailer,
                duracion:this.duracion,
                idioma:this.idioma,
                categoria:this.categoria
            }
            var options = {
                body:JSON.stringify(pelicula),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url + "/peliculas", options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./CRUD.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        },
        infoPelicula(id) {
            fetch(this.url + "/peliculas/" + id)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.pelicula_seleccionada = data
                    mostrar()
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
            mostrar()
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')

function mostrar() {
    peliculas = document.getElementById("peliculas")
    peliculas.classList.add("oculto")
    info = document.getElementById("info_pelicula")
    info.classList.remove("oculto")
}

let categorias_visibles = false

function mostrar_categorias() {
    categorias = document.getElementById("categorias")
    if(categorias_visibles){
        categorias.classList.add("oculto")
        categorias.classList.remove("categorias")
    } else {
        categorias.classList.remove("oculto")
        categorias.classList.add("categorias")
    }
    categorias_visibles = !categorias_visibles
}

function Hola(e) {
    e.preventDefault()
}