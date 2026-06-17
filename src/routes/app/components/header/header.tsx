/* eslint-disable qwik/jsx-img */
import { component$, useSignal, useVisibleTask$, $, Slot } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { supabase } from '~/lib/supabaseClient';
import { LoginModal } from '~/components/login/LoginModal';
import './header.css';

const getInitials = (name?: string, email?: string) => {
  if (name && name.trim() !== '') {
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  if (email) {
    return email.substring(0, 2).toUpperCase();
  }
  return 'U';
};

export const AppHeader = component$(() => {

  const isUserMenuOpen = useSignal(false);
  const user = useSignal<any>(null);
  const loading = useSignal(true);
  const showLoginModal = useSignal(false);
  const nav = useNavigate();

  /* ---------------- ICONS ---------------- */

  const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="dashboard-icon">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 4v4" />
      <path d="M2 8h20" />
      <path d="M6 4v4" />
    </svg>
  );


  const BlogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="blog-icon">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );

  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="users-icon">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="help-icon">
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 4.24 4.24" />
      <path d="m14.83 9.17 4.24-4.24" />
      <path d="m14.83 14.83 4.24 4.24" />
      <path d="m9.17 14.83-4.24 4.24" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );

  const LogOutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    </svg>
  );

  /* ---------------- AUTH ---------------- */

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const { data } = await supabase.auth.getUser();
    user.value = data?.user ?? null;
    loading.value = false;
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        user.value = session?.user ?? null;
      }
    );
    cleanup(() => listener.subscription.unsubscribe());
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('.app-user-menu-modal');
      const icon = document.querySelector('.app-user-icon');

      if (
        isUserMenuOpen.value &&
        menu &&
        !menu.contains(event.target as Node) &&
        !icon?.contains(event.target as Node)
      ) {
        isUserMenuOpen.value = false;
      }
    };

    document.addEventListener('click', handleClickOutside);
    cleanup(() => document.removeEventListener('click', handleClickOutside));
  });

  const handleLogout = $(async () => {
    await supabase.auth.signOut();
    isUserMenuOpen.value = false;
    nav('/login');
  });

  const handleUserIconClick = $(() => {
    if (!user.value) showLoginModal.value = true;
    else isUserMenuOpen.value = !isUserMenuOpen.value;
  });

  return (
    <header class="app-header">
      <div class="app-header-content">

        {/* LEFT */}
        <div class="app-header-left">
          <a href={user.value ? "/dashboard" : "/"}>
            <img src="/logo.svg" alt="Logo" />
          </a>
        </div>

        {/* CENTER */}
        <div class="app-header-center">
          <Slot name="center" />
        </div>

        {/* RIGHT */}
        <div class="app-header-right">

          {/* SLOT ACTIONS (EDIT / DOWNLOAD vs) */}
          <div class="app-header-actions">
            <Slot name="actions" />
          </div>

          {/* USER ICON */}
          <div class={["app-user-icon", user.value ? "logged-in" : ""]} onClick$={handleUserIconClick}>
            {loading.value ? (
              <div class="skeleton-circle" />
            ) : user.value ? (
              getInitials(user.value?.user_metadata?.name, user.value?.email)
            ) : (
              <UserIcon />
            )}
          </div>

          {/* USER MENU */}
          {isUserMenuOpen.value && user.value && (
            <div class="app-user-menu-modal">
              {/* User Profile */}
              <div class="app-user-profile-section">
                <div class="app-user-avatar-large">
                  {getInitials(user.value?.user_metadata?.name, user.value?.email)}
                </div>
                <div class="app-user-info">
                  <div class="app-user-name">
                    {user.value?.user_metadata?.name || 'Volkan Yılmaz'}
                  </div>
                  <div class="app-user-email">
                    {user.value?.email || 'volkansamiyilmaz00@gmail.com'}
                  </div>
                </div>
              </div>

              <div class="app-user-menu-divider"></div>

              {/* Create Banner */}
              <div class="app-create-banner">
                <div class="app-create-banner-text">
                  <span class="app-create-banner-title">Create Logo</span>
                  <span class="app-create-banner-desc">Create a free logo for your brand</span>
                </div>
                <button
                  class="app-create-banner-btn"
                  onClick$={() => nav('/app?reset=true')}
                >
                  Create
                </button>
              </div>

              <Link href="/dashboard" class="app-user-menu-item">
                <DashboardIcon />
                Dashboard
              </Link>

              <div class="app-user-menu-divider"></div>

              <Link href="/blog" class="app-user-menu-item">
                <BlogIcon />
                Blog
              </Link>

              <Link href="/about" class="app-user-menu-item">
                <HelpIcon />
                Help Center
              </Link>

              <div class="app-user-menu-divider"></div>

              <div
                class="app-user-menu-item logout"
                onClick$={handleLogout}
              >
                <LogOutIcon />
                Sign Out
              </div>
            </div>
          )}

        </div>
      </div>
      
      {showLoginModal.value && (
        <LoginModal 
          onClose$={() => showLoginModal.value = false} 
          onSuccess$={() => {
            showLoginModal.value = false;
            window.location.reload();
          }} 
        />
      )}
    </header>
  );
});