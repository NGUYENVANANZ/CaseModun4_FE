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
            <div>
                <a href="#"><i class="fas fa-ellipsis-v"></i></a>
            </div>
        </div>
        <div class="status-field">
            <p>${data[i].text} </p>
            <img src="${data[i].img}" alt="">
        </div>
        <div class="post-reaction">
            <div class="activity-icons">
                <div><a onclick="like(${data[i].id}, ${i})" ><img src="images/like.png" alt="" id="${i}" ></a><p id="${i}p">${data[i].likePages.length}</p></div>
                <div><img src="images/comments.png" alt="">${data[i].cmts.length}</div>
            </div>
            <div class="post-profile-picture">
                <img src="images/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
    </div>
`
            }
            document.getElementById("paged").innerHTML = str;
            for (let i = 0; i < data.length; i++) {
                checkLike(data[i], i);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


profilePost(idFriend);

function profileFriend(id) {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/friends/" + id,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = "";
            let demFriend = 0;
            for (let i = 0; i < data.length; i++) {
                str += `
                        <div class="first-friend">
                            <img src="${data[i].img}" alt="">
                            <p>${data[i].fullName}</p>
                     
                        </div>`
                demFriend += 1;
                document.getElementById("listfriends").innerHTML = str;
                document.getElementById("iconfriend1d").src = data[0].img;
                document.getElementById("iconfriend2d").src = data[1].img;
                document.getElementById("iconfriend3d").src = data[2].img;

            }
            document.getElementById("demfriends").innerHTML = demFriend + " Friends";


        },
        error: function (error) {
            console.log(error);
        }
    })
}

profileFriend(idFriend);

function checkFriend(idFriend) {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/checkFriends/" + idFriend,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = `<button type="button" style="background-color: #1876f2" onclick="addFriend(idFriend)"><p>Friends</p></button>`
            if (data.id == 1) {
                str = `<button style="background-color: #1876f2">Friend</button><button onclick="unfriend(idFriend)" style="background-color: #9a9a9a">UnFriend</button>`
            }
            if (data.id == 2) {
                str = `<button>-> Sent friend request</button><button onclick="unfriends(idFriend)" style="background-color: #9a9a9a">X cancel friend request</button>`
            }
            document.getElementById("friendStatus").innerHTML = str;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

checkFriend(idFriend);



