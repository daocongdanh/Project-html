$(document).ready(function () {
  const loadData = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    $("#fName").val(user.firstName);
    $("#lName").val(user.lastName);
    $("#mail").val(user.email);
    $("#phone").val(user.phone);
    $("#birthDay").val(user.dayOfBirth);
    $(".gender").filter(function(){
      if(parseInt($(this).attr("id")) == user.gender){
        $(this).attr("checked",true);
      }
    })
  }
  loadData();

  $("#save").click(function(){
    var user = JSON.parse(localStorage.getItem("user"));
    var firstName = $("#fName").val();
    var lastName = $("#lName").val();
    var email = $("#mail").val();
    var phone = $("#phone").val();
    var dayOfBirth = $("#birthDay").val();
    var password = $("#cPass").val();
    var newPassword = $("#nPass").val();
    var gender = parseInt($(".gender:checked")[0].id);
    var userNew;
    if(password === ""){
      userNew = {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: user.password,
        dayOfBirth: dayOfBirth,
        gender: gender,
      }
    }
    else{
      if(password != user.password){
        alert("Mật khẩu không đúng");
        return;
      }
      userNew = {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: newPassword,
        dayOfBirth: dayOfBirth,
        gender: gender,
      }
    }
    localStorage.setItem("user",JSON.stringify(userNew));
    var users = JSON.parse(localStorage.getItem("users"));
    users = users.filter(item => item.id != userNew.id);
    users.push(userNew);
    localStorage.setItem("users",JSON.stringify(users));
    loadData();
  })
});