const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

router.route('/:thoughtId/reactions/:userId').post(addReaction);



module.exports = router;