$(document).ready(function () {
  const users = JSON.parse(localStorage.getItem("users"));


  // set cookie
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  // getcookie
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if(getCookie("email") !== ""){
    var email = getCookie("email");
    var password = getCookie("password");
    $("#input-email").val(email);
    $("#input-password").val(password);
    document.getElementById("remember").checked = true;
  }

  // Submit form đăng nhập
  $("#submit").click(function(e){
    e.preventDefault()
    document.getElementById("formLogin").reportValidity();
    var email = $("#input-email").val();
    var password = $("#input-password").val();
    var remember = document.getElementById("remember").checked;
    if(email == '' || password == '')
      return;
    var user = users.filter(u => u.email === email);
    if(user.length == 0 || user[0].password !== password){
      toastr.error("Tài khoản hoặc mật khẩu không chính xác")
    }
    else{
      user = user[0];
      localStorage.setItem("user",JSON.stringify(user));
      if(remember){
        setCookie("email",email,1);
        setCookie("password",password,1);
      }
      else{
        setCookie("email",email,0);
        setCookie("password",password,0);
      }
      window.location = "../../Home/html/index.html";
    }
    
  })
  // Gửi mail lấy lại mật khẩu
  // https://dashboard.emailjs.com/
  const sendMail = (password,email) => {
    (function(){
      emailjs.init("BUmcFUr7c4RgKqioc");
    })();
    var params = {
      sendername: "Đào Đức Danh",
      to: email,
      subject: "Lấy lại mật khẩu",
      message: password
    }
    var serviceID = "service_br4yktx";
    var templateID = "template_g6bo5qf";
  
    emailjs.send(serviceID,templateID,params)
      .then(res => {
        $(".btn-close").click();
        toastr.success("Mật khẩu đã được gửi vào email của bạn")
      })
      .catch();
  }

  // Quên mật khẩu
  $("#forgot").click(function(e){
    e.preventDefault();
    document.getElementById("formReset").reportValidity();
    var email = $("#modalPasswordResetEmail").val();
    if(email == '')
      return;
    var user = users.filter(u => u.email === email);
    if(user.length == 0){
      toastr.error("Email không tồn tại");
    }
    else{
      sendMail(user[0].password,email);
    }
  })
});