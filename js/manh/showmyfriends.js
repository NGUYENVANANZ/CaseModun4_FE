function showFriend1() {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/profiles/friendProfile",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str2 = "";
            let dem =0;
            let str = "";
            if (data.length <= 3){
                for (let i = 0; i < data.length; i++) {
                    str +=
                     `<img src="${data[i].account1.img}" alt="">`;
                    document.getElementById("iconfriend").innerHTML=str
                }
            }else {
                document.getElementById("iconfriend1").src = data[0].account1.img;
                document.getElementById("iconfriend2").src = data[1].account1.img;
                document.getElementById("iconfriend3").src = data[2].account1.img;
            }
            for (let i = 0; i < data.length; i++) {

                dem +=1;
                str2 +=`
                        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="friend-block">
            <div class="more-opotnz">
              <i class="fa fa-ellipsis-h"></i>
              <ul>
                <li><a href="#" title="" onclick="unfriends1(${data[i].account1.id})">Unfriends</a></li>
               
              </ul>
            </div>
            <figure>
              <img src="${data[i].account1.img}" alt="" width="100" height="100">
            </figure>

            <div class="frnd-meta">
              <div class="frnd-name">
                <a href="#" title="" style="margin-top: 10px" onclick="pageFriend1(${data[i].account1.id})">${data[i].account1.fullName}</a>
                <span >${data[i].account1.address}</span>
              </div>
              <a class="send-mesg" href="#" title="">Message</a>
            </div>
          </div>
        </div>
                `
                document.getElementById("listfriend2").innerHTML = str2;
            }

            document.getElementById("demfriend").innerHTML = dem + " friends";
            document.getElementById("demfriend1").innerHTML = dem ;

        },
        error: function (error) {
            console.log(error);
        }
    });
}
showFriend1()

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
            document.getElementById("account-img3").src = str;
            document.getElementById("name-user").innerHTML = data.fullName;
            document.getElementById("name-user1").innerHTML = data.fullName;
            document.getElementById("name-user").innerHTML = std;
            document.getElementById("name-user1").innerHTML = std;
        },
        error: function (error) {
            console.log(error);
        }
    });
}
showProfile1()

function unfriends1(idFriend){
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/unFriends/" + idFriend,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            location.href = "showmyfriends.html"
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function pageFriend1(id){
    localStorage.setItem("idFriend", id);
    location.href = "profileuser.html"
}

function Notification1() {
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

Notification1();


function searchbyname() {
    let name = document.getElementById("textsearch").value

    $.ajax({
        type: "Get",
        url: "http://localhost:8080/profiles/searchfriends/" + name,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            let str = ""
            if (data.length==0){
                str = `<p>Không có bạn bè hiển thị</p>`
                document.getElementById("listfriend2").innerHTML = str;
            }else {
            for (let i = 0; i < data.length; i++) {
                str+=`
                                        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="friend-block">
            <div class="more-opotnz">
              <i class="fa fa-ellipsis-h"></i>
              <ul>
                <li><a href="#" title="" onclick="unfriends1(${data[i].account1.id})">Unfriends</a></li>
               
              </ul>
            </div>
            <figure>
              <img src="${data[i].account1.img}" alt="" width="100" height="100">
            </figure>

            <div class="frnd-meta">
              <div class="frnd-name">
                <a href="#" title="" style="margin-top: 10px" onclick="pageFriend1(${data[i].account1.id})">${data[i].account1.fullName}</a>
                <span >${data[i].account1.address}</span>
              </div>
              <a class="send-mesg" href="#" title="">Message</a>
            </div>
          </div>
        </div>
                `}
                document.getElementById("listfriend2").innerHTML = str;
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}

