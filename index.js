import app from "./app.js";
import { PORT } from "./config.js";
import db from "./database/db.js";


app.listen(PORT, () => {
    console.log(`Aplicacion corriendo en --->>>> http://localhost:${PORT}`);
});
db();