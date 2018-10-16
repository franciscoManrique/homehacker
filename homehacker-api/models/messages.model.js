const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String
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

// asi no se puede???

messageSchema.pre('save', function() {
    this.populate('from');
    this.populate('to');
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
