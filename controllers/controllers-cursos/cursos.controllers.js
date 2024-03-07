import Curso from "../../models/models-cursos/Curso.js";
import { deleteImage } from "../../libs/cloudinary.js";
import fs from "fs-extra"
import {uploadImageCursos} from "../../libs/cloudinary.js"

export const getCursos = async (req, res) => {
    try {
        const cursos = await Curso.find().populate("modulos").populate("ruta");
        res.json(cursos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const createCurso = async(req, res) => {
    try{
        const { nombreCurso, filtro, profesor, duracion } = req.body;
        let imagen;

        if(req.files?.imagen){
            const result = await uploadImageCursos(req.files.imagen.tempFilePath)

            await fs.remove(req.files.imagen.tempFilePath)

            console.log(result)
            imagen = {
                url: result.secure_url,
                public_id: result.public_id,
            }
            
        }

        const newCurso = new Curso({
            nombreCurso,
            filtro,
            profesor,
            duracion,
            imagen
        });
        await newCurso.save();
        return res.json(newCurso);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}
export const updateCurso = async(req, res) => {

    try{
        const updateCurso = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(updateCurso)
        return  res.send("actualizando curso")
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const deleteCurso = async(req, res) => {
    try{
        const cursoRemoved = await Curso.findByIdAndDelete(req.params.id)
        if (!cursoRemoved) return res.sendStatus(404)

        if(cursoRemoved.imagen.public_id){
            await deleteImage(cursoRemoved.imagen.public_id)
        }  

        return res.sendStatus(204)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}
export const getCurso = async(req, res) => {
    try{
        const curso = await Curso.findById(req.params.id)
        if(!curso) return res.sendStatus(404)
        return res.json(curso)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }

}
export const AsignarRuta = async(req, res) => {
    const { id } = req.params;
    const { ruta } = req.body;
    try{
        const updateCursoRuta = await Curso.findByIdAndUpdate(id,{$push: { ruta }},{new: true})
        return res.json(updateCursoRuta)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
} 
export const AsignarModulo = async(req, res) =>{
    const { id } = req.params;
    const { modulos } = req.body;
    try{ 
        const updateCursoModulo = await Curso.findByIdAndUpdate(id,{$push: { modulos }},{new: true})
        return res.json(updateCursoModulo)  
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}
export const QuitarModulo = async(req, res) =>{
    const { id } = req.params;
    const { modulos } = req.body;
    try{
        const curso = await Curso.findById(id)
        if(!curso) return res.sendStatus(404)

        if(!curso.modulos.includes(modulos)){
            return res.sendStatus(404)

        }
        curso.modulos = curso.modulos.filter(moduloId => moduloId.toString() !== modulos.toString())

        const cursoActualizado = await curso.save()
        const cursoActualizadoAmpliada = await Curso.findById(cursoActualizado._id).populate("modulos")
        
        return res.json(cursoActualizadoAmpliada)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}