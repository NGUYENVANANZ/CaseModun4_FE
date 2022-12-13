
function checkUser1() {
    let userName = document.getElementById("email").value;
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
            document.getElementById("email-err").innerHTML = `  <p style="color: red">Không tồn tại email trên hệ thống !</p>`

        },
        error() {
            document.getElementById("email-err").innerHTML = ""

        }
    })
}
function checkSdt1(){
    let phonenummber= document.getElementById("PhoneNumber").value;
    let userName = document.getElementById("email").value;
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
            document.getElementById("sdt-err").innerHTML = `  <p style="color: red">Không tồn tại số điện thoại trên hệ thống !</p>`
        },
        error() {
            document.getElementById("sdt-err").innerHTML = ""
        }
    })
}

function register1() {
    let phonenummber= document.getElementById("PhoneNumber").value;
    let userName = document.getElementById("email").value;
    let passWord = document.getElementById("pass").value;


    let resetPassDTO = {
        password: passWord
    };


    $.ajax({
        type: "Post",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/registers/resetpassword/" +userName +"&"+phonenummber,
        data: JSON.stringify(resetPassDTO),
        success: function (data) {
            alert("Lấy lại mật khẩu thành công")
            location.href = "login.html"
        },
        error() {
            alert("lỗi")
        }
    })
}


function check(){
    let phonenummber= document.getElementById("PhoneNumber").value;
    let userName = document.getElementById("email").value;

    $.ajax({
        type: "Get",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/registers/check/" +userName +"&"+phonenummber,
        success: function (data) {

            document.getElementById("email").hidden = true
            document.getElementById("PhoneNumber").hidden = true
            document.getElementById("passinput").innerHTML=`
        <input type="text"  id="pass" class="form-control" placeholder="Nhập password mới"
               required >`

            document.getElementById("repassinput").innerHTML=`
      
        <input type="text"  id="repass" class="form-control" placeholder="Xác nhận password mới"
               required oninput="checkPass1()">    
`
            document.getElementById("check-err").innerHTML = "";

            document.getElementById("abc").innerHTML=`<button type="button" class="btn btn-custom btn-lg btn-block mt-3" onclick="dangki1()">Submit</button>`
        },
        error() {
            document.getElementById("check-err").innerHTML = `  <p style="color: red">Vui lòng xác nhận sđt và email đã trùng khớp !</p>`
        }
    })
}

function checkPass1(){
    let pass = document.getElementById("pass").value
    let repass = document.getElementById("repass").value

    if (repass == pass){
        document.getElementById("repass-err").innerHTML=" "
    }else {
        document.getElementById("repass-err").innerHTML = `<p style="color: red">Vui lòng nhập đúng !</p>`
    }
    if (repass ==""){
        document.getElementById("repass-err").innerHTML=""
    }
}

function checktrong(){
    let pass = document.getElementById("pass").value
    let repass = document.getElementById("repass").value
    if (pass === ""||repass === ""){
        return true;
    }else {
        return false;
    }
}

function dangki1(){
    if (checktrong()){
        checktrong()
    }else {
        register1();
    }
}