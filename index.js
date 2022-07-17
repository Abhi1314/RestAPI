var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser'); //handle request and response data
var jsondata = require('./movies.json'); // reference of json data file
var _und = require('underscore');

app.use(bodyParser.urlencoded({ extended: true })); // particular used to post data means insert data
app.use(bodyParser.json()); // to handel data in json formate

var port = process.env.PORT || 8080;

var router = express.Router(); // router used because app should use all url for api it should contain /api

// get request in function we pass two parameter 1)request 2)response
// here res refer response to get data
// check on postman localhost:8080/api 
router.get('/', function (req, res) {
    res.json(jsondata); //return jsondata

})
// post request in function we pass two parameter 1)request 2)response
// here res refer response to get data and req refer request to insert data 
// check on postman localhost:8080/api/postdata
router.post('/postdata', function (req, res) {
    if (req.body.Id && req.body.Title) {
        jsondata.push(req.body); // here we are inserting the data
        res.json(jsondata);
    }
    else {
        console.log('please put some values to insert');
    }

})
// put request used to update data
// check on postman localhost:8080/api/updatedata/id
router.put('/updatedata/:id', function (req, res) {
    if (req.params.id) {
        _und.each(jsondata, function (elem, index) {
            if (req.params.id === elem.Id) {
                elem.Title = "Hello Brother";

                elem.Director = "xyz";
            }

        })
        res.json(jsondata);
    }
    else {
        console.log('Invalid Request');
    }

})
// delete request
router.delete('/deletedata/:id', function (req, res) {
    getindextodelete = -1;
    if (req.params.id) {

        _und.each(jsondata, function (elem, index) {
            if (elem.Id === req.params.id) {
                getindextodelete = index;


            }

        })
        if (getindextodelete > -1) {
            jsondata.splice(getindextodelete, 1);
        }

        res.json(jsondata);
    }
    else {
        console.log('Please pass body elements with id');
    }
});

app.use('/api', router);
app.listen(port)
