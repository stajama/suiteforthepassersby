const MAX_VOLUME = 1.0;
const MIN_VOLUME = 0.0;
const TRANSITION_TIME = 6; // This variable controls the crossfade time when a piece transition is triggered.
var transitioning = false;
var currentlyPlaying = 0;

var standingFigures = {"name": "Standing Figures",
                                   "lat": [39.045812],
                                   "lon": [-94.581534],
                                   "audio": "{% static "Headless_Figures.mp3" %}",
                                   "title": "Headless Figures",
                                   "trigger": [38.1],
                                   "startTime": 0};

            var rumi = {"name": "Rumi",
                        "lat": [39.045879],
                        "lon": [-94.580090],
                        "title": "Love is a Madman",
                        "trigger": [45.72],
                        "startTime": 0,
                        "audio": "{% static "Love_is_a_Madman.mp3" %}"};

            var ferment = {"name": "Ferment",
                           "lat": [39.042758],
                           "lon": [-94.579753],
                           "title": "Broken",
                           "trigger": [57.912],
                           "startTime": 0,
                           "audio": "{% static "Broken.mp3" %}"};

            var shuttlecockN = {"name": "North ShuttleCock",
                                "lat": [39.043357],
                                "lon": [-94.581032],
                                "title": "Oda a La Vanguardia",
                                "trigger": [44.196],
                                "startTime": 0,
                                "audio": "{% static "Oda_a_la_Vanguardia.mp3" %}"};

            var shuttlecockS = {"name": "South ShuttleCock",
                                "lat": [39.042691],
                                "lon": [-94.581066],
                                "title": "Fireflies in the Garden",
                                "trigger": [44.196],
                                "startTime": 0,
                                "audio": "{% static "Voice_Transition.mp3" %}"};

            /* promenade and shuttleTransition do not have trigger radii or
            reasonable coordinate locations. The desired functionality is that
            promenade be performed whenever the user is not in proximity of
            any sculpture and that the transition music is only play when the
            user is located in the overlapping radii of the Northern and
            Southern shuttlecocks. In checks not related to these two locations,
            calculations are skipped when the first lat/lon values == 0/0.
            */
            var shuttleTransition = {"name": "Transition",
                                      "title": "Both light and shadow",
                                      "startTime": 0,
                                      "audio": "{% static "Voice_Transition.mp3" %}",
                                      "lat": [0],
                                      "lon": [0]};

            var promenade = {"name": "Promenade",
                                      "title": "Promenade",
                                      "startTime": 0,
                                      "audio": "{% static "Promenade.mp3" %}",
                                      "lat": [0],
                                      "lon": [0]};

            var rooftop = {"name": "Bloch Rooftop, 'Turbo,' or 'Ferryman'",
                            "title": "Big Muddy",
                            "startTime": 0,
                            "audio": "{% static "Big_Muddy.mp3" %}",
                            "lat": [39.043987, 39.043743],
                            "lon": [-94.579814, -94.579809],
                            "trigger": [28.956, 30.48]};

            var fourMotives1 = {"name": "Henry Moore Sculptures",
                            "title": "To Cast Four Motives",
                            "startTime": 0,
                            "audio": "{% static "To_Cast_Four_Motives.mp3" %}",
                            "lat": [39.042582, 39.04288, 39.043271, 39.043560, 39.043824],
                            "lon": [-94.581893, -94.581829, -94.581797, -94.581807, -94.581822],
                            "trigger": [30.48, 28.956, 28.956, 28.956, 27.432]};


// check for Geolocation support
console.log('1')
if (navigator.geolocation) {
    console.log('Geolocation is supported!');
}
else {
    console.log('Geolocation is not supported for this Browser/OS.');
    // It may be useful to the end-user to redirect them to a page stating
    // that Geolocation is required for the full experience. This is also
    // a suitable place to offer the option to go to a page with just
    // buttons that trigger each piece/track with information about when
    // to do so.
}
// console.log('2')

document.getElementById('start').onclick = async function() {
    var startPos;
    var playing = new Howl()
    var button = document.getElementById('start');
    button.innerHTML = 'PLEASE REFRESH TO RESTART';
    button.disabled = true;

    var geoOptions = {
        enableHighAccuracy: true
    };
    console.log('3');

    var geoSuccess = async function(position) {
        startPos = position;

        var x = calculateDistance(startPos.coords, standingFigures["lat"][0], standingFigures["lon"][0]);
        if (x < standingFigures['trigger'][0]) { document.getElementById('distance1').style.color = 'red'; } else { document.getElementById('distance1').style.color = 'black'; };
        document.getElementById('distance1').innerHTML = "Distance from Standing Figures: " + x;

        x = calculateDistance(startPos.coords, rumi["lat"][0], rumi["lon"][0]);
        if (x < rumi['trigger'][0]) { document.getElementById('distance2').style.color = 'red'; } else { document.getElementById('distance2').style.color = 'black'; };
        document.getElementById('distance2').innerHTML = "Distance from Rumi: " + x;

        x = calculateDistance(startPos.coords, ferment["lat"][0], ferment["lon"][0]);
        if (x < ferment['trigger'][0]) { document.getElementById('distance3').style.color = 'red'; } else { document.getElementById('distance3').style.color = 'black'; };
        document.getElementById('distance3').innerHTML = "Distance from Ferment: " + x;

        x = calculateDistance(startPos.coords, shuttlecockN["lat"][0], shuttlecockN["lon"][0]);
        if (x < shuttlecockN['trigger'][0]) { document.getElementById('distance4').style.color = 'red'; } else { document.getElementById('distance4').style.color = 'black'; };
        document.getElementById('distance4').innerHTML = "Distance from Northern ShuttleCock: " + x;

        x = calculateDistance(startPos.coords, shuttlecockS["lat"][0], shuttlecockS["lon"][0]);
        if (x < shuttlecockS['trigger'][0]) { document.getElementById('distance5').style.color = 'red'; } else { document.getElementById('distance5').style.color = 'black'; };
        document.getElementById('distance5').innerHTML = "Distance from Southern ShuttleCock: " + x;

        x = calculateDistance(startPos.coords, rooftop["lat"][0], rooftop["lon"][0]);
        if (x < rooftop['trigger'][0]) { document.getElementById('distance6').style.color = 'red'; } else { document.getElementById('distance6').style.color = 'black'; };
        document.getElementById('distance6').innerHTML = "Distance from Bloch Rooftop: " + x;

        x = calculateDistance(startPos.coords, rooftop["lat"][1], rooftop["lon"][1]);
        if (x < rooftop['trigger'][1]) { document.getElementById('distance7').style.color = 'red'; } else { document.getElementById('distance7').style.color = 'black'; };
        document.getElementById('distance7').innerHTML = "Distance from Turbo or Ferryman: " + x;

        x = calculateDistance(startPos.coords, fourMotives1["lat"][0], fourMotives1["lon"][0]);
        if (x < fourMotives1['trigger'][0]) { document.getElementById('distance8').style.color = 'red'; } else { document.getElementById('distance8').style.color = 'black'; };
        document.getElementById('distance8').innerHTML = "Distance from Henry Moore Sculptures1: " + x;
        x = calculateDistance(startPos.coords, fourMotives1["lat"][1], fourMotives1["lon"][1]);
        if (x < fourMotives1['trigger'][1]) { document.getElementById('distance9').style.color = 'red'; } else { document.getElementById('distance9').style.color = 'black'; };
        document.getElementById('distance9').innerHTML = "Distance from Henry Moore Sculptures2: " + x;
        x = calculateDistance(startPos.coords, fourMotives1["lat"][2], fourMotives1["lon"][2]);
        if (x < fourMotives1['trigger'][2]) { document.getElementById('distance10').style.color = 'red'; } else { document.getElementById('distance10').style.color = 'black'; };
        document.getElementById('distance10').innerHTML = "Distance from Henry Moore Sculptures3: " + x;
        x = calculateDistance(startPos.coords, fourMotives1["lat"][3], fourMotives1["lon"][3]);
        if (x < fourMotives1['trigger'][3]) { document.getElementById('distance11').style.color = 'red'; } else { document.getElementById('distance11').style.color = 'black'; };
        document.getElementById('distance11').innerHTML = "Distance from Henry Moore Sculptures4: " + x;
        x = calculateDistance(startPos.coords, fourMotives1["lat"][4], fourMotives1["lon"][4]);
        if (x < fourMotives1['trigger'][4]) { document.getElementById('distance12').style.color = 'red'; } else { document.getElementById('distance12').style.color = 'black'; };
        document.getElementById('distance12').innerHTML = "Distance from Henry Moore Sculptures5: " + x;

        var changed = false;

        if (!transitioning) {
            if (calculateDistance(startPos, shuttlecockN['lat'][0], shuttlecockN['lon'][0]) <= shuttlecockN['trigger'][0]
                && calculateDistance(startPos, shuttlecockN['lat'][0], shuttlecockN['lon'][0]) <= shuttlecockN['trigger'][0]) {
                if (currentlyPlaying.src.includes(shuttleTransition['audio'])) {
                    // transition already playing
                    changed = true;
                } else {

                }
            }
        }

     }:

    var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
    };

    /* Function starts with this call. watchPosition() regularly updates, calling
    geoSuccess if user Geolocation data is successfully received, causing a constant
    loop of the main functionality of the app.
    */
    navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
};
console.log('time to worry if otherwise blank');

/* Function for calculating users-position from a sculpture.
Math and code explained better at
https://www.movable-type.co.uk/scripts/latlong.html
*/
function calculateDistance(currentPosition, targetPositionLat, targetPositionLon) {
    const R = 6371e3; // earth's radius (const)
    var phi1 = currentPosition.latitude * (Math.PI / 180);
    var phi2 = targetPositionLat * (Math.PI / 180);
    var deltaphi = (targetPositionLat - currentPosition.latitude) * (Math.PI / 180);
    var deltalambda = (targetPositionLon - currentPosition.longitude) * (Math.PI / 180);

    var a = Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltalambda / 2) * Math.sin(deltalambda / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// IMPORTANT !!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!
/* This function is tied to the Emergency Stop button. It simply stops
all Howler objects from playing in the off chance that something goes
horribly wrong. Any new Howler objects must be added to the this
function.
*/
document.getElementById('stop').onclick = function() {
    return;
};

function getHowl(uri) {
    var x = new Howl({
        src: uri;
        loop: true;
        html5: true;
    });
    return x;
}