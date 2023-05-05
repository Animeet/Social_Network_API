const { User, Thought } = require('../models/index')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
            })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.updateOne({ _id: req.params.userId }, { $set: req.body })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.deleteOne({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.updateOne({ _id: req.params.userId }, { $addToSet: { reactions: req.params.thoughtId } })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.updateOne({ _id: req.params.userId }, { $pull: { reactions: req.params.thoughtId } })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};
