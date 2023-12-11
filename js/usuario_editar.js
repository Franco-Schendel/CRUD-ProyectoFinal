var id=location.search.substr(4)  // producto_update.html?id=1
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        usuario:"",
        contrasenia:"",
        rango:"",
        url:'https://francoschendel.pythonanywhere.com/usuarios/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.id=data.id
                    this.usuario = data.usuario
                    this.contrasenia=data.contrasenia
                    this.rango=data.rango 
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar_usuario() {
            let usuario = {
                usuario:this.usuario,
                contrasenia: this.contrasenia,
                rango: this.rango
            }
            var options = {
                body: JSON.stringify(usuario),
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
