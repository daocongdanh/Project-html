$(document).ready(function () {
  $(".slider-product").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  })
  
  var productList = JSON.parse(localStorage.getItem("products"));

  $("#allProducts").click(function(){
    var tagList = $("#tag");
    var tagExists = tagList.find("span").filter(function(){
      return $(this).text() === "All Products";
    });
    if(tagExists.length == 0){
      tagList.append(`<span class="tag" data-value="all">All Products<i class="remove-tag fa-solid fa-xmark ms-2"></i></span>`)
    }
    else{
      var element = Array.from(document.querySelectorAll(".tag")).filter(x => x.textContent === "All Products")[0];
      element.remove();
    }
  })
  const search = (all, sort, page, category, season, size, color, brand, price ) =>{
    var products = JSON.parse(localStorage.getItem("products"));
    var productFilter = [];
    var htmlProducts = ``;

    if(all.length > 0 || sort == "All"){
      productFilter = products;
    }
    if(sort === "Highest price"){
      products.sort((o1,o2) => (o2.price * (1-o2.sale/100)) - (o1.price * (1-o1.sale/100)));
    }
    if(sort === "Lowest price"){
      products.sort((o1,o2) => (o1.price * (1-o1.sale/100)) - (o2.price * (1-o2.sale/100)));
    }
    if(all.length == 0 && sort != "All"){
      productFilter = products.filter(item => {
        return (category.length > 0 ? category.some((value) => item.name.toLowerCase().includes(value.toLowerCase())) : true)
            && (season.length > 0 ? season.some((value) => item.season.toLowerCase().includes(value.toLowerCase())) : true)
            && (size.length > 0 ? size.some((value) => item.sizeList.includes(value)) : true)
            && (color.length > 0 ? color.some((value) => item.color.toLowerCase().includes(value.toLowerCase())) : true)
            && (price.length > 0 ? (price[0] <= (item.price * (1-item.sale/100)) && 
            price[price.length-1] >= (item.price * (1-item.sale/100))) : true);
      })
    }
    var totalPage = Math.floor((productFilter.length)/6) + (((productFilter.length) % 6 == 0) ? 0 : 1);
    var pagination = $("#pagination");
    var pageActive = parseInt(pagination.find(".page-item.active").text());
    var pageCurrent = pageActive;
    // Pagination
    if(page == -1 && pageActive == 1 || page == -2 && pageActive == totalPage)
      return;
    if(page == -1){ // prev
      productFilter = productFilter.slice((pageActive-1 - 1)*6,(pageActive-1 - 1)*6+6);
      pageCurrent = pageActive - 1;
    }
    else if(page == -2){ // next
      productFilter = productFilter.slice((pageActive-1 + 1)*6,(pageActive-1 + 1)*6+6);
      pageCurrent = pageActive + 1;
    }
    else{
      productFilter = productFilter.slice((page-1)*6,(page-1)*6+6);
      pageCurrent = page;
    }
    productFilter.forEach(item => {
      htmlProducts += `<div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
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

  $(document).on("click",".form-check-input",function(){
    const tagList = $(".tag");
    const all = tagList.filter(function(){
      return $(this).attr("data-value") == "all";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const categoryList = tagList.filter(function(){
      return $(this).attr("data-value") == "category";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const seasonList = tagList.filter(function(){
      return $(this).attr("data-value") == "season";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const sizeList = tagList.filter(function(){
      return $(this).attr("data-value") == "size";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const colorList = tagList.filter(function(){
      return $(this).attr("data-value") == "color";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const brandList = tagList.filter(function(){
      return $(this).attr("data-value") == "brand";
    }).map(function(){
      return $(this).text();
    }).toArray();

    var priceArray = [];
    const priceList = tagList.filter(function(){
      return $(this).attr("data-value") == "price";
    }).toArray();
    priceList.forEach(item => {
      priceArray.push(item.getAttribute("data-from"));
      priceArray.push(item.getAttribute("data-to"));
    })
    priceArray = priceArray.map(item => parseInt(item)).sort((o1,o2) => o1-o2);
    var sort = $("#filter-sort").val();
    search(all,sort,1,categoryList,seasonList,sizeList,colorList,brandList, priceArray);
  })

  search(["All Products"],"All",1,[],[],[],[],[],[]);

  $(document).on("click",".page-item",function(){
    var page = parseInt($(this).attr("data-page"));
    const tagList = $(".tag");
    const all = tagList.filter(function(){
      return $(this).attr("data-value") == "all";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const categoryList = tagList.filter(function(){
      return $(this).attr("data-value") == "category";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const seasonList = tagList.filter(function(){
      return $(this).attr("data-value") == "season";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const sizeList = tagList.filter(function(){
      return $(this).attr("data-value") == "size";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const colorList = tagList.filter(function(){
      return $(this).attr("data-value") == "color";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const brandList = tagList.filter(function(){
      return $(this).attr("data-value") == "brand";
    }).map(function(){
      return $(this).text();
    }).toArray();

    var priceArray = [];
    const priceList = tagList.filter(function(){
      return $(this).attr("data-value") == "price";
    }).toArray();
    priceList.forEach(item => {
      priceArray.push(item.getAttribute("data-from"));
      priceArray.push(item.getAttribute("data-to"));
    })
    priceArray = priceArray.map(item => parseInt(item)).sort((o1,o2) => o1-o2);
    var sort = $("#filter-sort").val();
    search(all,sort,page,categoryList,seasonList,sizeList,colorList,brandList, priceArray);
  })
  

  $("#filter-sort").on("change",function(){
    const tagList = $(".tag");
    const all = tagList.filter(function(){
      return $(this).attr("data-value") == "all";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const categoryList = tagList.filter(function(){
      return $(this).attr("data-value") == "category";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const seasonList = tagList.filter(function(){
      return $(this).attr("data-value") == "season";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const sizeList = tagList.filter(function(){
      return $(this).attr("data-value") == "size";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const colorList = tagList.filter(function(){
      return $(this).attr("data-value") == "color";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const brandList = tagList.filter(function(){
      return $(this).attr("data-value") == "brand";
    }).map(function(){
      return $(this).text();
    }).toArray();

    var priceArray = [];
    const priceList = tagList.filter(function(){
      return $(this).attr("data-value") == "price";
    }).toArray();
    priceList.forEach(item => {
      priceArray.push(item.getAttribute("data-from"));
      priceArray.push(item.getAttribute("data-to"));
    })
    priceArray = priceArray.map(item => parseInt(item)).sort((o1,o2) => o1-o2);
    var sort = $("#filter-sort").val();
    search(all,sort,1,categoryList,seasonList,sizeList,colorList,brandList, priceArray);
  })
  $(".form-check-input").click(function(){
    var checked = $(this).attr('checked');
    var group = $(this).closest(".group").attr("data-group");
    var tag = $(this).next().text(); // Lấy thẻ label
    var tagList = $("#tag");
    if(checked != undefined){ // Thêm mới
      if(group != "price"){
        tagList.append(`<span class="tag" data-value="${group}">${tag}<i class="remove-tag fa-solid fa-xmark ms-2"></i></span>`);
      }
      else{
        tagList.append(`<span class="tag" data-value="${group}" data-from="${$(this).attr("data-from")}" data-to="${$(this).attr("data-to")}">${tag}<i class="remove-tag fa-solid fa-xmark ms-2"></i></span>`);
      }
    }
    else{ // Xóa
      var element = Array.from(document.querySelectorAll(".tag")).filter(x => x.textContent === tag)[0];
      element.remove();
    }
  })

  
  $(document).on("click",".remove-tag",function(){
    var span = $(this).parent(".tag");
    var tag = span.text();
    if(tag !== "All Products"){
      // Xóa checked
      var inputCheck = Array.from(document.querySelectorAll(".form-check-input")).filter(x => 
        x.nextElementSibling.textContent === tag)[0];
      inputCheck.checked = false;
    }
    var element = Array.from(document.querySelectorAll(".tag")).filter(x => x.textContent === tag)[0];
    element.remove(); // Xóa
  })

  $(document).on("click",".remove-tag",function(){
    const tagList = $(".tag");
    const all = tagList.filter(function(){
      return $(this).attr("data-value") == "all";
    }).map(function(){
      return $(this).text();
    }).toArray();
    const categoryList = tagList.filter(function(){
      return $(this).attr("data-value") == "category";
    }).map(function(){
      return $(this).text();
    }).toArray();
    const seasonList = tagList.filter(function(){
      return $(this).attr("data-value") == "season";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const sizeList = tagList.filter(function(){
      return $(this).attr("data-value") == "size";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const colorList = tagList.filter(function(){
      return $(this).attr("data-value") == "color";
    }).map(function(){
      return $(this).text();
    }).toArray();

    const brandList = tagList.filter(function(){
      return $(this).attr("data-value") == "brand";
    }).map(function(){
      return $(this).text();
    }).toArray();

    var priceArray = [];
    const priceList = tagList.filter(function(){
      return $(this).attr("data-value") == "price";
    }).toArray();
    priceList.forEach(item => {
      priceArray.push(item.getAttribute("data-from"));
      priceArray.push(item.getAttribute("data-to"));
    })
    priceArray = priceArray.map(item => parseInt(item)).sort((o1,o2) => o1-o2);
    var sort = $("#filter-sort").val();
    search(all,sort,1,categoryList,seasonList,sizeList,colorList,brandList, priceArray);
  })
  $(document).on("click",".redirect",function(){
    var id = $(this).attr("data-id");
    localStorage.setItem("idProduct",id);
  })

});


