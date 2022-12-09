function accountImg() {
    $.ajax({
        type: "Post",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8081/home",
        success: function (data) {
            let str = data.img;
            let std = data.fullName;
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

function showPage() {
    $.ajax({
        type: "Get",
        url: "http://localhost:8081/page",
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
                    <p>${data[i].account.fullName}</p>
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
                <div><img src="images/like-blue.png" alt="">${data[i].likePages.length}</div>
                <div><img src="images/comments.png" alt="">${data[i].cmts.length}</div>
            </div>
            <div class="post-profile-picture">
                <img src="images/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
            </div>
        </div>
    </div>
`
                document.getElementById("page").innerHTML = str;
            }


        },
        error: function (error) {
            console.log(error);
        }
    });
}

showPage();


function showFriend() {
    $.ajax({
        type: "Get",
        url: "http://localhost:8081/friends",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `
    <div class="online-list">
                <div class="online">
                    <img src="${data[i].img}" alt="">
                </div>
                <p>${data[i].fullName}</p>
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

