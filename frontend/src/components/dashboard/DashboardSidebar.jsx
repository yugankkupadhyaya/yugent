import { Link, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/react';

import {
  Coins,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Map,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Logo } from '@/components/brand/logo';

const navigation = [
  {
    label: 'Overview',
    to: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Resume Builder',
    to: '/resume',
    icon: FileText,
  },
  {
    label: 'Interview Practice',
    to: '/interview',
    icon: MessageSquareText,
  },
  {
    label: 'Roadmap',
    to: '/roadmap',
    icon: Map,
  },
  {
    label: 'Billing',
    to: '/billing',
    icon: CreditCard,
  },
];

export function DashboardSidebar({ user }) {
  const location = useLocation();
  const { signOut } = useClerk();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60 bg-background">
      {/* Brand */}
      <SidebarHeader className="px-3 py-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <Link to="/" aria-label="Yugent home">
                  <Logo className="h-8 w-auto" />
                </Link>
              }
              tooltip="Yugent"
              className="h-10 px-2"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-2 py-3">
        {/* Create interview */}
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link to="/interview">
                      <Plus className="size-4" />
                      <span>Create interview</span>
                    </Link>
                  }
                  tooltip="Create interview"
                  size="lg"
                  className="bg-primary text-primary-foreground shadow-[0_6px_18px_hsl(var(--primary)/0.16)] transition-all hover:bg-primary/90 hover:text-primary-foreground"
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Workspace */}
        <SidebarGroup className="mt-4 px-0">
          <SidebarGroupLabel className="px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;

                const active =
                  item.to === '/dashboard'
                    ? location.pathname === '/dashboard'
                    : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);

                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      render={
                        <Link to={item.to}>
                          <Icon className="size-4" />
                          <span>{item.label}</span>
                        </Link>
                      }
                      isActive={active}
                      tooltip={item.label}
                      className="h-9 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-foreground data-[active=true]:shadow-none"
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        {/* Interview coins */}
        <div className="border border-border/60 bg-card/50 px-3 py-3">
          <div className="flex items-center gap-2">
            <Coins className="size-4 text-primary" />

            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Interview coins
            </span>
          </div>

          <p className="mt-2 text-xl font-semibold tracking-tight">{user?.interviewCoin ?? 0}</p>
        </div>

        <SidebarSeparator className="my-3" />

        {/* User profile */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip={user?.name || 'Account'}
                    className="h-12 hover:bg-muted/50"
                  />
                }
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted text-xs font-semibold text-foreground">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user?.name || 'User'}
                  </p>

                  <p className="truncate text-[11px] text-muted-foreground">{user?.email || ''}</p>
                </div>

                <MoreHorizontal className="size-4 shrink-0 text-muted-foreground" />
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" align="end" sideOffset={8} className="w-56">
                <div className="px-2 py-2">
                  <p className="truncate text-sm font-medium">{user?.name || 'User'}</p>

                  <p className="truncate text-xs text-muted-foreground">{user?.email || ''}</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem render={<Link to="/settings" />}>
                  <Settings className="size-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
