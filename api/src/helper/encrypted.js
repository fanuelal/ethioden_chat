import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })


export const passwordEncryptor = (_passwrod) =>{
    const salt = bcryptjs.genSaltSync(8)
    console.log(_passwrod)
    const encryptedPassword = bcryptjs.hashSync(_passwrod, salt);

    return encryptedPassword;
}


export const passwordchecker = (authPassword, registedPassword) => {
    const isPassword = bcryptjs.compareSync(authPassword, registedPassword);
    return isPassword
}
