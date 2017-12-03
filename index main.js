const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
var mysql =require('mysql');
var APP_ID = "amzn1.ask.skill.test"; 
var connection = mysql.createConnection({
    host: "test",
    user: "test",
    password: "testtest",
    database: "testtest",
    connectTimeout : 10000
});

exports.handler = function(event, context,callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    //connection.end();
};

const handlers = {
    'LaunchRequest': function () {
        this.response.speak('welcome to College information portal.  What information do you need.').listen('try again');
        this.emit(':responseReady');
    },

    'ListOnlineCollege': function () {
        var MyRank = parseInt(this.event.request.intent.slots.Rank.value);
        console.log('MyQuestion for testing : ' + MyRank);

        var sqlQuery="SELECT Rank, Name FROM testdbal.collegeinfo where Rank<= "+ MyRank + " and CollegeType='Online'";

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                if(numRows==0)
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
                else
                {
                    var listCollege = 'List of Top ' + numRows + ' Online Colleges are ,';
                    var listColleges = '';
                    //var test = rowResults[0].Name;
                    for(var i = numRows - 1; i>=0; i--) {
                        if(i==0){
                            listColleges = listCollege + " Rank " + rowResults[i].Rank + " is , " + rowResults[i].Name + listColleges;
                        }
                        else
                        {
                            listColleges = ", Rank " + rowResults[i].Rank + ", is , " + rowResults[i].Name + " " + listColleges;
                        }
                    }
                    console.log("listColleges: " + listColleges);
                    this.response.speak(listColleges).listen('try again');
                    this.emit(':responseReady');
                }
        });
        //connection.end();
    },

    'AppFees': function () {
        var MyCollegeN = this.event.request.intent.slots.CollegeN.value;
        console.log('College Application Fees for testing : ' + MyCollegeN);

        var sqlQuery="SELECT CollegeName, Fees FROM testdbal.appfees where CollegeName like '%"+ MyCollegeN +"%'";

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                var SpeakFees = '';
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                if(numRows==1)
                {
                    SpeakFees = "Application fees in " + rowResults[0].CollegeName + " is, " + rowResults[0].Fees + ", dollars";
                    console.log("Application fees : " + SpeakFees);
                    this.response.speak(SpeakFees).listen('try again');
                    //this.response.speak(SpeakFees);
                    this.emit(':responseReady');
                }
                else
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
        });
        // connection.end();        
    },
    'CollegeLocation': function () {
        var MyCollegeNB = this.event.request.intent.slots.CollegeNB.value;
        console.log('MyQuestion for testing : ' + MyCollegeNB);

        var sqlQuery="SELECT CollegeName,Address,City,State,ZipCode FROM testdbal.appfees where CollegeName ='"+ MyCollegeNB +"'" ;

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                
            var SpeakLoc = '';
            var numRows = rowResults.length;
            console.log("num of rows : " + numRows);
            if(numRows==1)
            {
                SpeakLoc = "Address of, " + rowResults[0].CollegeName + " is, " + rowResults[0].Address + "," + rowResults[0].City + "," + rowResults[0].State + "," + rowResults[0].ZipCode;
                console.log("College Location : " + SpeakLoc);
                this.response.speak(SpeakLoc).listen('try again');
                //this.response.speak(SpeakLoc);
                this.emit(':responseReady');
            }
            else
            {
                this.response.speak("Not a valid input").listen('try again');
                this.emit(':responseReady');
            }

        });
        //connection.end();
        
    },
    'CourseFees': function () {
        var MyCollegeNC = this.event.request.intent.slots.CollegeNC.value;
        console.log('College Fees for testing : ' + MyCollegeNC);

        var sqlQuery="SELECT Name, Fees FROM testdbal.collegeinfo where Name like '%"+ MyCollegeNC +"%'";

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                var SpeakCFees = '';
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                if(numRows==1)
                {
                    SpeakCFees = "Course fees in, " + rowResults[0].Name + " is, " + rowResults[0].Fees + ", dollars";
                    console.log("Application fees : " + SpeakCFees);
                    this.response.speak(SpeakCFees).listen('try again');
                    this.emit(':responseReady');
                }
                else
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
                              
        });
        // connection.end();
    },
    'CourseType': function () {
        var MyCourse = this.event.request.intent.slots.CourseName.value;
        console.log('Course Name : ' + MyCourse);

        var sqlQuery="SELECT coursename,description FROM testdbal.coursename where coursename like '%"+ MyCourse +"%'";

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                var SpeakCourse = '';
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                if(numRows=1)
                {
                    SpeakCourse = rowResults[0].description;
                    console.log("Application fees : " + SpeakCourse);
                    this.response.speak(SpeakCourse).listen('try again');
                    this.emit(':responseReady');
                }
                else
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
                
        });
        // connection.end();
    },
    'DeadLine': function () {
        var MyCollegeNE = this.event.request.intent.slots.CollegeNE.value;
        console.log('Course Name : ' + MyCollegeNE);

        var sqlQuery="SELECT CollegeName,deadline FROM testdbal.appfees where CollegeName like '%"+ MyCollegeNE +"%'";

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                var SpeakCourseNE = '';
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                if(numRows==1)
                {
                    SpeakCourseNE = "The dead line for the college, " + rowResults[0].CollegeName + ", is , " + rowResults[0].deadline;
                    console.log("Application Dead Line : " + SpeakCourseNE);
                    this.response.speak(SpeakCourseNE).listen('try again');
                    this.emit(':responseReady');
                }
                else
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
                
        });
        // connection.end();
    },
    'TopOnlineCollege': function () {
        var MyCollegeRank = parseInt(this.event.request.intent.slots.myCollegeRank.value);
        console.log('MyQuestion for testing : ' + MyCollegeRank);

        var sqlQuery="SELECT Rank, Name, Address FROM testdbal.collegeinfo where Rank= "+ MyCollegeRank + " and CollegeType='Online'";

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                if(numRows==0)
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
                else
                {
                    var listCollege = 'Top ' + MyCollegeRank + ', Online College is ,';
                    var listColleges = '';
                    //var test = rowResults[0].Name;
                    for(var i = numRows - 1; i>=0; i--) {
                        if(i==0){
                            listColleges = rowResults[0].Name + " located at " + rowResults[0].Address;
                        }
                    }
                    console.log("listColleges: " + listColleges);
                    this.response.speak(listColleges).listen('try again');
                    this.emit(':responseReady');
                }
            // }

        });
        // connection.end();
        
    },
    'ListRegularCollege': function () {
        var MyRRank = parseInt(this.event.request.intent.slots.myRegRank.value);
        console.log('MyQuestion for testing : ' + MyRRank);

        var sqlQuery="SELECT Rank, Name FROM testdbal.collegeinfo where Rank<=" + MyRRank + " and CollegeType='Regular'";
        console.log('Top 2 College : ' + sqlQuery);

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                if(numRows==0)
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
                else
                {
                    var listCollege = 'List of Top ' + numRows + ', Colleges are ,';
                    var listColleges = '';
                    //var test = rowResults[0].Name;
                    for(var i = numRows - 1; i>=0; i--) {
                        if(i==0){
                            listColleges = listCollege + " Rank " + rowResults[i].Rank + " is , " + rowResults[i].Name + listColleges;
                        }
                        else
                        {
                            listColleges = ", Rank " + rowResults[i].Rank + " is , " + rowResults[i].Name + " " + listColleges;
                        }
                    }
                    console.log("listColleges: " + listColleges);
                    this.response.speak(listColleges).listen('try again');
                    this.emit(':responseReady');
                }

        });
        // connection.end();
        
    },
    'TopRegularCollege': function () {
        var MyRCRank = parseInt(this.event.request.intent.slots.myRgRank.value);
        console.log('MyQuestion for testing : ' + MyRCRank);

        var sqlQuery="SELECT Rank, Name FROM testdbal.collegeinfo where Rank= "+ MyRCRank + " and CollegeType='Regular'";

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

        readdata(sqlQuery, rowResults=> {
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                
                if(numRows==0)
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
                else
                {

                    var listColleges = '';
                //var test = rowResults[0].Name;
                    if(numRows==1){
                        listColleges = 'Top ' + MyRCRank + ', College is , ' + rowResults[0].Name;
                    }
                    
                    console.log("listColleges: " + listColleges);
                    this.response.speak(listColleges).listen('try again');
                    this.emit(':responseReady');
                }
        });
        // connection.end();
        
    },
    'ListCollegebyState': function () {
        var MyState = this.event.request.intent.slots.USState.value;
        console.log('MyQuestion for testing : ' + MyState);

        var sqlQuery="SELECT CollegeName, City FROM testdbal.appfees where State= '"+ MyState + "'";

        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //   });

         readdata(sqlQuery, rowResults=> {
                
                var numRows = rowResults.length;
                console.log("num of rows : " + numRows);
                if(numRows==0)
                {
                    this.response.speak("Not a valid input").listen('try again');
                    this.emit(':responseReady');
                }
                else
                {
                    var listCollege = 'List of Colleges in ,' + MyState + ", are ";
                    var listColleges = '';
                    //var test = rowResults[0].Name;
                    for(var i = numRows - 1; i>=0; i--) {
                        if(i==0){
                            listColleges = listCollege + " , " + rowResults[i].CollegeName + " , located at , " + rowResults[i].City + listColleges;
                        }
                        else
                        {
                            listColleges = " , " + rowResults[i].CollegeName + " , located at , " + rowResults[i].City + listColleges;
                        }
                    }
                    console.log("say: " + listColleges);
                    this.response.speak(listColleges).listen('try again');
                    this.emit(':responseReady');
                }
        });
        // connection.end();
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak('Ask me where is CollegeName.').listen('try again');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        //connection.end();
        this.response.speak('Goodbye!');
        //connection.end();
        this.emit(':responseReady');
        //connection.end();
    },
    'AMAZON.StopIntent': function () {
        //connection.end();
        this.response.speak('Goodbye!');
        //connection.end();
        this.emit(':responseReady');
        //connection.end();
    }
};

function readdata(sqlQuery, callback) {

     var AWS = require('aws-sdk');
    // AWS.config.update({region: AWSregion});

    connection.query(sqlQuery, function(err, rows) {
        if (err) {
           console.error("Unable to read item. Error DB:");
        } else {
            console.log("GetItem succeeded:");
            callback(rows);
        }
    });

}