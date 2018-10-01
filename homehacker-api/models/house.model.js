const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name is required'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price:{
        type: Number,
        default: 0
    },
    start: {
		type: Date,
		default: Date.now,
		required: 'Must have start date - default value is the created date'
	},
	end: {
		type: Date,
		required: 'Must have end date - default value is the created date + 1 week'
    },
    photo:{
        type: String,
        required: 'Image of your house is required'
    },
    // location: {
    //     type: String,
    //     enum: ['Point'],
    //     default: ['40.4312831', '-3.6836046'],
    //     required: 'The location is required'
    // },
    people: {
        type: [String],
        default: '2 people'
    },
    amenities: {
        type: [String],
        default: 'No amenities included'
    }
}, {timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const User = mongoose.model('House', houseSchema);

module.exports = User;
