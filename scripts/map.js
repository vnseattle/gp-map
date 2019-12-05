/**
 * Map functions 
 */

var map; // the Google Map 
var InforObj = []; // Track information window  
var EventMarkers = []; // Track makers 

var USER_TODAY = '2015-12-7'; 
var USER_DISTANCE = 15;

/**
 * Set up the map 
 */
function initMap() {
  var searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('uid')){
    var uid = searchParams.get('uid');
    // import user
    var user = new User(uid);
    // display user info
    this.displayUserInfo(user);
    // create map
    this.generateMap(user.getLocation(),user.getName());

    // add events near home
    this.addEvents(user.getLat(),user.getLng(),USER_DISTANCE,USER_TODAY,'home');
    // add home makers
    this.addHomeMaker(user.getLocation());

    // add impacts
    this.addImpacts(uid);

    // add search listener
    $( "#search" ).click(function() {
      findEvents(user.getLocation());
    });
  }
}


/**
 * Add the maker home of user
 * @param location: {lat, lng} for the marker 
 */
function addHomeMaker(location){
  this.addMaker(location,'house.png');
  // go home button listener
  $( "#goHome" ).click(function() {
    addEvents(location.lat,location.lng,USER_DISTANCE,USER_TODAY,'home');
    map.panTo(location);
  });

}

/**
 * Add the maker for new home 
 * @param location: {lat, lng} for the marker 
 */
function addPointMaker(location){
  this.addMaker(location,'house_green.png');
}

/**
 * Helper function: add a maker
 * @param location: {lat , lng }
 * @param icon for the marker  
 */
function addMaker(location,icon){
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: 'assets/icons/'+icon,
  });
}

/**
 * Add impacts
 * @param uid user id 
 */
function addImpacts(uid){
  var impacts = new Impact(uid);
  this.addMarkers(impacts.getImpacts(),'assets/icons/event.png',true);
}

/**
 * Add events
 * lat, lng, distance, date of event
 * @param lat : lat of the event
 * @param lng : lng of the event
 * @param dis: distance from the house 
 * @param date: date must be in between start-end date
 * @param type: color options for the event icon 
 */
function addEvents(lat,lng,dis,date,type){
   // Delete before adding new markers
   this.DeleteMarkers();
   // Get current date
   var events = new Event(lat,lng,dis, date).getEvents();
   if(type=='home'){ //events near home
    this.addMarkers(events,'assets/icons/ticket_red.png',false);
   }else{ //events around new home 
    this.addMarkers(events,'assets/icons/ticket_green.png',false);
   }
   
}

/**
 * Helper function : add multiple markers 
 * @param makers: maker list
 * @param icon: icon of the markers
 * @param isImpact: are they used for Impacts?
 */
function addMarkers(markers,icon,isImpact) {
  var markersOnMap = [];
  for (var i = 0; i < markers.length; i++) {

    if(!isImpact){
      // this is not impact
      markersOnMap.push(
        {
        id: markers[i].id,
        title: markers[i].title,
        line1: "Start: "+markers[i].start_date_time,
        line2: "End  : "+markers[i].end_date_time,
        distance: markers[i].distance+" miles",
        LatLng: [{lat: Number(markers[i].latitude), lng: Number(markers[i].longitude)}]
        }
      );

    }else{
      // this is the impact 
      markersOnMap.push(
        {
        id: markers[i].id,
        title: markers[i].title,
        line1: markers[i].duration_hours+" hours",
        line2: markers[i].checkin_at,
        distance: "",
        LatLng: [{lat: Number(markers[i].latitude), lng: Number(markers[i].longitude)}]
        }
      );

    }
  };

  // Create content for info windows 
  for (var i = 0; i < markersOnMap.length; i++) {
      var contentString = "<div id='"+markersOnMap[i].id+"'><h6>" + markersOnMap[i].title 
      +'</h6><p><b>'+markersOnMap[i].distance
      +'</b></p><p>'+markersOnMap[i].line1+'<br/>'+markersOnMap[i].line2+'</p></div>';

      // create a maker 
      const marker = new google.maps.Marker({
          position: markersOnMap[i].LatLng[0],
          icon: icon,
          map: map
      });

      // create a info window 
      const infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
      });

      // add event for each marker 
      marker.addListener('click', function (id) {
          closeOtherInfo(id); // close the others
          infowindow.open(marker.get('map'), marker);
          InforObj[0] = infowindow;
      }); 

      // collect all markers except impacts 
      if(!isImpact){
        EventMarkers.push(marker);
      }

  }
}

/**
 * Close info window  
 * @param id id of the window  
 */
function closeOtherInfo(id) {  
  if (InforObj.length > 0) {
      InforObj[0].set("marker", null);
      InforObj[0].close();
      InforObj.length = 0;
  }
}

/**
 * Display user information on HTML
 * @param user object  
 */
function displayUserInfo(user){
  $('#user-name').text(user.getName());
  $('#user-add').text(user.getAddress());
}

/**
 * Add markers for event  
 * @param userHomeLocation 
 */
function findEvents(userHomeLocation){
  // convert address to lat lng
  var address = $("#address").val();
  var addressObj = getJson('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+API_KEY_GOOGLE_MAP);
  var location = addressObj.results[0].geometry.location;
  // add maker
  this.addPointMaker(location);
  // move to the point 
  map.panTo(location);
  // get distance
  var distance = $("#distance").val();
  // get date
  var datepicker = $("#datepicker").val();
  // add events  
  this.addEvents(location.lat,location.lng,distance,datepicker,'new');
  // Add Lines to the home
  var path = new google.maps.Polyline({
    path: [{lat:location.lat, lng: location.lng},userHomeLocation],
    geodesic: false,
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 1
  });
  path.setMap(map);

}

/**
 * Delete old markers 
 * free the map
 */
function DeleteMarkers() {
  //Loop through all the markers and remove
  for (var i = 0; i < EventMarkers.length; i++) {
    EventMarkers[i].setMap(null);
  }
  EventMarkers = [];
};

/**
 * Generate the map 
 * @param location : center of the map {lat, lng} 
 */
function generateMap(location){
  // Design the map
  var option = { center: location, zoom: 13
   ,styles:
   [
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ] 
  };
  map = new google.maps.Map(document.getElementById('map'), option );
}