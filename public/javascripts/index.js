let signIn = document.querySelector('.sign-in')
let signUp = document.querySelector('.sign-up')
let signUpDiv = document.querySelector('.sign-up-div')
let signInDiv = document.querySelector('.sign-in-div')

// cart div
// let cartDiv = document.querySelector('.cart-div')
// let userCart = document.querySelector('.userCart')
// let cancelBtn = document.querySelector('.cancelBtn')

// cancelBtn.addEventListener('click', (e) => {
//   cartDiv.className = 'display-none'
// })

signUp.addEventListener('click', (e) => {
  e.currentTarget.className = 'bg-color'
  signIn.classList.remove('bg-color')
  signUpDiv.className = 'active'
  signInDiv.className = 'display-none'
})
signIn.addEventListener('click', (e) => {
  e.currentTarget.className = 'bg-color'
  signUp.classList.remove('bg-color')
  signInDiv.className = 'active'
  signUpDiv.className = 'display-none'
})
