//Holds the string that is turned into the signature
var canonicalString = "";
//Current date/time for the request
var date = new Date ();
var timestamp = date.getTime();
//Content type of the request (or blank if not appropriate)
var contentType = "";
//MD5 hash of the body content of the request (or blank if not appropriate)
var contentMD5 = "";

//Get the URL's path & querystring and URL encode it
var urlArray = request.url.split("/");
urlArray.shift();
var urlPath = "/" + urlArray.join("/").escapeURL();

// If PUT or POST, calculate the MD5 of the body contents and content type
if((request.method == "POST" || request.method == "PUT" ) && request.data){
    contentMD5 = CryptoJS.MD5(request.data).toString(CryptoJS.enc.Hex);
    contentType = request.headers["Content-Type"]
}

//Create the canonical string used for the signature
canonicalString = request.method ;
canonicalString += "\n";
canonicalString += timestamp; 
canonicalString += "\n";
canonicalString += contentType;
canonicalString += "\n";
canonicalString += contentMD5;
canonicalString += "\n";
canonicalString += decodeURIComponent(urlPath);


// Generate HMAC SHA256 signature
var signature = CryptoJS.HmacSHA256(canonicalString, environment.ApiConsumerSecret);

//Update the required headers
postman.setEnvironmentVariable('Signature', signature);
postman.setEnvironmentVariable('ContentMD5', contentMD5);
postman.setEnvironmentVariable('Timestamp', timestamp);

//Add the canonical string to a header for debug purposes only
postman.setEnvironmentVariable('CanonicalString', canonicalString.split("\n").join("\\n"));


