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

    if (repass == pass){
        document.getElementById("pass-err").innerHTML=" "
    }else {
        document.getElementById("pass-err").innerHTML = `<p style="color: red">Password does not match!</p>`
    }
    if (repass ==""){
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

    if (repassWord1 ==="" ||userName1 ===""|| passWord1===""||phonenumber1===""||fullname1===""||date1===""||Address1===""||img1===""){
        // document.getElementById("checktrong1").innerHTML=`  <p class="btn-danger" style="color: white">Email là bắt buộc !</p>`
        // document.getElementById("checktrong2").innerHTML=`  <p class="btn-danger" style="color: white">Vui lòng nhập password !</p>`
        // document.getElementById("checktrong3").innerHTML=`  <p class="btn-danger" style="color: white">Vui lòng nhập password !</p>`
        // document.getElementById("checktrong4").innerHTML=`  <p class="btn-danger" style="color: white">Số điện thoại là bắt buộc !</p>`
        // document.getElementById("checktrong5").innerHTML=`  <p class="btn-danger" style="color: white">Tên đầy đủ là bắt buộc !</p>`
        // document.getElementById("checktrong6").innerHTML=`  <p class="btn-danger" style="color: white">Không được để trống trường này !</p>`
        // document.getElementById("checktrong7").innerHTML=`  <p class="btn-danger" style="color: white">Không được để trống trường này !</p>`
        return true;
    }else {
        return false;
    }

}

function dangki(){
    if (checkTrong()){
        checkTrong()
    }else {
        register();
    }
}