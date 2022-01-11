const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

//------------ Dashboard  Route ------------

// 
router.get('/dashboard',ensureAuthenticated, (req, res) => res.render('dash', {
    name: req.user.name
}));
router.post('/dashboard',(req, res) =>{
    const num = req.body.num;
    
    if(num){
        let mean = num.split(" ")
      let n =  mean.map(Number)




        var findMean = function (numArray) {
            var sum = 0;
            for (var i = 0; i < numArray.length; i++) {
                sum += numArray[i];
            }
            return (sum / numArray.length);
          };


        let meanAns = findMean(n).toFixed(2)



        n.sort(function(a, b) { return a - b; });

        var findMedian = function(numArray) {
          var middle = Math.floor(numArray.length / 2);
        
          if(numArray.length % 2 === 0) {
            return ((numArray[middle - 1] + numArray[middle]) / 2);
          } else {
            return numArray[middle];
          }
        };
        
       let medianAns = findMedian(n);


       var findMode = function (numArray) {
        var counter = [];
        var mode = [];
        var max = 0;
          for (var i in numArray) {
            if (counter[numArray[i]] === undefined)
                counter[numArray[i]] = 0;
                counter[numArray[i]]++;
      
            if (counter[numArray[i]] == max) {
                mode.push(numArray[i]);
            }
            if (counter[numArray[i]] > max) {
                max = counter[numArray[i]];
                mode = [numArray[i]];
            }
          }
          return mode;
      }
      
      let modeAns =  findMode(n)
        res.render('calc', {
                 meanAns,
                 medianAns,
                 modeAns
                })
    }
});



router.post('/calc', (req, res) =>{
    const num = req.body.num;

    if(num){
        res.render('calc', {
                 num
                })
    }
})





module.exports = router;