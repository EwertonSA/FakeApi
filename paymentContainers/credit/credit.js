import { cartAmount } from "../../cart.js"
import { createImage, createInput, createLabel, createSelect, feeCalculate, pay } from "../../payment.js"
import { formatter } from "../../script.js"
import { backButton } from "../pix/pix.js"

export const creditContainer=(product)=>{
    
    const container= document.createElement('div')
   const label= createLabel('credito','CRÉDITO:')
const total= cartAmount()
   const input= createInput(`credito-${product.id}`,'payment','credito','radio')
     container.append(input,label)
   input.classList.add('payment-modal-value')
input.addEventListener('click',()=>{
const content= document.querySelector(`#content-${product.id}`)

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
const payment=pay(product)
content.append(title,masterImage,master,masterLabel,visaImage,visa,visaLabel,eloImage,elo,elolabel,expressImage,express,expressLabel,select,payment,closeButton)
})
return container
}
