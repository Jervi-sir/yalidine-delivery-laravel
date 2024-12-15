import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Separator } from "@/Components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { TooltipProvider } from "@/Components/ui/tooltip";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Get Wilaya",
      url: route('apiDocs.getWilayas'),
      routeName: 'apiDocs.getWilayas', // Add route name for active checking
    },
    {
      title: "Get Communes",
      url: route('apiDocs.getCommunes'),
      routeName: 'apiDocs.getCommunes',
    },
    {
      title: "Get Centers",
      url: route('apiDocs.getCenters'),
      routeName: 'apiDocs.getCenters',
    },
  ],
};

export const LayoutPage = ({ children }) => {
  const currentRoute = route().current(); // Get current route name

  return (
    <SidebarProvider>
      <TooltipProvider>
        <Sidebar variant="floating">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="#">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">Documentation</span>
                      <span className="">v0.0.1</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu className="gap-2">
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`font-medium ${
                          currentRoute === item.routeName
                            ? "bg-zinc-800 rounded-md text-gray-200"
                            : ""
                        }`}
                      >
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              {children}
            </div>
          </div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
};
