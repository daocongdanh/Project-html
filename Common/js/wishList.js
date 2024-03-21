$(document).ready(function () {
  const loadDataWishList = () => {
    var wishLists = JSON.parse(localStorage.getItem("wishLists"));
    $("#wishh").attr("data-wish",wishLists == null ? 0 : wishLists.length)
    $("#wishList .title").text(`Wish List (${wishLists == null ? 0 : wishLists.length })`)
    var htmlWishLists = ``;
    if(wishLists != null){
      wishLists.forEach(item => {
        htmlWishLists += `<li class="item">
                            <div class="row">
                              <a class="redirect col-3 d-block" href="../../ProductDetail/html/index.html" data-id="${item.id}">
                                <img src="../../Common/img/${item.thumbnail[0]}" alt="">
                              </a>
                              <div class="col-9 d-flex flex-column justify-content-between">
                                <div class="top">
                                  <a class=" redirect name d-block" href="../../ProductDetail/html/index.html" data-id="${item.id}">${item.name}</a>
                                  <span class="price">$${(item.price*(1-item.sale/100)).toFixed(0)}</span>
                                </div>
                                <div class="bot">
                                  <a href="#" class="remove-wish" data-id="${item.id}"><i class="fa-solid fa-xmark"></i>Remove</a>
                                </div>
                              </div>
                            </div>
                          </li>`;
      })
    }
    $("#wishListResult").html(htmlWishLists);
  }
  loadDataWishList();
  $(document).on("click",".wish",function(){
    var productList = JSON.parse(localStorage.getItem("products"));
    var id = parseInt($(this).closest(".item").attr("data-id"));
    var product = productList.filter(item => item.id == id)[0];
    if(localStorage.getItem("wishLists") != null){
      var wishLists = JSON.parse(localStorage.getItem("wishLists"));
      if(wishLists.findIndex(item => item.id == id) >= 0){
        alert("Sản phẩm đã có trong danh mục yêu thích của bạn");
        return;
      }
      else{
        wishLists.push(product);
        localStorage.setItem("wishLists",JSON.stringify(wishLists));
      }
    }
    else{
      var wishLists = [];
      wishLists.push(product);
      localStorage.setItem("wishLists",JSON.stringify(wishLists));
    }
    loadDataWishList();
    alert("Thêm thành công sản phẩm vào danh mục yêu thích");
  })
  $(document).on("click",".remove-wish",function(){
    var wishLists = JSON.parse(localStorage.getItem("wishLists"));
    var id = parseInt($(this).attr("data-id"));
    var wishListNew = wishLists.filter(item => item.id != id);
    if(wishListNew.length > 0){
      localStorage.setItem("wishLists",JSON.stringify(wishListNew));
      $("#wishList .title").text(`Wish List (${wishListNew.length})`)
    }
    else {
      localStorage.removeItem("wishLists");
      $("#wishList .title").text(`Wish List (0)`)
    }
    $("#wishh").attr("data-wish",wishListNew == null ? 0 : wishListNew.length)
    $(this).closest("li").remove();
  })
});