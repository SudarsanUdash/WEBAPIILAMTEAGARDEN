

$(document).ready(function (){

    let tblBody = $("#tblbody");
    let base_url = 'http://localhost:3000/';
    let imageFile = '';

    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });


function rowTemplate(item) {
    let oneRow = "<tr><td>" + item.name + "</td><td>" + item.desc + "</td>" + "</td><td>" + item.price + "</td>";
    if (item.imageName !== '') {
        oneRow += "<td><img src= " + base_url + "uploads/" + item.imageName + " width='60' /></td>";
    } else {
        oneRow += "<td> No Image </td>";
    }
    oneRow += '<td><button type="button" class="btn btn-warning edit" item_id=' + item._id + '>Edit</button></td>';
    oneRow += '<td><button type="button" class="btn btn-danger delete" item_id=' + item._id + '>Delete</button> </td></tr>';
    return oneRow;
}

$.ajax({
    type: 'GET',
    url: base_url + 'items',
    success: function (items) {
        // console.log(document.cookie);
        let myRows = [];
        $.each(items, function (index, item) {
            myRows.push(rowTemplate(item));
        });
        tblBody.append(myRows);
    },
    error: function () {
        alert('Something went wrong!');
    }
});

tblBody.on('click', '.delete', function () {
    $.ajax({
        type: 'DELETE',
        url: base_url + 'items/' + $(this).attr('item_id'),
        success: function () {
            window.location.replace('/viewitem');
        }
    })
});



let itemId;
tblBody.on('click', '.edit', function () {
    itemId = $(this).attr('item_id');
    $.ajax({
        type: 'GET',
        url: base_url + 'items/' + itemId,
        success: function (item) {
            console.log(item);
            $('#name').val(item.name);
            $('#desc').val(item.desc);
             $("#price").val(item.price);

            // $('#add-hero').hide();
            // $('#edit-hero').show();
        },
        error: function () {
            console.log("Something went wrong!");
        }
    });
});

$('#updateitem').on('click', function () {
    let item = {
        name: $("#name").val(),
        desc: $("#desc").val(),
        image: imageFile,
        price: $("#price").val()
    };
    $.ajax({
        type: 'PUT',
        url: base_url + 'items/' + itemId,
        data: item,
        success: function (item) {
            console.log(item);
            location.reload();
        }
    })

});

});