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
        logeado:false,
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
        },
        usuarios:[],
        id_usuario:0,
        usuario:"", 
        contrasenia:"",
        rango:""
    }  
    },
    methods: {//PELICULAS
        fetchData(url) {
            fetch(url + "/peliculas")
                .then(response => response.json())
                .then(data => {
                    let usuario = localStorage.getItem("usuario")
                    usuario==""?this.logueado=false:this.logueado=true
                    this.peliculas = data;
                    this.cargando=false
                    document.getElementById("footer").classList.remove("abajo")
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
                    let usuario = localStorage.getItem("usuario")
                    usuario==""?this.logueado=false:this.logueado=true
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
                    let usuario = localStorage.getItem("usuario")
                    usuario==""?this.logueado=false:this.logueado=true
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
        },//USUARIOS
        fetchDataUsuarios(url) {
            fetch(url + "/usuarios")
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    console.log(this.usuarios)
                })
                .catch(err => {
                    console.error(err); 
                })
        },
        fetchDataNombreUsuario() {
            buscado = formatear(this.buscado)
            fetch(this.url + "/usuarios")
                .then(response => response.json())
                .then(data => {
                    this.usuarios=[]
                    let nombre
                    for(let i = 0; i < data.length; i++) {
                        nombre = formatear(data[i].usuario)
                        if(nombre.includes(buscado) || buscado.includes(nombre)) {
                            this.usuarios.push(data[i])
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar_usuario(id) {
            const url = this.url+'/usuarios/' + id;
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
        grabar_usuario() {
            var datos_usuario = {
                usuario:this.usuario,
                contrasenia:this.contrasenia,
                rango:this.rango
            }
            var options = {
                body:JSON.stringify(datos_usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url + "/usuarios", options)
                .then(function (response) {
                    return response.json(); // Si la respuesta es un JSON
                })
                .then(function () {
                    alert("Usuario Subido")
                    window.location.href = "./CRUD.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })
            }
    },
    created() {
        this.fetchDataUsuarios(this.url)
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

function sin_cuenta() {
    alert("Necesitas una cuenta para ver la pelicula")
}