        /* Script uses HTML5 Geolocation to get regular GPS location updates
        from end-user devices. When initialized, piece1 (The Promenade) will
        play until the user's geolocation is within the specified trigger
        distance of the desired piece. The function geosuccess contains logic
        to transition to the desired piece.
        */
        // For Logging Event, assign logging ID
        var LOGGING_ID
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://127.0.0.1:8000/logging", true)
        xhr.send();
        xhr.onreadystatechange = processRequest;
        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                LOGGING_ID = response.id;
                console.log('id set: ' + LOGGING_ID);
            }
        }
        // Close
        const MAX_VOLUME = 1.0;
        const MIN_VOLUME = 0.0;
        const TRANSITION_TIME = 6; // This variable controls the crossfade time when a piece transition is triggered.
        var transitioning = false;
        var currentlyPlaying = null;
        var newPlaying = null;
        var stopTheShow = false;


        /* Each piece[#] is a function. When that piece is needed, checks are
        made to see if currentlyPlaying matches the result of said function.
        If not, newPlaying is set to the results of that function.
        */
        var piece1 = function () {
            x = new Howl({
                src: ["{% static "Promenade.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        var piece2 = function () {
            x = new Howl({
                src: ["{% static "Love_is_a_Madman.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        var piece3 = function () {
            x = new Howl({
                src: ["{% static "Broken.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        var piece4 = function () {
            x = new Howl({
                src: ["{% static "Oda_a_la_Vanguardia.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        var piece5 = function () {
            x = new Howl({
                src: ["{% static "Lightning_Bugs_in_the_Garden.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        var piece6 = function () {
            x = new Howl({
                src: ["{% static "Voice_Transition.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        var piece7 = function () {
            x = new Howl({
                src: ["{% static "Big_Muddy.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        var piece8 = function () {
            x = new Howl({
                src: ["{% static "To_Cast_Four_Motives.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        var piece9 = function () {
            x = new Howl({
                src: ["{% static "Headless_Figures.mp3" %}"],
                html5: true,
                loop: true
            });
            return x;
        };

        /* Each dictionary (JSON object) is used to store the name of the
        associated sculpture, the function to create the correct Howl object,
        the title of the desired piece, the central GPS coordinates for the
        sculpture, the trigger radius distance from the sculpture, and the
        play start time for that piece. 'startTime' is updated whenever a
        piece is stopped so that each time the piece is called, it can continue
        from where the user last heard it.
        */
        var standingFigures = {"name": "Standing Figures",
                               "lat": [39.045812],
                               "lon": [-94.581534],
                               "audio": piece9,
                               "title": "Headless_Figures",
                               "trigger": [38.1],
                               "startTime": 0};

        var rumi = {"name": "Rumi",
                    "lat": [39.045879],
                    "lon": [-94.580090],
                    "title": "Love_is_a_Madman",
                    "trigger": [45.72],
                    "startTime": 0,
                    "audio": piece2};

        var ferment = {"name": "Ferment",
                       "lat": [39.042758],
                       "lon": [-94.579753],
                       "title": "Broken",
                       "trigger": [57.912],
                       "startTime": 0,
                       "audio": piece3};

        var shuttlecockN = {"name": "North ShuttleCock",
                            "lat": [39.043357],
                            "lon": [-94.581032],
                            "title": "Oda_a_La_Vanguardia",
                            "trigger": [44.196],
                            "startTime": 0,
                            "audio": piece4};

        var shuttlecockS = {"name": "South ShuttleCock",
                            "lat": [39.042691],
                            "lon": [-94.581066],
                            "title": "Fireflies_in_the_Garden",
                            "trigger": [44.196],
                            "startTime": 0,
                            "audio": piece5};

        /* promenade and shuttleTransition do not have trigger radii or
        reasonable coordinate locations. The desired functionality is that
        promenade be performed whenever the user is not in proximity of
        any sculpture and that the transition music is only play when the
        user is located in the overlapping radii of the Northern and
        Southern shuttlecocks. In checks not related to these two locations,
        calculations are skipped when the first lat/lon values == 0/0.
        */
        var shuttleTransition = {"name": "Transition",
                                  "title": "Both_light_and_shadow",
                                  "startTime": 0,
                                  "audio": piece6,
                                  "lat": [0],
                                  "lon": [0]};

        var promenade = {"name": "Promenade",
                                  "title": "Promenade",
                                  "startTime": 0,
                                  "audio": piece1,
                                  "lat": [0],
                                  "lon": [0]};

        var rooftop = {"name": "Bloch Rooftop, 'Turbo,' or 'Ferryman'",
                        "title": "Big__Muddy",
                        "startTime": 0,
                        "audio": piece7,
                        "lat": [39.043987, 39.043743],
                        "lon": [-94.579814, -94.579809],
                        "trigger": [28.956, 30.48]};

        var fourMotives1 = {"name": "Henry Moore Sculptures",
                        "title": "To_Cast__Four_Motives",
                        "startTime": 0,
                        "audio": piece8,
                        "lat": [39.042582, 39.04288, 39.043271, 39.043560, 39.043824],
                        "lon": [-94.581893, -94.581829, -94.581797, -94.581807, -94.581822],
                        "trigger": [30.48, 28.956, 28.956, 28.956, 27.432]};

        /* Deprecated Functionality:
        The array 'sculptures' was previously used to iterate through all
        available pieces. This has since changed. This array has only been
        maintained to keep testing UI data available without too much refactoring
        for a temporary debugging measure.
        */
        var sculptures = [rooftop, fourMotives1, standingFigures, rumi, ferment, shuttlecockS,
                            shuttlecockN, shuttleTransition, promenade];

        // check for Geolocation support
        console.log('1')
        if (navigator.geolocation) {
            console.log('Geolocation is supported!');
        } else {
            console.log('Geolocation is not supported for this Browser/OS.');
            // It may be useful to the end-user to redirect them to a page stating
            // that Geolocation is required for the full experience. This is also
            // a suitable place to offer the option to go to a page with just
            // buttons that trigger each piece/track with information about when
            // to do so.
        }
        console.log('2')

        /* Main FUnction. Must either start window.onload (should be
        possible thanks to Howler override of DOM exceptions) or through
        a button.onclick or similar user-initiated event.
        */
        document.getElementById('start').onclick = async function() {
            var startPos;
            currentlyPlaying = piece1();
            currentlyPlaying.play();

            var geoOptions = {
                enableHighAccuracy: true
            };

            console.log('3');
            var geoSuccess = async function(position) {
                startPos = position;
                // var action: Logging event: for logging the exact situation each time geoSuccess runs
                var action;
                /* These element updates are largely only for testing.
                 If they are not used for the end UI, they should be
                 deleted or commented out.*/
                document.getElementById('startLat').innerHTML = startPos.coords.latitude;
                document.getElementById('startLon').innerHTML = startPos.coords.longitude;
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
                // IMPORTANT !!!!!! IMPORTANT
                /* Any additional tracks/pieces must have their
                respective dictionary added to this array. This
                excludes The Promenade and the Shuttlecock Transition music.
                */

                if (!transitioning) {
                    var changed = false;
                    // if in range of both Shuttlecocks: play transition music
                    if (calculateDistance(startPos.coords, shuttlecockN["lat"][0], shuttlecockN["lon"][0]) <= shuttlecockN["trigger"][0] &&
                        calculateDistance(startPos.coords, shuttlecockS["lat"][0], shuttlecockS["lon"][0]) <= shuttlecockS["trigger"][0]) {
                        document.getElementById('nextTo').innerHTML = "You are in the transition area between the ShuttleCocks";
                        if (currentlyPlaying != piece6()) {
                            transitioning = true;
                            changed = true;
                            newPlaying = piece6();
                            newPlaying.seek(shuttleTransition['startTime']);
                            newPlaying.play();
                            await newPlaying.once('play', async function () {
                                newPlaying.fade(0.0, 1.0, TRANSITION_TIME);
                                currentlyPlaying.fade(1.0, 0.0, TRANSITION_TIME);
                                await sleep(TRANSITION_TIME);
                                switch(currentlyPlaying) {
                                    case rooftop['audio']():
                                        rooftop['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case fourMotives1['audio']():
                                        fourMotives1['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case standingFigures['audio']():
                                        standingFigures['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case rumi['audio']():
                                        rumi['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case ferment['audio']():
                                        ferment['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case shuttlecockN['audio']():
                                        shuttlecockN['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case shuttlecockS['audio']():
                                        shuttlecockS['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case promenade['audio']():
                                        promenade['startTime'] = currentlyPlaying.seek();
                                        break;
                                }
                                currentlyPlaying = newPlaying;
                                newPlaying = null;
                                transitioning = false;
                                return;
                            });
                            break;

                        } else {
                            changed = true; action = "already playing shuttle transition music";
                        }
                    }
                    console.log("transition tested");
                    /* if NOT changing to transition music, iterate through each
                    sculpture. If the user is in range of a new sculpture, change
                    to that respective piece/track.
                    */
                    if (!changed) {
                        for (var i = 0; i < sculptures.length; i++) {
                            if (sculptures[i]["lat"][0] == 0 && sculptures[i]["lon"][0] == 0) {
                                continue;
                            };
                            for (var posr = 0; posr < sculptures[i]['lat'].length; posr++) {
                                if (calculateDistance(startPos.coords, sculptures[i]["lat"][posr], sculptures[i]["lon"][posr]) <= sculptures[i]["trigger"][posr]) {
                                    document.getElementById('nextTo').innerHTML = "You are near " + sculptures[i]["name"] + ", now playing: " + sculptures[i]["title"] + ".";
                                    if (currentlyPlaying != sculptures[i]["audio"]()) {
                                        transitioning = true;
                                        changed = true;
                                        newPlaying = sculptures[i]["audio"]();
                                        newPlaying.seek(sculptures[i]['startTime']);
                                        newPlaying.play();

                                        await newPlaying.once("play", async function () {
                                            newPlaying.fade(0.0, 1.0, TRANSITION_TIME);
                                            currentlyPlaying.fade(1.0, 0.0, TRANSITION_TIME);
                                            await sleep(TRANSITION_TIME);
                                                switch(currentlyPlaying) {
                                                    case rooftop['audio']():
                                                        rooftop['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                    case fourMotives1['audio']():
                                                        fourMotives1['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                    case standingFigures['audio']():
                                                        standingFigures['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                    case rumi['audio']():
                                                        rumi['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                    case ferment['audio']():
                                                        ferment['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                    case shuttlecockN['audio']():
                                                        shuttlecockN['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                    case shuttlecockS['audio']():
                                                        shuttlecockS['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                    case promenade['audio']():
                                                        promenade['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                    case shuttleTransition['audio']():
                                                        shuttleTransition['startTime'] = currentlyPlaying.seek();
                                                        break;
                                                }

                                            currentlyPlaying = newPlaying;
                                            newPlaying = null;
                                            transitioning = false;
                                            // (TODO) requires action text for logging event
                                            return;
                                        });
                                        break;
                                    } else {
                                        action = "already_playing_" + sculptures[i]['title'];
                                    }
                                }
                            }
                        }
                    }

                    console.log("allMusic tested");
                    /* if NOT changing to transition music AND NOT changing
                    to another piece, play The Promenade music.
                    */
                    if (!changed) {
                        document.getElementById('nextTo').innerHTML = "You are not near any sculptures."
                        if (!currentlyPlaying == promenade["audio"]()) {
                            transitioning = true;
                            newPlaying = promenade["audio"]();
                            newPlaying.seek(promenade['startTime']);
                            newPlaying.play();
                            await newPlaying.once("play", async function () {
                                newPlaying.fade(0.0, 1.0, TRANSITION_TIME);
                                currentlyPlaying.fade(1.0, 0.0, TRANSITION_TIME);
                                await sleep(TRANSITION_TIME);
                            // (TODO) this block updates the startTime for currentlyPlaying
                                switch(currentlyPlaying) {
                                    case rooftop['audio']():
                                        rooftop['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case fourMotives1['audio']():
                                        fourMotives1['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case standingFigures['audio']():
                                        standingFigures['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case rumi['audio']():
                                        rumi['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case ferment['audio']():
                                        ferment['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case shuttlecockN['audio']():
                                        shuttlecockN['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case shuttlecockS['audio']():
                                        shuttlecockS['startTime'] = currentlyPlaying.seek();
                                        break;
                                    case shuttleTransition['audio']():
                                        shuttleTransition['startTime'] = currentlyPlaying.seek();
                                        break;
                                }
                            currentlyPlaying = newPlaying;
                            newPlaying = null;
                            transitioning = false;

                            // (TODO) Action text required for testing event.
                            return;
                            });
                        } else {
                            action = "promenade_already_playing"
                        }
                    }
                } else {
                    action = 'transitioning'
                    console.log("transition being blocked");
                }
                sendLoggingData(LOGGING_ID, startPos, action);
            };

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

        document.getElementById('stop').onclick = function() {
            stopTheShow = true;
            newPlaying = false;
            currentlyPlaying = false;
        };

        function sendLoggingData(LOGGING_ID, startPos, action) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', "http:127.0.0.1:8000/logging/" + LOGGING_ID + '/' + startPos.coords.latitude + '/' + startPos.coords.longitude + '/' + action, true);
            xhr.send();
        }

