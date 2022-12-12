var Name = localStorage.getItem("Name");

function accountImg() {
    $.ajax({
        type: "Post",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/home",
        success: function (data) {
            let str = data.img;
            let std = data.fullName;
            localStorage.setItem("Name", data.fullName);
            localStorage.setItem("idUser", data.id);
            document.getElementById("imgAccount").src = str;
            document.getElementById("imgAccount1").src = str;
            document.getElementById("imgAccount2").src = str;
            document.getElementById("nameAccount").innerHTML = std;
            document.getElementById("nameAccount1").innerHTML = std;



        },
        error: function (error) {
            console.log(error);
        }
    });
}

accountImg();

function pageStatus() {
    $.ajax({
        type: "Get",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/pageStatus",
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `
                <option value="${data[i].id}">${data[i].pageStatus}</option>
                `
            }

            document.getElementById("status").innerHTML = str;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

pageStatus();

function showPage() {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/page",
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
                    <a onclick="checkPage(${data[i].account.id})">${data[i].account.fullName}</a>
                    <br>
                    <small>${data[i].time}</small>
                </div>
            </div>  
        </div>
        <div class="status-field">
            <p>${data[i].text} </p>
            <img src="${data[i].img}" alt="">
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><a onclick="like(${data[i].id}, ${i})" ><img src="images/like.png" alt="" id="${i}" ></a><a data-toggle="modal" data-target="#myModal7" onclick="showListLike(${data[i].id})" id="${i}p">${data[i].likePages.length}</a></div>
                <div><img src="images/comments.png" alt="">${data[i].cmts.length}</div>
            </div>
            <div class="post-profile-picture">
                <img src="images/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
    </div>
`
            }
            document.getElementById("page").innerHTML = str;

            for (let i = 0; i < data.length; i++) {
                checkLike(data[i], i);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}


function checkLike(post, id) {
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
            for (let i = 0; i < data.length; i++) {
                str += `
    <div class="online-list">
                <div class="online">
                    <img src="${data[i].img}" alt="">
                </div>
                <a style="color: black"  onclick="pageFriend(${data[i].id})">${data[i].fullName}</a>
            </div>
`
                document.getElementById("friendList").innerHTML = str;
            }


        },
        error: function (error) {
            console.log(error);
        }
    });
}

showFriend();


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
                <a href="" style="color: black; margin-left: 5px"> đã comment bài viết của bạn</a>
            </div>         
`
                } else if (data[i].notificationType.id == 2) {
                    str += `<div class="online-list">
                <div class="online">
                    <a onclick="pageFriend(${data[i].account1.id})"><img src="${data[i].account1.img}" alt=""></a>
                </div>
                <a onclick="pageFriend(${data[i].account1.id})"> ${data[i].account1.fullName} </a>
                <a href="" style="color: black; margin-left: 5px"> đã like một bài viết của bạn</a>
            </div>`
                } else {
                    str += `
    <div class="online-list">
                <div class="online">
                    <a onclick="pageFriend(${data[i].account1.id})"><img src="${data[i].account1.img}" alt=""></a>
                
                </div>
                <div>
                <a onclick="pageFriend(${data[i].account1.id})"> ${data[i].account1.fullName} </a>
                <a href="" style="color: black; margin-left: 5px"> đã gửi lời mời kết bạn</a>
                <div style="margin-left: 200px">
               <button style="background-color: dodgerblue" onclick="newFriend(${data[i].account1.id}, ${data[i].id})">Chấp Nhận</button>
               <button onclick="unfriend(${data[i].account1.id},${data[i].id})">Từ chối</button>
</div>
</div>
            </div>
`
                }
                document.getElementById("notification").innerHTML = str;
            }


        },
        error: function (error) {
            console.log(error);
        }
    });
}

Notification();

function newFriend(idFriend, idNo){
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

function unfriend(idFriend, iNo){
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/unFriend/" + idFriend + "&" + iNo,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            location.href = "profile.html"
        },
        error: function (error) {
            console.log(error);
        }
    });
}






