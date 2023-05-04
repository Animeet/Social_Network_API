const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Thought is Required",
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
    username: {
        type: String,
        required: "Username is Required",
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        }
    ]},
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


ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema)


module.exports = Thought;