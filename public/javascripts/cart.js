let cartDiv = document.querySelector('.cart-div')
let userCart = document.querySelector('.userCart')
let cancelBtn = document.querySelector('.cancelBtn')

cancelBtn.addEventListener('click', (e) => {
  cartDiv.className = 'display-none'
})