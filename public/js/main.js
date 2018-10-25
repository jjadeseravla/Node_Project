$(document).ready(function(){
  $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
  var confirmation = confirm('Are you sure?');
  if(confirmation){
    //ajax request
    $.ajax({
      type: 'DELETE',
      url: '/users/delete/' +$(this).data('id')
    }).done(function(response){
      //redirect
    });
    window.location.replace('/');
  } else {
    return false;
  }
}
