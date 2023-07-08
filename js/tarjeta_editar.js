console.log(location.search) // lee los argumentos pasados a este formulario
var id = location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            titulo: "",
            imagen: "",
            resenia: "",
            tipo: "",
            estado: "",
            url: 'https://seba1389.pythonanywhere.com/tarjetas/' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    console.log(data)
                    this.id = data.id
                    this.titulo = data.titulo;
                    this.imagen = data.imagen
                    this.resenia = data.resenia
                    this.tipo = data.tipo
                    this.estado = data.estado
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let tarjeta = {
                titulo: this.titulo,
                tipo: this.tipo,
                resenia: this.resenia,
                imagen: this.imagen,
                estado: this.estado
            }
            var options = {
                body: JSON.stringify(tarjeta),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "../templates/index.html";
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