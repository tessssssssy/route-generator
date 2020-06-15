var map;
const form = document.getElementById('form');
const address = document.getElementById('address');
const routeButton = document.getElementById('route-button');
console.log(address.value)

//strava 6ad2c472afd447ee4c4a37f64277a4514af9c159

const initMap = (coords) => {    
    console.log(coords);
    const bounds = coords.results[0].geometry.bounds
    const latitude = coords.results[0].geometry.location.lat;
    const longitude = coords.results[0].geometry.location.lng;
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 12
  });
  const segments = getSegments(bounds, map)
  console.log(segments)
}

const getDirections = (start, end) => {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    var request = {
        origin: start,
        destination: end,
        travelMode: 'BICYCLING'
      };
      directionsService.route(request, function(result, status) {
        console.log(result);
        if (status == 'OK') {
          directionsRenderer.setDirections(result);
        }
      });
}

const calcRoute = async () => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=Melbourne&destination=Sydney&key=AIzaSyAKqSKf37aBthm8mO0BsSSJjSS4muk_mp0`
    // document.head.appendChild(document.createElement('script').setAttribute('src', url));
    const options = {
        method: 'GET',
        mode: 'no-cors'
      };
    const response = await fetch(url, options);
    const data = await response.json()
    console.log(data)
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    var request = {
      origin: start,
      destination: end,
      travelMode: 'BICYCLING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
}

const getSegments = async (bounds, map) => {
    const segments = `https://www.strava.com/api/v3/segments/explore?bounds=${bounds.southwest.lat},${bounds.southwest.lng},${bounds.northeast.lat},${bounds.northeast.lng}&activity_type=cycling`;
    const response = await fetch(segments, {
        method: "GET",
        headers: {
            "Authorization" : "Bearer 60953d2727ae13044dbbade12b4b12472a4b74d5 "
        }      
    })
    const data = await response.json();
    for (let i = 0; i < data.segments.length; i++) {
            let startSegment = { lat: data.segments[i].start_latlng[0], lng: data.segments[i].start_latlng[1]}
            let endSegment = { lat: data.segments[i].end_latlng[0], lng: data.segments[i].end_latlng[1]}
            getDirections(startSegment, endSegment)
        }
    let randomIndex = Math.floor(Math.random() * 10);
    const startSegment = { lat: data.segments[randomIndex].start_latlng[0], lng: data.segments[randomIndex].start_latlng[1]}
    const endSegment = { lat: data.segments[randomIndex].end_latlng[0], lng: data.segments[randomIndex].end_latlng[1]}
    routeButton.addEventListener('click', function() {
      getDirections(map.center, startSegment)
      getDirections(startSegment, endSegment)
      getDirections(endSegment, map.center)
    })
}

const getCoordinates = async (address='Melbourne', callback) => {
    try {   
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAKqSKf37aBthm8mO0BsSSJjSS4muk_mp0`)     
      const data = await response.json()
      console.log(data.results[0].geometry.location.lat)
      callback(data)
    } catch(err) {
      console.log(err)
    }
}


form.addEventListener('submit', function() {
    event.preventDefault()
    const location = address.value
    console.log(location)
    // initMap(getCoordinates(location, getSegments))
    getCoordinates(location, initMap);
});

