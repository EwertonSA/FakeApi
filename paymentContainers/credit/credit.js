import { cartAmount } from "../../cart.js"
import { createImage, createInput, createLabel, createSelect, feeCalculate, removeModal } from "../../payment.js"
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
const visa=createInput('visa','flag','visa','radio')
const elo= createInput('elo','flag','elo','radio')
const express= createInput('express','flag','express','radio')

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
export const pay=(product)=>{

    const total=cartAmount()
const paybtn= document.createElement('button')
paybtn.textContent='Pay'
paybtn.addEventListener('click',async()=>{
const payMethod= document.querySelector('input[name="payment"]:checked')
   if (!payMethod) {
        alert('Selecione um método de pagamento')
        return
    }
console.log('paym',payMethod.value)
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

}
if(payMethod.value === 'credito'){
    const installments=document.querySelector('#installments')
    paymentData.installments=installments?.value
}
const payment=document.querySelector('#payment')
const amount= document.querySelector("#budget")
const cartItems= document.querySelector('#cart')
const modal= removeModal(product)

for (const cartItem of cart) {

   const response = await fetch(
      `http://localhost:3000/products/${cartItem.id}`
   )

   const dbProduct = await response.json()

   if (cartItem.quantity > dbProduct.inStock) {

      alert(
         `${dbProduct.title} sem estoque suficiente`
      )

      return
   }

   await fetch(
      `http://localhost:3000/products/${cartItem.id}`,
      {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            inStock:
               dbProduct.inStock -
               cartItem.quantity
         })
      }
   )

}
console.log(total)
const orders= JSON.parse(localStorage.getItem('orders'))|| []

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
payments.push(paymentData)
localStorage.setItem('payments',JSON.stringify(payments))
localStorage.removeItem('cart')

amount.textContent=formatter(0)
cartItems.innerHTML=''


})
return paybtn
}

