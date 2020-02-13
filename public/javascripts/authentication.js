$(document).ready(function (){
   let base_url = 'http://localhost:3000/';
    let imageFile = '';
    let tblBody = $("#tblbody");
    var userid = window.localStorage.getItem('userid');
    
    
    // $.ajaxSetup({
    //     xhrFields: {
    //         withCredentials: true
            
    //     },
    //     crossDomain: true
        
        
        
    // });
    
console.log('hello');


$("#registerbutton").on('click', function (e) {
    e.preventDefault();
        let user = {
            name: $("#name").val(),
            email: $("#email").val(),
            username: $("#username").val(),
            contact: $("#contact").val(),
            password: $("#pwd").val()
        };
    console.log(user);
        $.ajax({
            type: 'POST',
            url: "http://localhost:3000/users/signup",
            data: user,
            success: function (reply) {
                console.log("registered");
//                tblBody.append(rowTemplate(hero));
//                imageFile = '';
//                $('#hero-form').trigger('reset');
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });
    
    
   $("#loginbutton").on('click', function (e) {
    e.preventDefault();
        let user = {
            username: $("#username").val(),
            password: $("#pwd").val()
        }; 
       console.log(user);
               $.ajax({
            type: 'POST',
            url: "http://localhost:3000/users/login",
            data: user,
                   
                   success: function (user) {
                       console.log(user.usertype);
                       if(user.usertype ===true){
                           alert("Logged In As Admin");
                           window.location.href = '/admindashboard';
                       }
                       else{
                           console.log("Logged In");
                           //window.localStorage.setItem('userid', user.user)
                           window.location.href = '/home';
                           console.log("successfully");
                       }

            },
                      
            error: function () {
                alert("Fill all the form fields!");
            }
        
               
               
               
               });
    
    
    
   });

   $.ajax({
       type: 'GET',
       url: base_url + 'users/' + userid,
       success: function (users) {
           $('#name').val(users.name);
           $('#email').val(users.email);
           $('#username').val(users.username);
           $('#contact').val(users.contact);
           $('#password').val(users.password);

       },
   });
   

   function rowTemplate(user) {
       let onRow = 
       "<tr><td>" + user.name + "</td><td>"
       + user.email + "</td>" +
       "</td><td>" +
       user.username + "</td>"
       + "</td><td>" + user.contact + "</td>"
       + "</td><td>" + user.password + "</td>";

       return onRow;

   }

   $.ajax({
       type : 'GET',
       url: base_url + 'users',
       success: function (users){
           console.log("Success");
           let myRows = [];
           $.each(users, function(index, user){
               myRows.push(rowTemplate(user));
           });
           tblBody.append(myRows);
       }
   });


    
        
   $("#logasadmin").on('click', function (e) {
    e.preventDefault();
        let user = {
            admin: "true",
            username: $("#username").val(),
            password: $("#password").val()
        }; 
       console.log(user);
               $.ajax({
            type: 'POST',
            url: "http://localhost:3000/clients/login",
            data: user,      
                   
            success: function (reply) {
                console.log("Logged As Admin");

            },
            error: function () {
                alert("Fill all the form fields!");
            }
        
               
               
               
               });
    
    
    
   });
    
    
    
    
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
    
    
    
        $("#insertitem").on('click', function () {
        let item = {
            name: $("#name").val(),
            desc: $("#desc").val(),
            imageName: imageFile,
            price: $("#price").val()
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'items',
            data: item,
            success: function (item) {

                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });


    $("#insertenquiry").on('click', function () {
        let enquiry = {
            name: $("#name").val(),
            desc: $("#desc").val(),
            yourenquiry: $("#yourquery").val()
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'enquiries',
            data: enquiry,
            success: function (enquiry) {

                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });
    
    });