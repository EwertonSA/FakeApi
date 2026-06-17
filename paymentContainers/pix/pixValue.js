import { cartAmount } from "../../cart.js"
import { createInput, createLabel } from "../../payment.js"
import { formatter } from "../../script.js"

export const pixValue= ()=>{
    const remaining=Number(localStorage.getItem('remaining')) || cartAmount()
    const container = document.createElement('div')
    container.classList.add('product-container')
  const value = createLabel('total','Valor total: ')
  const inputValue= createInput('total','total','','number')
  inputValue.classList.add('credit-card-input')
  inputValue.addEventListener('input',()=>{
       const payed= Number(inputValue.value) || 0
        const sub= Number((remaining-payed).toFixed(2))
        const element= document.querySelector('#budget')
        if(sub<0){
          element.textContent="Valor excedido"
          return
        }

    if (sub <= 0) {

        localStorage.removeItem('remaining')

    } else {

        localStorage.setItem('remaining', sub)
    }
    
  
        element.textContent=formatter(sub)
  })
  container.append(value, inputValue)
return container
}