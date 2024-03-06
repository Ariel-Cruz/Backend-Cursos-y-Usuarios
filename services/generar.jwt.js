
import jwt from "jsonwebtoken";

export const generarJWT = (idUser = "") => {
    return new Promise((resolve, reject) => {
        const payload = { idUser };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        },
        (error, token) => {
            if (error) {
                console.log(error)
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        }
        )
    })
}