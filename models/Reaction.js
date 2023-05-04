const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: "Reaction is Required",
        maxLength: 280,
    },
    username: {
        type: String,
        required: "Username is Required",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    }},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

function formatDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}


const Reaction = model('Reaction', ReactionSchema)

module.exports = Reaction;