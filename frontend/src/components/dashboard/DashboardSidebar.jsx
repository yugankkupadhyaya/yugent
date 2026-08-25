import { Link, useLocation } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/react';

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
  UserRound,
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

function isCurrentPath(pathname, itemPath) {
  if (itemPath === '/dashboard') {
    return pathname === itemPath;
  }

  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export function DashboardSidebar({ user }) {
  const location = useLocation();
  const { signOut } = useClerk();
  const { user: clerkUser } = useUser();

  /*
   * Clerk owns the user's identity.
   * Yugent user owns application-specific data such as interview coins.
   */
  const name = clerkUser?.fullName || clerkUser?.firstName || 'User';

  const email = clerkUser?.primaryEmailAddress?.emailAddress || '';

  const avatarLetter = name.charAt(0).toUpperCase() || 'U';

  const coins = user?.interviewCoin ?? 0;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      {/* =========================================================
          BRAND
      ========================================================= */}

      <SidebarHeader className="px-5 py-5 group-data-[collapsible=icon]:px-2">
        <Link
          to="/"
          aria-label="Yugent home"
          className="
      flex
      h-10
      w-fit
      items-center
      overflow-hidden
      rounded-md
      outline-none
      focus-visible:ring-2
      focus-visible:ring-ring/60
      group-data-[collapsible=icon]:mx-auto
    "
        >
          <Logo className="h-9 w-[128px] shrink-0" />
        </Link>
      </SidebarHeader>
      <SidebarSeparator className="bg-sidebar-border/80 group-data-[collapsible=icon]:mx-2" />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <SidebarContent className="px-3 py-5 group-data-[collapsible=icon]:px-2">
        {/* ---------------------------------------------------------
            CREATE INTERVIEW
        --------------------------------------------------------- */}

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link to="/interview">
                      <Plus className="size-4 shrink-0" />
                      <span>Create interview</span>
                    </Link>
                  }
                  tooltip="Create interview"
                  size="lg"
                  className="
                    h-11
                    rounded-lg
                    bg-primary
                    px-3
                    font-medium
                    text-primary-foreground
                    shadow-none
                    transition-colors
                    hover:bg-primary/90
                    hover:text-primary-foreground
                    focus-visible:ring-primary/60
                    group-data-[collapsible=icon]:size-10!
                  "
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ---------------------------------------------------------
            WORKSPACE
        --------------------------------------------------------- */}

        <SidebarGroup className="mt-7 p-0">
          <SidebarGroupLabel
            className="
              mb-2
              h-auto
              px-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-muted-foreground/75
              group-data-[collapsible=icon]:px-0
            "
          >
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                const active = isCurrentPath(location.pathname, item.to);

                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      render={
                        <Link to={item.to}>
                          <Icon className="size-4 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      }
                      isActive={active}
                      tooltip={item.label}
                      className="
                        h-9
                        rounded-lg
                        px-3
                        text-sm
                        font-medium
                        text-muted-foreground
                        transition-colors
                        hover:bg-sidebar-accent
                        hover:text-sidebar-foreground
                        data-[active=true]:bg-primary/10
                        data-[active=true]:font-medium
                        data-[active=true]:text-sidebar-foreground
                        data-[active=true]:shadow-none
                        data-[active=true]:[&_svg]:text-primary
                        group-data-[collapsible=icon]:size-9!
                        group-data-[collapsible=icon]:p-2!
                      "
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <SidebarFooter className="px-3 pb-4 group-data-[collapsible=icon]:px-2">
        {/* ---------------------------------------------------------
            INTERVIEW COINS
        --------------------------------------------------------- */}

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <Link
              to="/billing"
              aria-label={`${coins} interview coins. Manage billing.`}
              className="
                group
                flex
                items-center
                justify-between
                gap-3
                rounded-lg
                border
                border-sidebar-border
                bg-sidebar
                px-3
                py-3
                outline-none
                transition-colors
                hover:border-primary/30
                hover:bg-sidebar-accent
                focus-visible:ring-2
                focus-visible:ring-ring/60
                group-data-[collapsible=icon]:justify-center
                group-data-[collapsible=icon]:p-2
              "
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className="
                    flex
                    size-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-primary/20
                    bg-primary/10
                    text-primary
                  "
                >
                  <Coins className="size-3.5" />
                </span>

                <span className="min-w-0 group-data-[collapsible=icon]:hidden">
                  <span
                    className="
                      block
                      truncate
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-muted-foreground
                    "
                  >
                    Interview coins
                  </span>

                  <span
                    className="
                      mt-0.5
                      block
                      text-base
                      font-semibold
                      tracking-[-0.03em]
                      tabular-nums
                      text-foreground
                    "
                  >
                    {coins}
                  </span>
                </span>
              </div>

              <span
                className="
                  text-base
                  font-medium
                  leading-none
                  text-muted-foreground
                  transition-colors
                  group-hover:text-primary
                  group-data-[collapsible=icon]:hidden
                "
              >
                +
              </span>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-sidebar-border/80" />

        {/* ---------------------------------------------------------
            USER PROFILE
        --------------------------------------------------------- */}

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip={name}
                    className="
                      h-12
                      rounded-lg
                      px-2.5
                      hover:bg-sidebar-accent
                      group-data-[collapsible=icon]:size-10!
                      group-data-[collapsible=icon]:p-1!
                    "
                  />
                }
              >
                {/* Avatar */}

                <span
                  className="
                    flex
                    size-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-border
                    bg-muted
                    text-xs
                    font-semibold
                    text-foreground
                  "
                >
                  {avatarLetter}
                </span>

                {/* User information */}

                <span className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-sm font-medium text-foreground">{name}</span>

                  <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                    {email}
                  </span>
                </span>

                <MoreHorizontal className="size-4 shrink-0 text-muted-foreground" />
              </DropdownMenuTrigger>

              {/* -----------------------------------------------------
                  PROFILE DROPDOWN
              ----------------------------------------------------- */}

              <DropdownMenuContent
                side="top"
                align="start"
                sideOffset={8}
                className="
                  w-60
                  rounded-lg
                  border
                  border-border
                  bg-popover
                  p-1.5
                  shadow-[var(--shadow-md)]
                "
              >
                {/* Profile header */}

                <div className="px-2 py-2">
                  <p className="truncate text-sm font-medium text-foreground">{name}</p>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{email}</p>
                </div>

                <DropdownMenuSeparator />

                {/* Profile */}

                <DropdownMenuItem
                  render={
                    <Link to="/profile">
                      <UserRound className="size-4" />
                      <span>Profile information</span>
                    </Link>
                  }
                  className="min-h-9 px-2 text-sm"
                />

                {/* Settings */}

                <DropdownMenuItem
                  render={
                    <Link to="/settings">
                      <Settings className="size-4" />
                      <span>Settings</span>
                    </Link>
                  }
                  className="min-h-9 px-2 text-sm"
                />

                <DropdownMenuSeparator />

                {/* Logout */}

                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="
                    min-h-9
                    px-2
                    text-sm
                    text-destructive
                    focus:bg-destructive/10
                    focus:text-destructive
                  "
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
