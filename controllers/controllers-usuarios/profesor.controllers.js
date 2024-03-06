import Profesor from "../../models/models-usuarios/Profesor.js";
import { deleteImage } from "../../libs/cloudinary.js";
import fs from "fs-extra"
import {uploadImagenUsuarios} from "../../libs/cloudinary.js"

export const getProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.find();
        res.json(profesores);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const createProfesor = async(req, res) => {
    try{
        const { nombre, apellido, contrasena, correo } = req.body;
        let imagen;

        if(req.files?.imagen){
            const result = await uploadImagenUsuarios(req.files.imagen.tempFilePath)

            await fs.remove(req.files.imagen.tempFilePath)   //cloudinary

            console.log(result)
            imagen = {
                url: result.secure_url,
                public_id: result.public_id,
            }
            
        }

        const newProfesor = new Profesor({
            nombre,
            apellido,
            contrasena,
            correo,
            imagen
        });
        await newProfesor.save();
        return res.json(newProfesor);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}
export const updateProfesor = async(req, res) => {

    try{
        const updateProfesor = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(updateProfesor)
        return  res.send("actualizando datos")
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const deleteProfesor = async(req, res) => {
    try{
        const profesorRemoved = await Profesor.findByIdAndDelete(req.params.id)
        if (!profesorRemoved) return res.sendStatus(404)

        if(profesorRemoved.imagen.public_id){              //ver con cloudinary
            await deleteImage(profesorRemoved.imagen.public_id)
        }        await deleteImage(profesorRemoved.imagen.public_id)

        return res.sendStatus(204)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}
export const getProfesor = async(req, res) => {
    try{
        const profesor = await Profesor.findById(req.params.id)
        if(!profesor) return res.sendStatus(404)
        return res.json(profesor)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }

}
