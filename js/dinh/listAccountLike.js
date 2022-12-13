function showListLike(id) {
    $.ajax({
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        url: "http://localhost:8080/likePage/" + id,
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {
                str += `
<div class="online-list">
                <div class="online" >
                    <a onclick="checkPage(${data[i].accounts.id})"><img src="${data[i].accounts.img}" alt=""></a>
                </div>
                <div > 
                 <a onclick="checkPage(${data[i].accounts.id})"> ${data[i].accounts.fullName} </a>
                 </div>
                 </div>
                `
            }
            document.getElementById("showListLike").innerHTML = str;

        }, error: function (err) {
            console.log(err)
        }

    })
}