var express = require('express');
var bodyParser = require('body-parser')
var Cat = require('./models').Cat
var User = require('./models').User
var cors = require('cors')

var app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())

const authorization = function(request, response, next){
  const token = request.query.authToken || request.body.authToken
  if(token){
    User.findOne({
      where: {authToken: token}
    }).then((user)=>{
      if(user){
        request.currentUser = user
        next()
      }else{
        response.status(401)
        response.json({message:'Authorization Token Invalid'})
      }
    })
  }else{
    response.status(401)
    response.json({message: 'Authorization Token Required'})
  }
}

app.get('/cats', function (request, response) {
  Cat.findAll().then(function(cats){
    response.status(200)
    response.json({message: "success", cats: cats})

  })
  // response.json({message: 'API Example App'})
});

//create request.body.cat
app.post('/create-cat', authorization, function(request, response){
  Cat.create(request.body.cat).then(function(cat){
    response.status(200)
    response.json({message: "success", cat: cat})
  }).catch(function(error){
    console.log('fail');
    response.status(400)
    response.json({message: "fail", error: error})
  })
})

app.post('/login_user', function(request, response){
  // look up the user by username
  User.findOne({where: {email: request.body.user.email}}).then(function(user){
    if(user){

      // check the password and return 200 & the user if valid
      if(user.verifyPassword(request.body.user.password)){
        response.status(200)
        response.json({status: 'success', user: user})
      } else {
        response.status(401)
        response.json({status: 'error', error: 'could not log in'})
      }
    } else {
      response.status(401)
      response.json({status: 'error', error: 'could not log in'})
    }
  })
  // return 401 unauthorized if not valid
})

app.post('/create-user', function(request, response){
  User.create(request.body.user).then(function(user){
    console.log('backend user', user);
    response.status(200)
    response.json({message: "success", user: user})
  }).catch(function(error){
    console.log('fail');
    response.status(400)
    response.json({message: "fail", error: error})
  })
})


app.listen(4000, function () {
 console.log('Todo Server listening on port 4000!');
});
