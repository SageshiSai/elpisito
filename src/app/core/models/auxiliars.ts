import { JwtPayload } from "jwt-decode";
export interface ModalData{

    titulo:string;
    status:string;
    mensaje:string;
    origen:string;

}

export interface Credentials{

  email:string;
  password:string;
}

/*Esta interface está en la API de jwt-decode 4.0.0
interface JwtPayload{

  iss:string; //Quien emitió el token
  sub:string; //Suject:a quién pertenece el token (ID usuario normalmente)
  aud:string o string[];
  exp: number;//  Fecha de expiración  en UNIX
  iat: number; //Fecha de expedición del token


}*/



export interface CustomJwtPayLoad extends JwtPayload{

  usuario:string;
  ROLES:string;
  id:number;

}
