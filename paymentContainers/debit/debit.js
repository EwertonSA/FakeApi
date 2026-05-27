import { createImage, createInput, createLabel } from "../../payment.js"
import { backButton } from "../pix/pix.js"

export const debitContainer=(product)=>{
    const container=document.createElement('div')
    const label= createLabel('debito',"DÉBITO:")
    
    const input= createInput(`debito-${product.id}`,'payment','debito','radio')
    container.append(input,label)
    input.classList.add('payment-modal-value')
    input.addEventListener('click',()=>{
        const content= document.querySelector(`#content-${product.id}`)
        content.innerHTML=''
        const title= document.createElement('h3')
    title.textContent="DEBIT PAYMENT"
    
    const master= createInput('master','flag','master','radio')
    const visa=createInput('visa','flag','visa','radio')
    const elo= createInput('elo','flag','elo','radio')
    const express= createInput('express','flag','express','radio')
    const inputvaluePayed= createInput('payed','payed','payed','number')
    
    const masterLabel= createLabel('master','MarsterCard')
    const visaLabel= createLabel('visa',"Visa")
    const elolabel= createLabel('elo',"Elo")
    const expressLabel= createLabel('express','American Express')
    const closeButton=backButton(product)
    const masterImage= createImage("https://play-lh.googleusercontent.com/jMECkIn97zzMi1IoWlb9SYjtbYolSPmgdLmylwIwo3pbhQ_omkRMzM0bS-PnN461hg",'credit-image')
    const visaImage= createImage("https://logosmarcas.net/wp-content/uploads/2020/04/Visa-Emblema.png",'credit-image')
    const eloImage= createImage('https://demonstre.com/wp-content/uploads/2022/11/elo.png','credit-image')
    const expressImage= createImage('https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg','credit-image')
    
      content.append(title,masterImage,master,masterLabel,visaImage,visa,visaLabel,eloImage,elo,elolabel,expressImage,express,expressLabel,inputvaluePayed,closeButton)
    
    })
    return container    
}