const ProductModel = require('../Models/ProductModel')

exports.addProduct = async(req,res)=>{
  console.log(req.fileValidationError);
  
  if(req.fileValidationError){
    return res.status(406).send({message:"Only jpg or png........!!!"})
  }
    const {gameName,gamePrice,description,gameGenre} = req.body
    const id = req.payload
    const gameImage = req.file.filename

    // console.log(gameName,gamePrice,description,gameGenre,gameImage);
    
      try {
      if(!gameName || !gamePrice || !description || !gameGenre || !gameImage ){
          res.status(400).send({message:"Please fill the details properly"})
      }
      else{
          const newProduct = new ProductModel({
              gameName,                               //new object create cheythu. 
              gamePrice,
              description,
              gameGenre,
              gameImage
          })
          await newProduct.save()
          res.status(200).send({message:"Product  added successfully"})
      }
  } catch (error) {
    res.status(500).send({message:"Internal server Error"})
    console.log(error)
  }

}
//get all games
exports.getProducts = async(req,res)=>{
  const id = req.payload
    try {
      const products = await ProductModel.find()
      res.status(200).send({message:"Products geted",products})
      } catch (error) {
      res.status(500).send({message:"Internal server Error"})
      console.log(error)
    }
}
//delete game
exports.deleteGame = async(req,res)=>{
  const {id} = req.params            // id ye parameter aayitt pass cheyyunnu  
 try {
  const deletedProduct = await ProductModel.findByIdAndDelete(id)
  res.status(200).send({message:"Product deleted Sucessfully",deletedProduct})
 }
  catch (error) {
    res.status(500).send({message:"Internal server error"})
    console.log(error)
 }
}
//edit game
exports.editGame = async(req,res)=>{
  if(req.fileValidationError){
    return res.status(406).send({message:"Only jpg or png........!!!"})
  }

  const {id} = req.params
  const {gameName,gamePrice,description,gameGenre,gameImage} = req.body
  const updatedImage = req.file ? req.file.filename : gameImage

 try {
   const updatedgame = await ProductModel.findByIdAndUpdate(id,{
    gameName,                              
    gamePrice,
    description,
    gameGenre,
    gameImage:updatedImage
   },{new:true})
   res.status(200).send({message:"Product Updated sucessfully ",updatedgame})
 } catch (error) {
  res.status(500).send({message:"Internal Server Error"})
 }
}
//Get game based on genre

exports.getcategory = async(req,res)=>{
  const {gameGenre}=req.params

 try {
   const category = await ProductModel.find({gameGenre})
   res.status(200).send(category)
 } catch (error) {
  res.status(500).send({message:"Internal server error"})
  console.log(error)
 }
}  