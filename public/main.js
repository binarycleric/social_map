navigator.geolocation.getCurrentPosition(function(position) {
  var xhttp = new XMLHttpRequest();
  var endpoint_url = "nearby.json?lat=" + position.coords.latitude + "&long=" + position.coords.longitude;

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 14
  });

  var markers = [];

  xhttp.responseType = "json";
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var tweets = xhttp.response;
      
      tweets.forEach(function(tweet, i) {
        if (tweet["geo"] && tweet["geo"]["coordinates"]) {
          
          
          var tweet_loc = {
            lat: tweet["geo"]["coordinates"][0],
            lng: tweet["geo"]["coordinates"][1]
          };

          var marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: tweet_loc, 
            map: map,
            title: 'Hello World!'
          });

          markers.push(marker);

          var tweet_url = "https://twitter.com/" + tweet["user"]["screen_name"] +
            "/status/" + tweet["id_str"];

          var content = "<div class=\"tweet_container\">" +
            "<div class=\"image\">" + 
            "<img src=\"" + tweet["user"]["profile_image_url_https"] + "\">" +
            "</div>" +

            "<div class=\"user\">" +
            "@" + tweet["user"]["screen_name"] +
            "</div>" +

            "<div class=\"tweet\">" + tweet["text"] + "</div>" +

            "<a target=\"_blank\" href=\"" + tweet_url + "\">Link</a>" +
            "</div>"

          var infowindow = new google.maps.InfoWindow({
            content: content 
          });

          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        } else {
          console.log("Bad tweet");
        }
      });
    }
  };

  xhttp.open("GET", endpoint_url, true);
  xhttp.send();
});
