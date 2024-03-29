
$(document).ready(function () {
  var productList = JSON.parse(localStorage.getItem("products"));
  var idProduct = parseInt(localStorage.getItem("idProduct"));
  var product = productList.filter(item => item.id ==idProduct)[0];
  // Product detail
  const loadData = () => {

    // Hình ảnh và tên sản phẩm 
    $("#hinhanhminhhoa").attr("src",`../../Common/img/${product.thumbnail[0]}`);
    var htmlOptionImage =``;
    product.thumbnail.forEach((item, index) => {
      htmlOptionImage += `<div class="box-item mb-2">
                            <img style="border-bottom: 2px solid transparent;box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;" src="../../Common/img/${item}" class="opimg ${index == 0 ? 'selected' : ''}" alt="../../Common/img/${item}">
                          </div>`
    })
    if(product.sale > 0){
      $("#sale").addClass("d-block");
      $("#price").html(`<span class="old">$${product.price}</span>
                        <span class="new">$${(product.price * (1-product.sale/100)).toFixed(0)}</span>
                        <span>(In stock)</span>`)
    }
    else{
      $("#sale").addClass("d-none");
      $("#price").html(`<span class="price-only">$${product.price}</span>
                        <span>(In stock)</span>`)                  
    }
    $("#optionImage").html(htmlOptionImage);
    $("#categoryName").text(product.category);
    $("#productName").text(product.name);
    $("#color").text(product.color);
    $("#wish").attr("data-id",product.id);

  }
  // Bình luận
  const loadReviews = (page,sort) =>{
     // Bình luận
    var reviewList = JSON.parse(localStorage.getItem("reviews"));
    var reviewsByProduct = reviewList.filter(item => item.productId == idProduct);
    if(sort == "Lowest star"){
      reviewsByProduct.sort((o1, o2) => o1.rate - o2.rate);
    }
    if(sort == "Highest star"){
      reviewsByProduct.sort((o1, o2) => o2.rate - o1.rate);
    }
    if(sort == "Oldest"){
      reviewsByProduct.sort((o1, o2) => Date.parse(o1.time) - Date.parse(o2.time));
    }
    if(sort == "Newest"){
      reviewsByProduct.sort((o1, o2) => Date.parse(o2.time) - Date.parse(o1.time));
    }
    // Rate avg
    var tong = 0;
    reviewsByProduct.forEach(item => {
      tong += item.rate;
    })
    tong = Math.ceil(tong / (reviewsByProduct.length));
    var htmlRateAvg = ``;
    for(let i=1;i<=5;i++){
      if(i <= tong)
        htmlRateAvg += `<i class="fa fa-star "></i>`;
      else 
        htmlRateAvg += `<i class="fa fa-star" style="color: #CCCCCC;"></i>`;
    }
    $("#avgRate1").html(htmlRateAvg + `<p class="review-count mb-0 ms-3">Reviews (${reviewsByProduct.length})</p>`);
    $("#avgRate2").html(htmlRateAvg);
    $(".review-count").each(function(){
      $(this).text(`Reviews (${reviewsByProduct.length})`)
    })

    var totalPage = Math.floor((reviewsByProduct.length)/2) + (((reviewsByProduct.length) % 2 == 0) ? 0 : 1);
    var pagination = $("#pagination");
    var pageActive = parseInt(pagination.find(".page-item.active").text());
    var pageCurrent = pageActive;
    // Pagination
    if(page == -1 && pageActive == 1 || page == -2 && pageActive == totalPage)
      return;
    if(page == -1){ // prev
      reviewsByProduct = reviewsByProduct.slice((pageActive-1 - 1)*2,(pageActive-1 - 1)*2+2);
      pageCurrent = pageActive - 1;
    }
    else if(page == -2){ // next
      reviewsByProduct = reviewsByProduct.slice((pageActive-1 + 1)*2,(pageActive-1 + 1)*2+2);
      pageCurrent = pageActive + 1;
    }
    else{
      reviewsByProduct = reviewsByProduct.slice((page-1)*2,(page-1)*2+2);
      pageCurrent = page;
    }
    var htmlReview = ``;
    reviewsByProduct.forEach(item => {
      htmlReview += `<div class="mb-4 box-review">
                      <div style="padding: 40px 0px;">
                        <div class="row g-0">
                          <!--Avt-->
                          <div class="col-12 col-md-auto">
                            <div class="d-flex mb-3">
                              <span class="rounded-circle box-avt"><i class="fa-solid fa-user"
                                  style="color : #CCCCCC; font-size: 30px"></i></span>
                            </div>
                          </div>
                          <!--Review Info-->
                          <div class="col-12 col-md">
                            <div class="row mb-4">
                              <div class="col-12 d-flex align-items-center">
                                <div class="d-flex justify-content-center align-items-center">
                                `
    for(let i=0;i<item.rate;i++){
      htmlReview += `<i class="fa fa-star "></i>`
    }
                    htmlReview+=                              
                                `
                                </div>
                              </div>
                              <div class="col-12">
                                <span class="fs-xs text-muted">${item.userName}, 
                                `
                    var date = item.time.split('/');
                    htmlReview+= `${date[1].length == 1 ? ('0'+date[1]) : date[1]}-${date[0].length == 1 ? ('0'+date[0]) : date[0]}-${date[2]}`
                    htmlReview+=
                                `
                                </span>
                              </div>
                            </div>
                            <h5 class="mb-2" style="font-size: 18px;">${item.title}</h5>
                            <p class="text-gray-500 mb-5">${item.comment}.
                            </p>
                            <div class="row align-items-center justify-content-center">
                              <div class="col-auto d-none d-lg-block">
                                <p class="mb-0 fs-sm">Was this review helpful?</p>
                              </div>
                              <div class="col-auto me-auto">
                                <div class="rate">
                                  <a class="rate-item" role="button">
                                    <i class="fa-regular fa-thumbs-up"></i>
                                    <span class="like-count p-2">0</span>
                                  </a>
                                  <a class="rate-item" role="button">
                                    <i class="fa-regular fa-thumbs-down"></i>
                                    <span class="dislike-count p-2">0</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`
    })
    $("#review").html(htmlReview);
    var htmlPagination = `<li class="page-item" data-page="-1">
                            <span class="page-link" aria-label="Previous">
                              <span aria-hidden="true"><i class="fa-solid fa-caret-left"></i></span>
                            </span>
                          </li>
                          `
        for(let i=1;i<=totalPage;i++){
          htmlPagination += `<li class="page-item ${pageCurrent == i ? 'active' : ''}" data-page="${i}"><span class="page-link">${i}</span></li>`
        }
          htmlPagination +=
                          `
                          <li class="page-item" data-page="-2">
                            <span class="page-link" aria-label="Next">
                              <span aria-hidden="true"><i class="fa-solid fa-caret-right"></i></span>
                            </span>
                          </li>`;
    pagination.html(htmlPagination)
  }
  loadData();
  loadReviews(1,"Default");

  // Sort Review
  $(document).on("change","#sortReview",function(){
    var sort = $(this).val();
    loadReviews(1,sort);
  })

  // Chuyển trang
  $(document).on("click",".page-item",function(){
    var page = parseInt($(this).attr("data-page"));
    var sort = $("#sortReview").val();
    loadReviews(page,sort);
  })
  // Random 4 sp
  const randomProduct = () => {
    var productRandom = [];
    while(1){
      var index = Math.floor(Math.random() * productList.length);
      var product = productList[index];
      if(!productRandom.includes(product))
        productRandom.push(product);
      if(productRandom.length == 4)
        break;
    }

    var htmlRandom = ``;
    productRandom.forEach(item => {
      htmlRandom += `<div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                      <div class="item" data-id="${item.id}">
                        <div class="redirect image" href="../../ProductDetail/html/product.html" data-id="${item.id}">
                          <img src="../../Common/img/${item.thumbnail[0]}" class="image-front w-100" alt="">
                          <img src="../../Common/img/${item.thumbnail[1]}" class="image-back w-100" alt="">
                          ${item.sale > 0 ? '<span class="sale">SALE</span>' : ''}
                          <div class="action">
                            <button class="btn-quick-view action-item" data-bs-toggle="modal" data-bs-target="#myModal"><i class="fa-regular fa-eye"></i></button>
                            <button class="addCart action-item"><i class="fa-solid fa-cart-shopping"></i></button>
                            <button class="wish action-item"><i class="fa-regular fa-heart"></i></button>
                          </div>
                        </div>
                        <p class="cate">${item.category}</p>
                        <a class="redirect name d-block" href="../../ProductDetail/html/index.html" data-id="${item.id}">${item.name}</a>
                        <p class="price">
                        `
                        if(item.sale === 0){
                          htmlRandom += `<span class="price-only">$${item.price}</span>`
                        }
                        else{
                          htmlRandom += `<span class="old">$${item.price}</span>
                                  <span class="new">$${(item.price * (1-item.sale/100)).toFixed(0)}</span>`
                        }
                        htmlRandom += 
                                        `
                                        </p>
                                      </div>
                                    </div>`
    })
    $("#product-list").html(htmlRandom);
  }
  randomProduct();


  // Thay đổi hình ảnh
  $('.radio-sneaker').click(function (state) { 
    document.querySelectorAll('.radio-sneaker').forEach((e) => {
      e.classList.remove('selected');
    });
    document.getElementById('color').innerHTML = state.target.value;
    state.currentTarget.classList.add('selected');
  });

  $(".opimg").on("click", function (state) {
    var thumbImg = document.getElementById("hinhanhminhhoa");
    thumbImg.src = "../img/" + state.target.alt;
    document.querySelectorAll('.opimg').forEach((e) => {
      e.classList.remove('selected');
    });

    state.target.classList.add('selected');
  });

  $(".option-des").click(function (state) {
    document.querySelectorAll('.option-des').forEach((e) => {
      e.classList.remove('active');
    });
    state.currentTarget.classList.add('active');
  });

  $('.option-des').click(function () {
    var targetCollapse = $(this).attr('href');
    $('.collapse.show').not(targetCollapse).collapse('hide');
  });


  $('.form-check-size').click(function (state) {
    let elementSpan = state.currentTarget.children[1];
    if ( !elementSpan.classList.contains('form-check-disable')) {
      let valueChoose = state.currentTarget.children[0].value;
      let sizeChoose = document.getElementById('sizeChoose');
      sizeChoose.innerHTML = valueChoose + " US";

      document.querySelectorAll('.form-check-size').forEach((e) => {
        e.classList.remove('selected-size');
      });

      state.currentTarget.classList.add('selected-size');
    }
  });

  $('.form-check-wait').click(function (state) {
    document.querySelectorAll('.form-check-wait').forEach((e) => {
      e.classList.remove('selected-size');
    });
    state.currentTarget.classList.add('selected-size');
  });

  $('.star').click(function (state) {
    let value = state.currentTarget.value;
    $(this).closest("ul").attr("data-star",value);
    let mangSao = document.querySelectorAll('.star');
    Array.from(mangSao).map((e) => {
      if (e.value <= value) {
        e.children[0].style.color = "black";
      }
      else {
        e.children[0].style.color = "#CCCCCC";
      }
    })
  });

  // Post comment
  $("#postReview").click(function(e){
    e.preventDefault();
    var user = localStorage.getItem("user");
    if(user == null){
      window.location = "../../SignIn/html/index.html"
    }
    else{
      user = JSON.parse(user);
      console.log(user);
      var reviewList = JSON.parse(localStorage.getItem("reviews"));
      var name = $("#nameReview").val()
      var email = $("#emailReview").val()
      var title = $("#titleReview").val()
      var comment = $("#areaReview").val()
      var rate = parseInt($("#stars").attr("data-star"));
      const review = {
        id: reviewList.length + 1,
        userName : user.firstName + " " + user.lastName,
        productId : parseInt(JSON.parse(localStorage.getItem("idProduct"))),
        rate: rate,
        time : new Date().toLocaleDateString(),
        title : title,
        comment : comment
      }
      reviewList.push(review);
      localStorage.setItem("reviews", JSON.stringify(reviewList));
      $("#comment").removeClass("show");
      alert("Đánh giá thành công");
      loadReviews(1);
    }
  })


});
