/**
 * User Object
 */

class User {

    // default constructor , set all properties by api request
    constructor(uid) {
        this.user = this.getUser(uid);
    }

    // name of the user = first + last name 
    getName(){
        return this.user.first_name+" "+this.user.last_name;
    }

    // address = city, state, zip code
    getAddress(){
        return this.user.city+", "+this.user.state+", "+this.user.zip;
    }

    // location = lat + lng in number 
    getLocation(){
        return { lat: Number(this.user.latitude), lng: Number(this.user.longitude)} ;
    }

    // latitude 
    getLat(){
        return Number(this.user.latitude);
    }

    // longitude 
    getLng(){
        return Number(this.user.longitude);
    }
  
    // return all properties 
    getUser(uid){
        return  getJson(API_SERVER+'user/read.php?id='+uid)[0];
    }
    
}
  