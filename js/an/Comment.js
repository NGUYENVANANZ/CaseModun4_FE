function showCmt(idPage) {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/pageComment/" + idPage,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {

            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `
<div class="online-list">
                <div class="online">
                    <a onclick="checkPage(${data[i].accounts.id})"><img src="${data[i].accounts.img}" alt=""></a>
                </div>
                <a onclick="checkPage(${data[i].accounts.id})"><p>${data[i].accounts.fullName} :</p></a><p href="" style="color: black; margin-left: 5px;"> ${data[i].text}</p> <a onclick="deleteComment(${data[i].id})" data-toggle="modal" data-target="#myModal2" style="margin-left: 20px">-</a><a onclick="editComment(${data[i].id})" data-toggle="modal" data-target="#myModal2" style="margin-left: 20px">+</a> 
            </div> `
            }
            document.getElementById("listCmt").innerHTML = str;
            localStorage.setItem("idPage", idPage);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function deleteComment(idCmt){
    let idPage = localStorage.getItem("idPage");
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/deleteCmt/" + idPage + "&" + idCmt,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            if (data){
                alert("xóa cmt thành công");

            }else {
                alert("bạn chỉ có thể xóa cmt của chính mình")
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function newComment(){
    let cmt = document.getElementById("comment").value;

    let idPage = localStorage.getItem("idPage");
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/saveCmt/" + idPage +"&"+cmt,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            document.getElementById("comment").value = "";
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function editComment(id){
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/edit/" + id,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            localStorage.setItem("idComment", id);
            document.getElementById("comment").hidden = true;
            document.getElementById("new").hidden = true;
            document.getElementById("comment1").hidden = false;
            document.getElementById("edit").hidden = false;
            document.getElementById("comment1").value = data.text;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function editComment1(){
    let cmt = document.getElementById("comment1").value;

    let idCmt = localStorage.getItem("idComment");
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/edit/" + idCmt + "&" + cmt,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            document.getElementById("comment").hidden = false;
            document.getElementById("new").hidden = false;
            document.getElementById("comment1").hidden = true;
            document.getElementById("edit").hidden = true;
            localStorage.setItem("idComment", "");
        },
        error: function (error) {
            console.log(error);
        }
    });
}