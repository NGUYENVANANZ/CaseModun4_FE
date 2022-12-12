$('#search').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        search();
    }
});


function search() {
    let fullName = document.getElementById("search").value;
    let text = document.getElementById("search").value;


    $.ajax({
        type: "Get",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/search/" + fullName,
        success: function (data) {
            console.log(data)
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `
<div class="online-list">
                <div class="online">
                    <a onclick="pageFriend(${data[i].id})"><img src="${data[i].img}" alt=""></a>
                </div>
                <a onclick="pageFriend(${data[i].id})"> ${data[i].fullName} </a>
            </div>`

            }
            document.getElementById("showSearch").innerHTML = str;
        },
        error: function (error) {
            console.log(error);
        }
    });
}




