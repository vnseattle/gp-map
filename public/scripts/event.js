/**
 * Event object 
 */
class Event {

    // default constructor , set all properties by api request
    // input: lat, lng, dis: distance from {lat, lng} , date of the event 
    constructor(lat,lng,dis,date) {
        var req = API_SERVER+'event/read.php?lat='+lat+"&lng="+lng+"&dis="+dis+"&date="+date+"";
        try{
            this.events = getJson(req);     
        }catch{
            this.events = []
        }
    }

    // Id of an emlemnt in events array 
    getID(index){
        return this.events[i].id;
    }

    // title of an emlemnt in events array 
    getTitle(index){
        return this.events[i].title;
    }

    // location = lat , lng 
    getLocation(index){
        return { lat: Number(this.events[index].latitude), lng: Number(this.events[index].longitude)} ;
    }

    // latiude
    getLat(index){
        return Number(this.events[index].latitude);
    }

    // longitude 
    getLng(index){
        return Number(this.events[index].longitude);
    }

    // return all events 
    getEvents(){
        return  this.events;
    }
    

}
  