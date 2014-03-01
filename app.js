var timezones = {
    'London' : {
        'offset' : 0,
        'rotate' : 0
    },
    'Paris' : {
        'offset' : +60,
        'rotate' : 15,
        'height' : 45
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
        'height' : 45
    },
    'Baghdad' : {
        'offset' : +180,
        'rotate' : 45,
        'height' : 70
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
        'rotate' : 67,
        'height' : 45
    },
    'Delhi' : {
        'offset' : +330,
        'rotate' : 82.5
    },
    'Colombo' : {
        'offset' : +330,
        'rotate' : 83.5,
        'height' : 45
    },
    'Bangkok' : {
        'offset' : +420,
        'rotate' : 105
    },
    'Singapore' : {
        'offset' : +480,
        'rotate' : 119,
        'height' : 45
    },
    'Beijing' : {
        'offset' : +480,
        'rotate' : 121
    },
    'Perth' : {
        'offset' : +525,
        'rotate' : 131.25,
        'height' : 70
    },
    'Seoul' : {
        'offset' : +540,
        'rotate' : 136,
        'height' : 45
    },
    'Tokyo' : {
        'offset' : +540,
        'rotate' : 135
    },
    'Sydney' : {
        'offset' : +600,
        'rotate' : 150,
        'height' : 45
    },
    'Melbourne' : {
        'offset' : +600,
        'rotate' : 152
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
        'rotate' : 225,
        'height' : 45
    },
    'Vancouver' : {
        'offset' : -480,
        'rotate' : 240
    },
    'Los Angeles' : {
        'offset' : -480,
        'rotate' : 240,
        'height' : 70
    },
    'Denver' : {
        'offset' : -420,
        'rotate' : 255,
        'height' : 45
    },
    'Chicago' : {
        'offset' : -360,
        'rotate' : 270
    },
    'Cancun' : {
        'offset' : -360,
        'rotate' : 269,
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
        'rotate' : 287,
        'height' : 45
    },
    'Lima' : {
        'offset' : -300,
        'rotate' : 286,
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
    return hours + ':' + minutes + ' ' + ampm;
}

// Get time zone of city
function getTimezoneTime(city) {
    local = getUTC();
    local.setMinutes(local.getMinutes() + timezones[city].offset);
    return local;
}

// Output all timezones
var cities = document.getElementById('cities');
$(function() {
    for(var city in timezones) {
        var el = document.createElement('div');
        var at = 70;
        var zi = 3;
        el.innerHTML = '<p>'+city+'</p>';
        el.setAttribute('data-city', city);
        el.className = 'city';
        if (lh = timezones[city].height) {
            el.style.lineHeight = lh+'px';
            at = (lh == 45) ? 65 : 60;
            zi = (lh == 45) ? 2 : 1;
        }
        el.style.zIndex = zi;
        el.style.webkitTransform = 'rotate('+(timezones[city].rotate+180)+'deg)';
        cities.appendChild(el);
        $(el).find('p').arctext({radius: at});
    }

    $('#data').html("Local Time<br>" + formatTime(new Date));

    // Show data on mouseover
    $('.city p').mouseover(function() {
        var city = $(this).parent().attr('data-city');
        $('#data').html(city + "<br>" + formatTime(getTimezoneTime(city)));
    }).mouseleave(function() {
        $('#data').html("Local Time<br>" + formatTime(new Date));
    });
});

// Rotate the face of the clock every second
(function foo() {
    var rotate = (getSecsSinceMidnight(getUTC()) / 86400) * 360;
    document.getElementById('face').style.webkitTransform = 'rotate('+rotate+'deg)';
    setTimeout(foo, 5000);
})();