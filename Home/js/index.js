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