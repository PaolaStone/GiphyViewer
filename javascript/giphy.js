$(document).ready(function(){

    function rightHide() {
        var x = document.getElementById("right");
        x.style.display = "none";
    }
    
    function rightShow() {
        var x = document.getElementById("right");
        x.style.display = "block";
    }
    rightHide();

    var topics = ["Sting", "Nirvana", "Roxette", "Bob Marley","Elvis","Alanis"];
    
    // Add first buttoms
    
    function addButtons(){
    $("#singers").empty();
    
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("singers-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#singers").append(a);
    }
    
    }
    
    addButtons();
    
    
    $(function() {
        $('body').scrollTop(0);
     });
    
    // Show gifs after click
    
    function showGifs(){
    
        $("button").on("click", function() {
            rightShow();
        var singer = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + singer + "&api_key=8qUIxdQkedrfcw69XftvBvaiYuqYvD2s&limit=10"
        console.log("clicked first")
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
                var singersDiv = $("<div class=images>");
                var singerImage = $("<img>");
                singerImage.attr("src", results[i].images.fixed_height_still.url);
                singerImage.attr("data-still", results[i].images.fixed_height_still.url)
                singerImage.attr("data-state", "still");
                singerImage.addClass("imageClicked");
                singerImage.attr("data-animate", results[i].images.fixed_height.url)
                $("#right").animate({scrollTop:0},"fast");
                singersDiv.append(singerImage);
                var p = $("<p>").text("Rating:  " + results[i].rating);
                singersDiv.append(p);
                $("#right").prepend(singersDiv);
            }
    
        })
    
    });
    }
    
    showGifs();
    
    // Play - Stop
    $(document).on("click", ".imageClicked", function(){
            var state = $(this).attr("data-state");
            if (state === "still"){
            $(this).attr("src",$(this).data("animate"));
            $(this).attr("data-state", "animate");
            
            }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
            
        };
    })
    
    
    // Add new singer
    $("#addSinger").on("click", function(event){
        event.preventDefault();
        var singer = $("#singer-input").val().trim();
        console.log(singer)
        singer = singer.charAt(0).toUpperCase() + singer.substr(1);
        topics.unshift(singer);
        addButtons();
        $("#singer-input").val(" ")
        showGifs();
    })
    
    // $(document).on("click", ".singers-btn", showGifs);
    
    // the end
    });