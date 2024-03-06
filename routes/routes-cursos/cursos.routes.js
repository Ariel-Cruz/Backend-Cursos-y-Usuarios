import { Router } from "express";
import { AsignarModulo, AsignarRuta, createCurso, deleteCurso, getCurso, getCursos, updateCurso }
 from "../../controllers/controllers-cursos/cursos.controllers.js";

const router = Router();
//cursos
router.get("/cursos", getCursos);

router.post("/cursos", createCurso)

router.put("/cursos/:id", updateCurso)

router.delete("/cursos/:id", deleteCurso)

router.get("/cursos/:id", getCurso)

//asignar ruta a curso
router.put("/asignar-ruta/:id", AsignarRuta )

//asignar modulos a curso
router.put("/asignar-modulo/:id", AsignarModulo )


export default router;