import Admin from "../../models/models-usuarios/Admin.js";
import { deleteImage} from "../../libs/cloudinary.js";
import fs from "fs-extra"
import {uploadImagenUsuarios} from "../../libs/cloudinary.js"

export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const createAdmin = async(req, res) => {
    try{
        const { nombre, apellido,cargo, contrasena, correo, } = req.body;
        let imagen;

        if(req.files?.imagen){
            const result = await uploadImagenUsuarios(req.files.imagen.tempFilePath)

            await fs.remove(req.files.imagen.tempFilePath)    //ver con cloudinary

            console.log(result)
            imagen = {
                url: result.secure_url,
                public_id: result.public_id,
            }
            
        }

        const newAdmin = new Admin({
            nombre,
            apellido,
            cargo,
            contrasena,
            correo,
            imagen
        });
        await newAdmin.save();
        return res.json(newAdmin);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}
export const updateAdmin = async(req, res) => {

    try{
        const updateAdmin = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(updateAdmin)
        return  res.send("actualizando datos")
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const deleteAdmin = async(req, res) => {
    try{
        const adminRemoved = await Admin.findByIdAndDelete(req.params.id)
        if (!adminRemoved) return res.sendStatus(404)

        if(adminRemoved.imagen.public_id){
            await deleteImage(adminRemoved.imagen.public_id)     //veeeeeer con cloudinary
        }        await deleteImage(adminRemoved.imagen.public_id)

        return res.sendStatus(204)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}
export const getAdmin = async(req, res) => {
    try{
        const admin = await Admin.findById(req.params.id)
        if(!admin) return res.sendStatus(404)
        return res.json(admin)
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }

}
//Iniciar Sesion
export const iniciarSesionAdmin = async (req, res) => {
    
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }
    try {   
        const admin = await Admin.findOne({ correo: correo });
        if (!admin) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        const validarContrasena = bcrypt.compareSync(contrasena, admin.contrasena); 
        if (!validarContrasena) {
            return res.status(401).json({ mensaje: "Contrasena incorrecta" });
        }
        const token = await generarJWT( admin._id );
        res.status(200).json({ 
            mensaje: "Sesion iniciada",
            data:{
                id: admin._id,
                nombre: admin.nombre,
                apellido: admin.apellido,
                cargo: admin.cargo,
                correo: admin.correo,
                imagen: admin.imagen,

            },
            token: token
         });

       
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al iniciar sesión" });
    }
};
