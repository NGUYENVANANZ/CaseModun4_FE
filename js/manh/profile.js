showProfile();

// show profile
function showProfile() {
    $.ajax({
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8081/profiles/profile",
        success: function (data) {
            let str = data.img;
            let std = data.fullName;
            document.getElementById("account-img").src= str;
            document.getElementById("account-img2").src= str;
            document.getElementById("account-img3").src= str;
            document.getElementById("name-user").innerHTML= data.fullName;
            document.getElementById("name-user1").innerHTML= data.fullName;



        },
        error: function (error) {
            console.log(error);
        }
    });
}



