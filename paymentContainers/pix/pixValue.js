import { cartAmount } from "../../cart.js"
import { createInput, createLabel } from "../../payment.js"
import { formatter } from "../../script.js"

export const pixValue= ()=>{
    const remaining=Number(localStorage.getItem('remaining')) || cartAmount()
    const container = document.createElement('div')
  const value = createLabel('total','Valor total: ')
  const inputValue= createInput('total','total','','number')
  inputValue.addEventListener('input',()=>{
       const payed= Number(inputValue.value) || 0
        const sub= Number((remaining-payed).toFixed(2))
        const element= document.querySelector('#budget')
        if(sub<0){
          element.textContent="Valor excedido"
          return
        }
     localStorage.setItem('remaining',JSON.stringify(sub))
  
        element.textContent=formatter(sub)
  })
  container.append(value, inputValue)
return container
}