$(document).ready(function() {
  var table= $('#payrolltbl').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: 'http://localhost:3030/api/payroll',
      dataSrc: 'data'
    },
    columns : [
      {data: "stipend" },
      {data: "salary"},
      {data:"increment"},
      {data:"bondDuration"},
      {data:"trainingStartDate"},
      {data:"trainingEndDate"},
      {data:"joiningDate"},
      {data:"bondCompletedDate"},
      {data:"NDA"},
      {data:"bond"},
       
      {
        
          defaultContent: "<button type='button' class='btn btn-view' data-id=${row[0]._id}><i class='fas fa-eye'></i></button> <button type='button' class='btn  btn-update' data-id=${row[0]._id}><i class='fas fa-edit'></i></button> &nbsp; <button type='button' class='btn  btn-delete' data-id=${row[0]._id}><i class='fas fa-trash'></i></button>",
          targets: -1,
          render: function(data, type, row, meta){
          
          return '<button type="button" class="btn btn-view"><i class="fas fa-eye"></i></button> <button type="button" class="btn btn-update" data-id=id><i class="fas fa-edit"></i></button> <button type="button" class="btn btn-delete" stipend='+row.stipend+'data-id='+ row._id +'salary='+ row.salary+'increment='+ row.increment+ 'onclick="myfunction(' + row._id +row.stipend+row.salary+row.increment+')"><i class="fas fa-trash"></i></button>'
          }
        }
    ]
    
  });

  $("#payrolltbl").on("click", ".btn-delete", function(){
    var id=$(".btn-delete").attr('data-id');
    var stipend=$(".btn-delete").attr('stipend');
    var salary=$(".btn-delete").attr('salary');
    var increment=$(".btn-delete").attr('increment');
    console.log(stipend);
    $.ajax({
      url: 'http://localhost:3030/api/payroll/'+id, 
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
            swal("Are you sure you want to delete this payrollRecord?", {
              icon: "success",
            });
            //storeRecord();
          } else {
            swal("Your record is safe!", {icon: 'info'});
          }
        })
      }
    })
    function storeRecord(){
      $.ajax({
          method: 'post',
          datatype: 'json',
          url: 'http://localhost:3030/api/payroll',                      
          data:{
            'stipend'   :stipend,
            'salary':salary,
            'increment':increment,
            // 'bondDuration':bondDuration,
            // 'trainingStartDate':trainingStartDate,
            // 'trainingEndDate':trainingEndDate,
            // 'joiningDate':joiningDate,
            // 'bondCompletedDate':bondCompletedDate,
            // 'NDA':nda,
            // 'bond':bond,
            // 'note':note
           },
          
          success: function(responce){
            // console.log("hii-hello");
            console.log(responce);  
            
          }
      });
    }
});
});
