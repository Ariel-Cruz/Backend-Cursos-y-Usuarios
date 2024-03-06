import mongoose from "mongoose";

const rutasSchema = new mongoose.Schema({
    nombreRuta: {type:String, required:true, trim:true},
    descripcion: {type:String, required:true, trim:true},
    certificado: {url:String, public_id:String},
    curso: [{type:mongoose.Schema.Types.ObjectId, ref:"Curso"}],    
})

export default mongoose.model("Rutas", rutasSchema)
