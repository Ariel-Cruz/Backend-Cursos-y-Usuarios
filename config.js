import dotenv from "dotenv"

dotenv.config()
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/api-pi"

export const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const PORT = process.env.PORT || 4000