$(document).ready(function(){
    $("#register").click(function(e){
        e.preventDefault();
        var fullName=$("#employee_name").val();
        var email=$("#employee_email").val();               
        var DOB =$("#birthdate").val();                 
        //var gender=$("#gender option:selected").text();
        var gender =$("#gender").val();                 
        var contact_no=$("#Contact_no").val();
        var emergency_contact_no=$("#emrgency_no").val();
        var address=$("#address").val();
        var designation=$("#education").val();          
        var status=$("#status").val();               
        var clg_name=$("#clg_name").val();             
        var position=$("#position").val();             
        var attendence_code=$("#attendence_code").val();       
        var password=$("#password").val();       
        var vehicle_no=$("#vehicle_no").val();

        //console.log(designation);
        //console.log(email);
       // confirm_password    
        $.ajax({
            method: 'post',
            datatype: 'json',
             url: 'http://localhost:3030/api/auth/signup',                      
             data:{
                'fullName':fullName,
                'email':email,
                'DOB':DOB,                 
                'gender':gender,
                'contact_no':contact_no,
                'emergency_contact_no':emergency_contact_no,
                'address':address,
                'designation':designation,
                'status':status,               
                'clg_name':clg_name,             
                'position':position,             
                'attendence_code':attendence_code,       
                'password':password,
                'vehical_no':vehicle_no              
        
             },
            
             success: function(response) {
                console.log(response);
                 if(response.status){
                    //swal("Inserted Sucessfully");
                    swal({
                        title: "Inserted!",
                        text: "Data inserted sucessfully!",
                        icon: "success",
                        button: "ok",
                      });
                    window.location='/index';
                 }
                 else{
                 }
              },
              error:function(response){
                //console.log(response.responseJSON.message);
                //$.toast('Error:'+response.responseJSON.message);
                //showToastr("info", "Please Wait", "I'm fetching some data.");  
                swal('Error'+response.responseJSON.message);
              }
        });
    });
})
