import React from 'react'
import ControlBudget from './ControlBudget'
import NewBudget from './NewBudget'

const Header = ({budget, setBudget, isValidBudget, setIsValidBudget, gastos, setGastos}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {isValidBudget? 
        <ControlBudget budget={budget} gastos={gastos} setGastos={setGastos} setBudget={setBudget} setIsValidBudget={setIsValidBudget}/>
        :
        <NewBudget budget={budget} setBudget={setBudget} isValidBudget={isValidBudget} setIsValidBudget={setIsValidBudget}/>

      }
    </header>
  )
}

export default Header