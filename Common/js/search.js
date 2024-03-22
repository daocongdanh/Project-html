$(document).ready(function () {
  // Lấy danh sách product có trong localStorage
  var productList = JSON.parse(localStorage.getItem("products"));

  // Hàm search ở header
  const loadDataSearch = (category,keyword) => {
    var htmlSearch = ``;
    var result;
    if(category === "All Categories"){
      result = productList.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())).slice(0,5);
    }
    else{
      result = productList.filter(item => item.category === category && item.name.toLowerCase().includes(keyword.toLowerCase())).slice(0,5);
    }
    result.forEach(item => {
      htmlSearch += `<li class="item">
                      <div class="row align-items-center">
                        <a class="redirect d-block col-3" href="../../ProductDetail/html/index.html" data-id="${item.id}">
                          <img src="../../Common/img/${item.thumbnail[0]}" alt="">
                        </a>
                        <div class="col-9">
                          <a class="name redirect d-block" href="../../ProductDetail/html/index.html" data-id="${item.id}">${item.name}</a>
                          <span class="price">$${(item.price*(1-item.sale/100)).toFixed(0)}</span>
                        </div>
                      </div>
                    </li>`
    })
    $("#searchResult").html(htmlSearch);
  }

  loadDataSearch("All Categories","");

  // Sự kiện Select thay đổi
  $(document).on("change","#search select", function(){
    var category = $(this).val();
    var keyword = $("#search input").val();
    loadDataSearch(category,keyword);
  })

  // Sự kiện input thay đổi
  $(document).on("input","#search input",function(){
    var keyword = $(this).val();
    var category = $("#search select").val();
    loadDataSearch(category,keyword);
  })
});