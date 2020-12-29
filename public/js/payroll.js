$(document).ready(function(){
    $("#payrollbtn").click(function(e){
        e.preventDefault();
      
        var stipend=$("#stipend").val();
        var salary=$("#salary").val();
        var increment=$("#increment").val();
        var bondDuration=$("#bondDuration").val();
        var trainingStartDate=$("#trainingStartDate").val();
        var trainingEndDate=$("#trainingEndDate").val();
        var joiningDate=$("#joiningDate").val();
        var bondCompletedDate=$("#bondCompletedDate").val();
        var nda=$('input[name="nda"]:checked').val();
      var bond=$('input[name="bond"]:checked').val();
      var note=$("#note").val();
        console.log('payroll is clicked'+note);
        $.ajax({
          method: 'post',
          datatype: 'json',
           url: 'http://localhost:3030/api/payroll',                      
           data:{
            'stipend'   :stipend,
            'salary':salary,
            'increment':increment,
            'bondDuration':bondDuration,
            'trainingStartDate':trainingStartDate,
            'trainingEndDate':trainingEndDate,
            'joiningDate':joiningDate,
            'bondCompletedDate':bondCompletedDate,
            'NDA':nda,
            'bond':bond,
            'note':note
           },
           success: function(response) {
               console.log(response);
               
               if(response){
                 console.log('payload successfully added');
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
