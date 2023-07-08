const { createApp } = Vue
createApp({
    data() {
        return {
            tarjetas: [],
            //url:'http://localhost:5000/productos', http://seba1389.pythonanywhere.com/productos
            // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
            url: 'https://seba1389.pythonanywhere.com/tarjetas', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            titulo: "",
            imagen: "",
            resenia: "",
            tipo: "",
            estado: "",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.tarjetas = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(tarjeta) {
            const url = this.url + '/' + tarjeta;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let tarjeta = {
                titulo: this.titulo,
                tipo: this.tipo,
                resenia: this.resenia,
                imagen: this.imagen,
                estado: this.estado
            }
            var options = {
                body: JSON.stringify(tarjeta),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "../templates/tarjetas.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')