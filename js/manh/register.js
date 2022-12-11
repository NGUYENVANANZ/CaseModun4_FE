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

function checkPass(){
    let pass = document.getElementById("Password").value
    let repass = document.getElementById("RePassword").value

    if (repass == pass){
        document.getElementById("pass-err").innerHTML=" "
    }else {
        document.getElementById("pass-err").innerHTML = `<p style="color: red">Password does not match!</p>`
    }
    if (repass ==""){
        document.getElementById("pass-err").innerHTML=""
    }
}

function checkTrong(){
    let userName1 = document.getElementById("Email").value;
    let passWord1 = document.getElementById("Password").value;
    let phonenumber1 = document.getElementById("PhoneNumber").value;
    let fullname1 = document.getElementById("name").value;
    let date1 = document.getElementById("Date").value;
    let gender1 = document.getElementById("gender").value;
    let Address1 = document.getElementById("Address").value;
    let img1 = document.getElementById("img").value;
}