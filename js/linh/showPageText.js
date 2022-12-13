
function showPage(id){
    $.ajax({
        type: "Get",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/search/showPageText/" + id,
        success: function (data) {
            let i = 1;
            let str =`
   <div class="status-field-container write-post-container">
        <div class="user-profile-box">
            <div class="user-profile">
                <img src="${data.account.img}" alt="">
                <div>
                    <p><a >${data.account.fullName}</a></p>
                    <br>
                    <small>Ngay dang :</small><small>${data.time}</small>
                </div>
            </div>
            <div class="more">
        </div>
        </div>
        <div class="status-field">
            <p>${data.text} </p>
            <img src="${data.img}" alt="">
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><a onclick="like(${data.id}, ${i})" ><img src="images/like.png" alt="" id="${i}" ></a><a data-toggle="modal" data-target="#myModal10" onclick="showListLike(${data.id})" id="${i}p">${data.likePages.length}</a></div>
                <div><img src="images/comments.png" alt="">${data.cmts.length}</div>
            </div>
            <div class="post-profile-picture">
                <img src="images/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
    </div>`

            document.getElementById("showPageText").innerHTML = str

                checkLike3(data, i);

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

let idPage = localStorage.getItem("idPage");
showPage(idPage);


showProfile1();


// show profile
function showProfile1() {
    $.ajax({
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/profiles/profile",
        success: function (data) {
            let str = data.img;
            let std = data.fullName;
            document.getElementById("account-img").src = str;
            document.getElementById("account-img1").src = str;
            document.getElementById("name-user1").innerHTML = std;
        },
        error: function (error) {
            console.log(error);
        }
    });
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
               <button style="background-color: dodgerblue" onclick="newFriend3(${data[i].account1.id}, ${data[i].id})">Chấp Nhận</button>
               <button onclick="unfriend3(${data[i].account1.id},${data[i].id})">Từ chối</button>
</div>
</div>
            </div>
`
                }
                document.getElementById("notification2").innerHTML = str;
            }


        },
        error: function (error) {
            console.log(error);
        }
    });
}
Notification();

function newFriend3(idFriend, idNo){
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

function unfriend3(idFriend, iNo){
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
