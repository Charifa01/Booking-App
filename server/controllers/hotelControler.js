const Hotels = require('../models/hotelModel');
const Rooms = require('../models/roomModel')
    module.exports.createHotel = async (req,res,next)=>{
    try{
        const newHotel = new Hotels(req.body)
        await newHotel.save()
        res.json({ status: true, newHotel })
    } catch(err){
        next(err);
    }
}
    module.exports.updateHotel = async (req,res,next)=>{
    try {
        const updatedHotel = await Hotels.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.json({ status: true, updatedHotel });
      } catch (err) {
        next(err);
      }
}
    module.exports.deleteHotel = async (req,res,next)=>{
    try{
        await Hotels.findByIdAndDelete(req.params.id)
        res.json({ status: true, response : 'the hotel was deleted' });
    }catch(err){
        next(err);
    }
}
    module.exports.getHotel = async (req, res, next) => {
    try {
      const hotel = await Hotels.findById(req.params.id);
      res.status(200).json(hotel)
    } catch (err) {
      next(err);
    }
  };
    module.exports.getAllHotels = async (req,res,next)=>{
    try{
       const { min , max , ...others } = req.query; 
        const hotels = await Hotels.find({ 
          ...others ,
          cheapestPrice : { $gt: min | 1, $lt: max || 12000 } }).limit(req.query.limit)
          res.status(200).json(hotels)
     }catch(err){
        next(err);
     }
}
  module.exports.countByCity = async (req,res,next)=>{
  try{
    const cities = req.query.cities.split(",");
      const list = await Promise.all(cities.map(city =>{
      return Hotels.countDocuments({ city: city });
      }))
      res.status(200).json(list);
   }catch(err){
      next(err);
   }
}
  module.exports.countByType = async (req,res,next)=>{
  try{
      const hotelsCount = await Hotels.countDocuments({ type: "hotel" });
      const AppartementCount = await Hotels.countDocuments({ type: "Apartment" })
      const ResortsCount = await Hotels.countDocuments({ type: "resort" })
      const VillasCount = await Hotels.countDocuments({ type: "villa" })
      const CabinsCount = await Hotels.countDocuments({ type: "cabins" })
    
      res.status(200).json([
        {type: "hotel" , count : hotelsCount},
        {type: "Apartment" , count : AppartementCount},
        { type: "resort" , count : ResortsCount},
        {type: "villa" , count : VillasCount},
        {type: "cabins" , count : CabinsCount}
      ]);
      
   }catch(err){
      next(err);
   }
}
module.exports.getHotelRooms = async (req,res,next)=>{
  try{
    const hotel = await Hotels.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) =>{
        return Rooms.findById(room)
      })
    )
    res.status(200).json(list);
  }catch(err){
    next(err);
  }
}
// module.exports.Update = async (req, res, next) => {
//   try {
//     await Hotels.updateMany(
//       { city: "Rabat" },
//       { $set: { city: "rabat" } }
//     );

//     res.status(200).json('The hotels were updated');
//   } catch (error) {
//     console.error('Error updating hotels:', error);
//     res.status(500).json('Internal Server Error');
//   }
// };
// module.exports.getAgadirHotels = async (req,res, next)=>{
//  try{
//   const hotels = await Hotels.find({ city: "agadir" });
//   res.status(200).json(hotels);
//  } catch (err){
//   next(err);
//  }
// }
        