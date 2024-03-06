import { Router } from "express";
import { AsignarCurso, QuitarCurso, agregarCertificado, createRuta, deleteRuta, getRuta, getRutas, updateRuta } from "../../controllers/controllers-cursos/rutas.controllers.js";

const router = Router();
//rutas
router.get("/rutas", getRutas);

router.post("/rutas", createRuta)

router.put("/rutas/:id", updateRuta)

router.delete("/rutas/:id", deleteRuta)

router.get("/rutas/:id", getRuta)

//asignar curso a ruta
router.put("/asignar-curso/:id", AsignarCurso )

//eliminar curso de ruta
router.delete("/quitar-curso/:id", QuitarCurso )

//agregar certificado
router.put("/certificado/:id", agregarCertificado )

export default router;