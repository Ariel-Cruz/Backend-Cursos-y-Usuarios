import { Router } from "express";
import { createModulo, deleteModulo, getModulo, getModulos, updateModulo } from "../../controllers/controllers-cursos/modulos.controllers.js";


const router = Router();
//Modulos
router.get("/modulos", getModulos);

router.post("/modulos", createModulo)

router.put("/modulos/:id", updateModulo)

router.delete("/modulos/:id", deleteModulo)

router.get("/modulos/:id", getModulo)


export default router;