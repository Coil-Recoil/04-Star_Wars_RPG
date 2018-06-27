$(document).ready(function () {
    var name = "";
    var location = "";
    var start = 0;
    var end = 0;
    var price = 0;
    
    // Take Zip and Send to APIs
        
    $("#zipCode").on("click", eventInfo);
        
        // Call API 
        
    function eventInfo() {
        event.preventDefault();

        location = $("#zip-input").val().trim();
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + location + "&token=YMCHN5J2AOTS2WEM2FF2";
        
    
        $.ajax({
            url: queryURL,
            method: "GET", 
        }).done(function (response) {
            console.log(response);
    
            var results = response.events;
    
            for  (i = 0; i < results.length; i++) {
               
                var event = results[i].name.text;
                var eventLink= results[i].url;
                console.log(eventLink);
                var cell= $("<tr><td>" + "<a href='" + eventLink + "'>" + event + "</a>" + "<span class='start-side'>" + " - 10:00am" + "</span>" + "</td></tr>");
                $("#eventResults").append(cell);
            }
        });
    }
    
    
    // $('.btn').done.on(function (results) {
    //     var addName = $("#addName").val().trim();
    //     var addVenue = $("#addVenue").val().trim();
    //     var addStart = $("#addStart").val().trim();
    //     var addEnd = $("#addEnd").val().trim();
    //     var addPrice = $("#addPrice").val().trim();
    
    //     dataRef.ref().push({
    //         name: addName,
    //         venue: addVenue,
    //         start: addStart,
    //         end: addEnd,
    //         price: addPrice,
    //     })
    
    //     $("#addName").val("");
    //     $("#addVenue").val("");
    //     $("#addStart").val("");
    //     $("#addEnd").val("");
    //     $("#addPrice").val("");
    
    //     return false;
    // });
    
    // // Link up Firebase realtime data to HTML DOM
    
    // dataRef.ref().on("child_added", function (childSnapshot, prevChildKey) {
    
    //     var name = childSnapshot.val().name;
    //     var venue = childSnapshot.val().venue;
    //     var start = childSnapshot.val().start;
    //     var end = childSnapshot.val().end;
    //     var price = childSnapshot.val().price;
    
    //     $("#eventResults").append(
    //         "<tr><td>" + name +
    //         "</td><td>" + venue +
    //         "</td><td>" + start +
    //         "</td><td>" + end +
    //         "</td><td>" + price +
    //         "</td></tr>");
    // },
    // ); 
});