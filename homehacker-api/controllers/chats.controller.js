const createError = require('http-errors');
const mongoose = require('mongoose');
const Chat = require('./../models/chat.model');
const Message = require('./../models/messages.model');

//CHATS WITH THAT USER
module.exports.list = (req, res, next)=>{

    Message.find({$or:[{$and:[{from: req.user._id},{to: req.params.userId}]},{$and:[{from: req.params.userId},{to: req.user._id}]}]})
    .populate('from')
    .populate('to')
    .then(messages => {
        console.log(messages);
        
        res.status(201).json(messages);
    })
    .catch(error => {
        next(error);
    });
};

//CREATE ONE CHAT WITH A MESSAGE
module.exports.create = (req, res, next)=>{  

    const message = new Message({from: me, to: him, message: req.body.text});
    message.save()
    .then(message => {
        res.status(201).json(message);
    })
    .catch(error => {
        next(error);
    });
};


// module.exports.create = (req, res, next)=>{  
//     console.log(777);

//     const me = req.user.id;
//     const him = req.params.to;

//     Chat.findOne({$or:[{$and:[{owner: me},{theother: him}]},{$and:[{theother: him},{to: me}]}]})
//     .then(chat=>{
//         if (chat) {
//             console.log('already have a chat');
//             res.status(201).json();
//         } else{    
//             const chat = new Chat({owner: me});
//             return chat.save()
//             .then(chat => {
//                 res.status(201).json(chat);
//             });
//         }
//     })
//     .catch(error => {
//         next(error);
//     });
// };


// const message = new Message({from: me, to: him, message: req.body.message});
// return message.save()
// .then(message => {
//     res.status(201).json(message);
// });