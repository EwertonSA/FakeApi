import { cartAmount } from "../../cart.js"
import {  createButton, createInput, createLabel, createSelect, renderPaymentModal } from "../../payment.js"
import { pay, paymentMethod } from "../credit/credit.js"

import { pixValue } from "./pixValue.js"

export const pixContainer=(product)=>{
  
    const container= document.createElement('div')
const pixLabel= createLabel('pix',"PIX: ")
const   pixInput= createInput(`pix-${product.id}`,'payment','pix','radio')
pixInput.classList.add('payment-modal-value')
container.append(pixInput,pixLabel)
pixInput.addEventListener('click',()=>{
const payments= document.querySelectorAll('input[name="payment"]')

payments.forEach((payment)=>{
  if(payment !== pixInput){
payment.disabled=true
  }
})
pixKey(product)
  
})


return container
}
export const backButton=(product)=>{
const button=createButton('Voltar')
button.addEventListener('click',()=>{
  const modal=document.querySelector(`#payment-${product.id}`)
  

  modal.remove()
  renderPaymentModal(product)
})
return button
} 
const pixKey=(product)=>{
  const pixkeyLabel=createLabel('pixKey',"Pix key:")
    const pixKey=createSelect('pixKey','pixKey',
        [{value:'phone',text:'Phone'},
            {value:'cpf',text:"CPF"},
        {value:'email',text:'E-Mail '},
        {value:'key',text:"Randon Key"},
        {value:'code',text:"QRcode"}
        ])
          const content= document.querySelector(`#content-${product.id}`)
const pix= pixValue()
const  button= pay(product)
const back= backButton(product)
         const dynamic= document.createElement("div")
             content.append(pixkeyLabel,pixKey,dynamic,pix,button,back)
       
 pixKey.addEventListener('change',()=>{
    dynamic.innerHTML=''
    let input
    let label
    if(pixKey.value === 'phone'){
        label=createLabel('phone','Phone: ')
        input= createInput('phone','phone','','phone')
    }else if(pixKey.value === 'cpf'){
           label=createLabel('cpf','CPF: ')
        input= createInput('cpf','cpf','','text')
    }else if(pixKey.value ==='email'){
           label=createLabel('email','E-Mail: ')
        input=createInput('email','email','','email')
    }else if(pixKey.value === 'key'){
           label=createLabel('key','Randon Key: ')
        input=createInput('key','key','','text')
    }else if(pixKey.value === 'code'){
           label=createLabel('code','QRcode: ')
        input=createInput('code','code','','radio')
    }
   dynamic.append(label,input)
 })
}