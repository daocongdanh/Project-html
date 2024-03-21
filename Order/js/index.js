$(document).ready(function () {
  var user = JSON.parse(localStorage.getItem("user"));
  var orders = JSON.parse(localStorage.getItem("orders"));
  var orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  var productList = JSON.parse(localStorage.getItem("products"));
  var orderListByUser = orders.filter(item => item.userId == user.id);
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
                                                  <div class="box-img">
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
  $("#order-list").html(htmlOrders);

  $(document).on("click",".more",function(){
    var id = $(this).attr("data-id");
    localStorage.setItem("idOrder",id);
    window.location = "../../OrderDetail/html/index.html";
  })
});