showProfile();

// show profile
function showProfile() {
    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            // 'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')

        } ,url: "http://localhost:8083/profiles/profile", // data: JSON.stringify(),
        //xử lý khi thành công
        success: function (data) {
            let str = data.img;
            document.getElementById("account-img").src= str;
            document.getElementById("account-img2").src= str;
            document.getElementById("account-img3").src= str;
            document.getElementById("name-user").innerHTML= data.fullName;
            document.getElementById("name-user1").innerHTML= data.fullName;
        }, error: function (err) {
            console.log("lỗi")
        }
    })
}

function showDataProfile(){
    localStorage.setItem("avatardn", dataProfile.avatarSrc)
}