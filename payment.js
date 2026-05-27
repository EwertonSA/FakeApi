import { cart,cartAmount, renderCartAmount } from "./cart.js"
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

export const renderPaymentModal=(product)=>{
const modal=modalDiv(product)

const content=contentModal(product)

const title= titleModal()
const total=cartAmount()
const amount= formatter(total)

const pix=pixContainer(product)


const credit= creditContainer(product)

const debit= debitContainer(product)

const paybtn= document.createElement('button')
paybtn.textContent='Pay'
paybtn.addEventListener('click',()=>{
const payMethod= document.querySelector('input[name="payment"]:checked')
if(!payMethod){
    alert('Selecione um método de pagamento')
}else{
    payments.push({
        payMethod:payMethod.value,total:formatter(total)
    })
}

localStorage.setItem('payments',JSON.stringify(payments))
    const payed= document.getElementById('pixId').value
    const sub= total-Number(payed)
   
    const element= document.querySelector('#budget')
    
    element.textContent=formatter(sub)
modal.remove()




})
const button=document.createElement('button')
button.textContent='Close'
button.addEventListener('click',()=>{
modal.remove()
})

content.append(title, amount, pix, credit, debit,button)
modal.append(content)
document.body.append(modal)

}