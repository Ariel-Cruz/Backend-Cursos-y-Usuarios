import Modulo from "../../models/models-cursos/Modulo.js";

export const getModulos = async (req, res) => {
    try {
        const modulos = await Modulo.find().populate("curso");
        res.json(modulos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createModulo = async (req, res) => {
    try {
        const { nombreModulo, descripcion, curso } = req.body;

        const newModulo = new Modulo({
            nombreModulo,
            descripcion,
            curso
        });
        await newModulo.save();
        return res.json(newModulo);

    }catch(error){
        return res.status(500).json({ message: error.message });

    }
}
export const updateModulo = async(req, res) =>{

    try{
        const updateModulo = await Modulo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(updateModulo)
    }catch(error){
        console.log(error.message)
    }
}
export const deleteModulo = async(req, res)=>{
    try{
        const deleteModulo = await Modulo.findByIdAndDelete(req.params.id)
        if(!deleteModulo) return res.sendStatus(404)
        return res.sendStatus(204)

    }catch(error){
        console.log(error.message)
    }
}
export const getModulo = async(req, res)=>{
    try{
        const modulo = await Modulo.findById(req.params.id)
        if(!modulo) return res.sendStatus(404)
        return res.json(modulo)
    }catch(error){
        console.log(error.message)
    }
}

