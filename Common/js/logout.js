$(document).ready(function () {

  // Nếu user chưa đăng nhập mà cố tình vào trang thông tin cá nhân sẽ redirect về trang đăng nhập
  if(localStorage.getItem("user") == null){
    window.location = "../../SignIn/html/index.html"
  }

  // Khi user nhấn đăng xuất sẽ xóa user trên localStorage và redirect về đăng nhập
  $("#logout").click(function(){
    localStorage.removeItem("user")
    window.location = "../../SignIn/html/index.html"
  })
});