import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiDollarSign, FiCalendar, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import { useStudentAuthStore } from '../../store/authStore';
import {
  MOCK_STUDENT_SUBJECTS, MOCK_STUDENT_PAYMENTS,
  MOCK_ANNOUNCEMENTS, SCHOOL_PORTAL_INFO
} from '../../data/mockData';
import styles from './DashboardHome.module.css';

export default function DashboardHome() {
  const { student } = useStudentAuthStore();

  const subjects = MOCK_STUDENT_SUBJECTS[student?.id] || [];
  const payments = MOCK_STUDENT_PAYMENTS[student?.id] || [];
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);
  const recentAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 2);

  const todaySchedule = useMemo(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const dayMap = { Mon: 'MWF', Tue: 'TTh', Wed: 'MWF', Thu: 'TTh', Fri: 'MWF', Sat: 'Sat' };
    const prefix = dayMap[today] || '';
    return subjects.filter(s => s.schedule?.includes(prefix)).slice(0, 3);
  }, [subjects]);

  return (
    <div className={styles.page}>
      {/* GREETING */}
      <div className={styles.greeting}>
        <div className={styles.greetLeft}>
          <div className={styles.greetWave}>👋</div>
          <div>
            <h1 className={styles.greetTitle}>
              Good {getTimeOfDay()}, <span className={styles.greetName}>{student?.first_name}!</span>
            </h1>
            <p className={styles.greetSub}>
              {student?.grade_level} — {student?.strand} &bull; {student?.section} &bull; {student?.school_year}
            </p>
          </div>
        </div>
        <div className={styles.datePill}>
          <FiCalendar />
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </div>
      </div>

      {/* STAT CARDS */}
      <div className={styles.statRow}>
        <div className={`${styles.statCard} ${styles.statTeal}`}>
          <div className={styles.statIcon}><FiBook /></div>
          <div className={styles.statBody}>
            <span className={styles.statVal}>{subjects.length}</span>
            <span className={styles.statLabel}>Enrolled Subjects</span>
          </div>
          <Link to="/portal/subjects" className={styles.statLink}>View <FiArrowRight /></Link>
        </div>

        <div className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statIcon}>💳</div>
          <div className={styles.statBody}>
            <span className={styles.statVal}>₱{totalPaid.toLocaleString()}</span>
            <span className={styles.statLabel}>Total Payments</span>
          </div>
          <Link to="/portal/payments" className={styles.statLink}>View <FiArrowRight /></Link>
        </div>

        <div className={`${styles.statCard} ${styles.statBlue}`}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statBody}>
            <span className={styles.statVal}>{subjects.reduce((s, x) => s + Number(x.units), 0)}</span>
            <span className={styles.statLabel}>Total Units</span>
          </div>
          <Link to="/portal/subjects" className={styles.statLink}>View <FiArrowRight /></Link>
        </div>

        <div className={`${styles.statCard} ${styles.statOrange}`}>
          <div className={styles.statIcon}>📢</div>
          <div className={styles.statBody}>
            <span className={styles.statVal}>{MOCK_ANNOUNCEMENTS.length}</span>
            <span className={styles.statLabel}>Announcements</span>
          </div>
          <Link to="/portal/announcements" className={styles.statLink}>View <FiArrowRight /></Link>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* ENROLLMENT INFO CARD */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Enrollment Summary</h3>
          </div>
          <div className={styles.enrollInfo}>
            {[
              { label: 'Grade Level', val: student?.grade_level },
              { label: 'Track', val: student?.track },
              { label: 'Strand', val: student?.strand },
              { label: 'Section', val: student?.section },
              { label: 'School Year', val: student?.school_year },
              { label: 'Semester', val: `${student?.semester} Semester` },
              { label: 'Status', val: 'Enrolled', highlight: true },
            ].map(item => (
              <div className={styles.enrollRow} key={item.label}>
                <span className={styles.enrollLabel}>{item.label}</span>
                <span className={`${styles.enrollVal} ${item.highlight ? styles.enrollHighlight : ''}`}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TODAY'S SCHEDULE */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Today's Schedule</h3>
            <Link to="/portal/subjects" className={styles.viewAllLink}>See all</Link>
          </div>
          {todaySchedule.length === 0 ? (
            <div className={styles.emptySchedule}>
              <span>🎉</span>
              <p>No classes scheduled for today!</p>
            </div>
          ) : (
            <div className={styles.scheduleList}>
              {todaySchedule.map(sub => (
                <div key={sub.id} className={styles.scheduleItem}>
                  <div className={`${styles.schedDot} ${sub.is_core ? styles.dotCore : styles.dotElective}`} />
                  <div className={styles.schedInfo}>
                    <span className={styles.schedSubject}>{sub.subject_name}</span>
                    <span className={styles.schedTime}>{sub.schedule}</span>
                  </div>
                  <span className={styles.schedRoom}>{sub.room}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECENT PAYMENTS */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Recent Payments</h3>
            <Link to="/portal/payments" className={styles.viewAllLink}>See all</Link>
          </div>
          {payments.length === 0 ? (
            <div className={styles.emptyPayments}><FiDollarSign /><p>No payment records yet.</p></div>
          ) : (
            <div className={styles.paymentList}>
              {payments.slice(0, 3).map(p => (
                <div className={styles.paymentItem} key={p.id}>
                  <div className={styles.payIcon}>💰</div>
                  <div className={styles.payInfo}>
                    <span className={styles.payCat}>{p.category}</span>
                    <span className={styles.payDate}>{format(new Date(p.payment_date), 'MMM d, yyyy')}</span>
                  </div>
                  <span className={styles.payAmt}>₱{p.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ANNOUNCEMENTS */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Announcements</h3>
            <Link to="/portal/announcements" className={styles.viewAllLink}>See all</Link>
          </div>
          <div className={styles.announcementList}>
            {recentAnnouncements.map(a => (
              <div key={a.id} className={`${styles.announcementItem} ${styles[`ann_${a.priority}`]}`}>
                <div className={styles.annTop}>
                  <span className={`${styles.annPriority} ${styles[`pri_${a.priority}`]}`}>
                    {a.priority === 'high' ? '🔴' : a.priority === 'normal' ? '🔵' : '⚪'} {a.priority}
                  </span>
                  <span className={styles.annDate}>{format(new Date(a.date), 'MMM d')}</span>
                </div>
                <h4 className={styles.annTitle}>{a.title}</h4>
                <p className={styles.annBody}>{a.body.slice(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}