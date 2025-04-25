export interface BannerHorizontal{

    id?:number;
    altImagen:string;
    imagen:ImagenBanner;
    titular:string;
    claim:string;
    link:string;
    textoLink:string;
    activo:number;
    home:number;
    consultaHipotecas:number;
    detailInmueble:number;

}

export interface ImagenBanner{

    id?:number;
    nombre:string;
    activo?:number;

}


export interface BannerCarousel{

    id?:number;
    altImagen:string;
    imagen:ImagenCarousel;
    titular:string;
    claim:string;
    tematica:Tematica;
    activo:number;

}

export interface Tematica{

    id?:number;
    tematica:string;
    activo?:number;

}



export interface ImagenCarousel{

    id?:number;
    nombre:string;
    activo?:number;

}


export interface Inmueble{

    id?:number;
    activo:number;
    amueblado:number;
    apertura:string;
    archivos:Array<Archivo>;
    ascensor:number;
    cp:string;
    descripcion:string;
    inmobiliaria:Inmobiliaria;
    imagenes:Array<Imagen>;
    jardin:number;
    nombreVia:string;
    numero:string;
    numeroBalcones:string;
    numeroBanhos:string;
    numeroHabitaciones:string;
    operacion:string;
    oportunidad:number;
    orientacion:string;
    piscina:number;
    planta:number;
    plazasGaraje:string;
    portada:number;
    precio:number;
    puerta:string;
    superficieConstruida:number;
    superficieUtil:number;
    tendedero:number;
    tipoCalefaccion:string;
    claim:string;
    trastero:number;
    via:string;
    poblacion:Poblacion;
    tipo:Tipo;

}

export interface Inmobiliaria{

    id?:number;
    nombre:string;
    activo?:number;
    telefono:string;
    imagen:ImagenLogo;


}

export interface ImagenLogo{

    id?:number;
    nombre:string;
    activo?:number;

}

export interface Tipo{

    id?:number;
    nombre:string;
    activo?:number;
}

export interface Poblacion{

    id?:number;
    nombre:string;
    provincia:Provincia;
    activo?:number;
}

export interface Provincia{

    id?:number;
    nombre:string;
    activo?:number;
}


export interface Imagen{

    id?:number;
    nombre?:string;
    activo?:number;
}


export interface Archivo{

    id?:number;
    nombre?:string;
    descripcion?:string;
    activo?:number;
}


export interface Usuario{

  id?:number;
  user:string;
  password:string;
  email:string;
  rol?:string;
  activo?:number;
}

export interface Credentials{

  username:string; //realmente es el email
  password:string;
}


