$(document).ready(function() {
  $('.deleteUser').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    var confirmation = confirm('Are you sure?');
      if(confirmation){
        //ajax request
        $.ajax({
          type: 'DELETE',
          url: '/users/delete/'+id,
          success: function(response){
            alert('deleting user');
            window.location.href='/';
          },
          error: function(err){
            console.log(err);
          }
          //redirect to homepage
        // }).done(function(response){
        //     //redirect
        //   });
        //   window.location.replace('/');
        });
      };
  });
});


// $(document).ready(function(){
//   $('.deleteUser').on('click', deleteUser);
// });
//
// function deleteUser(){
//   var confirmation = confirm('Are you sure?');
//   if(confirmation){
//     //ajax request
//     $.ajax({
//       type: 'DELETE',
//       url: '/users/delete/' +$(this).data('id')
//     }).done(function(response){
//       //redirect
//     });
//     window.location.replace('/');
//   } else {
//     return false;
//   }
// }
