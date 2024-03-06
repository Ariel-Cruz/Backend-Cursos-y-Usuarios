import { uploadCertficadosRuta } from "../../libs/cloudinary.js";
import fs from "fs-extra";
import Ruta from "../../models/models-cursos/Ruta.js";
import { deleteCertificado } from "../../libs/cloudinary.js";

export const getRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find().populate("curso");
        res.json(rutas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createRuta = async (req, res) => {
    try {
        const { nombreRuta,descripcion, curso } = req.body;
        let certificado;
        if (req.files?.certificado) {
            const result = await uploadCertficadosRuta(req.files.certificado.tempFilePath);
            await fs.remove(req.files.certificado.tempFilePath);
            console.log(result);
            certificado = {
                url: result.secure_url,
                public_id: result.public_id,
            }
        }

        const newRuta = new Ruta({
            nombreRuta,
            descripcion,
            curso, 
            certificado
        });
        await newRuta.save();
        return res.json(newRuta);

    }catch(error){
        return res.status(500).json({ message: error.message });

    }
}
export const updateRuta = async(req, res) =>{

    try{
        const updateRuta = await Ruta.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(updateRuta)
        return  res.send("actualizando ruta")
    }catch(error){
        console.log(error.message)
    }
}
export const deleteRuta = async(req, res)=>{
    try{
        const deleteRuta = await Ruta.findByIdAndDelete(req.params.id)
        if(!deleteRuta) return res.sendStatus(404)

        
        if(deleteRuta.certificado.public_id){
            await deleteCertificado(deleteRuta.certificado.public_id)
        }
        return res.sendStatus(204)
    }catch(error){
        console.log(error.message)
    }
}
export const getRuta = async(req, res)=>{
    try{
        const ruta = await Ruta.findById(req.params.id).populate("curso")
        if(!ruta) return res.sendStatus(404)
        return res.json(ruta)
    }catch(error){
        console.log(error.message)
    }
}
export const AsignarCurso = async(req, res) =>{
    const { id } = req.params;
    const { curso } = req.body;
    try{ 
        const updateRutaCurso = await Ruta.findByIdAndUpdate(id,{$push: { curso }},{new: true}).populate("curso")
        return res.json(updateRutaCurso)  
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}


export const QuitarCurso = async (req, res) => {
    const { id } = req.params;
    const { curso } = req.body; 

    try {
        // Encuentra la ruta por su ID
        const ruta = await Ruta.findById(id);

        // Verifica si la ruta existe
        if (!ruta) {
            return res.status(404).json({ message: "La ruta no fue encontrada." });
        }

        // Verifica si el curso está asociado a esta ruta
        if (!ruta.curso.includes(curso)) {
            return res.status(404).json({ message: "El curso no está asociado a esta ruta." });
        }

        // Quita el curso del arreglo de cursos de la ruta
        ruta.curso = ruta.curso.filter(cursoId => cursoId.toString() !== curso.toString());

        // Guarda la ruta actualizada en la base de datos
        const rutaActualizada = await ruta.save();
        const rutaActualizadaAmpliada = await Ruta.findById(rutaActualizada._id).populate("curso");
        //const rutaActualizada = await Ruta.findById(rutaActualizada._id).populate("curso");
        return res.json(rutaActualizadaAmpliada);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Ocurrió un error al intentar quitar el curso de la ruta." });
    }
};

// Agrega un certificado
export const agregarCertificado = async(req, res) =>{
    try {
        const { id } = req.params;
        let certificado;

        // Verifica si se ha proporcionado un archivo de certificado en la solicitud
        if(req.files?.certificado){
            // Sube el certificado a Cloudinary
            const result = await uploadCertficadosRuta(req.files.certificado.tempFilePath);
            
            // Elimina el archivo temporal del servidor
            await fs.remove(req.files.certificado.tempFilePath);

            // Crea un objeto de certificado con la URL y el ID público proporcionados por Cloudinary
            certificado = { url: result.secure_url, public_id: result.public_id };
            
            // Encuentra la ruta por su ID
            const ruta = await Ruta.findById(id);

            // Verifica si la ruta existe
            if (!ruta) {
                return res.status(404).json({ message: "La ruta no fue encontrada." });
            }

            // Agrega el certificado a la ruta
            ruta.certificado = certificado;

            // Guarda la ruta actualizada en la base de datos
            const rutaActualizada = await ruta.save();
            
            // Devuelve la ruta actualizada con el certificado
            return res.json(rutaActualizada);
        } else {
            return res.status(400).json({ message: "No se proporcionó ningún archivo de certificado." });
        }
    } catch(error) {
        console.error(error.message);
        return res.status(500).json({ message: "Ocurrió un error al intentar agregar el certificado a la ruta." });
    }
};
