
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
                <div><a onclick="like(${data.id}, ${i})" ><img src="images/like.png" alt="" id="${i}" ></a><p id="${i}p">${data.likePages.length}</p></div>
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
