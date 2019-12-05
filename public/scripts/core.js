function getJson(url){
    console.log("url:",url);
    var value= $.ajax({ 
        url: url, 
        async: false
        }).responseText;
    
    return JSON.parse(value);
}