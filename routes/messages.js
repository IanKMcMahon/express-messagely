const Router = require("express").Router;
const Message = require("../models/message");
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");
const ExpressError = require("../expressError");

const router = new Router();



//GET /:id - get detail of message.

router.get('/:id', ensureLoggedIn, async (req, res, next) => {
    try{ 
        let username = req.user.username;
        let msg = await Message.get(req.params.id);

        if (msg.to_user.username !== username && msg.from_user.username !== username) {
            throw new ExpressError("Cannot read this message", 401);
        }

        return res.json({message: msg});
    }
    catch(err){
        return next(err);
    }
} )

//POST / - post message.

router.post('/', ensureLoggedIn, async (req, res, next) => {
    try{
        let from_username = req.user.username;
        let to_username = req.body.to_username
        let body = req.body.body;
        
        let msg = await Message.create( from_username, to_username, body )
        
        return res.json({message: msg});
    
    }
    catch(err){
        return next(err);
    }
})

//POST/:id/read - mark message as read:

router.post("/:id/read", ensureLoggedIn, async function (req, res, next) {
    try {
      let username = req.user.username;
      let msg = await Message.get(req.params.id);
  
      if (msg.to_user.username !== username) {
        throw new ExpressError("Cannot set this message to read", 401);
      }
      let message = await Message.markRead(req.params.id);
  
      return res.json({message});
    }
  
    catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;