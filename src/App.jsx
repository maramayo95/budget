import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import newExpenditureIcon from './img/nuevo-gasto.svg'
import {generateId} from './helpers/index'
import ExpenditureList from './components/ExpenditureList'
import Filter from './components/Filter'

function App() {
  const [budget, setBudget] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): [])
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(()=> {
    if( Object.keys(gastoEditar).length > 0 ){
      setModal(true)
      setTimeout(() => {
        setAnimateModal(true)
      }, 420);

    }
  }, [gastoEditar])

  useEffect(()=>{
    localStorage.setItem('presupuesto', budget ?? 0 )
  },[budget])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0 ){
      setIsValidBudget(true)
    }
  },[])

  useEffect(()=>{
    if(filtro){
      const gastosFiltrar = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrar)
      
    }
  },[filtro])

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  const handleNewExpenditure = () => {

    setModal(true)
    setTimeout(() => {
      setAnimateModal(true)
    }, 420);

    setGastoEditar({})
    
  }

  
  const guardarGasto = objGasto => {
    if(objGasto.id ) {
      const gastosActualizados = gastos.map(gastosState => gastosState.id === objGasto.id ? objGasto : gastosState)
      setGastos(gastosActualizados)
    } else {
      objGasto.id = generateId();
      objGasto.fecha = Date.now();
      setGastos([...gastos, objGasto])
    }
    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 250);
  }
  
  return (
    <div className={modal ?  'fijar' : ''}>
    <div>
      <Header budget={budget} setBudget={setBudget} isValidBudget={isValidBudget} setIsValidBudget={setIsValidBudget} gastos={gastos} setGastos={setGastos} />
    </div>
    {isValidBudget && 
     (
      <>
      <main>
      <Filter filtro={filtro} setFiltro={setFiltro}/>
      
      <section>
     
        <ExpenditureList gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados}/>
      </section>
      
      <div className="nuevo-gasto">
        <img src={newExpenditureIcon} alt="New Expenditure Icon" onClick={handleNewExpenditure} />
      </div>
      </main>
      </>  
     )
    }
    
    {modal && <Modal setModal={setModal} setAnimateModal={setAnimateModal} animateModal={animateModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} setGastoEditar={setGastoEditar}/>}
    </div>
  )
}

export default App
