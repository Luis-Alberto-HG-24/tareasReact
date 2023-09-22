import { useReducer } from 'react'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { FormularioTareas } from './components/FormularioTareas/FormularioTareas'
import { CardTarea } from './components/CardTarea/CardTarea'
import { tareaReducer } from './reducers/tareaReducer'
import { useState } from 'react'
import { useEffect } from 'react'

export const App = () => {

    const [descripcion, setDescripcion] = useState("");    

    const handleInputChange = (evento) =>{
        // console.log(evento.target.value);
        setDescripcion(evento.target.value)
        console.log(descripcion);
    }

  

  const handleSubmit = (evento) =>{

    const tareaNueva = {
        id: new Date().getTime(),
        descripcion: descripcion,
        realizado:false,
      }

    evento.preventDefault();
    // console.log(evento);

    const accion = {
        type: "agregar",
        payload: tareaNueva
      }
    
    dispatch(accion)
    setDescripcion("")
  }

 

  const init = () =>{
    return JSON.parse(localStorage.getItem("tareas")) || []
  }


  const [state, dispatch] = useReducer(tareaReducer, [], init)

    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(state))
    }, [state])

  const handleCambiar = (id) =>{
    dispatch({
      type: "cambiar",
      payload: id
    })
  }

  const handleEliminar = (id) =>{
    dispatch({
      type: "borrar",
      payload: id
    })
  }

  let terminadas = 0;
  for (let index = 0; index < state.length; index++) {
    if (state[index].realizado === true) {
      terminadas++;
    }
  }

  let porcentaje = (terminadas/state.length) * 100





  return (
    <>
        <Header/>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-4 border-end">
              <FormularioTareas descripcion={descripcion} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
            </div>
            <div className="col-lg-8">
              <div className="container py-5">
                <div className="row justify-content-lg-evenly justify-content-md-evenly justify-content-center-sm">
                  {
                    state.map((tarea,index) =>{
                      return <CardTarea indice={index} handleEliminar={handleEliminar} handleCambiar={handleCambiar} key={index} tarea={tarea} id={tarea.id} index={index + 1}/>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer porcentaje={porcentaje}/>
    </>
  )
}
