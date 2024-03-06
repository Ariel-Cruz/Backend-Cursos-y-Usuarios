import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dwpbbvaj0', 
  api_key: '195156485543552', 
  api_secret: 'gZkNhT4SUdfpAE4iAzn1XVmoLSQ' 
});
export const uploadImageCursos = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'cursos'
    });
}
export const deleteImage = async id => {
    cloudinary.uploader.destroy(id)
}

//Certificado
export const uploadCertficadosRuta = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'certificados'
    });
}
export const deleteCertificado = async id => {
    cloudinary.uploader.destroy(id)
}
//Metodo de carga imagenes
export const uploadImagenUsuarios = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'usuarios'
    });
}