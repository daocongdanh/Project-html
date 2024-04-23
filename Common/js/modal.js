$(document).ready(function () {
  // Lấy danh sách product có trong localStorage
  var productList = JSON.parse(localStorage.getItem("products"));

  // Lấy product theo id
  const getProductById = (id) => {
    var product = productList.filter(item => item.id == id)[0];
    return product;
  }

  // Modal
  $(document).on("click",".btn-quick-view",function(){
    var id = parseInt($(this).closest(".item").attr("data-id")); // Tìm thẻ item là cha gần nhất của button
    var product = getProductById(id);
    var modal = $("#myModal");
    modal.find(".wish").closest(".item").attr("data-id",id);
    modal.attr("data-id",product.id);
    modal.find(".name").text(product.name);
    modal.find("#more-info").attr("data-id",id);
    if(product.sale == 0){
      modal.find(".price").html(`$${product.price} <span> (In Stock)</span>`);
    }
    else {
      modal.find(".price").html(`$${(product.price * (1-product.sale/100)).toFixed(0)} <span> (In Stock)</span>`);
    }
    modal.find("#color").text(product.color);
    modal.find("#modal-image").attr('src','../../Common/img/' + product.thumbnail[0]);
    var htmlImageModal = ``;
    product.thumbnail.forEach((image, index) => {
      htmlImageModal += `<input class="rd-img" type="radio" ${index == 0 ? 'checked' : ''} id="${image}" name="image" value="1" />
                         <label class="lb1" for="${image}" style="background-image: url(../../Common/img/${image});box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px"></label>`
    })
    modal.find("#imageModal").html(htmlImageModal)
  })
  
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
  // Image Modal
  $(document).on("click","#myModal .image .rd-img",function(){
    var img = $(this).attr("id");
    $(".image #modal-image").attr("src",`../../Common/img/${img}`);
  })
});