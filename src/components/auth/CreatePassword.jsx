import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiCheckCircle, FiLock, FiAlertTriangle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { SCHOOL_INFO, MOCK_PORTAL_STUDENTS } from '../../data/mockData';
import styles from './CreatePassword.module.css';

// Simulate token-to-student mapping (in real: stored in DB)
const TOKEN_MAP = {
  'activate-2024-0002-x9k2m7': { student_id: '2024-0002', name: 'Maria Santos Reyes', already_used: false },
  'activate-2024-0001-a1b2c3': { student_id: '2024-0001', name: 'John Cruz Dela Cruz', already_used: true },
};

export default function CreatePassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const tokenData = TOKEN_MAP[token];
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const passwordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#dc2626', '#d97706', '#2563eb', '#059669'];
  const strength = passwordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) { toast.error('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { toast.error('Passwords do not match.'); return; }
    if (strength < 2) { toast.error('Please use a stronger password.'); return; }

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsLoading(false);
    setDone(true);
  };

  // Invalid token
  if (!tokenData) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.invalidIcon}><FiAlertTriangle /></div>
          <h2 className={styles.invalidTitle}>Invalid or Expired Link</h2>
          <p className={styles.invalidDesc}>This activation link is invalid or has already expired. Please contact your school administrator for assistance.</p>
          <Link to="/" className={styles.backLink}>← Back to Login</Link>
        </div>
        <footer className={styles.footer}>
          <span>&copy; {new Date().getFullYear()} {SCHOOL_INFO.name}</span>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </footer>
      </div>
    );
  }

  // Already used
  if (tokenData.already_used) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.usedIcon}><FiCheckCircle /></div>
          <h2 className={styles.usedTitle}>Account Already Activated</h2>
          <p className={styles.usedDesc}>This link has already been used. Your portal account is active. Please log in with your Student ID and password.</p>
          <Link to="/" className={styles.loginLink}>Go to Login →</Link>
        </div>
        <footer className={styles.footer}>
          <span>&copy; {new Date().getFullYear()} {SCHOOL_INFO.name}</span>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </footer>
      </div>
    );
  }

  // Success state
  if (done) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successAnim}>
            <div className={styles.successCircle}><FiCheckCircle /></div>
          </div>
          <h2 className={styles.successTitle}>Account Created Successfully!</h2>
          <p className={styles.successDesc}>
            Your portal account has been set up. A confirmation email has been sent to you.
            You can now log in to your Student Portal.
          </p>
          <Link to="/" className={styles.loginLink}>Log In to Portal →</Link>
        </div>
        <footer className={styles.footer}>
          <span>&copy; {new Date().getFullYear()} {SCHOOL_INFO.name}</span>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </footer>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* BG */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.wrapper}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>M</div>
          <div>
            <span className={styles.logoName}>{SCHOOL_INFO.name}</span>
            <span className={styles.logoAddr}>{SCHOOL_INFO.address}</span>
          </div>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <div className={styles.welcomeSection}>
            <div className={styles.lockIcon}><FiLock /></div>
            <h1 className={styles.welcomeTitle}>
              Welcome, <span className={styles.studentName}>{tokenData.name.split(' ')[0]}</span>!
            </h1>
            <p className={styles.welcomeMsg}>
              To continue to the Student Portal, please create your password.
            </p>
            <div className={styles.idBadge}>
              Create a password for Student ID: <strong>{tokenData.student_id}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Create Password</label>
              <div className={styles.inputWrap}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {password && (
                <div className={styles.strengthBar}>
                  <div className={styles.strengthTrack}>
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={styles.strengthSegment}
                        style={{ background: i <= strength ? strengthColor[strength] : 'var(--gray-200)' }}
                      />
                    ))}
                  </div>
                  <span style={{ color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
                </div>
              )}
              <ul className={styles.hints}>
                <li className={password.length >= 8 ? styles.hintMet : ''}>At least 8 characters</li>
                <li className={/[A-Z]/.test(password) ? styles.hintMet : ''}>One uppercase letter</li>
                <li className={/[0-9]/.test(password) ? styles.hintMet : ''}>One number</li>
                <li className={/[^A-Za-z0-9]/.test(password) ? styles.hintMet : ''}>One special character</li>
              </ul>
            </div>

            <div className={styles.field}>
              <label>Confirm Password</label>
              <div className={styles.inputWrap}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {confirm && confirm !== password && (
                <span className={styles.mismatch}>Passwords do not match.</span>
              )}
              {confirm && confirm === password && password.length >= 8 && (
                <span className={styles.match}><FiCheckCircle /> Passwords match!</span>
              )}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? <><span className={styles.spinner} /> Creating Account...</> : <><FiCheckCircle /> Create My Account</>}
            </button>
          </form>
        </div>

        <footer className={styles.footer}>
          <a href="#">Terms of Use</a>
          <span>·</span>
          <a href="#">Privacy Policy</a>
          <span>&bull;</span>
          <span>&copy; {new Date().getFullYear()} {SCHOOL_INFO.name}</span>
        </footer>
      </div>
    </div>
  );
}
