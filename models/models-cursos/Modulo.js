import mongoose from "mongoose";
//import autopopulate from "mongoose-autopopulate";


const modulosSchema = new mongoose.Schema({
    nombreModulo: {type:String, required:true, trim:true},
    descripcion: {type:String, required:true, trim:true},
    curso: [  {type:mongoose.Schema.Types.ObjectId, ref:"Cursos", populate: true}]
})
//modulosSchema.plugin(autopopulate)
export default mongoose.model("Modulos", modulosSchema)