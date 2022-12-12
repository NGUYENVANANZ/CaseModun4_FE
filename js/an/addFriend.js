function addFriend(idFriend){
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/addFriend/" + idFriend,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            location.href = "profileuser.html"
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function unfriends(idFriend){
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/unFriends/" + idFriend,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
            location.href = "profileuser.html"
        },
        error: function (error) {
            console.log(error);
        }
    });

}

