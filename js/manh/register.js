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

if (userName.includes("@")){
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
        }
    })
}else {
    alert("@ đou")
}

}


function checkUser() {
    let userName = document.getElementById("Email").value;
    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/registers/checkUsername",
        data: {
            userName : userName,
        },
        success: function (data) {
            document.getElementById("register-err").innerHTML = ""

        },
        error() {
            document.getElementById("register-err").innerHTML = `  <p style="color: red">Account already exists!</p>`

        }
    })
}
function checkSdt(){
    let phonenummber= document.getElementById("PhoneNumber").value;
    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/registers/checkPhonenumber",
        data: {
            phoneNumber : phonenummber,
        },
        success: function (data) {
            document.getElementById("phonenumber-err").innerHTML = ""
        },
        error() {
            document.getElementById("phonenumber-err").innerHTML = `  <p style="color: red">The phonenumber has already use !</p>`
        }
    })
}

function checkPass(){
    let pass = document.getElementById("Password").value
    let repass = document.getElementById("RePassword").value

    if (repass === pass){
        document.getElementById("pass-err").innerHTML=""
    }else {
        document.getElementById("pass-err").innerHTML = `<p style="color: red">Password does not match!</p>`
    }
    if (repass ===""){
        document.getElementById("pass-err").innerHTML=""

    }
}

function  checkTrong(){
    let userName1 = document.getElementById("Email").value;
    let passWord1 = document.getElementById("Password").value;
    let repassWord1 = document.getElementById("RePassword").value;
    let phonenumber1 = document.getElementById("PhoneNumber").value;
    let fullname1 = document.getElementById("name").value;
    let date1 = document.getElementById("Date").value;
    let Address1 = document.getElementById("Address").value;
    let img1 = document.getElementById("img").value;
    let usererr = document.getElementById("register-err").innerText
    let passerr = document.getElementById("phonenumber-err").innerText
    let phoneerr = document.getElementById("pass-err").innerText
    if (phoneerr!==""||passerr!==""||usererr!==""||repassWord1 ==="" ||userName1 ===""|| passWord1===""||phonenumber1===""||fullname1===""||date1===""||Address1===""||img1===""){
        return true;
    }else {
        return false;
    }

}

function dangki(){
    if (checkTrong()){
        alert("Đăng kí lỗi vui lòng kiểm tra các trường đã nhập ,đảm bảo không xảy ra lỗi")
    }
    else {
        register();
    }
}