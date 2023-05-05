const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);



module.exports = router;