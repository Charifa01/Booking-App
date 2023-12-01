const router = require('express').Router();
const { createRoom,
        updateRoom,
        updateRoomAvailability,
        deleteRoom,
        getAllRooms,
        getRoom } = require('../controllers/roomContoler');
const { verifyAdmin } = require('../utils/verifyToken');  

router.post('/:hotelid', createRoom)
router.put('/:id',updateRoom)
router.put('/availability/:id',updateRoomAvailability)
router.delete('/:id/:hotelid',deleteRoom)
router.get("/:id", getRoom)
router.get('/',getAllRooms)

module.exports = router;