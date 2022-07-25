import {useState, useEffect} from 'react'
import closed from '../img/cerrar.svg'
import Message from './Message'

const Modal = ({setModal ,  animateModal, setAnimateModal, guardarGasto, gastoEditar, setGastoEditar }) => {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [message, setMessage] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')
    
    useEffect(()=> {
        if( Object.keys(gastoEditar).length > 0 ){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])


    const closedModal = () => {
        setAnimateModal(false) 
        setTimeout(() => {
            setModal(false)
        }, 420);
        setGastoEditar({})
    }

    const handleSubmit = e => {
        e.preventDefault()
        if([nombre, cantidad, categoria].includes('')){
            setMessage('Todos los Campos son obligatorios.')
            setTimeout(() => {
                setMessage('')
            }, 3000);
            return
        }
        guardarGasto({nombre,cantidad, categoria, id, fecha})
    }


  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img src={closed} alt="Img to closed modal" onClick={closedModal} />
        </div>
            <form className={`formulario ${animateModal ? "animar" : "cerrar" }`} onSubmit={handleSubmit}>
                <legend>{gastoEditar.nombre ? "Editar Gasto": "Nuevo Gasto"}</legend>
                {message && <Message tipo="error">{message}</Message>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input type="text" id="nombre" placeholder='Añade el nombre del Gasto' value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" id="cantidad" placeholder='Añade el la cantidad del Gasto' value={cantidad} onChange={e => setCantidad(Number(e.target.value))} />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Cantidad</label>
                    <select name="" id="categoria" value={categoria}  onChange={(e => setCategoria(e.target.value))}>
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
            </form>
    </div>
  )
}

export default Modal