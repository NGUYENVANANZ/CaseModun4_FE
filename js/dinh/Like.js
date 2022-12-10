function like(id, i, number){
$.ajax ({
    type: "Post",
    url: "http://localhost:8081/page/" + id,
    headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
    success: function (data){
        if (data.like){
            document.getElementById(i).src ="images/like-blue.png";
            document.getElementById(data.page.id).innerHTML = data.page.likePages.length;
        }else {
            document.getElementById(i).src ="images/like.png";
            document.getElementById(data.page.id).innerHTML = data.page.likePages.length;
        }
    },
    error: function (error) {
        console.log(error);
    }
})
}



