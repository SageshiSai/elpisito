export interface BannerHorizontal {
  altImagen?: string;
  imagen?: ImagenBanner;
  titular?: string;
  claim?: string;
  link?: string;
  textoLink?: string;
  activo?: number;
  home?: number;
  id?: number;
}

export interface ImagenBanner{
  id?: number;
  name: string;
  activo?: number;
}