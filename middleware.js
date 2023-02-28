import { NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

export default function middleware(req) {
    const token  = req.cookies.get('token');

    if(req.nextUrl.pathname.startsWith("/login")) {
      if(token) {
        return NextResponse.redirect(new URL('/social', req.url))
      }else{
        return NextResponse.next();
      }
    }
    if(req.nextUrl.pathname.startsWith("/social") || req.nextUrl.pathname.startsWith("/school")) {
        if(token  === undefined) {
            // console.log(true, 'token is not valid')
            return NextResponse.redirect(new URL('/login', req.url))
        }else{
          try {
            const auth = jwt_decode(JSON.stringify(token));
            const exp = auth.exp;
            // console.log(true, token, 'token is valid')
            if(Date.now() <= exp * 1000){
              // console.log(true, 'token is not expired')
              return NextResponse.next();
            } else { 
              // console.log(false, 'token is expired')
              return NextResponse.redirect(new URL('/login', req.url))
            }
          } catch(error) {
            // console.log(false, 'decode is notvalid')
            return NextResponse.redirect(new URL('/login', req.url))
          }
        }
    }
}