
// let search1 = document.getElementById("search")


$('#search').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        search();
    }
});

// function search() {
//     let name = document.getElementById("searchInput").value
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("Authorization", "Bearer " + token);
//         },
//         data: {
//             name: name,
//         },
//         url: "http://localhost:8081/search",
//         //xử lý khi thành công
//         success: function (data) {
//             showSearch(data)
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }

// function showSearch(account) {
//     let str = ""
//     for (const c of account) {
//         str += `  <li id="'${c.acc.userName}'">
//                 <div class="rounded badge-unread d-sm-flex border-0 mb-1 p-3 position-relative">
//                   <!-- Avatar -->
//                   <div class="avatar text-center">
//                     <img class="avatar-img rounded-circle" src="${p.avatarSrc}" alt="">
//                   </div>
//                   <!-- Info -->
//                   <div class="mx-sm-3 my-2 my-sm-0">
//                     <p class=" mb-2"><b>${p.fullName}</b> Address: ${p.address}, Gender: ${p.gender}, Job: ${p.job}</p>
//
//                 </div>
//
//               </li>`
//     }
//     search1.innerHTML = str

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
