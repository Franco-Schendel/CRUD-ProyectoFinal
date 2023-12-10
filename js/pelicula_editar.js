var id=location.search.substr(4)  // producto_update.html?id=1
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        imagen:"",
        descripcion:"",
        categoria:"",
        trailer:"",
        duracion:0,
        idioma:"",
        url:'https://francoschendel.pythonanywhere.com/peliculas/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.id=data.id
                    this.nombre = data.nombre
                    this.imagen=data.imagen
                    this.descripcion=data.descripcion 
                    this.categoria=data.categoria
                    this.trailer=data.trailer
                    this.duracion=data.duracion
                    this.idioma=data.idioma     
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                nombre:this.nombre,
                descripcion: this.descripcion,
                imagen: this.imagen,
                categoria : this.categoria,
                trailer : this.trailer,
                duracion : this.duracion,
                idioma : this.idioma  

            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./CRUD.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
