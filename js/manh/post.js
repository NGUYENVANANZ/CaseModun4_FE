function postprofile() {
    let fileimg = document.getElementById("imgpost").value
    let text = document.getElementById("text").value
    let id = document.getElementById("status").value
    let status = document.getElementById("status").innerHTML

    let page = {
        "text": text,
        "img": fileimg,
        "pageStatus": {
            "id": id,
            "pageStatus": status
        }
    }

    $.ajax({
        type: "Post",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/profiles/post",
        contentType: "application/json",
        data: JSON.stringify(page),
        success: function (data) {
            alert("Dang bai thanh cong")
            location.href ="index.html";
        },
        error() {
            alert("err")
        }
    })
}

function xemtruocanhup() {
    let fileimg = document.getElementById("imgpost").value
    if (fileimg !== "") {
        document.getElementById("imgpostdemo").innerHTML = '<img id="up" style="width: 362px ;height: 200px">';
        document.getElementById("up").src = fileimg;
    } else {
        document.getElementById("imgpostdemo").innerHTML = '<img id="up" >';
    }

}
function dangbai(){

let fileimg = document.getElementById("imgpost").value
let text = document.getElementById("text").value

    if (fileimg===""&&text===""){
        alert("Đăng bài thất bại do không tìm thấy dữ liệu truyền vào !")
    }else {
        postprofile()
    }
}