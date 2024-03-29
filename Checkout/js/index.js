$(document).ready(function(){

  // Tính tổng tiền trong giỏ hàng
  const totalMoney = () => {
    var tong = 0;
    var cart = localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart")) : null;
    if(cart == null)
      return tong;
    cart.forEach(item => {
      tong += (item.product.price*(1-item.product.sale/100) * item.quantity);
    })
    return tong.toFixed(0);
  }
  // Load tiền và ship
  const loadTotal = () => {
    var total = parseInt(totalMoney());
    var ship = parseInt($("#ship").attr("data-price"));
    $("#subtotal").html(`$${total}`);
    $("#total").html(`$${total + ship}`);
  }
  
  // Load shippingdetail
  const loadShippingDetail = () => {
    var shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
    var htmlShippingDetail = ``;
    shippingDetails.forEach((item,index) => {
      htmlShippingDetail += `<tr>
                              <td>
                                <div class="form-check">
                                  <input class="form-check-input custom-radio custom-radio" data-id=${item.id} ${index == 3 ? 'checked' : ''} id="${item.title}"
                                    name="shipping" type="radio">
                                  <label class="shipping form-check-label text-body text-nowrap" data-price="${item.price}" for="${item.title}">
                                    ${item.title}
                                  </label>
                                </div>
                              </td>
                              <td>${item.description}</td>
                              <td>$${item.price}</td>
                            </tr>`
    })
    $("#shippingDetail").html(htmlShippingDetail);
  }
  loadShippingDetail();


  // Khi chọn 1 shipping sẽ cập nhật lại giá bên bảng total
  $(document).on("click",".shipping",function(){
    var price = $(this).attr("data-price");
    $("#ship").attr("data-price",price);
    $("#ship").html(`$${price}`);
    loadTotal();
  });

  // Load address của user
  const loadAddress = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    var addressList = JSON.parse(localStorage.getItem("address"));
    const addressByUser = addressList.filter(item => item.userId == user.id);
    var htmlOption = `<option value="Your Address" class="d-none" checked>Your Address</option>`;
    addressByUser.forEach(item => {
      htmlOption += `<option value="${item.id}">${item.firstName + ' ' + item.lastName + ', ' + item.address + ', ' + item.phone}</option>`
    })
    $("#yourAddress").html(htmlOption);
  }
  loadAddress();

  // Đẩy 1 address user chọn lên form
  $(document).on("change","#yourAddress",function(){
    var id = parseInt($(this).val());
    var addressList = JSON.parse(localStorage.getItem("address"));
    var addressById = addressList.filter(item => item.id == id)[0];
    $("#firstName").val(addressById.firstName);
    $("#lastName").val(addressById.lastName);
    $("#email").val(addressById.email);
    $("#phone").val(addressById.phone);
    $("#address").val(addressById.address); 
  })

  // Đặt hàng
  $(document).on("click","#placeOrder",function(e){
    (function(){
      emailjs.init("BUmcFUr7c4RgKqioc");
    })();
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem("orders"));
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var address = $("#address").val();
    var phone = $("#phone").val();
    var shippingDetailId = parseInt($(".shipping").prev().filter(":checked").attr("data-id"));
    var orderDate = new Date().toLocaleDateString();
    var total = parseInt($("#total").text().substring(1));
    var user = JSON.parse(localStorage.getItem("user"));
    var shipping = shippingDetails.filter(item => item.id == shippingDetailId)[0];
    const order = {
      id: orders.length + 1,
      userId: user.id,
      orderDate: orderDate,
      shippingDetailId: parseInt(shippingDetailId),
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
      status : "In Processing",
      total : total
    }
    orders.push(order);
    localStorage.setItem("orders",JSON.stringify(orders));
    cart.forEach(item => {
      var orderDetail = {
        id: orderDetails.length + 1,
        productId : item.product.id,
        orderId : order.id,
        quantity: item.quantity,
        size : item.size
      }
      orderDetails.push(orderDetail);
    })
    localStorage.setItem("orderDetails",JSON.stringify(orderDetails));

    // Send mail
    var message = `<div marginwidth="0" marginheight="0"
                    style="font-size:13px;line-height:24px!important;font-family:arial;background:#eee;padding:5px">
                    <div class="adM">
                    </div>
                    <center>
                      <table width="100%" border="0" cellpadding="0" cellspacing="0"
                        style="font-family:arial;max-width:600px;color:#333333;text-align:center;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#c9c9c9;border-top-left-radius:5px;border-top-right-radius:5px;border-top-width:5px;border-top-style:solid;border-top-color:#1775bc;margin-top:50px;background-image:initial;background-size:initial;background-origin:initial;background-clip:initial;background-position:initial;background-repeat:initial;background:#fff">
                        <tbody>
                          <tr>
                            <td style="padding:30px 0px 0px">
                              <h1><a href="#" style="color:#333333;text-decoration:none" target="_blank">SHOPPER</a>
                              </h1>
                              <hr
                                style="width:570px;margin:0px auto;border-top-style:solid;border-top-color:#c9c9c9;border-bottom-style:none">
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:20px;line-height:24px">
                              <p>Hello <b>${user.firstName + ' ' + user.lastName}</b>,</p>
                              <p>Thank you for ordering at <b>SHOPPER</b>! We are sending you this email to confirm order <b>#${order.id}</b>
                                just placed</p>
                              <table width="100%" style="padding:10px">
                                <tbody>
                                  <tr>
                                    <td colspan="4">
                                      <p style="margin-bottom:15px">Code orders: <b>#${order.id}</b></p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Image</td>
                                    <td width="300px">Product name</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                  </tr>`;
    cart.forEach(item => {
      message += `<tr>
                    <td>
                      <p style="padding-right:10px"><img
                          src="https://raw.githubusercontent.com/daocongdanh/imageTest/main/${item.product.thumbnail[0]}"
                          width="100px" class="CToWUd" data-bit="iit"></p>
                    </td>
                    <td width="300px">
                      <p>${item.product.name}</p>
                      <p>Color: ${item.product.color}</p>
                      <p>Size: ${item.size}</p>
                    </td>
                    <td>${item.quantity}</td>
                    <td>$${(item.product.price*(1-item.product.sale/100)).toFixed(0)}</td>
                  </tr>`
    })
    message += `<tr>
                  <td colspan="4">
                    <hr>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">Total product value</td>
                  <td>$${total - shipping.price}</td>
                </tr>
                <tr>
                  <td colspan="2">Promotion: </td>
                  <td>$0</td>
                </tr>

                <tr>
                  <td colspan="2">Shipping detail</td>
                  <td>$${shipping.price}</td>
                </tr>
                <tr>
                  <td colspan="2">Total</td>
                  <td>$${total}</td>
                </tr>
              </tbody>
              </table>
              <table width="100%" style="padding:10px">
              <tbody>
                <tr>
                  <td>Order date</td>
                  <td>${orderDate}</td>
                </tr>
                <tr>
                  <td>Shipping method</td>
                  <td>
                    <p>${shipping.description}</p>
                  </td>
                </tr>
                <tr>
                  <td>Adress</td>
                  <td>
                    <p>${user.firstName + ' ' + user.lastName}</p>
                    <p>${address}</p>
                    <p>${phone}</p>
                  </td>
                </tr>
              </tbody>
              </table>
              </td>
              </tr>
              </tbody>
              </table>
              </center>
              <div class="yj6qo"></div>
              <div class="adL">
              </div>
              </div>`
    var params = {
      sendername: "SHOPPER",
      to: user.email,
      subject: `SHOPPER Thông báo xác nhận quý khách đã đặt hàng thành công #${order.id}`,
      message: message
    }
    var serviceID = "service_br4yktx";
    var templateID = "template_mixvn9r";
  
    emailjs.send(serviceID,templateID,params)
      .then(res => {
        alert("success");
      })
      .catch();
    localStorage.removeItem("cart");

    setTimeout(() => {
      window.location = "../../Order/html/index.html";
    },1000)
  })
});