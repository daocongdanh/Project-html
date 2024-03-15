$(document).ready(function () {
  document.getElementById("register").onclick = (e) => {
    const users = JSON.parse(localStorage.getItem("users"));
    e.preventDefault();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    var birthDay = $("#birthDay").val();
    var gender = parseInt($(".gender:checked")[0].id);

    const userExists = users.filter(item => item.email === email);
    if(userExists.length > 0){
      alert("Email đã tồn tại");
    }
    if(password !== confirmPassword){
      alert("Mật khẩu không giống nhau");
    }
    const user = {
      id: users.length + 1,
      firstName: firstName,
      lastName: lastName,
      email : email,
      phone: phone,
      password : password,
      dayOfBirth : birthDay,
      gender : gender
    }
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
    alert("Đăng kí thành công");
    setTimeout(() => {
      window.location = "../../SignIn/html/SignIn.html";
    },2000)
  } 
});
