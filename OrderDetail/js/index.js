$(document).ready(function () {

  // Lấy tất cả orderDetail của order là đẩy lên trang html
  var orders = JSON.parse(localStorage.getItem("orders"));
  var orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  var productList = JSON.parse(localStorage.getItem("products"));
  var orderId = parseInt(localStorage.getItem("idOrder"));
  var order = orders.filter(item => item.id == orderId)[0];
  var orderDetailsByOrder = orderDetails.filter(item => item.orderId == orderId);
  var shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  var shipping = shippingDetails.filter(item => item.id == order.shippingDetailId)[0];
  var html = `<div class="mb-4" style="border: 1px solid #E5E5E5; padding: 32px; ">
                <!--Infor Order-->
                <div class="card-body" style="background-color: #EEEEEE;">
                  <div class="row justify-content-center">
                    <div class="col-6 col-lg-3">
                      <h6 class="text-muted titleForm">Order No:</h6>
                      <p class="valueForm">
                        ${order.id}
                      </p>
                    </div>
                    <div class="col-6 col-lg-3">
                      <h6 class="text-muted titleForm">Shipped date:</h6>
                      <p class="valueForm">
                        ${order.orderDate}
                      </p>
                    </div>
                    <div class="col-6 col-lg-3">
                      <h6 class="text-muted titleForm">Status:</h6>
                      <p class="valueForm">
                        ${order.status}
                      </p>
                    </div>
                    <div class="col-6 col-lg-3">
                      <h6 class="text-muted titleForm">Order Amount:</h6>
                      <p class="valueForm">
                        $${order.total}
                      </p>
                    </div>
                  </div>
                </div>
                <!--Item list-->
                <ul class="list-group item-list">
                  <h5 class="pb-4 mt-4 " style=" border-bottom: 1px solid #E5E5E5 !important;">Order Items (<span>${orderDetailsByOrder.length}</span>)</h5>
                  `
                  orderDetailsByOrder.forEach(od => {
                    var product = productList.filter(p => p.id === od.productId)[0];
                    html += `<li class="list-group-item">
                              <div class="row align-items-center">
                                <div class="col-4 col-md-3 col-xl-2">
                                  <img src="../../Common/img/${product.thumbnail[0]}" alt="" class="w-100">
                                </div>
                                <div class="col">
                                  <p class="mb-4 fs-sm fw-bold">
                                    <a class="text-body" href="product.html">${product.name} x ${od.quantity}</a> <br>
                                    <span class="text-muted price">$${(product.price*(1-product.sale/100)).toFixed(0)}</span>
                                  </p>
                                  <div class="fs-sm text-muted">
                                    Size: ${od.size} <br>
                                    Color: ${product.color}
                                  </div>
                                </div>
                              </div>
                            </li>`
                  })
            html+=
                  `
                </ul>
              </div>`;
    html += `<!--Price list-->
              <div class="price-list mb-4" style="border: 1px solid #E5E5E5; padding: 32px; ">
                <h5 class="pb-4 ">Order Total</h5>
                <ul class="list-group">
                  <li class="list-group-item d-flex mb-1 border-0" style="padding: 20px 0px;">
                    <span>Subtotal</span> <span class="ms-auto fs-sm">$${order.total - shipping.price}</span>
                  </li>
                  <li class="list-group-item d-flex mb-1 border-0" style="padding: 20px 0px;">
                    <span>Tax</span> <span class="ms-auto fs-sm">$0</span>
                  </li>
                  <li class="list-group-item d-flex mb-1 border-0" style="padding: 20px 0px;">
                    <span>Shipping</span> <span class="ms-auto fs-sm">$${shipping.price}</span>
                  </li>
                  <li class="list-group-item d-flex mb-1 border-0" style="padding: 20px 0px;">
                    <span style="font-size: 18px; font-weight: 500;">Total</span> <span class="ms-auto fs-sm"
                      style="font-size: 18px; font-weight: 500;">$${order.total}</span>
                  </li>
                </ul>
              </div>
              <!--Shipping Address-->
              <div class="shipping-address" style="border: 1px solid #E5E5E5; padding: 32px; ">
                <h5 class="mb-3">Order Items (<span>${orderDetailsByOrder.length}</span>)</h5>
                <div class="row">
                  <div class="col-12 col-md-4">
                    <p style="font-weight: 500;" class="mb-2">
                      Billing Address:
                    </p>
                    <p class="mb-md-0 text-gray-500">
                      ${order.firstName + " " + order.lastName}, <br>
                      ${order.address}, <br>
                      ${order.phone}
                    </p>
                  </div>
                  <div class="col-12 col-md-4">
                    <p style="font-weight: 500;" class="mb-2">
                      Shipping Address:
                    </p>
                    <p class="mb-md-0 text-gray-500">
                    ${order.firstName + " " + order.lastName}, <br>
                    ${order.address}, <br>
                    ${order.phone}
                    </p>
                  </div>
                  <div class="col-12 col-md-4">
                    <p style="font-weight: 500;" class="mb-2">
                      Shipping Method:
                    </p>
                    <p class="mb-4 text-gray-500">
                      ${shipping.description}
                    </p>
                  </div>
                </div>
              </div>`
  $("#orderDetail").html(html);
});