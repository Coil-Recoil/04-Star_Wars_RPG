$(document).ready(function () {

    var location = "";

    // Take Zip and Send to APIs

    $("#zipCode").on("click", eventInfo);
/*1. add bootstrap class ".hide" to appended image and put ".show" in html to reveal on click
2. or - try adding document.InnerHTML.text = "" before it loads new content to clear current content
*/

    // Call API 

    function eventInfo() {
        event.preventDefault();

        location = $("#zip-input").val().trim();
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + location + "&start_date.keyword=today&token=YMCHN5J2AOTS2WEM2FF2";
       
        document.getElementById("weatherTime").innerHTML = "";
        document.getElementById("hourlyForecast").innerHTML = "";
        document.getElementById("weatherIcons").innerHTML = "<tr id='hourlyForecast'></tr>";
        document.getElementById("eventResults").innerHTML = "<tr ></tr>";

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
                var eventTime = moment(results[i].start.local).format("LT, ddd");
                console.log(eventTime);
                console.log(eventLink);

                $("#eventResults").append(
                    "<tr><td id='addRow'>" + eventName +
                    "</td><td id='addRow'>" + eventTime +
                    "</td></tr>");
            }
        });
    }

    $("#zipCode").on("click", weatherInfo);

    function weatherInfo() {
        event.preventDefault();

        location = $("#zip-input").val().trim();
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
                    var displayTemp = parseInt((pullTemp - 273.15) * 1.8) + 32;
                    //var displayWeather = weatherData[i].weather[0].description;
                    var pullIcon = weatherData[i].weather[0].icon;
                    var displayIcon = "<img src='http://openweathermap.org/img/w/" + pullIcon + ".png' class='icons'>";

                    $("#weatherTime").append(
                        "<th id='addRow'>" + displayTime +
                        "</th>"
                    )

                    $("#weatherIcons").append(
                        "<td class='col-sm-2 class='media-object icons'>" + displayIcon +
                        "</td>"
                    )

                    $("#hourlyForecast").append(
                        "<td class='col-sm-2'>" + displayTemp +
                        "</td>")

                        // Tring to use bootstrap "media-objects" for icons...
                        
                        /*     var displayIcon = "<a class='media'>"   + "<img src='http://openweathermap.org/img/w/" + pullIcon + ".png' class='icons'></a>";

                    $("#weatherTime").append(
                        "<th id='addRow'>" + displayTime +
                        "</th>"
                    )

                    $("#weatherIcons").append(
                        "<td class='col-sm-2 media-object'>" + displayIcon + "<a class='media-body'>" + displayTemp + "</a></td>"
                    )
                    
                       
                    2nd try:

                      $("#weatherIcons").append(
                       "<div class='media'>" + "<td class='col-sm-2 media-object icons'>" + displayIcon +
                        "</td>" + "<td class='col-sm-2 media-body'>" + displayTemp +
                        "</td>" + "</div>"
                    )

                      3rd try (pretty close): 

                $("#weatherTime").append(
                        "<th class='col-sm-2 media-center' id='addRow'>" + displayTime +
                        "</th>"
                    )


                    $("#weatherIcons").append(
                        "<td class='col-sm-2 media-object icons media-center'>" + displayIcon +
                        "</td>"
                    )

                    $("#weatherIcons").append(
                        "<td class='col-sm-2 media-body media-center'>" + displayTemp +
                        "</td>")
                    
                    */

                }
            });
    }
});
