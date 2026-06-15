import { component$, useSignal, $, type PropFunction } from '@builder.io/qwik';
import { supabase } from '~/lib/supabaseClient';
import { useNavigate } from '@builder.io/qwik-city';
import './settingsModal.css';

type SettingsTab = 'account' | 'notification' | 'billing' | 'privacy';

const getInitials = (name?: string, email?: string) => {
  if (name && name.trim() !== '') {
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  if (email) return email.substring(0, 2).toUpperCase();
  return 'U';
};

interface Props {
  user: any;
  onClose$: PropFunction<() => void>;
}

export const SettingsModal = component$<Props>((props) => {
  const activeTab = useSignal<SettingsTab>('account');
  const nav = useNavigate();
  const { onClose$ } = props;

  const handleLogout = $(async () => {
    await supabase.auth.signOut();
    await onClose$();
    nav('/login');
  });

  /* ---- ICONS ---- */
  const AccountIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
  const NotifIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  );
  const BillingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a5 5 0 0 0-5 5c0 1.71.87 3.22 2.18 4.1A8 8 0 0 0 4 19h16a8 8 0 0 0-5.18-7.9A5 5 0 0 0 17 7a5 5 0 0 0-5-5z"/>
    </svg>
  );
  const PrivacyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );

  const initials = getInitials(props.user?.user_metadata?.name, props.user?.email);
  const displayName = props.user?.user_metadata?.name || 'User';
  const email = props.user?.email || '';

  return (
    <div class="settings-modal-overlay" onClick$={async (e) => {
      if ((e.target as HTMLElement).classList.contains('settings-modal-overlay')) {
        await onClose$();
      }
    }}>
      <div class="settings-modal-container">

        {/* SIDEBAR */}
        <div class="settings-sidebar">
          {/* User Info */}
          <div class="settings-sidebar-user">
            <div class="settings-sidebar-avatar">{initials}</div>
            <div class="settings-sidebar-user-info">
              <span class="settings-sidebar-name">{displayName}</span>
              <span class="settings-sidebar-role">Kişisel</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;color:#8C8C8C">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>

          {/* Nav */}
          <div class="settings-sidebar-section-label">Hesap</div>
          <nav class="settings-sidebar-nav">
            <button
              class={['settings-nav-item', activeTab.value === 'account' && 'active']}
              onClick$={() => (activeTab.value = 'account')}
            >
              <AccountIcon /> Account
            </button>
            <button
              class={['settings-nav-item', activeTab.value === 'notification' && 'active']}
              onClick$={() => (activeTab.value = 'notification')}
            >
              <NotifIcon /> Notification
            </button>
            <button
              class={['settings-nav-item', activeTab.value === 'billing' && 'active']}
              onClick$={() => (activeTab.value = 'billing')}
            >
              <BillingIcon /> Usage and Billing
            </button>
            <button
              class={['settings-nav-item', activeTab.value === 'privacy' && 'active']}
              onClick$={() => (activeTab.value = 'privacy')}
            >
              <PrivacyIcon /> Privacy
            </button>
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <div class="settings-main">
          {/* Close */}
          <button class="settings-close-btn" onClick$={onClose$}>
            <CloseIcon />
          </button>

          {activeTab.value === 'account' && (
            <div class="settings-content">
              <h2 class="settings-content-title">Account</h2>
              <div class="settings-divider" />

              {/* Avatar + Name */}
              <div class="settings-account-row">
                <div class="settings-account-avatar">{initials}</div>
                <div class="settings-account-fields">
                  <label class="settings-label">Tam ad</label>
                  <input class="settings-input" type="text" value={displayName} readOnly />
                </div>
              </div>

              {/* Email */}
              <div class="settings-field-group">
                <label class="settings-label">E-posta</label>
                <p class="settings-email-value">{email}</p>
              </div>

              <div class="settings-divider" />

              {/* Sign Out */}
              <div class="settings-signout-row">
                <div>
                  <p class="settings-signout-title">Sign Out</p>
                  <p class="settings-signout-desc">Hesabı Kapat</p>
                </div>
                <button class="settings-exit-btn" onClick$={handleLogout}>Exit</button>
              </div>
            </div>
          )}

          {activeTab.value === 'notification' && (
            <div class="settings-content">
              <h2 class="settings-content-title">Notification</h2>
              <div class="settings-divider" />
              <p class="settings-placeholder-text">Bildirim ayarları yakında gelecek.</p>
            </div>
          )}

          {activeTab.value === 'billing' && (
            <div class="settings-content">
              <h2 class="settings-content-title">Usage and Billing</h2>
              <div class="settings-divider" />
              <p class="settings-placeholder-text">Faturalama bilgileri yakında gelecek.</p>
            </div>
          )}

          {activeTab.value === 'privacy' && (
            <div class="settings-content">
              <h2 class="settings-content-title">Privacy</h2>
              <div class="settings-divider" />
              <p class="settings-placeholder-text">Gizlilik ayarları yakında gelecek.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
});
