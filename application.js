$( document ).ready(function() {
    $("form").on("submit", function(){
      event.preventDefault();
      var data = $("#search").val();
      if (data != 0){
        $.ajax({
          method: "GET",
          url: "http://www.omdbapi.com/?s=" + data,
        }).done(function(response){
          displayResult(response);
        })
      }
    })





  function displayResult(response) {
    for(var i = 0; i <10; i++){
      $(".list").append('<li><p class="clickable">' + response["Search"][i]["Title"] + '</p>'
        + '<input type="hidden" class="imdbID" value=' + response["Search"][i]["imdbID"] 
        + '></li>');
    }
  }
});

