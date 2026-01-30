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



export default async function DashboardLayout({ user, seler, admin }: { user: React.ReactNode, seler: React.ReactNode, admin: React.ReactNode }) {
    const { data } = await userService.getSeation()
    console.log(data)
    return (
        <SidebarProvider>
            <AppSidebar />
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
                                {/* <BreadcrumbPage>Data Fetching</BreadcrumbPage> */}
                                {data.user.role == "USER" && user}
                                {data.user.role == "SELER" && seler}
                                {data.user.role == "ADMIN" && admin}

                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div>


                        {data.user.role == "USER" && user}
                        {data.user.role == "SELER" && seler}
                        {data.user.role == "ADMIN" && admin}

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>


    )
}
