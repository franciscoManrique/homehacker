const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    theother:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true,
    toJSON: {
        transform: (doc, res) => {
            res.id = doc._id;
            delete res._id;
            delete res.__v;
            return res;
        }
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
