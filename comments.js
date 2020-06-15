// OLD GET SEGMENT CODE

// const segments = `https://www.strava.com/api/v3/segments/explore?bounds=${bounds.southwest.lat},${bounds.southwest.lng},${bounds.northeast.lat},${bounds.northeast.lng}&activity_type=cycling`;
    // fetch(segments, {
    //     method: "GET",
    //     headers: {
    //         "Authorization" : "Bearer 07a3ae08145ca61b524b0e28c8f28c6342566a0d"
    //     }
    //     }).then(response => response.json()).then(data => {
    //         console.log(data)
    //         for (let i = 0; i < segments.length - 1; i++) {
    //             let randomIndex = Math.floor(Math.random() * 10)
    //             console.log(randomIndex)
    //             let startSegment = { lat: data.segments[randomIndex].start_latlng[0], lng: data.segments[randomIndex].start_latlng[1]}
    //             let endSegment = { lat: data.segments[randomIndex].end_latlng[0], lng: data.segments[randomIndex].end_latlng[1]}


    //         }
    //         routeButton.addEventListener('click', function() {
    //           getDirections(map.center, startSegment)
    //           getDirections(startSegment, endSegment)
    //           getDirections(endSegment, map.center)
    //         })
                                   
    //     });

// var proxy_url = 'https://cors-anywhere.herokuapp.com/';
// var target_url = 'https://maps.googleapis.com/maps/api/directions/json?origin=13.010587,%2080.259151&destination=13.023261,%2080.277290';
// var google_api_key = '&key=AIzaSyAKqSKf37aBthm8mO0BsSSJjSS4muk_mp0'

// let resp = await fetch(`${proxy_url}${target_url}${google_api_key}`)
// let respJson = await resp.json();
// console.log(respJson);
// let start = respJson