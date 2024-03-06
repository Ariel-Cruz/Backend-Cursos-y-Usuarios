import { Router } from "express";
import { createAdmin, deleteAdmin, getAdmin, getAdmins, iniciarSesionAdmin, updateAdmin } from "../../controllers/controllers-usuarios/admin.controllers.js";

const router = Router();

router.get("/administrador", getAdmins);

router.post("/administrador", createAdmin)

router.put("/administrador/:id", updateAdmin)

router.delete("/administrador/:id", deleteAdmin)

router.get("/administrador/:id", getAdmin)

//inicio de sesion
router.post("/login-admin", iniciarSesionAdmin);


export default router;