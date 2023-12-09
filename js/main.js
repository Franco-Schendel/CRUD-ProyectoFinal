function mostrar(tipo) {
    formulario = document.getElementById(tipo)
    formulario.classList.add("mostrar")
}

function cerrar(tipo) {
    formulario = document.getElementById(tipo)
    formulario.classList.remove("mostrar")
}

const { createApp } = Vue
  createApp({
    data() {
      return {
        url:'https://francoschendel.pythonanywhere.com',   // si ya lo subieron a pythonanywhere
        error:false,
        nombre:"", 
        contrasenia:""
    }  
    },
    methods: {
        fetchData() {
            if(this.nombre.length > 20 || this.nombre.length < 1 || this.contrasenia.length > 20 || this.contrasenia.length < 1) {
                alert("Ingrese un nombre y contraseña validos (maximo 20 caracteres)")
            } else {
                fetch(this.url + `/validar-usuario/${this.nombre}/${this.contrasenia}`)
                .then(response => response.json())
                .then(data => {
                    switch(data) {
                        case "":
                            alert("El usuario o contraseña es incorrecto")
                            break
                        case "admin":
                            window.location.href = "./CRUD.html"
                            break;
                        case "cliente":
                            window.location.href = "./peliculas.html"
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
            }
        }, 
        grabar() {
            if(this.nombre.length > 20 || this.nombre.length < 1 || this.contrasenia.length > 20 || this.contrasenia.length < 1) {
                alert("Ingrese un nombre y contraseña validos (maximo 20 caracteres)")
            } else {
                var datos_usuario = {
                    usuario:this.nombre,
                    contrasenia:this.contrasenia
                }
                var options = {
                    body:JSON.stringify(datos_usuario),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }
                fetch(this.url + "/usuarios", options)
                    .then(function (response) {
                        console.log(response);
                        return response.json(); // Si la respuesta es un JSON
                    })
                    .then(function () {
                        window.location.href = "./peliculas.html";
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al Grabar")  // puedo mostrar el error tambien
                    })
            }
        }
    },
  }).mount('#app')