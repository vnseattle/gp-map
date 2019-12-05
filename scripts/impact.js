/**
 * Impact Object
 */

class Impact {

    // default constructor , set all properties by api request
    constructor(uid) {
        var req = API_SERVER+'impact/read.php?id='+uid;
        try{
            this.impacts = getJson(req);     
        }catch{
            this.impacts = []
        }
    }

    // Id of an emlemnt in impacts array 
    getID(index){
        return this.impacts[i].id;
    }

    // title of an emlemnt in impacts array 
    getTitle(index){
        return this.impacts[i].title;
    }

    // duration hours of an emlemnt in impacts array 
    getDuration_hours(index){
        return this.impacts[i].duration_hours;
    }

    // checkin date of an emlemnt in impacts array 
    getCheckin(index){
        return this.impacts[i].checkin_at;
    }

    // location = lat , lng 
    getLocation(index){
        return { lat: Number(this.impacts[index].latitude), lng: Number(this.impacts[index].longitude)} ;
    }

    // latiude
    getLat(index){
        return Number(this.impacts[index].latitude);
    }

    // longitude 
    getLng(index){
        return Number(this.impacts[index].longitude);
    }

    // return all impacts
    getImpacts(){
        return this.impacts;
    }
      
}
  