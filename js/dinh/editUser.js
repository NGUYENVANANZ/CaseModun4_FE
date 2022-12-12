function edit_id() {

    $.ajax({
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
        , url: "http://localhost:8080/edit", //xử lý khi thành công
        success: function (data) {
            document.getElementById("fullName").value = data.fullName;
            document.getElementById("address").value = data.address;
            document.getElementById("birthday").value = data.birthday;
            document.getElementById("gender").value = data.gender;
            document.getElementById("phoneNumber").value = data.phoneNumber;
            document.getElementById("img").value = data.img;
            document.getElementById("password").value = data.password;

        }, error: function (err) {
            console.log(err)
        }
    })
}

function edit() {

    let fullName = document.getElementById("fullName").value;
    let address = document.getElementById("address").value;
    let birthday = document.getElementById("birthday").value;
    let gender = document.getElementById("gender").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let img = document.getElementById("img").value;
    let password = document.getElementById("password").value;


    let accountEdit = {
        fullName: fullName,
        address: address,
        birthday: birthday,
        gender: gender,
        phoneNumber: phoneNumber,
        img: img,
        password: password
    }

    console.log(accountEdit);

    $.ajax({
        type: "POST",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        contentType: "application/json"
        , url: "http://localhost:8080/editAccount",
        data: JSON.stringify(accountEdit), //xử lý khi thành công

        success: function (data) {
            location.href = "index.html"
        }, error: function (err) {
            console.log(err)
        }
    })
}