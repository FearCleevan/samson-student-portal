import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiBook, FiDollarSign, FiUser, FiBell,
  FiLogOut, FiMenu, FiX, FiChevronDown, FiVolume2  // Changed from FiMegaphone to FiVolume2
} from 'react-icons/fi';
import { useStudentAuthStore } from '../../store/authStore';
import { SCHOOL_PORTAL_INFO } from '../../data/mockData';
import styles from './PortalLayout.module.css';

const NAV_ITEMS = [
  { path: '/portal', label: 'Dashboard', icon: FiGrid, exact: true },
  { path: '/portal/subjects', label: 'My Subjects', icon: FiBook },
  { path: '/portal/payments', label: 'My Payments', icon: FiDollarSign },
  { path: '/portal/announcements', label: 'Announcements', icon: FiVolume2 },  // Updated here as well
  { path: '/portal/profile', label: 'My Profile', icon: FiUser },
];

export default function PortalLayout() {
  const { student, logout } = useStudentAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const fullName = student ? `${student.first_name} ${student.last_name}` : '';
  const initials = student ? `${student.first_name.charAt(0)}${student.last_name.charAt(0)}` : '';

  return (
    <div className={styles.layout}>
      {/* SIDEBAR OVERLAY (mobile) */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} aria-hidden="true" />}

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarVisible : ''}`}>
        <div className={styles.sidebarTop}>
          <div className={styles.sidebarLogo}>
            <div className={styles.logoCircle}>{SCHOOL_PORTAL_INFO.logo_text}</div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>{SCHOOL_PORTAL_INFO.name}</span>
              <span className={styles.logoPre}>Student Portal</span>
            </div>
          </div>
          <button className={styles.closeSidebar} onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <FiX />
          </button>
        </div>

        {/* Student badge in sidebar */}
        <div className={styles.studentBadge}>
          <div className={styles.sbAvatar}>{initials}</div>
          <div className={styles.sbInfo}>
            <span className={styles.sbName}>{fullName}</span>
            <span className={styles.sbId}>{student?.student_id}</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ path, label, icon: Icon, exact }) => (
            <NavLink
              key={path}
              to={path}
              end={exact}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className={styles.navIcon} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.schoolYear}>
            <span className={styles.syLabel}>School Year</span>
            <span className={styles.syValue}>{student?.school_year} — {student?.semester} Sem</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FiLogOut />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className={styles.mainWrapper}>
        {/* HEADER */}
        <header className={styles.header}>
          <button className={styles.hamburger} onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <FiMenu />
          </button>

          <div className={styles.headerBrand}>
            <div className={styles.logoCircleSm}>{SCHOOL_PORTAL_INFO.logo_text}</div>
            <span className={styles.headerSchoolName}>{SCHOOL_PORTAL_INFO.name}</span>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.notifBtn} aria-label="Notifications">
              <FiBell />
              <span className={styles.notifDot} />
            </button>

            <div className={styles.userMenu}>
              <button className={styles.userBtn} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div className={styles.headerAvatar}>{initials}</div>
                <span className={styles.headerName}>{student?.first_name}</span>
                <FiChevronDown className={`${styles.chevron} ${userMenuOpen ? styles.chevronUp : ''}`} />
              </button>

              {userMenuOpen && (
                <div className={styles.dropdown} onClick={() => setUserMenuOpen(false)}>
                  <div className={styles.dropInfo}>
                    <span className={styles.dropName}>{fullName}</span>
                    <span className={styles.dropId}>{student?.student_id}</span>
                    <span className={styles.dropGrade}>{student?.grade_level} — {student?.strand}</span>
                  </div>
                  <hr className={styles.dropDivider} />
                  <NavLink to="/portal/profile" className={styles.dropItem}>
                    <FiUser /> My Profile
                  </NavLink>
                  <button className={styles.dropItem} onClick={handleLogout}>
                    <FiLogOut /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* BODY */}
        <main className={styles.body}>
          <Outlet />
        </main>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <span>&copy; {new Date().getFullYear()} {SCHOOL_PORTAL_INFO.name}</span>
          <span className={styles.sep}>|</span>
          <span>{SCHOOL_PORTAL_INFO.address}</span>
          <span className={styles.sep}>|</span>
          <a href="#">Terms of Use</a>
          <span className={styles.sep}>|</span>
          <a href="#">Privacy Policy</a>
        </footer>
      </div>
    </div>
  );
}