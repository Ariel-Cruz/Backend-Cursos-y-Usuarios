
import Usuarios from "../../models/models-usuarios/Usuarios.js";
import { deleteImage } from "../../libs/cloudinary.js";
import fs from "fs-extra"
import {uploadImagenUsuarios} from "../../libs/cloudinary.js"
import bcrypt from "bcrypt";

import { generarJWT } from "../../services/generar.jwt.js";

export const getUsuarios = async (req, res) => {       //obtener todos los usuarios disponibles en la db
    try {
        const usuarios = await Usuarios.find().populate("cursoAsignado");
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUsuarios = async (req, res) => {
    try {
        const { nombre, apellido, contrasena, correo, direccion, fechaNacimiento } = req.body;
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

        const salt = bcrypt.genSaltSync();
        const contrasenaEncryptada = bcrypt.hashSync(contrasena, salt);

        const newUsuarios = new Usuarios({
            nombre: nombre,
            apellido: apellido,
            contrasena: contrasenaEncryptada,
            correo : correo,
            direccion : direccion,
            fechaNacimiento : fechaNacimiento,
            imagen : imagen,
        });
        await newUsuarios.save();
        return res.json(newUsuarios);

    }catch(error){
        return res.status(500).json({ message: error.message });

    }
}
export const updateUsuarios = async(req, res) =>{

    try{
        const updateUsuarios = await Usuarios.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(updateUsuarios)
        return  res.send("actualizando datos")
    }catch(error){
        console.log(error.message)
    }
}
export const deleteUsuarios = async(req, res)=>{
    try{
        const usuarioRemoved = await usuario.findByIdAndDelete(req.params.id)
        if (!usuarioRemoved) return res.sendStatus(404)

        if(usuarioRemoved.imagen.public_id){              //ver con cloudinary
            await deleteImage(usuarioRemoved.imagen.public_id)
        }        await deleteImage(usuarioRemoved.imagen.public_id)

        return res.sendStatus(204)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

    
export const getUsuario = async(req, res)=>{        //obtener un usuario específico por su ID
    try{
        const usuario = await Usuarios.findById(req.params.id).populate("cursoAsignado")
        if(!usuario) return res.sendStatus(404)
        return res.json(usuario)
    }catch(error){
        console.log(error.message)
    }
}

//asignar curso a un usuario
export const AsignarCursoAlUsuario = async (req, res) => {
    const { id } = req.params;
    const { cursoAsignado } = req.body;

    try {
        const updateCursoUsuario = await Usuarios.findByIdAndUpdate( id, {$push: {cursoAsignado }}, { new: true }).populate("cursoAsignado")
        return res.json(updateCursoUsuario)
    }catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }

}
//Iniciar Sesion
export const iniciarSesion = async (req, res) => {
    
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }
    try {   
        const usuario = await Usuarios.findOne({ correo: correo });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        const validarContrasena = bcrypt.compareSync(contrasena, usuario.contrasena); 
        if (!validarContrasena) {
            return res.status(401).json({ mensaje: "Contrasena incorrecta" });
        }
        const token = await generarJWT( usuario._id );
        res.status(200).json({ 
            mensaje: "Sesion iniciada",
            data:{
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,
                direccion: usuario.direccion,
                fechaNacimiento: usuario.fechaNacimiento,
                imagen: usuario.imagen,
                cursoAsignado: usuario.cursoAsignado

            },
            token: token
         });

       
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al iniciar sesión" });
    }
};
