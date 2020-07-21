import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  //state de la app
  const [search, setSearch] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  

  useEffect(()=>{
    const consultarAPI = async () => {
      if(search === '') return;

      const imagenesPorPagina = 30;
      const key = '16269972-52a16fd2a6025948c538a036e';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits)

      //calcular total páginas
      setTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina));

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultarAPI()
  }, [search, paginaActual])

  const paginaAnterior = () => {
    const nuevaPagActual = paginaActual - 1
    if(nuevaPagActual===0){return}
    setPaginaActual(nuevaPagActual)
  }
  const paginaSiguiente = () => {
    const nuevaPagActual = paginaActual + 1
    if(nuevaPagActual>totalPaginas){return}
    setPaginaActual(nuevaPagActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image search</p>
        <Formulario
          setSearch={setSearch}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        { (paginaActual===1) ? null :
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Prev
          </button>
        }
        {(paginaActual===totalPaginas) ? null :
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Next &raquo;
          </button>
        }
      </div>
    </div>
  );
}

export default App;
