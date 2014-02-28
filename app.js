var timezones = {
    'London' : {
        'offset' : 0,
        'rotate' : 0
    },
    'Paris' : {
        'offset' : +60,
        'rotate' : 15
    },
    'Rome' : {
        'offset' : +60,
        'rotate' : 15
    },
    'Istanbul' : {
        'offset' : +120,
        'rotate' : 30
    },
    'Cairo' : {
        'offset' : +120,
        'rotate' : 29,
        'height' : 30
    },
    'Baghdad' : {
        'offset' : +180,
        'rotate' : 45,
        'height' : 68
    },
    'Tehran' : {
        'offset' : +210,
        'rotate' : 52.5,
        'height' : 45
    },
    'Moscow' : {
        'offset' : +240,
        'rotate' : 60
    },
    'Kabul' : {
        'offset' : +270,
        'rotate' : 67.5,
        'height' : 45
    },
    'Delhi' : {
        'offset' : +330,
        'rotate' : 82.5
    },
    'Bangkok' : {
        'offset' : +420,
        'rotate' : 105
    },
    'Singapore' : {
        'offset' : +480,
        'rotate' : 120,
        'height' : 65
    },
    'Beijing' : {
        'offset' : +480,
        'rotate' : 120,
        'height' : 45
    },
    'Manila' : {
        'offset' : +480,
        'rotate' : 120,
        'height' : 90
    },
    'Perth' : {
        'offset' : +525,
        'rotate' : 131.25,
        'height' : 120
    },
    'Seoul' : {
        'offset' : +540,
        'rotate' : 135,
        'height' : 45
    },
    'Tokyo' : {
        'offset' : +540,
        'rotate' : 135
    },
    'Sydney' : {
        'offset' : +600,
        'rotate' : 150
    },
    'Melbourne' : {
        'offset' : +600,
        'rotate' : 150,
        'height' : 45
    },
    'Auckland' : {
        'offset' : +720,
        'rotate' : 180
    },
    'Honolulu' : {
        'offset' : -600,
        'rotate' : 210
    },
    'Anchorage' : {
        'offset' : -540,
        'rotate' : 225
    },
    'Vancouver' : {
        'offset' : -480,
        'rotate' : 240
    },
    'Los Angeles' : {
        'offset' : -480,
        'rotate' : 240
    },
    'Denver' : {
        'offset' : -420,
        'rotate' : 255
    },
    'Chicago' : {
        'offset' : -360,
        'rotate' : 270
    },
    'Mexico City' : {
        'offset' : -360,
        'rotate' : 270,
        'height' : 70
    },
    'Belize' : {
        'offset' : -360,
        'rotate' : 270,
        'height' : 45
    },
    'Toronto' : {
        'offset' : -300,
        'rotate' : 285
    },
    'New York' : {
        'offset' : -300,
        'rotate' : 285,
        'height' : 45
    },
    'Lima' : {
        'offset' : -300,
        'rotate' : 285,
        'height' : 70
    },
    'Rio' : {
        'offset' : -180,
        'rotate' : 315
    },
    'Buenos Aires' : {
        'offset' : -180,
        'rotate' : 315,
        'height' : 45
    }
}

// Get seconds since last midnight
function getSecsSinceMidnight(date) {
    var e = new Date(date);
    return Math.round((date - e.setHours(0,0,0,0)) / 1000);
}

// Get UTC Time
function getUTC() {
    var date = new Date();
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}

// Format time to AM / PM
function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

// Get time zone of city
function getTimezoneTime(city) {
    local = getUTC();
    local.setMinutes(local.getMinutes() + timezones[city].offset);
    return local;
}

// Output all timezones
var cities = document.getElementById('cities');
for(var city in timezones) {
    var el = document.createElement('div');
    el.innerHTML = city;
    el.setAttribute('data-city', city);
    el.className = 'city';
    if (lh = timezones[city].height) el.style.lineHeight = lh+'px';
    el.style.webkitTransform = 'rotate('+(timezones[city].rotate+180)+'deg)';
    cities.appendChild(el);
}

$('.city').arctext({radius: 90});

$('.city').mouseover(function() {
    var city = $(this).attr('data-city');
    $('#data').html(city + ": " + formatTime(getTimezoneTime(city)));
});

// Rotate the face of the clock every second
(function foo() {
    var rotate = (getSecsSinceMidnight(getUTC()) / 86400) * 360;
    document.getElementById('face').style.webkitTransform = 'rotate('+rotate+'deg)';
    setTimeout(foo, 5000);
})();