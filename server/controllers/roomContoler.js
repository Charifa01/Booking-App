const Rooms = require('../models/roomModel');
const Hotels = require('../models/hotelModel');

module.exports.createRoom = async(req,res ,next)=>{
    try{
        const hotel_Id = req.params.hotelid;
        const newRoom = new Rooms(req.body);
        await newRoom.save()
        try{
            await Hotels.findByIdAndUpdate(hotel_Id,{
                $push: { rooms: newRoom._id },
            })
        }catch(err){
            next(err);
        }
        res.status(200).json(newRoom);
        
    }catch(err){
        next(err);
    }
}
module.exports.updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await Rooms.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom );
    } catch (err) {
      next(err);
    }
  };
  module.exports.updateRoomAvailability = async (req ,res, next)=>{
    try {
      await Rooms.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  }
  module.exports.deleteRoom = async (req, res, next) => {
    const hotel_Id = req.params.hotelid;
    try {
      await Rooms.findByIdAndDelete(req.params.id);
      try {
        await Hotels.findByIdAndUpdate(hotel_Id, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  module.exports.getRoom = async (req, res, next) => {
    try {
      const room = await Rooms.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };
  module.exports.getAllRooms = async (req, res, next) => {
    try {
      const rooms = await Rooms.find();
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };