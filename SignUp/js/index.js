$(document).ready(function () {

  // Validation
  $("#firstName").blur(() => {
    var firstName = $("#firstName").val();
    if(firstName == '')
      return;
    let reg = /^([a-zA-z0-9])+$/;
    if(!reg.test(firstName)){
      toastr.error("First Name không được rỗng, không được chứa ký tự đặc biệt");
    }
  })
  $("#lastName").blur(() => {
    var lastName = $("#lastName").val();
    if(lastName == '')
      return;
    let reg = /^([a-zA-z0-9])+$/;
    if(!reg.test(lastName)){
      toastr.error("Last Name không được rỗng, không được chứa ký tự đặc biệt");
    }
  })
  $("#email").blur(() => {
    var email = $("#email").val();
    if(email == '')
      return;
    let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!reg.test(email)){
      toastr.error("Không đúng định dạng email");
    }
  })
  $("#phone").blur(() => {
    var phone = $("#phone").val();
    if(phone == '')
      return;
    let reg = /^(09|03|07|08|05)[0-9]{8}$/;
    if(!reg.test(phone)){
      toastr.error("Số điện thoại phải bằng đầu từ 03, 05, 07, 08, 09 và có 10 ký tự số");
    }
  })
  $("#password").blur(() => {
    var password = $("#password").val();
    if(password == '')
      return;
    let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    if(!reg.test(password)){
      toastr.error("Mật khẩu phải có ít nhất 1 ký tự số, 1 ký tự đặc biệt, 1 ký tự in hoa và tối thiểu 8 ký tự");
    }
  })
  $("#confirmPassword").blur(() => {
    var confirmPassword = $("#confirmPassword").val();
    var password = $("#password").val();
    if(confirmPassword == '')
      return;
    if(confirmPassword != password){
      toastr.error("Mật khẩu không giống nhau");
    }
  })
  // Đăng kí
  document.getElementById("register").onclick = (e) => {
    const users = JSON.parse(localStorage.getItem("users"));
    e.preventDefault();
    document.getElementById("formSignUp").reportValidity();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    var birthDay = $("#birthDay").val();
    var gender = parseInt($(".gender:checked")[0].id);
    if(firstName == '' || lastName == '' || email == '' || phone == '' || password == '' || confirmPassword == '')
      return;
    const userExists = users.filter(item => item.email === email);
    if(userExists.length > 0){
      toastr.error("Email đã tồn tại");
      return;
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
    toastr.success("Đăng kí thành công");
    setTimeout(() => {
      window.location = "../../SignIn/html/index.html";
    },2000)
  } 
});
