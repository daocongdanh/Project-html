$(document).ready(function () {
  const users = JSON.parse(localStorage.getItem("users"));

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

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

  $("#submit").click(function(e){
    e.preventDefault()
    var email = $("#input-email").val();
    var password = $("#input-password").val();
    var remember = document.getElementById("remember").checked;

    var user = users.filter(u => u.email === email);
    if(user.length == 0 || user[0].password !== password){
      alert("Tài khoản hoặc mật khẩu không chính xác");
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
        alert("Mật khẩu đã được gửi vào email của bạn")
      })
      .catch();
  }
  $("#forgot").click(function(e){
    e.preventDefault();
    var email = $("#modalPasswordResetEmail").val();
    var user = users.filter(u => u.email === email);
    if(user.length == 0){
      alert("Email không tồn tại");
    }
    else{
      sendMail(user[0].password,email);
    }
  })
});