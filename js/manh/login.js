


function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("input-password").value;

    let Account = {
        username: username,
        password: password,
    };
    $.ajax({
        type: "POST",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8083/"+"login",
        data: JSON.stringify(Account),
        //xử lý khi thành công
        success: function (data) {
            localStorage.setItem("token", data);
<<<<<<< HEAD
            location.href = "profile.html"
=======
            location.href = "index.html"
>>>>>>> c207908a4ffb962641361b4f0e4f29b8b37dc11a
        },
        error: function (err) {
            document.getElementById('messageLogin').innerHTML = "Login fail ! Try again please !";
        }
    })
    event.preventDefault();
}

function logout() {
    localStorage.setItem("token", "")
    location.href = "login.html"
}