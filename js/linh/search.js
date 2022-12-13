$('#search').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        search();
    }
});


function search() {
    let fullName = document.getElementById("search").value;
    let check = "#";
    if (fullName[0] == check) {
        let name = fullName.replace('#', '');


        $.ajax({
            type: "Post",
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            url: "http://localhost:8080/search/" + name,
            success: function (data) {
                console.log(data)
                let str = "";
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    str += `
                <div class="online-list">
                <div class="online" >
                    <a onclick="pageFriend(${data[i].account.id})"><img src="${data[i].account.img}" alt=""></a>
                </div>
                <div > 
                 <a onclick="pageFriend(${data[i].account.id})"> ${data[i].account.fullName} </a>
                 <br>
               <a onclick="showPageText(${data[i].id})" style="color: red">${limit(data[i].text, 20)}</a>            
                </div>
               
                </div>
                    `
                    count++;
                }
                if (count == 0) {
                    document.getElementById("showSearch").innerHTML = "Khong co user";
                } else {
                    document.getElementById("showSearch").innerHTML = str;

                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        $.ajax({
            type: "Get",
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            url: "http://localhost:8080/search/" + fullName,
            success: function (data) {
                console.log(data)
                let str = "";
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    str += `
<div class="online-list">
                <div class="online">
                    <a onclick="pageFriend(${data[i].id})"><img src="${data[i].img}" alt=""></a>
                </div>
                <a onclick="pageFriend(${data[i].id})"> ${data[i].fullName} </a>
            </div>`
                    count++;
                }
                if (count == 0) {
                    document.getElementById("showSearch").innerHTML = "Khong co user";
                } else {
                    document.getElementById("showSearch").innerHTML = str;

                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}


function limit(string = '', limit = 0) {
    return string.substring(0, limit) + "...."
}


function showPageText(id){
    location.href = "showPageText.html"
    localStorage.setItem("idPage", id);
}
