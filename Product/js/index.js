$(document).ready(function () {
  $(".slider-product").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  })
  
  var productList = JSON.parse(localStorage.getItem("products"));
  const pageProduct = (page,sort) => {
    if(sort === "All"){
      productList = JSON.parse(localStorage.getItem("products"));
    }
    if(sort === "Highest price"){
      productList.sort((o1,o2) => (o2.price * (1-o2.sale/100)) - (o1.price * (1-o1.sale/100)));
    }
    if(sort === "Lowest price"){
      productList.sort((o1,o2) => (o1.price * (1-o1.sale/100)) - (o2.price * (1-o2.sale/100)));
    }
    var htmlProducts = ``;
    var pagination = $("#pagination");
    var pageActive = parseInt(pagination.find(".page-item.active").text());
    var productPagination = [];
    var pageCurrent = pageActive;
    if(page == -1 && pageActive == 1 || page == -2 && pageActive == 5) // 
      return;
    if(page == -1){ // prev
      productPagination = productList.slice((pageActive-1 - 1)*6,(pageActive-1 - 1)*6+6);
      pageCurrent = pageActive - 1;
    }
    else if(page == -2){ // next
      productPagination = productList.slice((pageActive-1 + 1)*6,(pageActive-1 + 1)*6+6);
      pageCurrent = pageActive + 1;
    }
    else{
      productPagination = productList.slice((page-1)*6,(page-1)*6+6);
      pageCurrent = page;
    }
    productPagination.forEach(item => {
      htmlProducts += `<div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div class="item" data-id="${item.id}">
                          <a class="redirect image d-block" href="../../ProductDetail/html/product.html" data-id="${item.id}">
                            <img src="../img/${item.thumbnail[0]}" class="image-front w-100" alt="">
                            <img src="../img/${item.thumbnail[1]}" class="image-back w-100" alt="">
                            ${item.sale > 0 ? '<span class="sale">SALE</span>' : ''}
                            <div class="action">
                              <button class="btn-quick-view action-item" data-bs-toggle="modal" data-bs-target="#myModal"><i class="fa-regular fa-eye"></i></button>
                              <button class="action-item"><i class="fa-solid fa-cart-shopping"></i></button>
                              <button class="action-item"><i class="fa-regular fa-heart"></i></button>
                            </div>
                          </a>
                          <p class="cate">${item.category}</p>
                          <a class="redirect name d-block" href="../../ProductDetail/html/product.html" data-id="${item.id}">${item.name}</a>
                          <p class="price">
                          `
                          if(item.sale === 0){
                            htmlProducts += `<span class="price-only">$${item.price}</span>`
                          }
                          else{
                            htmlProducts += `<span class="old">$${item.price}</span>
                                    <span class="new">$${(item.price * (1-item.sale/100)).toFixed(0)}</span>`
                          }
                          htmlProducts += 
                                          `
                                          </p>
                                        </div>
                                      </div>`
    })
    $("#product-list").html(htmlProducts);
    pagination.html(`<li class="page-item" data-page="-1">
                              <span class="page-link" aria-label="Previous">
                                <span aria-hidden="true"><i class="fa-solid fa-caret-left"></i></span>
                              </span>
                            </li>
                            <li class="page-item ${pageCurrent == 1 ? 'active' : ''}" data-page="1"><span class="page-link">1</span></li>
                            <li class="page-item ${pageCurrent == 2 ? 'active' : ''}" data-page="2"><span class="page-link">2</span></li>
                            <li class="page-item ${pageCurrent == 3 ? 'active' : ''}" data-page="3"><span class="page-link">3</span></li>
                            <li class="page-item ${pageCurrent == 4 ? 'active' : ''}" data-page="4"><span class="page-link">4</span></li>
                            <li class="page-item ${pageCurrent == 5 ? 'active' : ''}" data-page="5"><span class="page-link">5</span></li>
                            <li class="page-item" data-page="-2">
                              <span class="page-link" aria-label="Next">
                                <span aria-hidden="true"><i class="fa-solid fa-caret-right"></i></span>
                              </span>
                            </li>`)
  }
  pageProduct(1,"All");
  $(document).on("click",".page-item",function(){
    var page = parseInt($(this).attr("data-page"));
    pageProduct(page);
  })
  $("#filter-sort").on("change",function(){
    var sort = $(this).val();
    pageProduct(1,sort);
  })

  const getAllDefaultTag = () => {
    var checkedList = Array.from(document.querySelectorAll(".form-check-input")).filter(x => x.checked);
    var htmls = ``;
    checkedList.forEach(tag => {
      var label = tag.nextElementSibling;
      htmls += `<span class="tag">${label.textContent}<i class="remove-tag fa-solid fa-xmark ms-2"></i></span>`
    })
    document.getElementById("tag").innerHTML = htmls;
  }
  getAllDefaultTag();
  $(".form-check-input").click(function(){
    var checked = $(this).attr('checked');
    var tag = $(this).next().text(); // Lấy thẻ label
    var tagList = $("#tag");
    if(checked != undefined){ // Thêm mới
      tagList.append(`<span class="tag">${tag}<i class="remove-tag fa-solid fa-xmark ms-2"></i></span>`);
    }
    else{ // Xóa
      var element = Array.from(document.querySelectorAll(".tag")).filter(x => x.textContent === tag)[0];
      element.remove();
    }
  })

  $(document).on("click",".remove-tag",function(){
    var span = $(this).parent(".tag");
    var tag = span.text();
    var element = Array.from(document.querySelectorAll(".tag")).filter(x => x.textContent === tag)[0];
    element.remove(); // Xóa

    // Xóa checked
    var inputCheck = Array.from(document.querySelectorAll(".form-check-input")).filter(x => 
      x.nextElementSibling.textContent === tag)[0];
    inputCheck.checked = false;
  })
  $(document).on("click",".redirect",function(){
    var id = $(this).attr("data-id");
    localStorage.setItem("idProduct",id);
  })
});


