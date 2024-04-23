$(document).ready(function () {

  // Lấy tất cả order của user hiện tại đẩy lên trang html, có phân trang
  const loadData = (page) => {
    var user = JSON.parse(localStorage.getItem("user"));
    var orders = JSON.parse(localStorage.getItem("orders"));
    var orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    var productList = JSON.parse(localStorage.getItem("products"));
    var orderListByUser = orders.filter(item => item.userId == user.id);

    var totalPage = Math.floor((orderListByUser.length)/2) + (((orderListByUser.length) % 2 == 0) ? 0 : 1);
    var pagination = $("#pagination");
    var pageActive = parseInt(pagination.find(".page-item.active").text());
    var pageCurrent = pageActive;
    // Pagination
    if(page == -1 && pageActive == 1 || page == -2 && pageActive == totalPage)
      return;
    if(page == -1){ // prev
      orderListByUser = orderListByUser.slice((pageActive-1 - 1)*2,(pageActive-1 - 1)*2+2);
      pageCurrent = pageActive - 1;
    }
    else if(page == -2){ // next
      orderListByUser = orderListByUser.slice((pageActive-1 + 1)*2,(pageActive-1 + 1)*2+2);
      pageCurrent = pageActive + 1;
    }
    else{
      orderListByUser = orderListByUser.slice((page-1)*2,(page-1)*2+2);
      pageCurrent = page;
    }

    var htmlOrders = ``;
    orderListByUser.forEach(item => {
      var orderDetailsByOrder = orderDetails.filter(od => od.orderId == item.id);
      htmlOrders += `<div class="card mb-3" style="width: 100%; padding: 32px; border-radius: 0px;">
                        <div class="card-body" style="background-color: #EEEEEE;">
                          <div class="row justify-content-center">
                            <div class="col-6 col-lg-3">
                              <h6 class="text-muted titleForm">Order No:</h6>
                              <p class="valueForm">
                                ${item.id}
                              </p>
                            </div>
                            <div class="col-6 col-lg-3">
                              <h6 class="text-muted titleForm">Shipped date:</h6>
                              <p class="valueForm">                
                                ${item.orderDate}
                              </p>
                            </div>
                            <div class="col-6 col-lg-3">
                              <h6 class="text-muted titleForm">Status:</h6>
                              <p class="valueForm">
                                ${item.status}
                              </p>
                            </div>
                            <div class="col-6 col-lg-3">
                              <h6 class="text-muted titleForm">Order Amount:</h6>
                              <p class="valueForm">
                                $${item.total}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="card-footer" style="border: 0px; background-color: white;">
                          <div class="row align-items-center">
                            <div class="col-12 col-lg-6">
                              <div class="row gx-5 mb-5 mb-lg-0">
                              `
                              orderDetailsByOrder.forEach((od,index) => {
                                if(index <= 2){
                                  var product = productList.filter(p => p.id == od.productId)[0];
                                  htmlOrders += `<div class="col-3">
                                                    <div style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;" class="box-img">
                                                      <img src="../../Common/img/${product.thumbnail[0]}" alt="">
                                                    </div>
                                                  </div>`
                                }
                              })
                              if(orderDetailsByOrder.length > 3){
                                htmlOrders += `<div class="more col-3" style="cursor: pointer;" data-id="${item.id}">
                                                  <div class="box-img d-flex justify-content-center align-items-center">
                                                    <p style="font-weight: 500; font-size: 13px; margin: 0px;">+${orderDetailsByOrder.length-3}<br>more</p>
                                                  </div>
                                                </div>`
                              }
                  htmlOrders+=  
                              `
                              </div>
                            </div>
                            <div class="col-12 col-lg-6">
                              <div class="row row-button">
                                <div class="col-6" style="padding: 0px 10px !important;">
                                  <a class="more btn btn-sm w-100 btn-outline-dark" href="../../OrderDetail/html/index.html" data-id="${item.id}">
                                    Order Details
                                  </a>
                                </div>
                                <div class="col-6" style="padding: 0px 10px !important;">
                                  <a class="btn btn-sm w-100 btn-outline-dark" href="#">
                                    Track order
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`;
    })
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
    $("#order-list").html(htmlOrders);
  }
  loadData(1);

  // Chuyển trang
  $(document).on("click",".page-item",function(){
    var page = parseInt($(this).attr("data-page"));
    loadData(page);
  })

  // Chuyển sang trang OrderDetail
  $(document).on("click",".more",function(){
    var id = $(this).attr("data-id");
    localStorage.setItem("idOrder",id);
    window.location = "../../OrderDetail/html/index.html";
  })
});