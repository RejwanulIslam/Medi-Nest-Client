import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/service/user.service";
import { userRole } from "@/constrans/userRole";

// Example of default export
export default async function proxy(request: NextRequest) {
console.log("pathname")
  const pathname = request.nextUrl.pathname;
console.log("pathname",pathname)

    const { data: seation } = await userService.getSeation()
    console.log("jdsjfejfejfhejhf",seation)

    let isAuthenticated = false
    let isAdmin = false
    let isSeler = false
    let isUser = false

    if (seation && seation.user) {
        isAuthenticated = true
        isAdmin = seation.user.role === userRole.admin
        isSeler = seation.user.role === userRole.seler
        isUser = seation.user.role === userRole.user
    }
    console.log(seation)
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAdmin && pathname.startsWith("/user-dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }

    if (isAdmin && pathname.startsWith("/seler-dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }



    if (!isAdmin && !isSeler && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/user-dashboard", request.url))
    }
    if (!isAdmin && !isSeler && pathname.startsWith("/seler-dashboard")) {
        return NextResponse.redirect(new URL("/user-dashboard", request.url))
    }

    
    if (!isAdmin && !isUser && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/seler-dashboard", request.url))
    }
    if (!isAdmin && !isUser && pathname.startsWith("/user-dashboard")) {
        return NextResponse.redirect(new URL("/seler-dashboard", request.url))
    }
   



     return NextResponse.next();
}

export const config = {
    matcher: [
        "/user-dashboard",
        "/user-dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*",
        "/seler-dashboard",
        "/seler-dashboard/:path*",
    
       
    ]
}




