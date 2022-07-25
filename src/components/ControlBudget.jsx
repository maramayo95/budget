import { useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


const ControlBudget = ({budget, gastos, setGastos, setBudget, setIsValidBudget}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)


    useEffect(()=> {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0 )
        setGastado(totalGastado)
        const totalDisponible = budget - totalGastado
        setDisponible(totalDisponible)
        
        const nuevoPorcentaje = ( 100 - ((budget - totalGastado)/budget) * 100).toFixed(2)
        console.log(nuevoPorcentaje)
        setPorcentaje(nuevoPorcentaje)
    }, [gastos])



    const formatBudget = (count) => {
    return count.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Desea Reiniciar la aplicación?')
        if(resultado){
            setGastos([])
            setBudget([])
            setIsValidBudget(false)
        }
    }
   
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
            value={porcentaje}
            styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            })}
            text={`${porcentaje}% Gastado`}

            />
        </div>

        <div className="contenido-presupuesto">
            <button className='reset-app' type="button" onClick={ handleResetApp}>
                Resetear App
            </button>

            <p>
                <span>Presupuesto: </span> {formatBudget(Number(budget))}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                <span>Disponible: </span> {formatBudget(Number(disponible))}
            </p>
            <p>
                <span>Gastado: </span> {formatBudget(Number(gastado))}
            </p>
        </div>
    </div>
  )
}

export default ControlBudget