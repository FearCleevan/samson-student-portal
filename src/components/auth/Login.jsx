import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiLogIn, FiAlertCircle, FiSun, FiMoon, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useStudentAuthStore } from '../../store/authStore';
import { SCHOOL_INFO } from '../../data/mockData';
import styles from './Login.module.css';
import studentVector from '../../assets/College Students - Edited.png';
import logo from '../../assets/Logo.png'; // Import the logo image

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useStudentAuthStore();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/portal', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!studentId.trim() || !password.trim()) {
      setErrorMsg('Please enter your Student ID and password.');
      return;
    }
    const result = await login(studentId.trim(), password);
    if (result.success) {
      toast.success('Welcome to your Student Portal!');
      navigate('/portal');
    } else {
      setErrorMsg(result.error || 'Invalid credentials.');
    }
  };

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>

      {/* ── TOP HEADER BAR ── */}
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div className={styles.schoolLogo}>
            <img src={logo} alt="SPC Logo" className={styles.logoImage} />
            <div>
              <span className={styles.schoolName}>Samson Polytechnic College of Davao</span>
              <span className={styles.schoolAddr}>Student Portal</span>
            </div>
          </div>
        </div>

        <div className={styles.topBarRight}>
          {/* Light / Dark toggle */}
          <button
            className={styles.themeToggle}
            onClick={() => setDarkMode(d => !d)}
            type="button"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className={styles.themeIcon} /> : <FiMoon className={styles.themeIcon} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <div className={styles.divisionBlock}>
            <span className={styles.divisionLabel}>Systems and Data<br />Management Division</span>
            <img src={logo} alt="SPC Logo" className={styles.sealSmallImage} />
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className={styles.mainContent}>

        {/* LEFT — Vector Illustration */}
        <div className={styles.leftPanel}>
          <div className={styles.illustrationWrap}>
            <img
              src={studentVector}
              alt="Students illustration"
              className={styles.vectorImage}
            />
          </div>
        </div>

        {/* RIGHT — Login Form */}
        <div className={styles.rightPanel}>
          <div className={styles.wrapper}>

            <h1 className={styles.title}>Hello there!</h1>
            <p className={styles.subtitle}>Please login to get started.</p>

            {errorMsg && (
              <div className={styles.errorBox}>
                <FiAlertCircle />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">

              {/* Student ID */}
              <div className={styles.field}>
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="ID Number"
                  autoComplete="username"
                  spellCheck={false}
                  className={styles.input}
                />
              </div>

              {/* Password */}
              <div className={styles.field}>
                <div className={styles.passWrap}>
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Show password checkbox */}
              <label className={styles.showPassLabel}>
                <span
                  className={`${styles.checkbox} ${showPass ? styles.checkboxChecked : ''}`}
                  onClick={() => setShowPass(v => !v)}
                  role="checkbox"
                  aria-checked={showPass}
                  tabIndex={0}
                  onKeyDown={e => e.key === ' ' && setShowPass(v => !v)}
                >
                  {showPass && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                Show Password
              </label>

              <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                {isLoading
                  ? <><span className={styles.spinner} /> Signing in...</>
                  : 'LOGIN'
                }
              </button>
            </form>

            <Link to="/forgot-password" className={styles.forgot}>
              Forgot password?
            </Link>

          </div>
        </div>
      </main>

      {/* ── FOOTER SECTION ── */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.supportSection}>
            <div className={styles.supportText}>
              <span className={styles.supportLabel}>Having trouble?</span>
              <a href="mailto:support@samsonpolytechnic.edu.ph" className={styles.supportLink}>
                Send us a Message
              </a>
            </div>
          </div>

          <div className={styles.copyrightSection}>
            <p className={styles.copyright}>
              Copyright &copy; {new Date().getFullYear()} Samson Polytechnic College of Davao. All Rights Reserved.
            </p>
            <div className={styles.footerLinks}>
              <a href="#">Terms of Use</a>
              <span>|</span>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}