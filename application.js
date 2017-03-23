$( document ).ready(function() {

    $(document).on("keyup", "#search",  function(){
      var data = $("#search").val();
      if (data.length == 0){
        $(".list").empty();
      }
      data = data.replace(/\s+/g, '+');
      if (data.charAt(data.length-1) == "+"){
        data = data.substring(0, data.length-1);
      }
      console.log(data);
      if (data != 0){
        $.ajax({
          method: "GET",
          url: "http://www.omdbapi.com/?s=" + data,
        }).done(function(response){
          emptyDisplay();
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
        emptyDisplay();
        displayMovieDetail(response);
        $(".movie").show();
      })
    })





  function displayResult(response) {
    console.log(response);
    var length = 10;
    if (response.length < 10 ){
      length = response.length;
    }
    if (response["Response"] == "True"){
      for(var i = 0; i <length; i++){
        $(".list").append('<li><p class="clickable">' + response["Search"][i]["Title"] + '</p>'
          + '<input type="hidden" class="imdbID" value=' + response["Search"][i]["imdbID"] 
          + '></li>');
      }
    }
  }

  function displayMovieDetail(response){
    addImage(response);
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
  function emptyDisplay(){
    $(".list").empty();
    $(".detail").empty();
  }
});

