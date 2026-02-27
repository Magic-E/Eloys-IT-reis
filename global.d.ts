// Voor images
declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

// Voor path aliases
declare module "@/*" {
  const value: any;
  export default value;
}

declare module "@shared/*" {
  const value: any;
  export default value;
}
