export interface ErrorResponseI  //extends JwtResponseI{
    {
    error:{
        message:string
    },
    message:string,
    ok:boolean,
    status:number,
    statusText:string

}
