
var userData = require("../data/userData");

module.exports = function(app) {

  app.get("/api/users", function(req, res) {
    res.json(userData);
  });

  app.post("/api/users", function(req, res) {
    var myUser = req.body
    var myResults = req.body.scores
    console.log(myResults);
    var comparisonArray = [];
    for(var i = 0; i < userData.length; i++){
      var matchingAnswers = 0;
      for(var j = 0; j < userData[i].scores.length; j++){
        if (userData[i].scores[j] === myResults[j]){
          matchingAnswers++;
        }
      }
      comparisonArray.push(matchingAnswers);
    }
    var biggestMatch = Math.max.apply(null, comparisonArray);
    console.log(comparisonArray, biggestMatch);
    var matchesArray = [biggestMatch];
    for (var m = 0; m < comparisonArray.length; m++){
      if(comparisonArray[m] === biggestMatch){
        console.log(true);
        matchesArray.push(userData[m]);
      }
    }
    userData.push(myUser);
    console.log(matchesArray);
    res.json(matchesArray);
  });

  app.post("/api/clear", function(req, res) {
    tableData.length = 0;
    waitListData.length = 0;
    res.json({ ok: true });
  });
};