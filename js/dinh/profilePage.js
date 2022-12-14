let idFriend = localStorage.getItem("idFriend");


function profileUser(id) {
    $.ajax({
        type: "Get",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/profile/" + id,
        success: function (data) {
            let str = data.img;
            let std = data.fullName;
            document.getElementById("imgFriend").src = str;
            document.getElementById("friendName").innerHTML = std;
        },
        error: function (error) {
            console.log(error);
        }

    })
}

profileUser(idFriend);

function profilePost(id) {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/page/" + id,
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
                    <a onclick="pageFriend(${data[i].account.id})">${data[i].account.fullName}</a>
                    <br>
                    <small>${data[i].time}</small>
                </div>
            </div>
<!--            <div>-->
<!--                <a href="#"><i class="fas fa-ellipsis-v"></i></a>-->
<!--            </div>-->
        </div>
        <div class="status-field">
            <p>${data[i].text} </p>
            <img src="${data[i].img}" alt="">
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><a onclick="like(${data[i].id}, ${i})" ><img src="images/like.png" alt="" id="${i}" ></a><a data-toggle="modal" data-target="#myModal7" onclick="showListLike(${data[i].id})"  id="${i}p">${data[i].likePages.length}</a></div>
                <div><a data-toggle="modal" data-target="#myModal2" onclick="showCmt(${data[i].id})"><img src="images/comments.png" alt=""></a>${data[i].cmts.length}</div>
            </div>
        </div>
    </div>
`
            }
            document.getElementById("paged").innerHTML = str;
            for (let i = 0; i < data.length; i++) {
                checkLike1(data[i], i);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
var Name = localStorage.getItem("Name");

function checkLike1(post, id) {
    for (let j = 0; j < post.likePages.length; j++) {
        if (post.likePages[j].accounts.fullName == Name) {
            document.getElementById(id).src = "images/like-blue.png";
        }
    }
}


profilePost(idFriend);

function profileFriend(id) {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/friends/" + id,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = "";
            let demFriend = `<p>${data.length} Friends</p>`;
            document.getElementById("demfriends").innerHTML = demFriend;
            for (let i = 0; i < data.length; i++) {
                str += `
                        <div class="first-friend">
                            <img src="${data[i].img}" alt="">
                            <p>${data[i].fullName}</p>
                     
                        </div>`
            }
            document.getElementById("listfriends").innerHTML = str;
            document.getElementById("iconfriend1d").src = data[0].img;
            document.getElementById("iconfriend2d").src = data[1].img;
            document.getElementById("iconfriend3d").src = data[2].img;
        },
        error: function (error) {
            console.log(error);
        }
    })
}

profileFriend(idFriend);

function checkFriend(idFriends) {

    $.ajax({
        type: "Get",
        url: "http://localhost:8080/checkFriends/" + idFriends,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str =""
            if (data.friendStatus == null){
                str = `<button title="Add friend" data-toggle="tooltip" onclick="addFriend(idFriend)"><i class="fa fa-user-plus"></i></button>`
            }else if (data.friendStatus.id == 1) {
                str = `<button style="background-color: #1876f2">Friend</button><button onclick="unfriends(${data.idFriend})" style="background-color: #9a9a9a">UnFriend</button>`
            }else if (data.friendStatus.id == 2) {
                str = `<button>-> Sent friend request</button><button onclick="unfriends(${data.idFriend})" style="background-color: #9a9a9a">X cancel friend request</button>`
            } else {

            }
            document.getElementById("friendStatus").innerHTML = str;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

checkFriend(idFriend);


function logout() {
    localStorage.setItem("token", "")
    location.href = "login.html"
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
               <button style="background-color: dodgerblue" onclick="newFriend2(${data[i].account1.id}, ${data[i].id})">Ch???p Nh???n</button>
               <button onclick="unfriend2(${data[i].account1.id},${data[i].id})">T??? ch???i</button>
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

function newFriend2(idFriend, idNo){
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

function unfriend2(idFriend, iNo){
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