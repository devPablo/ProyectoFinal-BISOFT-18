let getReqButton = document.querySelector('#getReqButton');
getReqButton.addEventListener('click', test);

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText)
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function test() {
    httpGetAsync('http://localhost:3000/api/users', (d) => console.log(
        JSON.parse(d).res[0 ]
    ));
}