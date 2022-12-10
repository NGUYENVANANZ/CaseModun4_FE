function accountImg() {
    $.ajax({
        type: "Post",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/home",
        success: function (data) {
            let str = data.img;
            let std = data.fullName;
            document.getElementById("account-img1d").src= str;
            document.getElementById("account-img2d").src= str;
            document.getElementById("fullNameAccount").innerHTML = std;


        },
        error: function (error) {
            console.log(error);
        }
    });
}

accountImg();