$(document).ready(function(){

var topics = ["Sting", "Nirvana", "Roxette", "Bob Marley","Queen","Alanis"];

for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("singers-btn");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#singers").append(a);
}

$("button").on("click", function() {
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
            
            singersDiv.append(singerImage);
            
            var p = $("<p>").text("Rating:  " + results[i].rating);
            singersDiv.append(p);

            $("#right").prepend(singersDiv);
        }

    })

// button on click end

});

$(document).on("click", ".imageClicked", function(){
           
    var state = $(this).attr("data-state");
    console.log ("Clicked")
    console.log($(this).attr("data-state"))
    
    if (state === "still"){
        $(this).attr("src",$(this).data("animate"));
        $(this).attr("data-state", "animate");
        
        console.log($(this).attr("data-state"))
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
        console.log($(this).attr("data-state"))
    };
})

// the end
});