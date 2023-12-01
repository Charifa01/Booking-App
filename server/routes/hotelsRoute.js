const router = require('express').Router();
const { createHotel,
        updateHotel,
        deleteHotel,
        getAllHotels,
        getHotel ,
        countByCity,
        countByType,
        getHotelRooms } = require('../controllers/hotelControler');
const { verifyAdmin } = require('../utils/verifyToken');  


router.post('/',verifyAdmin, createHotel)
router.put('/:id',verifyAdmin ,updateHotel)
router.delete('/:id',verifyAdmin ,deleteHotel)
router.get("/find/:id", getHotel)
router.get('/',getAllHotels)
router.get('/countByCity',countByCity)
router.get('/countByType',countByType)
router.get('/room/:id', getHotelRooms)

module.exports = router;
