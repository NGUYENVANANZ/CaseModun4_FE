


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
        url: "http://localhost:8081/"+"login",
        data: JSON.stringify(Account),
        //xử lý khi thành công
        success: function (data) {
            localStorage.setItem("token", data);
            location.href = "index.html"
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