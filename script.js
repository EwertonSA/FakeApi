import { addToCart } from "./cart.js"

const fetchProducts=async(product)=>{
const res=await fetch("/db.json").then(res=>res.json())
return res
console.log(res)
await fetchProducts()
}
export const formatter=(value)=>{
    const formatted= Intl.NumberFormat('pt-BR',{
        compactDisplay:'long',
        currency:'USD',
        style:'currency'
    }).format(value)
    return formatted
}


export const renderContainer=(product)=>{
  const container= document.createElement('div')
  container.classList.add('product-container')
  container.classList.toggle('expand')
  container.id=`container-${product.id}`
    return container
}
export const renderTitle=(product)=>{
     const div= document.createElement("div")
       div.classList.add('product-title-wrapper')
    const title= document.createElement('h3')
    title.textContent=`${product.title}`
    title.classList.add('product-title')
    const more= renderMoreDescription()
    more.addEventListener('click',()=>{
           title.classList.toggle('open')
          div.classList.toggle('open')
        if(title.classList.contains('open')){
            more.textContent="Less"
        }else{
            more.textContent='More...'

        }
    })
     div.append(title,more)
    return div
    
}
export const renderPrice=(product)=>{
const price= document.createElement('p')
price.textContent=formatter(product.price)
price.classList.add('product-price')
return price
}
export const renderImage=(product)=>{
   const image= document.createElement('img')
   image.src=product.image
   image.classList.add('product-image')
   image.loading='lazy'
   image.decoding='async'
   return image
}
const renderCategory=(product)=>{
const category= document.createElement('p')
category.textContent=product.category
category.classList.add('product-category')
return category
}
const renderDescription=(product)=>{
    const div= document.createElement("div")
    div.classList.add('description-wrapper')
  
    const description= document.createElement('p')
    description.textContent=product.description
    description.classList.add('product-description')
    const more= renderMoreDescription()
     more.addEventListener('click',()=>{
        description.classList.toggle('open')
          div.classList.toggle('open')
        if(description.classList.contains('open')){
            more.textContent="Less"
        }else{
            more.textContent='More...'

        }
    })
   div.append(description,more)
    return div
}
export const renderMoreDescription=(product)=>{
    const button= document.createElement('button')
    button.textContent="More..."
    button.classList.add('product-description-button')
return button
}
const renderRating=(product)=>{
    const rating= document.createElement('p')
   const rate= Math.round(product.rating.rate)
   const stars= '★'.repeat(rate) +
   '☆'.repeat(5 - rate)
   rating.textContent=stars
    return rating
}
const renderInStock=(product)=>{
    const stock= document.createElement('span')
    stock.textContent=product.inStock
    return stock
}
const renderAddButton=(product)=>{
    const button=document.createElement('button')
    button.id=`addButton-${product.id}`
    button.textContent="+ADICIONAR AO CARRINHO"
    button.classList.toggle('product-add-button')
    button.addEventListener('click',()=>{
        addToCart(product)
      
    })
    return button
}
export const renderAddedProductModal=(product)=>{
    const oldModal= document.querySelector('#cart-modal')
    if(oldModal){
        oldModal.remove()
    }
    const modal= document.createElement('div')
    modal.id='cart-modal'
    modal.classList.add('cart-modal')
    const content= document.createElement("div")
   
  const modalTitle= document.createElement('h3')
  modalTitle.textContent="Produto adicionado!"
  modalTitle.classList.add("cart-modal-title")
    content.classList.add('cart-modal-content')

  const title=renderTitle(product)
const image=renderImage(product)
const price= renderPrice(product)
image.classList.add('cart-image')
    const closeButton= document.createElement('button')
    closeButton.textContent='Close'
 closeButton.addEventListener('click',()=>{
    modal.remove()
 })
content.append(modalTitle,title,image,price,closeButton)
modal.append(content)
document.body.append(modal)

setTimeout(()=>{
    modal.remove()
},2*1000)


}

export const navigationModal=()=>{


   const modal= document.createElement('div')
    modal.classList.add('navigation-modal')
    const divButton=document.createElement('div')
         const button= document.createElement('button')
    button.textContent='x'
   button.classList.add('navigation-close')
    button.addEventListener('click',()=>{
        modal.remove()
    })

    const content= document.createElement('div')
    content.classList.add('navigation-modal-content')
    
    const div=document.createElement('div')
  div.classList.add('navigation-div')
    const home= document.createElement('a')
    home.href='index.html'
    home.classList.add('navigation-home')
    home.textContent= "Products Page"
    
    const cart= document.createElement('a')
    cart.href='cart.html'
    cart.textContent='Cart'
    cart.classList.add('navigation-cart')
    
 
    
    const logout= document.createElement('a')
    logout.textContent='Logout'
    logout.addEventListener('click',()=>{

    })
    divButton.append(button,div)
div.append(home,cart)
    content.append(divButton,logout)
    modal.append(content)
   
document.body.append(modal)
    return modal
}
export const navigationModalBtn=()=>{
    const navigation= document.querySelector('#navigation')
const button= document.createElement('button')
button.textContent='Navigation'
button.addEventListener('click',()=>{
    navigationModal()
})
navigation.append(button)

return button
}
const modal= navigationModalBtn()

const renderProducts=(product)=>{
    const section= document.querySelector('#products')
    const container= renderContainer(product)
const title= renderTitle(product)
const inStock=renderInStock(product)
const image= renderImage(product)
const price= renderPrice(product)
const category= renderCategory(product)
const rating=renderRating(product)
const description= renderDescription(product)
const more= renderMoreDescription(product)
const add= renderAddButton(product)

section.append(container)
container.append(title,inStock,image,rating,price,description,add)
}


document.addEventListener('DOMContentLoaded',async()=>{
    const data= await fetchProducts()
    data.forEach((product)=>{
        renderProducts(product)
      
    })
})
