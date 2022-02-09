# crazy-code
Challenge with code to reiterate API request using JS and Python

<h3> The Issue</h3>
<p> I have an API endpoint that returns a maximum of 50 records per page. I need to extract data from subsequent pages and would normally write a loop in Python, but in this case the data provider has supplied a collection in Postman that runs a pre-request JavaScript script and creates a hash (for security/verification reasons).  I am assuming that this pre-request needs to run for each iteration.  The pre-request code that runs in Postman is supplied in the prerequest.js file</p>

<p> I have tried to convert this to Python but receive the message: <br><br>
<i> {"error":"Invalid signature","message":"The 'mac' value does not match the signature of the request. Ensure the 'mac' is calculated correctly using your secret and the request body is not being altered."}</i></p>

<p> In summary, I have a pre-request in JavaSript in Postman; I have a Python template that would usually achieve the looping (with other data sources).  I need help to iterate in Postman or by running a Python script outside of Postman.

