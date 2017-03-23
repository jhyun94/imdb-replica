$( document ).ready(function() {

    $(document).on("keyup", "#search",  function(){
      var data = $("#search").val();
      properData(data);
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
    var length = getLength(response);
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
    $(".title").text("Title: " + response["Title"]);
    $(".year").text("Year: " + response["Year"]);
    $(".rated").text("Rated: " + response["Rated"]);
    $(".released").text("Released" + response["Released"]);
    $(".runtime").text("Runetime: " + response["Runtime"]);
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

  function properData(data){
    if (data.length == 0){
        $(".list").empty();
    }
    data = data.replace(/\s+/g, '+');
    if (data.charAt(data.length-1) == "+"){
      data = data.substring(0, data.length-1);
    }
  }

  function getLength(response){
    var length;
    if (response.length < 10 ){
      length = response.length;
    }
    else{
      length = 10;
    }

    return length;
  }
});

