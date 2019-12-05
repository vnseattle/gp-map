/**
 * Common functions
 */

function getJson(url){
    var value= $.ajax({ 
        url: url, 
        async: false
        }).responseText;
    
    return JSON.parse(value);
}