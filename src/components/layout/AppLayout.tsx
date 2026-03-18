import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Users, Clock, CalendarDays, HandMetal, Settings, LogOut, Shield, ChevronRight,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'employee'] },
  { label: 'Employees', path: '/employees', icon: Users, roles: ['admin', 'manager'] },
  { label: 'Time Logs', path: '/time-logs', icon: Clock, roles: ['admin', 'manager', 'employee'] },
  { label: 'Leaves', path: '/leaves', icon: CalendarDays, roles: ['admin', 'manager', 'employee'] },
  { label: 'Permissions', path: '/permissions', icon: HandMetal, roles: ['admin', 'manager', 'employee'] },
  { label: 'Policies', path: '/policies', icon: Settings, roles: ['admin'] },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredNav = NAV_ITEMS.filter(item => user && item.roles.includes(user.role));

  const roleBadge: Record<UserRole, string> = {
    'hr': 'HR Admin',
    'admin': 'HR Admin',
    'manager': 'Manager',
    'employee': 'Employee',
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 h-full w-64 bg-sidebar flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sidebar-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-sidebar-primary" />
            </div>
            <div>
              <h2 className="text-sm font-heading font-bold text-sidebar-primary-foreground">HR Portal</h2>
              <p className="text-xs text-sidebar-foreground/60">Management System</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {filteredNav.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                <ChevronRight className="w-3 h-3 ml-auto opacity-40" />
              </NavLink>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-sidebar-primary/20 flex items-center justify-center text-sm font-bold text-sidebar-primary">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/50">{user ? roleBadge[user.role] : ''}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="lg:hidden flex items-center p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <span className="ml-3 font-semibold">HR Portal</span>
        </div>
        <div className="p-6 lg:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
