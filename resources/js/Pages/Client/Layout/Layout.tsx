import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/Components/ui/breadcrumb"
import { Separator } from "@/Components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/Components/ui/sidebar"
import { ClientSidebar } from "./ClientSideBar";

export const ClientLayout = ({ children, path = [] }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <ClientSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {path[0]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {
                path[1]
                &&
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{path[1]}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              }
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};