$(document).ready(function(){
    $("#submit_document").click(function(e){
        //console.log("hello");
        e.preventDefault();
        var Name=$("#fullname").val();        
        //var offerLetter=$("#offer_letter").val(); 
        var offerLetter=$('input[name="offerletter"]:checked').val();
        var AppoinmentLetter=$('input[name="appoinmentletter"]:checked').val();
        var DocumentsTakenDate=$("#document_submit_date").val();
        var marksheet10=$('input[name="marksheet10"]:checked').val();
        var marksheet12=$('input[name="marksheet12"]:checked').val();
        var bechelor_certificate=$("#BE_certificate").val();
        var master_degree_certificate=$("#ME_certificate").val();
        var ID_proof=$('input[name="idproof"]:checked').val();
        var photo=$("#photo").val();
        
        console.log(Name+" "+offerLetter+" "+AppoinmentLetter+" "+DocumentsTakenDate+" "+marksheet10+" "+marksheet12+" "+bechelor_certificate+" "+master_degree_certificate+" "+ID_proof+" "+photo);

       //console.log(offerLetter);
       
        
        $.ajax({
            method: 'post',
            datatype: 'json',
             url: 'http://localhost:3030/api/document',                      
             data:{
                'Name'         : Name,
                'offerLetter'   :offerLetter,
                'AppoinmentLetter':AppoinmentLetter,
                'DocumentsTakenDate':DocumentsTakenDate,
                'marksheet10':marksheet10,
                'marksheet12':marksheet12,
                'bechelor_certificate':bechelor_certificate,
                'master_degree_certificate':master_degree_certificate,
                'ID_proof':ID_proof,
                'photo':photo,
        
             },
            
             success: function(response) {
                console.log(response);
                window.location='/index';

                 if(response.status){
                    //swal("Inserted Sucessfully");
                    swal({
                        title: "Uploaded!",
                        text: "Document uploaded sucessfully!",
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
