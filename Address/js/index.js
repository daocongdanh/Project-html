$(document).ready(function () {
  // Lấy User từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Lấy dữ liệu address của user đẩy lên giao diện
  const loadAddress = () => {
    const address = JSON.parse(localStorage.getItem("address"));
    const addressByUser = address.filter(item => item.userId == user.id);
    var htmlAdress = ``;
    addressByUser.forEach((item,index) => {
      htmlAdress += `<div class="col-6 mb-4 del">
                      <div class="item">
                        <div class="head">
                          <h2 class="title">Address ${index + 1}</h2>
                          <div class="act">
                            <button class="edit" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#addressModalUpdate"><i class="fa-solid fa-pen m-0"></i></button>
                            <button class="delete" data-id=${item.id}><i class="fa-solid fa-xmark m-0"></i></button>
                          </div>
                        </div>
                        <div class="content">
                          <p class="m-0 text-muted">${item.firstName + ' ' + item.lastName}</p>
                          <p class="m-0 text-muted">${item.address}</p>
                          <p class="m-0 text-muted">${item.phone}</p>
                        </div>
                      </div>
                    </div>`
    })
    htmlAdress += `<div class="col-12">
                    <button class="add" data-bs-toggle="modal" data-bs-target="#addressModalAdd">Add Address + </button>
                  </div>`
    $("#addre").html(htmlAdress)
  }
  loadAddress();

  // Thêm mới address
  $(document).on("click","#btn-address",function(e){
    const addressList = JSON.parse(localStorage.getItem("address"));
    e.preventDefault();
    var firstName = $("#firstName1").val();
    var lastName = $("#lastName1").val();
    var address = $("#address1").val();
    var phone = $("#phone1").val();
    const addressObject = {
      id: addressList.length + 1,
      userId: user.id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address
    }
    addressList.push(addressObject)
    localStorage.setItem("address",JSON.stringify(addressList));
    loadAddress();
    $(".btn-close").click();
    alert("Thêm địa chỉ thành công");
  })
  $(document).on("click","#addre .edit",function(){
    var id = parseInt($(this).attr("data-id"));
    var addressList = JSON.parse(localStorage.getItem("address"));
    var addressById = addressList.filter(item => item.id == id)[0];
    $("#firstName2").val(addressById.firstName);
    $("#lastName2").val(addressById.lastName);
    $("#address2").val(addressById.address);
    $("#phone2").val(addressById.phone);
    $("#btn-update").attr("data-id",id);
  })

  // Cập nhật address
  $(document).on("click","#btn-update",function(e){
    e.preventDefault();
    var addressList = JSON.parse(localStorage.getItem("address"));
    var id = parseInt($(this).attr("data-id"));
    var index = addressList.findIndex(item => item.id == id);
    var firstName = $("#firstName2").val();
    var lastName = $("#lastName2").val();
    var address = $("#address2").val();
    var phone = $("#phone2").val();
    addressList[index] = {
      id: id,
      userId: user.id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address
    }
    localStorage.setItem("address",JSON.stringify(addressList));
    loadAddress();
    $(".btn-close").click();
    alert("Cập nhật địa chỉ thành công");
  })

  // Xóa address
  $(document).on("click","#addre .delete",function(){
    var id = parseInt($(this).attr("data-id"));
    var addressList = JSON.parse(localStorage.getItem("address"));
    var addressNew = addressList.filter(item => item.id != id);
    $(this).closest(".del").remove();
    localStorage.setItem("address",JSON.stringify(addressNew));
    loadAddress();
  })
});