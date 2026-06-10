import { cartAmount } from "../../cart.js"
import { closeButton, contentModal, createImage, createInput, createLabel, createSelect, feeCalculate, modalDiv, removeModal, titleModal } from "../../payment.js"
import { formatter } from "../../script.js"

import { backButton } from "../pix/pix.js"
let payments=JSON.parse(localStorage.getItem('payments'))||[]
let cart=JSON.parse(localStorage.getItem('cart'))     || []
export const creditContainer=(product)=>{
     
    const container= document.createElement('div')  
   const label= createLabel('credito','CRÉDITO:')
const total= cartAmount()
   const input= createInput(`credito-${product.id}`,'payment','credito','radio')
     container.append(input,label)

   input.classList.add('payment-modal-value')

input.addEventListener('click',()=>{
const content= document.querySelector(`#content-${product.id}`)
const payments= document.querySelectorAll('input[name="payment"]')

payments.forEach((payment)=>{
  if(payment !== input){
payment.disabled=true
  }
})

const title= document.createElement('h3')
title.textContent="CREDIT PAYMENT"

const master= createInput('master','flag','master','radio')
master.addEventListener('click',()=>{
    creditCard(product)
    masterEloVisaCreditCard()
})
const visa=createInput('visa','flag','visa','radio')
const elo= createInput('elo','flag','elo','radio')
const express= createInput('express','flag','express','radio')
express.addEventListener('click',()=>{
    creditCard(product)
    americanExpressCreditCard()
})
const masterLabel= createLabel('master','MarsterCard')
const visaLabel= createLabel('visa',"Visa")
const elolabel= createLabel('elo',"Elo")
const expressLabel= createLabel('express','American Express')
const closeButton= backButton(product)
const masterImage= createImage("https://play-lh.googleusercontent.com/jMECkIn97zzMi1IoWlb9SYjtbYolSPmgdLmylwIwo3pbhQ_omkRMzM0bS-PnN461hg",'credit-image')
const visaImage= createImage("https://logosmarcas.net/wp-content/uploads/2020/04/Visa-Emblema.png",'credit-image')
const eloImage= createImage('https://demonstre.com/wp-content/uploads/2022/11/elo.png','credit-image')
const expressImage= createImage('https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg','credit-image')


const select =createSelect('installments','installment',[{value:'1x',text:`Valor:1 de ${formatter(total)} `},
    {value:'2x',text:`Valor 2x ${formatter(feeCalculate(total,2))} `},
    {value:'3x',text:`Valor 3x:${formatter(feeCalculate(total,3))}`},
    {value:'4x',text:`Valor 4x:${formatter(feeCalculate(total,4))}`},
    {value:'5x',text:`Valor 5x:${formatter(feeCalculate(total,5))}`},
    {value:'6x',text:`Valor 6x:${formatter(feeCalculate(total,6))}`},
    {value:'7x',text:`Valor 7x:${formatter(feeCalculate(total,7))}`},
    {value:'8x',text:`Valor 8x:${formatter(feeCalculate(total,8))}`},
    {value:'9x',text:`Valor 9x:${formatter(feeCalculate(total,8))}`},
    {value:'10x',text:`Valor 10x:${formatter(feeCalculate(total,10))}`}

])
const payment= pay(product)
content.append(title,masterImage,master,masterLabel,visaImage,visa,visaLabel,eloImage,elo,elolabel,expressImage,express,expressLabel,select,payment,closeButton)
})
return container
}

const creditCard=(product)=>{
    const modal= modalDiv(product)
    const title= titleModal("INSERT OR CONFIRM YOUR PERSONAL CREDIT CARD INFO")
    const content=contentModal(product)
    content.classList.add("credit-card-payment")
    const nameLabel=createLabel('name','NAME:')
    const input= createInput('name','name','','text')
    input.classList.add('credit-card-input')
    const numberLabel= createLabel('number','N°:')
    const inputNumber= createInput('number','number','','text')
    inputNumber.classList.add('credit-card-input')
    const codeNmber= createLabel('code', 'CODE:')
    const codeInput= createInput('code','code','','number')
    
const button= closeButton(modal)

    content.append(nameLabel,input,numberLabel,inputNumber, codeInput,button)
    modal.append(title,content)
    document.body.append(modal)
}
const masterEloVisaCreditCard=()=>{
    const input= document.querySelector('#number')
    input.addEventListener('input',(ev)=>{
        let value= ev.target.value.replace(/\D/g,'')
        value=value.slice(0,16)
        value=value.replace(/(\d{4})(?=\d)/g,'$1 ')
        ev.target.value=value
    })
    return input
}
const americanExpressCreditCard=()=>{
    const input = document.querySelector('#number')
    input.addEventListener('click',(ev)=>{

          let value= ev.target.value.replace(/\D/g,'')
     

             
        value=value.slice(0,15)
        value=value.replace(/^(\d{0,4})(\d{0,6})(\d{0,5})$/,(_,p1,p2,p3)=> {
            let result= p1
            if(p2)result +=' '+p2
            if(p3)result +=' '+p3
            return result
        })
        ev.target.value=value
        }
    )
    input.addEventListener('blur',()=>{
        const value= input.value.replace(/\D/,g,'')
    const isAmerican= /^(34|37)/.test(value)
    if(!isAmerican&&value.length>=2){
    alert('American express credit card number must start with 34 or 37')
return
        }
    })
    return input
}
export const pay=(product)=>{

const total=cartAmount()
const paybtn= document.createElement('button')
paybtn.textContent='Pay'
paybtn.addEventListener('click',async()=>{
const payment=document.querySelector('#payment')
const amount= document.querySelector("#budget")
const cartItems= document.querySelector('#cart')
const paymentData= paymentMethod()
await updateStock()
removeModal(product)
saveOrders(paymentData)
payments.push(paymentData)
localStorage.setItem('payments',JSON.stringify(payments))
localStorage.removeItem('cart')

amount.textContent=formatter(0)
cartItems.innerHTML=''
window.location.href="index.html"
    
})
return paybtn
}

const updateStock=async()=>{
    for(const cartItem of cart){
        const response= await fetch(`http://localhost:3000/products/${cartItem.id}`)
    
    const productDb= await response.json()
    if(cartItem.quantity>productDb.inStock){
        alert(`${productDb.title} sem estoque suficiente`)
        return
    }
    await fetch(`http://localhost:3000/products/${cartItem.id}`,{
        method:"PUT",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({...productDb,inStock:productDb.inStock-cartItem.quantity})
    })
}
}
export const paymentMethod=()=>{
  const total= cartAmount()

    const payMethod= document.querySelector('input[name="payment"]:checked')
    console.log(payMethod.value)
       if (!payMethod) {
        alert('Selecione um método de pagamento')
        return
    }
    const paymentData= {method:payMethod.value,total:total}
    if(payMethod.value==='pix'){
    const pixKey= document.querySelector('#pixKey')
    const pixValue= document.querySelector('#total')

    paymentData.pixKey=pixKey?.value
    paymentData.pixValue=pixValue?.value
}
if(payMethod.value === 'credito'|| payMethod.value === 'debito'){
    const flag= document.querySelector("input[name='flag']:checked")
    paymentData.flag=flag?.value
    console.log(flag)

}
if(payMethod.value === 'credito'){
    const installments=document.querySelector('#installments')
    paymentData.installments=installments?.value
    console.log(document.querySelector('#installments'))
}

  return paymentData

}

export const saveOrders=(paymentData)=>{
const orders= JSON.parse(localStorage.getItem('orders'))|| []
const total=cartAmount()

const order= {
    id: Date.now(),
    items:cart,
    payment:paymentData,
    total:total,
    createdAt: new Date().toISOString(),
    status:'paid'
}
orders.push(order)
localStorage.setItem('orders',JSON.stringify(orders))
}