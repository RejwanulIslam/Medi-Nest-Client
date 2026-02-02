import { getSeation } from "@/action/medicine.action"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { userService } from "@/service/user.service"
import React, { Children, use } from "react"


export const dynamic = 'force-dynamic';
export default async function DashboardLayout({ user, seler, admin }: { user: React.ReactNode, seler: React.ReactNode, admin: React.ReactNode }) {
    const res = await getSeation()
    console.log(res)
    const userInfo = res.user

    let mainContent: React.ReactNode = null;
    let pageTitle: string = "";

    switch (userInfo.role) {
        case "USER":
            mainContent = user;
            pageTitle = "User Dashboard";
            break;
        case "SELER":
            mainContent = seler;
            pageTitle = "Seler Dashboard";
            break;
        case "ADMIN":
            mainContent = admin;
            pageTitle = "Admin Dashboard";
            break;
        default:
            mainContent = user;
            pageTitle = "Dashboard";
    }


    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>

                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div>

                        {mainContent}

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>


    )
}
