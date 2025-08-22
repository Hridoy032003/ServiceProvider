import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  const isServiceProviderRoute = pathname.startsWith('/serviceProvider');
  const isCustomerRoute = pathname.startsWith('/customer');
  const protectedRoutes = isServiceProviderRoute || isCustomerRoute;

  



  if (token?.role) {
    if(!token && protectedRoutes){
      return NextResponse.redirect('/');
    }
   
    if (token.role === 'customer' && isServiceProviderRoute) {
      const url = request.nextUrl.clone();
      url.pathname = `/customer/dashboard/${token.id}`; 
      return NextResponse.redirect(url);
    }

  
    if (token.role === 'provider' && isCustomerRoute) {
      const url = request.nextUrl.clone();
      url.pathname = `/surviceProvider/dashboard/${token.id}`; 
      return NextResponse.redirect(url);
    }
  }
  else{
const url = request.nextUrl.clone();
url.pathname = `/Role/${token?.id}`; 
      return NextResponse.redirect(url);
    
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/serviceProvider/:path*', '/customer/:path*'],
};