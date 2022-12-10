function register() {
    let userName = document.getElementById("Email").value;
    let passWord = document.getElementById("Password").value;
    let phonenumber = document.getElementById("PhoneNumber").value;
    let fullname = document.getElementById("name").value;
    let date = document.getElementById("Date").value;
    let gender = document.getElementById("gender").value;
    let Address = document.getElementById("Address").value;
    let img = document.getElementById("img").value;


    let account = {
        username: userName,
        password: passWord,
        phoneNumber: phonenumber,
        fullName: fullname,
        birthday: date,
        address: Address,
        gender: gender,
        img: img,
    };


    $.ajax({
        type: "POST",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/registers/register",
        data: JSON.stringify(account),
        success: function (data) {
            alert("Dang ki thanh cong")
            location.href= "/login.html";
        },
        error() {
            alert("dang ki that bai")
            location.href = "/register.html"
        }
    })
}


function checkPassWord() {
    let passWord = document.getElementById("Password").value;
    let confirmPassword = document.getElementById("RePassword").value;
    if (passWord!=confirmPassword){
        document.getElementById("register-err1").innerHTML = `  
  <p style="filter: brightness(120%)" id="messageFailed" class="small-font text-uppercase text-center py-2 text-danger bg-danger-light2 ">"Passwords do not match!</p>`
    }
}