import { cart,cartAmount, renderCartAmount } from "./cart.js"
import { formatter } from "./script.js"



let payments=JSON.parse(localStorage.getItem('payments'))||[]

const createInput=(id,name,value,type)=>{
    const input= document.createElement('input')
input.id=id
input.name=name
input.value=value    
input.type=type
return input
}
const createLabel=(htmlfor,text)=>{
const label= document.createElement('label')
label.htmlFor=htmlfor
label.textContent=text
return label
}
const createImage=(src,classlist)=>{
const image= document.createElement('img')
image.src=src
image.classList=classlist
return image
}

const createSelect=(id,name,options)=>{
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
const feeCalculate=(total,installments)=>{
    let fee=1+(installments-1)*0.025
  
    const value= total*fee
    const installmentsValue= value/installments
    return installmentsValue
}
export const renderPaymentModal=(product)=>{
const modal= document.createElement('div')
modal.classList.add('cart-modal')
modal.id=`payment-${product.id}`

const content=document.createElement('div')
content.classList.add('cart-modal-content')


const title= document.createElement('h3')
title.textContent="Realizar pagamento!"
const total=cartAmount()
const amount= formatter(total)

const pixContainer=document.createElement('div')
const valueLabel= createLabel('pix','Pix')
const inputvalue= createInput(`pix-${product.id}`,'payment','pix','radio')
inputvalue.classList.add('payment-modal-value')
inputvalue.addEventListener('click',()=>{
pixContainer.innerHTML=''

const pixkeyLabel=createLabel('pixKey',"Pix key:")
const pixKey=createSelect('pixKey','pixKey',
    [{value:'phone',text:'Phone'},
        {value:'cpf',text:"CPF"},
    {value:'email',text:'E-Mail '},
    {value:'key',text:"Randon Key"},
    {value:'code',text:"QRcode"}
    ])


  

const pixLabel=createLabel('pixName','Valor total: ')

const pix= createInput('pixId','pixName','','number')
const button= document.createElement('button')
button.textContent='Voltar'
button.addEventListener('click',()=>{
    content.innerHTML=''
    content.append(title, amount,inputvalue,valueLabel, inputvalue2, valueLabel2, inputvalue3, valueLabel3,paybtn,button)
})
pix.addEventListener('input',()=>{
    const payed= Number(pix.value)
    const sub= total-payed
    const element= document.querySelector('#budget')
    console.log(element)
    element.textContent=formatter(sub)

})
content.innerHTML=''

content.append(pixkeyLabel,pixKey,pixLabel,pix,button)

})
const creditContainer=document.createElement('div')
const valueLabel2= createLabel('credito','Crédito:')

const inputvalue2= createInput(`credito-${product.id}`,'payment','credito','radio')
inputvalue2.classList.add('payment-modal-value')
inputvalue2.addEventListener('click',()=>{
content.innerHTML=''
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
const closeButton= document.createElement('button')
closeButton.textContent='Voltar'
closeButton.addEventListener('click',()=>{
     content.innerHTML=''
    content.append(title, amount,inputvalue,valueLabel, inputvalue2, valueLabel2, inputvalue3, valueLabel3,paybtn,button)
})
const masterImage= createImage("https://play-lh.googleusercontent.com/jMECkIn97zzMi1IoWlb9SYjtbYolSPmgdLmylwIwo3pbhQ_omkRMzM0bS-PnN461hg",'credit-image')
const visaImage= createImage("https://logosmarcas.net/wp-content/uploads/2020/04/Visa-Emblema.png",'credit-image')
const eloImage= createImage('https://demonstre.com/wp-content/uploads/2022/11/elo.png','credit-image')
const expressImage= createImage('https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg','credit-image')


const select =createSelect('payments','payment',[{value:'1x',text:`Valor:1 de ${formatter(total)} `},
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
    
content.append(title,masterImage,master,masterLabel,visaImage,visa,visaLabel,eloImage,elo,elolabel,expressImage,express,expressLabel,select,paybtn,closeButton)
})

const debitContainer=document.createElement('div')
const valueLabel3= createLabel('debito',"DÉBITO:")

const inputvalue3= createInput(`debito-${product.id}`,'payment','debito','radio')

inputvalue3.classList.add('payment-modal-value')
inputvalue3.addEventListener('click',()=>{
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
const closeButton= document.createElement('button')
closeButton.textContent='Voltar'
closeButton.addEventListener('click',()=>{
     content.innerHTML=''
    content.append(title, amount,inputvalue,valueLabel, inputvalue2, valueLabel2, inputvalue3, valueLabel3,paybtn,button)
})
const masterImage= createImage("https://play-lh.googleusercontent.com/jMECkIn97zzMi1IoWlb9SYjtbYolSPmgdLmylwIwo3pbhQ_omkRMzM0bS-PnN461hg",'credit-image')
const visaImage= createImage("https://logosmarcas.net/wp-content/uploads/2020/04/Visa-Emblema.png",'credit-image')
const eloImage= createImage('https://demonstre.com/wp-content/uploads/2022/11/elo.png','credit-image')
const expressImage= createImage('https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg','credit-image')

  content.append(title,masterImage,master,masterLabel,visaImage,visa,visaLabel,eloImage,elo,elolabel,expressImage,express,expressLabel,inputvaluePayed,paybtn,closeButton)

})

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
modal.append(content)
content.append(title, amount, pixContainer,inputvalue,valueLabel, inputvalue2, valueLabel2, inputvalue3, valueLabel3,button)
document.body.append(modal)

}