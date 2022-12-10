// $('#search').keypress(function (event) {
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if (keycode == '13') {
//         search();
//     }
// });

function search() {
    let fullName = document.getElementById("search").value;
    $.ajax({
        type: "Get",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8081/search/" + fullName,
        success: function (data) {
            console.log(data)
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `<tr>` +
                        `<td>${data[i].fullName}</td> ` +
                        `<td><img src="${data[i].img}" width="50" height="50"></td>` +
                        `</tr>`
                // str = `<p>${data[i].id}</p>`+
                //     `<p>${data[i].address}</p>`
                // str += `${data[i].fullName}`
            }
            document.getElementById("showSearch").innerHTML = str;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

