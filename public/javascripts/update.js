$(document).ready(function (){



    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });

    let tblBody = $("#tblbody");
    let base_url = 'http://localhost:3000/';
    let imageFile = '';
    let tblBodyenquiry = $("#tblbodyenquiry");

    
 

   




 


    function rowTemplate(enquiry) {
        let oneRow = "<tr><td>" + enquiry.name + "</td><td>" + enquiry.desc + "</td>" + "</td><td>" 
        + enquiry.yourenquiry + "</td>";
      
        oneRow += '<td><button type="button" class="btn btn-warning edit" enquiry_id=' + enquiry._id + '>Edit</button></td>';
        oneRow += '<td><button type="button" class="btn btn-danger delete" enquiry_id=' + enquiry._id + '>Delete</button> </td></tr>';
        return oneRow;
    }

    $.ajax({
        type: 'GET',
        url: base_url + 'enquiries',
        success: function (enquiries) {
            // console.log(document.cookie);
            let myRows = [];
            $.each(enquiries, function (index, enquiries) {
                myRows.push(rowTemplate(enquiries));
            });
            tblBodyenquiry.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });

    tblBodyenquiry.on('click', '.delete', function () {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'enquiries/' + $(this).attr('enquiry_id'),
            success: function () {
                location.reload();
            }
        })
    });

    let enquiryId;
    tblBodyenquiry.on('click', '.edit', function () {
        enquiryId = $(this).attr('enquiry_id');
        $.ajax({
            type: 'GET',
            url: base_url + 'enquiries/' + enquiryId,
            success: function (enquiry) {
                console.log(enquiry);
                $('#name').val(enquiry.name);
                $('#desc').val(enquiry.desc);
                 $("#yourenquiry").val(enquiry.yourenquiry);

                // $('#add-hero').hide();
                // $('#edit-hero').show();
            },
            error: function () {
                console.log("Something went wrong!");
            }
        });
    });


    
    $('#updateenquiry').on('click', function () {
        let enquiry= {
            name: $("#name").val(),
            desc: $("#desc").val(),
            
            yourenquiry: $("#yourenquiry").val()
        };
        $.ajax({
            type: 'PUT',
            url: base_url + 'enquiries/' + enquiryId,
            data: enquiry,
            success: function (enquiry) {
                console.log(enquiry);
                location.reload();
            }
        })

    });

});