$(document).ready(function() {
  var table= $('#emptbl').DataTable({
//    "order": [[ 3, "desc" ]],
    processing: true,
    serverSide: true,
    ajax: {
      url: 'http://localhost:3030/api/user',
      dataSrc: 'data'
      // dataSrc: function(response) {
      //   // console.log({data: response.data});
      //   return {data: response.data};
      //   // return [response.data];
      // }
    },
    columns : [
      {data: "fullName" },
      {data: "email"},
      {data:"contact_no"},
      {data:"designation"},
      {data:"vehical_no"},
      {
        
          //defaultContent: "<button type='button' class='btn btn-view' data-id=${row[0]._id}><i class='fas fa-eye'></i></button> <button type='button' class='btn  btn-update' data-id=${row[0]._id}><i class='fas fa-edit'></i></button> &nbsp; <button type='button' class='btn  btn-delete' data-id=${row[0]._id}><i class='fas fa-trash'></i></button>",
          targets: -1,
          render: function(data, type, row, meta){
          //   console.log(row.fullName);
          //   return `<button type='button' class='btn btn-success btn-update' data-id=${row[0]._id}>Update</button> &nbsp; 
          //   <button type='button' class='btn btn-danger btn-delete' data-id=${row[0]._id}>Delete</button>`
          return '<button type="button" class="btn btn-view"><i class="fas fa-eye"></i></button> <button type="button" class="btn btn-update" data-id=id"><i class="fas fa-edit"></i></button> <button type="button" class="btn btn-delete" data-id='+ row._id +' onclick="myfunction(' + row._id + ')"><i class="fas fa-trash"></i></button>'
          }
        }
    ]
    
  });

  

  $("#emptbl").on("click", ".btn-delete", function(){
    var id=$(".btn-delete").attr('data-id');
    console.log(id);
    //console.log('http://localhost:3030/api/user/'+id);
    $.ajax({
      url: 'http://localhost:3030/api/user/'+id, 
      type: "DELETE",

      success: function(result){
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Are you sure you want to delete this employee?", {
              icon: "success",
            });
          } else {
            swal("Your record is safe!", {icon: 'info'});
          }
        })
      },
      error:function(response){
        console.log(response.responseJSON.message);        
      }
    })
});

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
      var university=$("#university").val();
      var status=$("#status").val();               
      var technology = $("#technology").val();
      var designation=$("#position").val();             
      var password=$("#password").val();       
      var vehicle_no=$("#vehicle_no").val();

      $.ajax({
          method: 'post',
          datatype: 'json',
           url: 'http://localhost:3030/api/auth/signup',                      
           data:{
              'fullName':fullName,
              'email':email,
              'DOB':DOB,                 
              'gender':gender,
              'contactNo':contact_no,
              'emergencyContactNo':emergency_contact_no,
              'address':address,
              'designation':designation,
              'status':status,               
              'university':university,
              'technology':technology,   
              'password':password,
              'vehicalNo':vehicle_no              
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
                  // window.location.href = '/admin/employee';
                  window.location.href = window.location.origin + '/admin/employee'
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

    // var colReorder = new $.fn.dataTable.ColReorder(table);
    // var rowReorder = new $.fn.dataTable.RowReorder(table);
  $("#btnAddProduct").click(function(){
    $("#errorMessage").html("");
    $("#errorAlert").hide();
    $("#productName").val("");
    $("#productPrice").val("");
    $("#productModalLabel").html("Add new product");
    $('#productModal').modal('show');
    $("#btnUpdateProduct").hide();
    $("#btnAddNewProduct").show();
  });
  
  $("#btnAddNewProduct").click(function(){
    var name = $("#productName").val();
    var price = $("#productPrice").val();        
    $.ajax({
      url: "http://localhost:5000/product", 
      type: "POST",
      data: { name, price },  
      success: function(result){
        $("#errorMessage").html("");
        $("#errorAlert").hide();
        $("#productName").val("");
        $("#productPrice").val("");
        $('#productModal').modal('hide');
        swal("Success", "Prodcut insert successfully", "success");
      },
      error: function (jqXHR, textStatus, errorThrown ){
        console.log(jqXHR.responseJSON);
        var errorMessage = jqXHR ? jqXHR.responseJSON.message : "";
        $("#errorMessage").html("<strong>Error: </strong>" + errorMessage);
        $("#errorAlert").show();
      }
    });
  });
  
  $("#btnUpdateProduct").click(function(){
    var name = $("#productName").val();
    var price = $("#productPrice").val();
    var data = {};
    if(name) data.name = name;         
    if(price) data.price = price;         
    var id = $("#btnUpdateProduct").data('id');        
    $.ajax({
      url: `http://localhost:5000/product/${id}`, 
      type: "PUT",
      data: { name, price },  
      success: function(result){
        $("#errorMessage").html("");
        $("#errorAlert").hide();
        $("#productName").val("");
        $("#productPrice").val("");
        $('#productModal').modal('hide');
        swal("Success", "Prodcut updated successfully", "success");
      },
      error: function (jqXHR, textStatus, errorThrown ){
        console.log(jqXHR.responseJSON);
        var errorMessage = jqXHR ? jqXHR.responseJSON.message : "";
        $("#errorMessage").html("<strong>Error: </strong>" + errorMessage);
        $("#errorAlert").show();
      }
    });
  });

  $("#productTable").on("click", ".btn-update", function(){
    var id = $(this).data('id');  
    $("#errorMessage").html("");
    $("#errorAlert").hide();
    $('#productModal').modal('show');
    $("#btnAddNewProduct").hide();
    $("#btnUpdateProduct").show();
    $("#btnUpdateProduct").attr('data-id', id);
    $.ajax({
      url: `http://localhost:5000/product/${id}`, 
      type: "GET",
      success: function(result){
        console.log(result);
        $("#productModalLabel").html("Update product");
        $("#productName").val(result.data.name);
        $("#productPrice").val(result.data.price);
      },
      error: function (jqXHR, textStatus, errorThrown ){
        console.log(jqXHR.responseJSON);
        var errorMessage = jqXHR ? jqXHR.responseJSON.message : "";
        $("#errorMessage").html("<strong>Error: </strong>" + errorMessage);
        $("#errorAlert").show();
      }
    });
  })

  $("#productTable").on("click", ".btn-delete", function(){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Are you sure you want to delete this product?", {
          icon: "success",
        });
      } else {
        swal("Your record is safe!", {icon: 'info'});
      }
    })
  })

});
