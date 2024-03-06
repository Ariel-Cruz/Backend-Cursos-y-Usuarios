import { Router } from "express";
import { AsignarCursoAlUsuario, createUsuarios, deleteUsuarios, getUsuarios, getUsuario, updateUsuarios, iniciarSesion } 
from "../../controllers/controllers-usuarios/usuario.controllers.js";


const router = Router();

router.get("/usuarios", getUsuarios);

router.post("/usuarios", createUsuarios)

router.put("/usuarios/:id", updateUsuarios)

router.delete("/usuarios/:id", deleteUsuarios)

router.get("/usuarios/:id", getUsuario)

//asignar curso a un usuario
router.put("/asignar-curso-usuario/:id", AsignarCursoAlUsuario)

//inicio de sesion
router.post("/login", iniciarSesion);


export default router;