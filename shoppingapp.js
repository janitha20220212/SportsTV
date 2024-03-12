let itemCount = 0;



  let slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);

  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    let menuitems = document.getElementsByClassName("menuitem");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");

    }
    for (i = 0; i < menuitems.length; i++) {
      menuitems[i].className = menuitems[i].className.replace(" active", "");

    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    menuitems[slideIndex-1].className += " active";
    
  }



  console.log("Hello World");
  // Get the cart button and cart menu
  const cartIcon = document.querySelector('#cart-icon');
  const cart = document.querySelector('.cart');

  // Get the close button in the cart menu
  const closeCart = cart.querySelector('.cart-close');

  // Get the cart items
  const cartItems = document.querySelectorAll('.cart-content');


  // Initialize the cart total to zero
  let cartTotal = 0;

  // // Add event listener for the cart button
  cartIcon.addEventListener('click', () => {
    // Toggle the active class to show or hide the cart menu
    console.log("You Clicked cart")
    cart.classList.toggle('active');
  });

  // Add event listener for the close button in the cart menu
  closeCart.addEventListener('click', () => {
    // Remove the active class to hide the cart menu
    cart.classList.remove('active');
  });


    // Get the cart button and cart menu
    const btnbuy = document.querySelector('.btn-buy');
    const paymenttab = document.querySelector('.payment');
  
    // Get the close button in the cart menu
    const closePayment = cart.querySelector('#payment-close');
  
    // Get the cart items
    // const cartItems = document.querySelectorAll('.cart-content');





  



  // // Add event listener for the cart button
  btnbuy.addEventListener('click', () => {
    // Toggle the active class to show or hide the cart menu
    console.log("You Clicked cart")
    paymenttab.classList.toggle('active');
  
    updateTotal();
  });



  // Get the clear button in the cart menu
const clearCart = cart.querySelector('.clear-cart-button');

// Add event listener for the clear button in the cart menu
clearCart.addEventListener('click', () => {

  
  // Remove all the cart items from the cart menu
  cartItems.forEach(item => item.remove());
  console.log("You Clicked Remove");

  
  btnbuy.disabled = true;
  btnbuy.style.background = "grey";

  // Update the cart total to zero
  cartTotal = 0;
  
  itemCount = 0;
  updateTotal();
  location.reload();
  cartAmount.innerHTML = 0;

  

  
});


btnbuy.disabled = true;
btnbuy.style.background = "grey";



// cart System
  // ===========================================================================

  if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded',start);

  }else{
    start();
  }

// =====================================================
  function start(){
    addEvents();
  }
// ============================================
  function update(){
    addEvents();
    updateTotal();

  
  }
// =================================================
  function addEvents(){
    let cartRemove_btns =  document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach( btn =>{
      btn.addEventListener("click", handle_removeCartItem)
    } );

    let cartQuantity_inputs = document.querySelectorAll('cart-quantity')
    cartQuantity_inputs.forEach(input => {
      input.addEventListener("change",handle_changeItemQuantity);

    })

    let addCart_btns = document.querySelectorAll('.add-cart');
    addCart_btns.forEach(btn =>{
      btn.addEventListener("click", handle_addCartItem);
    })
   

    updateTotal();
    

  }

  // ===============================================================


  function handle_removeCartItem() {
    this.parentElement.remove(); 

    itemCount--;
    updateCartAmount();

    update();
  }


    
    function handle_addCartItem(){
      let product = this.parentElement;
      let title = product.querySelector(".product-title").innerHTML;
      let price = product.querySelector(".product-price").innerHTML;
      let imgSrc = product.querySelector(".product-img").src;
      console.log(title,price,imgSrc)

      let newToAdd = {
        title,
        price,
        imgSrc  
      };

      let  cartBoxElement = CartBoxComponent (title, price, imgSrc);
      let newNode = document.createElement("div");
      newNode.innerHTML = cartBoxElement;
      const cartContent = cart.querySelector(".cart-content")
      cartContent.appendChild(newNode);

      update();

    }

  function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
  
    console.log(title, price, imgSrc);
  
    let newToAdd = {
      title,
      price,
      imgSrc,
    };


  
    // add null check for cart object
    const cart = document.querySelector('.cart');
    if (!cart) {
      console.error('Could not find cart element');
      return;
    }
  
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content")
    cartContent.appendChild(newNode);

    btnbuy.disabled = false; 
    btnbuy.style.background = "#ea3a3a";
    

  


    update();

    itemCount++;
    updateCartAmount();

  }


function updateCartAmount() {
  const cartAmount = document.querySelector('.cart-amount');
  cartAmount.innerHTML = itemCount;

  if (cartAmount == 0 ){
    btnbuy.disabled = true;
    btnbuy.style.background = "grey";
  
  }

}

function handle_removeCartItem() {
  let itemToRemove = this.parentElement;
  itemToRemove.remove();

  


  // Decrement the item count and update the cart amount
  itemCount--;
  updateCartAmount();
  update();
}

   function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
      this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
    
    
   }

  function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox => {
      let priceElement = cartBox.querySelector('.cart-price')
      let price = parseFloat(priceElement.innerHTML.replace("$",""));
      let quantity = cartBox.querySelector(".cart-quantity").value;
      total += price * quantity
    })
    totalElement.innerHTML = "$" + total;
    return total;
    update();

  }

function CartBoxComponent (title, price, imgSrc){

  return`
<div class="cart-box">
  <img src=${imgSrc} alt="" class="cart-img">

  <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      
      <div class="quantity">
      <label for="cart-quantity">Quantity<span >*</span></label>
      <input type="number" value="1"  name=""  class="cart-quantity">
      </div>
     
      
  </div>
  <i class='bx bxs-trash-alt cart-remove' ></i>

</div>
`


}




  
  // Add event listener for the buy button
  const buyButton = document.querySelector('.btn-buy');
  const cartItemcount = document.querySelectorAll('.cart-content');
  console.log(cartItemcount)
  // const checkoutButton = document.querySelector('#btn_buy');


  buyButton.addEventListener('click', () => {
    // Check if cart is empty
    if (itemCount === 0) {
      alert('Cart is empty. Please Add items to cart');
      console.log("Cart in empty. Please Add items to cart")

      btnbuy.disabled = true;
      btnbuy.style.background = "grey";

      return;



      
    }
  
    // Proceed with checkout
    console.log('Checkout button clicked');
  });




  const productButton = document.querySelector(".btn-buy");
  const payment = document.querySelector(".payment");
  const close = document.querySelector("#payment-close");

  productButton.addEventListener("click", () => {
    payment.style.display = "flex";
  });

  close.addEventListener("click", () => {
    payment.style.display = "none";
  });


  buyButton.addEventListener('click', () => {
 
  productButton.addEventListener("click", () => {
    payment.style.display = "flex";
  });

  close.addEventListener("click", () => {
    payment.style.display = "none";
  });

}); 


function validateForm() {
  // Get form inputs
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var phone = document.forms["myForm"]["phone"].value;
  var address = document.forms["myForm"]["address"].value;
  var cardNumber = document.forms["myForm"]["cardNumber"].value;
  var expiryMonth = document.forms["myForm"]["expiryMonth"].value;
  var expiryYear = document.forms["myForm"]["expiryYear"].value;
  var cvv = document.forms["myForm"]["cvv"].value;

  // Validate name
  if (name == "") {
    const nameInput = document.getElementById("checkout-name");
    nameInput.style.borderColor = "#ea3a3a"
    alert("Name must be filled out");
    // return false;
  }

  // Validate email
  if (email == "") {
    alert("Email must be filled out");
    const emailInput = document.getElementById("checkout-email");
    emailInput.style.borderColor = "#ea3a3a"


    // return false;
  }

  // Validate phone
  if (phone == "") {
    alert("Phone number must be filled out");
   

    // return false;
  }

  // Validate address
  if (address == "") {
    alert("Address must be filled out");
    // return false;
  }

  // Validate card number
  if (cardNumber == "") {
    alert("Card number must be filled out");
    const cardNumberInput = document.getElementById("cardNumber");
    cardNumberInput.style.borderColor = "#ea3a3a"
    // return false;
  }

  // Validate expiry month
  if (expiryMonth == "") {
    alert("Expiration month must be filled out");
    const expiryMonthInput = document.getElementById("expiryMonth");
    expiryMonthInput.style.borderColor = "#ea3a3a"
    // return false;
  }

  // Validate expiry year
  if (expiryYear == "") {
    alert("Expiration year must be filled out");
    const expiryYearInput = document.getElementById("expiryYear");
    expiryYearInput.style.borderColor = "#ea3a3a"
    // return false;
  }

  // Validate CVV
  if (cvv == "") {
    alert("CVV must be filled out");
    const cvvInput = document.getElementById("cvv");
    cvvInput.style.borderColor = "#ea3a3a"
    // return false;
  }

  else{
  
    function submitForm() {
      alert("Purchase Successful! ");
      window.open("shopping.html");
    }
    
    submitForm();
   
  }

  


   // Get all the input fields of the form
   var inputs = document.querySelectorAll('input');

   // Flag to track if there are any errors
   var hasErrors = false;
 
   // Loop through all the input fields and check if they are empty
   for (var i = 0; i < inputs.length; i++) {
     if (inputs[i].hasAttribute('required') && inputs[i].value.trim() === '') {
       // Add error class to the parent element of the input field
       inputs[i].parentNode.classList.add('error');
       // Set hasErrors flag to true
       hasErrors = true;
     }
     else {
       // Remove error class from the parent element of the input field
       inputs[i].parentNode.classList.remove('error');
     }
   }
 
   // If there are any errors, prevent form submission
   if (hasErrors) {
     return false;
   }

  // If all validations pass, return true
  return true;
}

