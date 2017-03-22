$( document ).ready(function() {
    $("form").on("submit", function(){
      event.preventDefault();
      var data = $("#search").val();

      $.ajax({
        method: "GET",
        url: "http://www.omdbapi.com/?s=" + data,
      }).done(function(response){
        displayResult(response);
      })
    })
    test();
});

