$(document).ready(function () {
  var productList = JSON.parse(localStorage.getItem("products"));
  var categoryList = JSON.parse(localStorage.getItem("categories"));
  var htmlCategories = ``;
  categoryList.forEach(item => {
    htmlCategories += `<div class="item">
                        <div class="image">
                          <img src="../img/${item.image}" alt="">
                        </div>
                        <p class="name">
                          ${item.name}
                        </p>
                      </div>`
  });
  $("#slide-category").html(htmlCategories);


  // Random 7 sp
  var productRandom1 = [];
  while(1){
    var index = Math.floor(Math.random() * productList.length);
    var product = productList[index];
    if(!productRandom1.includes(product))
      productRandom1.push(product);
    if(productRandom1.length == 7)
      break;
  }

  var htmlProducts = ``;
  productRandom1.forEach(item => {
    htmlProducts += `<div class="item" data-id="${item.id}">
                      <div class="image">
                        <img src="../img/${item.thumbnail[0]}" alt="">
                        <button class="btn-quick-view" data-bs-toggle="modal" data-bs-target="#myModal">
                          <i class="fa-regular fa-eye"></i>
                          <span>Quick View</span>
                        </button>
                        <div class="wish">
                          <i class="fa-regular fa-heart"></i>
                        </div>
                        ${item.sale > 0 ? '<span class="sale">SALE</span>' : ''}
                      </div>
                      <p class="name">${item.name}</p>
                      <p class="price">
                      `;
                      if(item.sale === 0){
                        htmlProducts += `<span class="price-only">$${item.price}</span>`
                      }
                      else{
                        htmlProducts += `<span class="old">$${item.price}</span>
                                <span class="new">$${(item.price * (1-item.sale/100)).toFixed(0)}</span>`
                      }
                      htmlProducts += `
                                      </p>
                                    </div>`                 
  })
  $("#slide-product-hot").html(htmlProducts);
  const getProductById = (id) => {
    var product = productList.filter(item => item.id == id)[0];
    return product;
  }

  // Modal
  $(document).on("click",".btn-quick-view",function(){
    var id = $(this).closest(".item").attr("data-id"); // Tìm thẻ item là cha gần nhất của button
    var product = getProductById(id);
    var modal = $("#myModal");
    
    modal.attr("data-id",product.id);
    modal.find(".name").text(product.name);
    if(product.sale == 0){
      modal.find(".price").html(`$${product.price} <span> (In Stock)</span>`);
    }
    else {
      modal.find(".price").html(`$${(product.price * (1-product.sale/100)).toFixed(0)} <span> (In Stock)</span>`);
    }
    modal.find("#color").text(product.color);
    modal.find("#modal-image").attr('src','../img/' + product.thumbnail[0]);
  })
  // Add cart
  const addToCart = (id,qty) => {
    var product = getProductById(id);
    var cartItem = {
      product : product,
      quantity : qty
    }
    var cart = [];
    if(sessionStorage.getItem("cart") == null){
      cart.push(cartItem);
    }
    else{
      cart = JSON.parse(sessionStorage.getItem("cart"));
      var indexCartItem = cart.findIndex(item => item.product.id === product.id); 
      // Check sản phẩm mới thêm đã có trong giỏ hàng hay chưa
      if(indexCartItem >= 0){
        cart[indexCartItem] = {
          product : product,
          quantity: qty + cart[indexCartItem].quantity
        }
      }
      else{
        cart.push(cartItem);
      }
    }
    sessionStorage.setItem("cart",JSON.stringify(cart));
  }
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
                                <p class="name">Cropped cotton Top</p>
                                <span class="price">$
                                ${(item.product.price*(1-item.product.sale/100)).toFixed(0)}</span>
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
      quantity: qty
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
  // Gắn sự kiện cho button remove mới đẩy lên lại
  $(document).on("click",".cart-remove",function(){
    var id = $(this).closest("li").attr("data-id");
    removeCart(parseInt(id));
    cartModal();
  })
  $(".add-cart").click(function(){
    var id = $("#myModal").attr("data-id");
    var qty = $("#quantity").val();
    addToCart(parseInt(id),parseInt(qty));
    cartModal();
    $(".btn-close").click(); // giả lập click thoát
    setTimeout(() => {
      alert("Thêm sản phẩm vào giỏ hàng thành công"); 
    },100)
  })
  $(document).on("change",".qty",function(){
    var id = $(this).closest("li").attr("data-id");
    var qty = $(this).val();
    updateCart(parseInt(id),parseInt(qty));
    cartModal();
  })

  $('.sec-two .slide-category').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive : [
      {
        breakpoint: 1200,
        settings : {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 992,
        settings : {
          slidesToShow: 3,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings : {
          slidesToShow: 2,
          arrows: false
        }
      },
      {
        breakpoint: 576,
        settings : {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]

  });
  $('.sec-four .slide-category').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    responsive : [
      {
        breakpoint: 1200,
        settings : {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 992,
        settings : {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings : {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings : {
          slidesToShow: 1
        }
      }
    ]
  })
  $('.sec-five .slide-left').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Mượt
    asNavFor: '.sec-five .slide-right'
  });
  $('.sec-five .slide-right').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.sec-five .slide-left',
    dots: true,
    // centerMode: true,
    focusOnSelect: true
  });
  
  $(".slide").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    fade: true,
    arrows: true,
    responsive : [
      {
        breakpoint: 992,
        settings : {
          arrows: false
        }
      }
    ]
  })
});