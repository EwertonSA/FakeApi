import { cart,cartAmount, renderCart, renderCartAmount } from "./cart.js"
import { creditContainer } from "./paymentContainers/credit/credit.js"
import { debitContainer } from "./paymentContainers/debit/debit.js"
import { pixContainer } from "./paymentContainers/pix/pix.js"
import { formatter } from "./script.js"



let payments=JSON.parse(localStorage.getItem('payments'))||[]

export const createInput=(id,name,value,type)=>{
    const input= document.createElement('input')
input.id=id
input.name=name
input.value=value    
input.type=type
return input
}
export const createLabel=(htmlfor,text)=>{
const label= document.createElement('label')
label.htmlFor=htmlfor
label.textContent=text
return label
}
export const createImage=(src,classlist)=>{
const image= document.createElement('img')
image.src=src
image.classList=classlist
return image
}

export const createSelect=(id,name,options)=>{
    const select=document.createElement('select')
    select.id=id
    select.name=name
    options.forEach((item)=>{
 const option= document.createElement('option')
 
   option.value=item.value
   option.textContent=item.text
   select.append(option)
    })
   return select
}
export const feeCalculate=(total,installments)=>{
    let fee=1+(installments-1)*0.025
  
    const value= total*fee
    const installmentsValue= value/installments
    return installmentsValue
}
export const createButton=(text)=>{
const button= document.createElement("button")
button.textContent=text
return button
}
export const modalDiv=(product)=>{
const modal= document.createElement('div')
modal.classList.add('cart-modal')
modal.id=`payment-${product.id}`
return modal
}
export const contentModal=(product)=>{
    const cont= document.createElement('div')
cont.classList.add('cart-modal-content')
cont.id=`content-${product.id}`
return cont
}
const titleModal=()=>{
    const title= document.createElement('h3')
title.textContent="Realizar pagamento!"
return title
}
export const removeModal=(product)=>{
  const modal=document.querySelector(`#payment-${product.id}`)

modal.remove()
}
export const renderPaymentModal=(product)=>{
const modal=modalDiv(product)

const content=contentModal(product)

const title= titleModal()
const total=cartAmount()
const amount= formatter(total)

const pix=pixContainer(product)


const credit= creditContainer(product)

const debit= debitContainer(product)


const button=document.createElement('button')
button.textContent='Close'
button.addEventListener('click',()=>{
modal.remove()
})

content.append(title, amount, pix, credit, debit,button)
modal.append(content)
document.body.append(modal)

}
export const pay=(product)=>{

    const total=cartAmount()
const paybtn= document.createElement('button')
paybtn.textContent='Pay'
paybtn.addEventListener('click',()=>{
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
    console.log('payf',paymentData.flag)
}
if(payMethod.value === 'credito'){
    const installments=document.querySelector('#installments')
    paymentData.installments=installments?.value
}
payments.push(paymentData)
localStorage.setItem('payments',JSON.stringify(payments))
localStorage.removeItem('cart')
const payment=document.querySelector('#payment')
const amount= document.querySelector("#budget")
const cart= document.querySelector('#cart')
const modal= removeModal(product)
amount.textContent=formatter(0)
cart.innerHTML=''


})
return paybtn
}