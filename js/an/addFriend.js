function addFriend(idFriend){
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/addFriend/" + idFriend,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function unfriend(idFriend){
    $.ajax({
        type: "Post",
        url: "http://localhost:8080/addFriend/" + idFriend,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success: function (data) {
        },
        error: function (error) {
            console.log(error);
        }
    });
}