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
            document.getElementById("account-img").src= str;
            document.getElementById("account-img2").src= str;
            document.getElementById("account-img1").src= str;
            document.getElementById("account-img3").src= str;
            document.getElementById("name-user").innerHTML= std;
            document.getElementById("name-user1").innerHTML= std;



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
            document.getElementById("page").innerHTML = str;

            for (let i = 0; i < data.length; i++) {
                checkLike(data[i], i);
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
        url: "http://localhost:8080/friends",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = "";
            let demFriend =0;
            for (let i = 0; i < data.length; i++) {
                str += `
                        <div class="first-friend">
                            <img src="${data[i].img}" alt="">
                            <p>${data[i].fullName}</p>
                     
                        </div>`
                demFriend += 1;
                document.getElementById("listfriend").innerHTML = str;
                document.getElementById("iconfriend1").src= data[0].img;
                document.getElementById("iconfriend2").src= data[1].img;
                document.getElementById("iconfriend3").src= data[2].img;

            }
            document.getElementById("demfriend").innerHTML = demFriend + " Friends";


        },
        error: function (error) {
            console.log(error);
        }
    });
}

showFriend();


