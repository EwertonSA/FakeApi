
import { renderPaymentModal } from "./payment.js"
import { formatter, navigationModal, navigationModalBtn, renderAddedProductModal, renderContainer, renderImage, renderPrice, renderTitle } from "./script.js"

export let cart=JSON.parse(localStorage.getItem('cart'))     || []

export const addToCart=(product)=>{
const isproduct = cart.find((f)=>f.id===product.id)
if(isproduct){
    isproduct.quantity++
}else{
    cart.push({
        id:product.id,
        title:product.title,
        price:product.price,
        image:product.image,
        quantity:1
    })



}

    localStorage.setItem('cart',JSON.stringify(cart))
       renderAddedProductModal(product)
  renderCart(product)
   
}

const deleteFromCart=(product)=>{
cart= cart.filter(f=>f.id!==product.id)

localStorage.setItem('cart',JSON.stringify(cart))

const element= document.querySelector(`#container-${product.id}`)
element.remove()

renderCartAmount()
}
const increaseQuantity=(product)=>{
    const res= cart.find(f=>f.id === product.id)
    if(res){
        res.quantity+=1
       const value= document.querySelector(`#quantity-${product.id}`)
       value.textContent=res.quantity
    }
    localStorage.setItem('cart',JSON.stringify(cart))
   renderCartAmount()
}
const decreaseQuantity=(product)=>{
    const res= cart.find(f=>f.id===product.id)
    if(res){
        res.quantity-=1
        const value= document.querySelector(`#quantity-${product.id}`)
       value.textContent=res.quantity
    }
    localStorage.setItem('cart',JSON.stringify(cart))
   renderCartAmount()
    }

const renderDeleteBtn=(product)=>{
const button= document.createElement('button')
button.textContent='x'
button.classList.add('cart-delete-button')
button.addEventListener('click',()=>{
deleteFromCart(product)
})
return button

}
const renderQuantity=(product)=>{
const quantity= document.createElement('div')
const value=document.createElement('span')
value.id= `quantity-${product.id}`
value.textContent=product.quantity
quantity.classList.add('cart-quantity')
 const addproduct= addQuantity(product)
const delProduct= DelQuantity(product)

quantity.append(value,delProduct,addproduct)

return quantity
}
const addQuantity=(product)=>{
const button= document.createElement('button')
button.textContent="+"
button.classList.add('cart-add-button')
button.addEventListener("click",()=>{
increaseQuantity(product)

})
return button
}
const DelQuantity=(product)=>{
const button= document.createElement('button')
button.textContent="-"
button.classList.add('cart-del-button')
button.addEventListener('click',()=>{
    decreaseQuantity(product)
})
return button
}
const navigation=()=>{
    const button= navigationModalBtn()
    button.addEventListener('click',()=>{
        navigationModal()
    })
    const navigation= document.querySelector('#navigation')
    navigation.append(button)
}
export const cartAmount=()=>{
    
const value= cart.reduce((acc,item)=>acc+(item.quantity*Number(item.price)),0)

return value
}
export const renderCartAmount=(  value = cartAmount())=>{
  const amountValue= document.querySelector('#budget')
  amountValue.classList.add('cart-amount')
    const data= formatter(cartAmount())

  
  amountValue.textContent=data


return amountValue
}
const renderPaymentButton=(product)=>{
const payment=document.querySelector('#payment')
payment.innerHTML=''
payment.classList.add('cart-payment-container')
const button= document.createElement('button')
button.classList.add('cart-payment')
button.textContent="Payment"
button.addEventListener('click',()=>{
renderPaymentModal(product)
})
payment.append(button)

return button

}

const renderCart=(product)=>{
  
    const container=renderContainer(product) 
    container.classList.add('cart-container')
    const paymentButton= renderPaymentButton(product)
    const title=renderTitle(product)
    title.classList.add('cart-title')
  const price= renderPrice(product)
  const image=renderImage(product)
  image.classList.add('cart-image')
  const deleteBtn= renderDeleteBtn(product)
  const quantity= renderQuantity(product)

  const amount= renderCartAmount(product)



  image.classList.add('cart-image')

  const cartContainer= document.querySelector('#cart')

  cartContainer.classList.add('cart-section')

  cartContainer.append(container)
  
  container.append(image,title,price,quantity,deleteBtn)
}
const renderAllCart=()=>{
    const container= document.querySelector("#cart")
    container.innerHTML=''
    cart.forEach((product)=>{
        renderCart(product)
    })
}

document.addEventListener('DOMContentLoaded',()=>{
   
  renderAllCart()
})

