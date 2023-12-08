const { createApp } = Vue
  createApp({
    data() {
      return {
        peliculas:[],
        //url:'http://localhost:5000/productos', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'https://francoschendel.pythonanywhere.com',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        imagen:"",
        descripcion:"0",
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
            console.log("DATOS: ")
            console.log(this.nombre)
            let pelicula = {
                nombre:this.nombre,
                descripcion: this.descripcion,
                imagen:this.imagen
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
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')