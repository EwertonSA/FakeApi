import { cartAmount } from "../../cart.js"
import { createInput, createLabel } from "../../payment.js"
import { formatter } from "../../script.js"

export const pixValue= ()=>{
    const total=cartAmount()
  const value = createLabel('total','Valor total: ')
  const inputValue= createInput('total','total','','number')
  inputValue.addEventListener('click',()=>{
       const payed= Number(inputValue.value)
        const sub= total-payed
        const element= document.querySelector('#budget')
        console.log(element)
        element.textContent=formatter(sub)
  })
return inputValue
}