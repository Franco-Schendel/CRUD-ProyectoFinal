function login(e) {
    e.preventDefault()
    let usuario = document.getElementById("usuario").value
    let contra = document.getElementById("contra").value
    if(usuario.length > 20 || usuario.length < 1 || contra.length > 20 || contra.length < 1) {
        alert("Ingrese un nombre y contraseña validos (maximo 20 caracteres)")
    } else if(usuario == "cliente") {
        window.location.href = "./peliculas.html"
    } else if(usuario == "admin") {
        window.location.href = "./CRUD.html"
    }
}