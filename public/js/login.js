$(document).ready(function(){
    $("#loginbtn").click(function(e){
      console.log('cl');
        // e.stopPropagation();
        e.preventDefault();
        console.log('cl');
        var email=$("#lemail").val();
        var password=$("#lpassword").val();
      //console.log("Hello hii"+email+" "+password);
      $.ajax({
        method: 'post',
        datatype: 'json',
         url: 'http://localhost:3030/api/auth/login',                      
         data:{
             'email':email,
             'password':password
         },
         success: function(response) {
             console.log(response);
             
             if(response){
               localStorage.setItem("btoken",response.data.token );
               console.log(response.data.token);
              window.location.href = "/index";
             }
             else{
             }
          },
          error:function(response){
            swal({
              text: ""+response.responseJSON.message,
              icon: "warning"
            });
          }
    });
    });
  });