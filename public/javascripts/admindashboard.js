$(function () {

    
    let base_url = 'http://localhost:3000/';
    
       $.ajaxSetup({
        xhrFields: {
            withCredentials: true
            
        },
        crossDomain: true
    });
    
    $.ajax({
        
        type: 'GET',
        url: base_url + 'admindashboard',
        success: function(count) {
            let usercount = count.usercount
            let enquirycount = count.enquirycount
            let itemcount = count.itemcount

            
            
            //count.append(usercount);
            users.append(usercount);
            enquiry.append(enquirycount);
            items.append(itemcount);
            
            console.log(usercount);
            
        },
        error: function(){
            alert('Count delviered faild');
        }
        
        
    });
    
});