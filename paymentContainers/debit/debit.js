import { cartAmount } from "../../cart.js"
import { createImage, createInput, createLabel, removeModal } from "../../payment.js"
import { formatter } from "../../script.js"
import {  paymentMethod, saveOrders } from "../credit/credit.js"

import { backButton } from "../pix/pix.js"
import { pixValue } from "../pix/pixValue.js"
let payments=JSON.parse(localStorage.getItem('payments'))||[]
export const debitContainer=(product)=>{
    const container=document.createElement('div')
    const label= createLabel('debito',"DÉBITO:")
    
    const input= createInput(`debito-${product.id}`,'payment','debito','radio')
    container.append(input,label)
    input.classList.add('payment-modal-value')
    input.addEventListener('click',()=>{
    const payments= document.querySelectorAll('input[name="payment"]')

payments.forEach((payment)=>{
  if(payment !== input){
payment.disabled=true
  }
})
    getFlags(product)
    })
    return container    
}
const pay=(product)=>{

  const total= cartAmount()
  const button= document.createElement('button')
  button.textContent='Pay'
  button.addEventListener('click',()=>{
   
    const payment=document.querySelector('#payment')
const amount= document.querySelector("#budget")
const cartItems= document.querySelector('#cart')
const paymentData= paymentMethod()
if(!paymentData)return


   const remaining= Number(localStorage.getItem('remaining'))
if (remaining !== null && remaining <= 0) {

    localStorage.removeItem('remaining')
}
if(remaining>0){
  amount.textContent = formatter(remaining)
removeModal(product)
  return
}

console.log(paymentData)
saveOrders(paymentData)
payments.push(paymentData)
localStorage.setItem('payments',JSON.stringify(payments))
localStorage.removeItem('cart')
removeModal(product)
cartItems.innerHTML=''
window.location.href="index.html"
    
  })
  return button
}
export const getFlags=(product)=>{
   const content= document.querySelector(`#content-${product.id}`)
     const title= document.createElement('h3')
    title.textContent="DEBIT PAYMENT"
     const master= createInput('master','flag','master','radio')
    const visa=createInput('visa','flag','visa','radio')
    const elo= createInput('elo','flag','elo','radio')
    const express= createInput('express','flag','express','radio')
  const debit= pixValue(product)
    
    const masterLabel= createLabel('master','MarsterCard')
    const visaLabel= createLabel('visa',"Visa")
    const elolabel= createLabel('elo',"Elo")
    const expressLabel= createLabel('express','American Express')
    const closeButton=backButton(product)
    const masterImage= createImage("https://play-lh.googleusercontent.com/jMECkIn97zzMi1IoWlb9SYjtbYolSPmgdLmylwIwo3pbhQ_omkRMzM0bS-PnN461hg",'credit-image')
    const visaImage= createImage("https://logosmarcas.net/wp-content/uploads/2020/04/Visa-Emblema.png",'credit-image')
    const eloImage= createImage('https://demonstre.com/wp-content/uploads/2022/11/elo.png','credit-image')
    const expressImage= createImage('https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg','credit-image')
      const payButton=pay(product)
    content.append(title,masterImage,master,masterLabel,visaImage,visa,visaLabel,eloImage,elo,elolabel,expressImage,express,expressLabel,debit,payButton,closeButton)
    
}