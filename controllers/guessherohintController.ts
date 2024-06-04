export {};
const asyncHandler = require('express-async-handler');
const Hint = require('../models/guessherohintModel');

const addUpdateHint= asyncHandler(async (req: any, res: any) => {
  const { 
    address,
    name,
    image,
    hint
 } = req.body;
 
  const hint_ = await Hint.findOne({address: address});
  
  if (!hint_) {
    
    const hinta = new Hint({ address: address, selectedName: name, selectedImage: image, selectedHint: hint});
    await hinta.save();
    res.status(200).json({ message: 'action success',hint: hinta });
  }else {
    hint_.selectedName = name;
    hint_.selectedImage = image;
    hint_.selectedHint = hint;
    hint_.save();
    return res.json({ message: 'action success',hint: hint_ });
  }
  
});

const getHint= asyncHandler(async (req: any, res: any) => {
    const { 
      address
   } = req.body;
   
    const hint_ = await Hint.findOne({address: address});
    
    if (!hint_) {
      return res.json({ message: 'no hint'});
    }else {
      return res.json({ message: 'action success',hint: hint_ });
    }
    
  });
  
  
module.exports = { addUpdateHint, getHint };
