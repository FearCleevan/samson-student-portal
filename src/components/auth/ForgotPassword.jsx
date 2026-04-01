//src/components/auth/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { SCHOOL_INFO } from '../../data/mockData';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId.trim() || !email.trim()) { toast.error('Please fill in all fields.'); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgOrb1} /><div className={styles.bgOrb2} />
        <div className={styles.bgDots} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>M</div>
          <span className={styles.logoName}>{SCHOOL_INFO.name}</span>
        </div>

        <div className={styles.card}>
          {!submitted ? (
            <>
              <div className={styles.mailIcon}><FiMail /></div>
              <h2 className={styles.title}>Forgot Password?</h2>
              <p className={styles.desc}>Enter your Student ID and registered email address. We'll send a password reset link to your email.</p>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label>Student ID</label>
                  <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="e.g. 2024-0001" />
                </div>
                <div className={styles.field}>
                  <label>Registered Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@gmail.com" />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? <span className={styles.spinner} /> : <FiMail />}
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <Link to="/" className={styles.backLink}><FiArrowLeft /> Back to Login</Link>
            </>
          ) : (
            <div className={styles.successState}>
              <div className={styles.successIcon}><FiCheckCircle /></div>
              <h2>Reset Link Sent!</h2>
              <p>A password reset link has been sent to your registered email. Check your inbox and follow the instructions.</p>
              <p className={styles.note}>Didn't receive it? Check your spam folder or contact your school administrator.</p>
              <Link to="/" className={styles.loginLink}>← Back to Login</Link>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <a href="#">Terms of Use</a> · <a href="#">Privacy Policy</a>
          <br />&copy; {new Date().getFullYear()} {SCHOOL_INFO.name}
        </footer>
      </div>
    </div>
  );
}
