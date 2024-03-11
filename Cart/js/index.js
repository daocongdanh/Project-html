$(document).ready(function () {
  const totalMoney = () => {
    var tong = 0;
    var cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
    if(cart == null)
      return tong;
    cart.forEach(item => {
      tong += (item.product.price*(1-item.product.sale/100) * item.quantity);
    })
    return tong.toFixed(0);
  }
  const shoppingCart = () => {
    var cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
    var shoppingCart = $("#shoppingCart");
    var htmlShoppingCart = ``;
    if(cart != null){
      cart.forEach(item => {
        htmlShoppingCart += `<li class="list-group-item p-0 pt-4 pb-4" data-id="${item.product.id}">
                              <div class="row" class="align-items-center">
                                <div class="col-3">
                                  <a href="#">
                                    <img src="../img/${item.product.thumbnail[0]}" alt="" class="w-100 h-100" style="object-fit: contain;">
                                  </a>
                                </div>
                                <div class="col">
                                  <div class="d-flex mb-2">
                                    <a href="#" style="color: black; font-weight: 500;">${item.product.name}</a>
                                    <span class="ms-auto" style="color: black; font-weight: 500;">$${(item.product.price*(1-item.product.sale/100)).toFixed(0)}</span>
                                  </div>
                                  <p class="mb-7 text-muted fs-sm">
                                    Size: ${item.size}
                                    <br>
                                    Color: ${item.color}
                                  </p>
                                  <div class="d-flex align-items-center">
                                    <div class="size">
                                      <select class="qty form-select" aria-label="Default select example">
                                        <option ${item.quantity == 1 ? 'selected' : ''} value="1">1</option>
                                        <option ${item.quantity == 2 ? 'selected' : ''} value="2">2</option>
                                        <option ${item.quantity == 3 ? 'selected' : ''} value="3">3</option>
                                        <option ${item.quantity == 4 ? 'selected' : ''} value="4">4</option>
                                        <option ${item.quantity == 5 ? 'selected' : ''} value="5">5</option>
                                      </select>
                                    </div>
                                    <a href="#" class="cart-remove fs-xs text-gray-400 ms-auto"><i class="fa-solid fa-x"></i> Remove</a>
                                  </div>
                                </div>
                              </div>
                            </li>`
      })
    }
    shoppingCart.html(htmlShoppingCart);
    $(".totalPrice").text(`$${totalMoney()}`);
    $(".subTotal").text(`$${totalMoney()}`);
  }
  shoppingCart();
  const cartModal = () => {
    var cart = sessionStorage.getItem("cart") != null ? JSON.parse(sessionStorage.getItem("cart")) : null;
    var count =  cart != null ? cart.length : 0;
    $("#cart").attr("data-cart",count);
    
    
    var cartModal = $("#cart-modal");
    cartModal.find(".title").text(`Your Cart (${count})`);
    var htmlCartModal = ``;
    if(count > 0){
      cart.forEach(item => {
        htmlCartModal += `<li class="item" data-id="${item.product.id}">
                            <div class="row align-items-center">
                              <div class="col-4">
                                <img src="../img/${item.product.thumbnail[0]}" alt="">
                              </div>
                              <div class="col-8">
                                <p class="name">${item.product.name}</p>
                                <span class="price">$
                                ${(item.product.price*(1-item.product.sale/100)).toFixed(0)}</span>
                                <p class="m-0 price">Size: ${item.size}</p>
                                <p class="m-0 price">Color: ${item.color}</p>
                                <div class="action">
                                  <select class="qty form-select form-select-xxs w-auto">
                                    <option ${item.quantity == 1 ? 'selected' : ''} value="1">1</option>
                                    <option ${item.quantity == 2 ? 'selected' : ''} value="2">2</option>
                                    <option ${item.quantity == 3 ? 'selected' : ''} value="3">3</option>
                                    <option ${item.quantity == 4 ? 'selected' : ''} value="4">4</option>
                                    <option ${item.quantity == 5 ? 'selected' : ''} value="5">5</option>
                                  </select>
                                  <a class="cart-remove" href="#" ><i class="fa-solid fa-xmark"></i>Remove</a>
                                </div>
                              </div>
                            </div>
                          </li>`
      })
    }
    cartModal.find(".list").html(htmlCartModal);
    $("#total-money").text(`$${totalMoney()}`)
  }
  cartModal();

  const updateCart = (id, qty) =>{
    cart = JSON.parse(sessionStorage.getItem("cart"));
    var indexCartItem = cart.findIndex(item => item.product.id === id);
    cart[indexCartItem] = {
      product : cart[indexCartItem].product,
      quantity: qty,
      color: cart[indexCartItem].color,
      size : cart[indexCartItem].size
    }
    sessionStorage.setItem("cart",JSON.stringify(cart)); 
  }
  const removeCart = (id) => {
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    var cartNew = cart.filter(item => item.product.id != id);
    if(cartNew.length > 0){
      sessionStorage.setItem("cart",JSON.stringify(cartNew));
    }
    else{
      sessionStorage.removeItem("cart");
    }
  }
  $(document).on("click",".cart-remove",function(){
    var id = $(this).closest("li").attr("data-id");
    removeCart(parseInt(id));
    cartModal();
    shoppingCart();
  })
  $(document).on("change",".qty",function(){
    var id = $(this).closest("li").attr("data-id");
    var qty = $(this).val();
    updateCart(parseInt(id),parseInt(qty));
    cartModal();
    shoppingCart();
  })
});