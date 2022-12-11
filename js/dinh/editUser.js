function edit_id(id){
    $.ajax({
        type: "GET", headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
        , url: "http://localhost:8080/edit/" + id, //xử lý khi thành công
        success: function (data) {
            document.getElementById("id").value = data.id;
            document.getElementById("name").value = data.name;
            document.getElementById("Address").value = data.address;
            document.getElementById("Birthday").value = data.birthday;
            document.getElementById("Gender").value = data.gender;
            document.getElementById("PhoneNumber").value = data.phoneNumber;
            document.getElementById("img").value = data.img;

        }, error: function (err) {
            console.log(err)
        }
    })
}

function edit() {
    document.getElementById("id").value = data.id;
    document.getElementById("name").value = data.name;
    document.getElementById("address").value = data.address;
    document.getElementById("birthday").value = data.birthday;
    document.getElementById("gender").value = data.gender;
    document.getElementById("phoneNumber").value = data.phoneNumber;
    document.getElementById("img").value = data.img;


    let account = {
        id: id, name: name, address: address, birthday: birthday, gender: gender, phoneNumber: phoneNumber ,img: img
    }

    $.ajax({
        type: "PUT", headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, url: "http://localhost:8080/edit", data: JSON.stringify(account), //xử lý khi thành công
        success: function (data) {

        }, error: function (err) {
            console.log(err)
        }
    })

}