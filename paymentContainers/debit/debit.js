import { cartAmount } from "../../cart.js"
import { closeButton, contentModal, createImage, createInput, createLabel, modalDiv, removeModal } from "../../payment.js"
import { formatter } from "../../script.js"
import {  paymentMethod, saveOrders, updateStock } from "../credit/credit.js"

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
  button.classList.add('payment-button')
  button.addEventListener('click',async()=>{
   
    const payment=document.querySelector('#payment')
const amount= document.querySelector("#budget")
const cartItems= document.querySelector('#cart')
const paymentData=await paymentMethod()
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

console.log('console',paymentData)
saveOrders(paymentData)
payments.push(paymentData)
localStorage.setItem('payments',JSON.stringify(payments))
localStorage.removeItem('cart')
await updateStock()
removeModal(product)
cartItems.innerHTML=''
window.location.href="index.html"
    
  })
  return button
}
export const getFlags=(product)=>{
  const modal= modalDiv(product)

  const content=contentModal(product)
  content.classList.add("credit-card-payment")
     const title= document.createElement('h3')
    title.textContent="DEBIT PAYMENT"
    const flag=document.createElement('div')
flag.classList.add('credit-payment-flag')
     const master= createInput('master','flag','master','radio')
    const visa=createInput('visa','flag','visa','radio')
    const elo= createInput('elo','flag','elo','radio')
    const express= createInput('express','flag','express','radio')

    const masterDiv= document.createElement('div')
    const visaDiv= document.createElement('div')
const eloDiv= document.createElement('div')
const expressDiv= document.createElement('div')

  const debit= pixValue(product)
    
    const masterLabel= createLabel('master','MarsterCard')
    const visaLabel= createLabel('visa',"Visa")
    const elolabel= createLabel('elo',"Elo")
    const expressLabel= createLabel('express','American Express')
    const closeBtn=closeButton(product)
    const masterImage= createImage("https://play-lh.googleusercontent.com/jMECkIn97zzMi1IoWlb9SYjtbYolSPmgdLmylwIwo3pbhQ_omkRMzM0bS-PnN461hg",'credit-image')
    const visaImage= createImage("https://logosmarcas.net/wp-content/uploads/2020/04/Visa-Emblema.png",'credit-image')
    const eloImage= createImage('https://demonstre.com/wp-content/uploads/2022/11/elo.png','credit-image')
    const expressImage= createImage('https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg','credit-image')
      const payButton=pay(product)

      masterDiv.append(masterImage,master)
      visaDiv.append(visaImage,visa)
      eloDiv.append(eloImage,elo)
      expressDiv.append(expressImage,express)
      flag.append(masterDiv,visaDiv,eloDiv,expressDiv)
    content.append(title,flag,debit,payButton,closeBtn)
    modal.append(content)
    document.body.append(modal)
    
}