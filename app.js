let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () =>{
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
    
});

btnAnterior.addEventListener('click', () =>{
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
    
});

/*FUNCION PARA CARGAR LAS PELICULAS DENTRO DEL CONTENEDOR EN HTML*/
const cargarPeliculas = async() => {
    try{
        const peliculas = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3272536c8b0cc0bc43f8c656b51cdd6e&&language=es-CO&page=${pagina}`);

        console.log(peliculas)

        //Respuesta correcta
        if (peliculas.status === 200){
        const datos = await peliculas.json();
        
        let informacionPeliculas = '';
        datos.results.forEach(pelicula => {
            informacionPeliculas += `
            <div class="card text-bg-dark pelicula">
            <img class = "poster" src = "https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
              <div class="card-img-overlay desvanecer">
                <h3 class = "titulo">${pelicula.title}</h3>
                <p class="card-text">Pequeña descripción de la película</p>
                <p class="card-text"><small>Fecha 19-04-2004</small></p>
              </div>
              <h3 class = "titulo">${pelicula.title}</h3>
            </div>
            `;            
        });

        // Dejo comentado el html anterior por las dudas
        // <div class = "pelicula">
        //     <img class = "poster" src = "https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        //     <h3 class = "titulo">${pelicula.title}</h3>
        // </div>

        document.getElementById('contenedor').innerHTML = informacionPeliculas;

        }else if(peliculas.status ===401){
            console.log('Llave errada');
        }else if (peliculas.status === 404) {
            console.log('Pelicula no existe');
        }else{
            console.log('Error inesperado')
        }

    }catch(error){
        console.log(error);
    }
    
}

cargarPeliculas();





