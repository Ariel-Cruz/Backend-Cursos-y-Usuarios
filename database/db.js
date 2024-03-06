import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";

const dbCursos = async () => {
    try {
        const db = await mongoose.connect(MONGODB_URI);
        console.log("MongoDB conectado correctamente a ", db.connection.name);
    } catch (error) {
        console.log(error);
    }
};
export default dbCursos;