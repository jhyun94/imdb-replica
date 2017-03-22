$( document ).ready(function() {

    $(document).on("submit", "form",  function(){
      event.preventDefault();
      var data = $("#search").val();
      if (data != 0){
        $.ajax({
          method: "GET",
          url: "http://www.omdbapi.com/?s=" + data,
        }).done(function(response){
          $(".list").empty();
          $(".detail").empty();
          $(".movie").hide();
          $(".movie-poster").remove();
          displayResult(response);
        })
      }
    })

    $(document).on("click", ".clickable",  function(){
      var id = $(this).next().val();
      $.ajax({
        method: "GET",
        url: "http://www.omdbapi.com/?i=" + id
      }).done(function(response){
        $(".list").empty();
        $(".detail").empty();
        displayMovieDetail(response);
        $(".movie").show();
      })
    })





  function displayResult(response) {
    for(var i = 0; i <10; i++){
      $(".list").append('<li><p class="clickable">' + response["Search"][i]["Title"] + '</p>'
        + '<input type="hidden" class="imdbID" value=' + response["Search"][i]["imdbID"] 
        + '></li>');
    }
  }

  function displayMovieDetail(response){
    addImage(response);
    // $(".movie-poster").attr("src", response["Poster"]);
    $(".title").text(response["Title"]);
    $(".year").text(response["Year"]);
    $(".rated").text(response["Rated"]);
    $(".released").text(response["Released"]);
    $(".runtime").text(response["Runtime"]);
    $(".plot").text("Plot");
    $(".plot-description").text(response["Plot"]);
  }

  function addImage(response){
    $(".movie .container").prepend('<img class="movie-poster" src="'+response["Poster"]+'"  />' )
  }
});

