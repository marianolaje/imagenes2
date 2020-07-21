import React, {useState} from 'react';
import Error from './Error'

const Formulario = ({setSearch}) => {

    const [termino, setTermino] = useState('')
    const [error, setError] = useState(false)

    const buscarImg = e => {
        e.preventDefault();
        //validar
        if(termino.trim()===''){
            setError(true)
            return
        }
        setError(false)
        //enviar el termino de busqueda al componente principal
        setSearch(termino)
    }

    return(
        <form
            onSubmit={buscarImg}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search an image, as: Football or Coffee"
                        onChange={ e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="search"
                    />
                </div>
            </div>
            { error ? <Error mensaje="Agregar un termino de busqueda"/> : null}
        </form>
    )
}

export default Formulario