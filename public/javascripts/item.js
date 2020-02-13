$(document).ready(function (){
    let base_url = 'http://localhost:3000/';
     let imageFile = '';
     let tblBody = $("#tblbody");
     
     $.ajaxSetup({
         xhrFields: {
             withCredentials: true        
         },
         crossDomain: true     
     });
     
 console.log('hello');
 
 $("#imageFile").on('change', function () {
         let formData = new FormData();
         let files = $("#imageFile").get(0).files;
         if (files.length > 0) {
             formData.append("imageFile", files[0]);
         }
         // $("#add-hero").prop("disabled", true);
         $.ajax({
             type: 'POST',
             url: base_url + 'upload',
             contentType: false,
             cache: false,
             processData: false,
             data: formData,
             success: function (data) {
                 imageFile = data.filename;
                 // $("#add-hero").prop("disabled", false);
             },
             error: function () {
                 alert("Image upload failed!");
             }
         });
     });

     $("#additem").on('click', function () {
        let item = {
            title: $("#name").val(),
            desc: $('#desc').val(),
            prcie: $('#price').val(),
            imageName: imageFile
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'item',
            data: news,
            success: function (item) {
//                tblBody.append(rowTemplate(item));
//                imageFile = '';
//                $('#newsform').trigger('reset');
                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });

        function rowTemplate(item) {
            let oneRow = 
            "<tr><td>" + item.name +
             "</td><td>" +
                item.desc + "</td>";
            if (item.imageName !== '') {
                oneRow += "<td><img src= " + base_url + "uploads/" + item.imageName + " width='60' /></td>";
            } else {
                oneRow += "<td> No Image </td>";
            }
              oneRow += '<td><button type="button" class="btn btn-warning update" item_id=' + item._id + '>Update</button></td> ';
            oneRow += '<td><button type="button" class="btn btn-danger delete" item_id=' + item._id + '>Delete</button></td> </tr>';
            return oneRow;
        }

        $.ajax({
            type: 'GET',
            url: base_url + 'item',
            success: function (item) {
                console.log("Success");
                let myRows = [];
                $.each(item, function (index, item) {
                    myRows.push(rowTemplate(news));
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
                url: base_url + 'item/' + $(this).attr('item_id'),
                success: function () {
                    location.reload();
                }
            });
        });

        let itemId;
        tblBody.on('click', '.update', function () {
            itemId = $(this).attr('item_id');
            $.ajax({
                type: 'GET',
                url: base_url + 'item/' + itemId,
                success: function (item) {
                    console.log(item);
                    $('#title').val(item.name);  
                    $('#desc').val(item.desc);
                  
                    // $('#add-item').hide();
                    // $('#updateitem').show();
                },
                error: function () {
                    console.log("Something went wrong!");
                }
            });
    });
    
            $('#updateitem').on('click', function () {
            let news = {
                title: $("#name").val(),
                desc: $("#desc").val(),
                desc: $("#price").val(),
                
            };
                if(imageFile !== '') {
                news.imageName= imageFile;
            }
            
            $.ajax({
                type: 'PUT',
                url: base_url + 'item/' + itemId,
                data: news,
                success: function (item) {
                    console.log(item);
                    alert("item Updated");
                    location.href('/viewitem');
                }
            })
    
    });

    });