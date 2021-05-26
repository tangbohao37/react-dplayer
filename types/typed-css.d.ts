// typed-css.d.ts
// less模块声明
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
