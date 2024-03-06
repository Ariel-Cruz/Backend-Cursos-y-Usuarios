import express from "express"
import fileUpload from "express-fileupload"
import cursosRoutes from "./routes/routes-cursos/cursos.routes.js"
import rutasRoutes from "./routes/routes-cursos/rutas.routes.js"
import modulosRoutes from "./routes/routes-cursos/modulos.routes.js"
import adminRoutes from "./routes/routes-usuarios/admin.routes.js"
import usersRoutes from "./routes/routes-usuarios/usuarios.routes.js"
import profesorRoutes from "./routes/routes-usuarios/profesor.routes.js"

import cors from "cors"


const app = express()
//middleware
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload"
}))

//routes
//cursos
app.use(cursosRoutes)
app.use(rutasRoutes)
app.use(modulosRoutes)
//usuarios
app.use(adminRoutes)
app.use(usersRoutes)
app.use(profesorRoutes)
app.use(cors());
export default app