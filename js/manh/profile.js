showProfile();


// show profile
function showProfile() {
    $.ajax({
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/profiles/profile",
        success: function (data) {
            let str = data.img;
            let std = data.fullName;
            document.getElementById("account-img").src = str;
            document.getElementById("account-img2").src = str;
            document.getElementById("account-img1").src = str;
            document.getElementById("account-img3").src = str;
            document.getElementById("name-user").innerHTML = data.fullName;
            document.getElementById("name-user1").innerHTML = data.fullName;
            document.getElementById("name-user2").innerHTML = data.fullName;
            document.getElementById("name-user").innerHTML = std;
            document.getElementById("name-user1").innerHTML = std;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function showPage() {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/profiles/pageProfile",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `
    <div class="status-field-container write-post-container">
        <div class="user-profile-box">
            <div class="user-profile">
                <img src="${data[i].account.img}" alt="">
                <div>
                    <p><a>${data[i].account.fullName}</a></p>
                    <br>
                    <small>Ngay dang :</small><small>${data[i].time}</small>
                </div>
            </div>
            <div class="more">
        <div class="more-post-optns">
        <i class="fas fa-ellipsis-v"></i>
        <ul>
        <li><i class="fa fa-pencil-square-o" onclick="getpost(${data[i].id})" data-toggle="modal" data-target="#myModal2" ></i>Edit Post</li>
        <li><i class="fa fa-trash-o" onclick="deletePost(${data[i].id})" ></i>Delete Post</li>
        </ul>
        </div>
        </div>
        </div>
        <div class="status-field">
            <p>${data[i].text} </p>
            <img src="${data[i].img}" alt="">
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><a onclick="like(${data[i].id}, ${i})" ><img src="images/like.png" alt="" id="${i}" ></a><a data-toggle="modal" data-target="#myModal7" onclick="showListLike(${data[i].id})"  id="${i}p">${data[i].likePages.length}</a></div>
                <div><a data-toggle="modal" data-target="#myModal3" onclick="showCmt(${data[i].id})"><img src="images/comments.png" alt=""></a>${data[i].cmts.length}</div>

            </div>
        </div>
    </div>
`
            }
            document.getElementById("page").innerHTML = str;

            for (let i = 0; i < data.length; i++) {
                checkLike3(data[i], i);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

var Name = localStorage.getItem("Name");

function checkLike3(post, id) {
    for (let j = 0; j < post.likePages.length; j++) {
        if (post.likePages[j].accounts.fullName == Name) {
            document.getElementById(id).src = "images/like-blue.png";
        }
    }
}

showPage();


function showFriend() {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/friends",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = "";
            let demFriend =`<p>${data.length} Friends</p>`;
            document.getElementById("demfriend").innerHTML = demFriend;
            for (let i = 0; i < data.length; i++) {
                str += `
                        <div class="first-friend" style="width: 71px;height: 70px">
                            <img src="${data[i].img}" alt=""  width="71" height="45">
                            <p>${limit1(data[i].fullName, 6)}</p>
                        </div>`
            }
            document.getElementById("listFriend").innerHTML = str;
            document.getElementById("iconfriend1").src = data[0].img;
            document.getElementById("iconfriend2").src = data[1].img;
            document.getElementById("iconfriend3").src = data[2].img;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

showFriend();

function pageStatus() {
    $.ajax({
        type: "Get",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/pageStatus",
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `
                <option value="${data[i].id}" id="pagestatus">${data[i].pageStatus}</option>
                `
            }

            document.getElementById("status-profile").innerHTML = str;
            document.getElementById("status-profile1").innerHTML = str;


        },
        error: function (error) {
            console.log(error);
        }
    });
}

pageStatus();

function post() {
    let fileimg = document.getElementById("imgpost").value
    let text = document.getElementById("text").value
    let id = document.getElementById("status-profile").value
    let status = document.getElementById("status-profile").innerHTML

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
            location.href = "profile.html";
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

function dangbai1(){

    let fileimg = document.getElementById("imgpost").value
    let text = document.getElementById("text").value

    if (fileimg===""&&text===""){
        alert("????ng b??i th???t b???i do kh??ng t??m th???y d??? li???u truy???n v??o !")
    }else {
        post()
    }
}

function Notification() {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/notifications",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].notificationType.id == 1) {
                    str += `
<div class="online-list">
                <div class="online">
                    <a onclick="pageFriend(${data[i].account1.id})"><img src="${data[i].account1.img}" alt=""></a>
                </div>
                <a onclick="pageFriend(${data[i].account1.id})"> ${data[i].account1.fullName} </a>
                <a href="" style="color: black; margin-left: 5px"> ???? comment b??i vi???t c???a b???n</a>
            </div>         
`
                } else if (data[i].notificationType.id == 2) {
                    str += `<div class="online-list">
                <div class="online">
                    <a onclick="pageFriend(${data[i].account1.id})"><img src="${data[i].account1.img}" alt=""></a>
                </div>
                <a onclick="pageFriend(${data[i].account1.id})"> ${data[i].account1.fullName} </a>
                <a href="" style="color: black; margin-left: 5px"> ???? like m???t b??i vi???t c???a b???n</a>
            </div>`
                } else {
                    str += `
    <div class="online-list">
                <div class="online">
                    <a onclick="pageFriend(${data[i].account1.id})"><img src="${data[i].account1.img}" alt=""></a>
                
                </div>
                <div>
                <a onclick="pageFriend(${data[i].account1.id})"> ${data[i].account1.fullName} </a>
                <a href="" style="color: black; margin-left: 5px"> ???? g???i l???i m???i k???t b???n</a>
                <div style="margin-left: 200px">
               <button style="background-color: dodgerblue" onclick="newFriend1(${data[i].account1.id}, ${data[i].id})">Ch???p Nh???n</button>
               <button onclick="unfriend1(${data[i].account1.id},${data[i].id})">T??? ch???i</button>
</div>
</div>
            </div>
`
                }
                document.getElementById("notification1").innerHTML = str;
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function deletePost(id) {
    if (confirm("b???n c?? mu???n x??a kh??ng?"))
    $.ajax({
        type: "Get",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/profiles/deletepost/" + id,
        success: function () {
            alert("xoa bai thanh cong")
            location.href = "profile.html";
        },
        error() {
            alert("err")
        }
    })
}

function getpost(id) {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/profiles/geteditpost/" + id,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},

        success: function (data) {
            document.getElementById("idPage").value = data.id;
            document.getElementById("editimgpost").value = data.img;
            document.getElementById("edittext").value = data.text;
            document.getElementById("pagestatus").innerHTML = data.pageStatus.pageStatus;
        },
        error: function (error) {
            console.log(error);
            alert("deook")
        }
    });
}


Notification();


function editpost() {
    let idPage = document.getElementById("idPage").value;
    let fileimg = document.getElementById("editimgpost").value
    let text = document.getElementById("edittext").value
    let id = document.getElementById("pagestatus").value

    let PageDTO = {
        "text": text,
        "img": fileimg,
    }


    $.ajax({
        type: "Post",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/profiles/edit/" + idPage + "&" + id,
        contentType: "application/json",
        data: JSON.stringify(PageDTO),
        success: function (data) {
            alert("sua bai thanh cong")
            location.href = "profile.html";
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function newFriend1(idFriend, idNo){
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/newFriend/" + idFriend + "&" + idNo,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            location.href = "index.html"
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function unfriend1(idFriend, iNo){
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/unFriend/" + idFriend + "&" + iNo,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            location.href = "index.html"
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function limit1(string = '', limit = 0) {
    if (string.length-1===limit){
        return string.substring(0, limit)
    }else {
        return string.substring(0, limit) + "..."
    }

}




