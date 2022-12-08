function accountImg() {
    $.ajax({
        type: "Post",
        url: "http://localhost:8081/home/" + token,
        success: function (data) {
            let str = data;
            document.getElementById("account").src = str;
            document.getElementById("account1").src = str;
            document.getElementById("account2").src = str;


        },
        error: function (error) {
            console.log(error);
        }
    });
}

accountImg();