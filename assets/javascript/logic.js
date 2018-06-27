$(document).ready(function () {
    var location = "";
    var start = 0;

    // Take Zip and Send to APIs

    $("#zipCode").on("click", eventInfo);
   
   /* $('.btn').on('click', function () {
        var addName = $("#addName").val().trim();*/

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

            //Display Info

            for (i = 0; i < results.length; i++) {

                var event = results[i].name.text;
                var eventLink = results[i].url;
                var eventName = "<a href='" + eventLink + "'>" + event + "</a>";
                console.log(eventLink);

                $("#eventResults").append(
                    "<tr><td id='addRow'>" + eventName +
                    "</td><td id='addRow'>" + start +
                    "</td></tr>");

                //var cell= $("<tr><td>" + "<a href='" + eventLink + "'>" + event + "</a></td></tr>");
            }
        });
    }

$("#zipCode").on("click", weatherInfo);

    function weatherInfo() {
        event.preventDefault();

        location = $("#zip-input").val().trim();
        // var APIKey = "815a2a795482a610cc6a76c55b68ac5a";
   var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + location + ",us&APPID=815a2a795482a610cc6a76c55b68ac5a";

   $.ajax({
     url: queryURL,
     method: "GET"
   })
   
   .then(function (response) {
     console.log(response);
     var weatherData = response.list;
     $("#hourlyForecast").empty();

     var forecastSlotsToDisplay = 6;
     var bounds = weatherData.length >= forecastSlotsToDisplay ? 5 : weatherData.length;

     for (var i = 0; i <= bounds; i++) {
       var time = moment.unix(weatherData[i].dt);
       var currentTime = moment();
       var diff = currentTime.diff(time)
       if (diff > 0) {
         continue;
       }
       var displayTime = time.format("LT, ddd");
       var pullTemp = weatherData[i].main.temp;
       var displayTemp = parseInt((pullTemp-273.15)*1.8)+32;
       //var displayWeather = weatherData[i].weather[0].description;
       // var temp =
       // var weather\

       $("#weatherTime").append(
       "<th  id='addRow'>" + displayTime +
         "</th>"
        )
       
       $("#hourlyForecast").append(
         "<td>" + displayTemp +
         //"<tr><td>" + displayWeather +
         "</td>")
     }
   });

   // function displayWeather() {
}
 });
