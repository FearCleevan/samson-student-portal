import { useState } from 'react';
import { FiBook, FiClock, FiMapPin, FiUser } from 'react-icons/fi';
import { useStudentAuthStore } from '../../store/authStore';
import { MOCK_STUDENT_SUBJECTS } from '../../data/mockData';
import styles from './MySubjects.module.css';

export default function MySubjects() {
  const { student } = useStudentAuthStore();
  const subjects = MOCK_STUDENT_SUBJECTS[student?.id] || [];
  const [view, setView] = useState('cards'); // cards | table

  const coreSubjects = subjects.filter(s => s.is_core);
  const appliedSubjects = subjects.filter(s => !s.is_core);
  const totalUnits = subjects.reduce((s, x) => s + Number(x.units), 0);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Subjects</h1>
          <p className={styles.pageSub}>
            {student?.grade_level} — {student?.strand} — {student?.semester} Semester {student?.school_year}
          </p>
        </div>
        <div className={styles.viewToggle}>
          <button className={`${styles.toggleBtn} ${view === 'cards' ? styles.toggleActive : ''}`} onClick={() => setView('cards')}>⊞ Cards</button>
          <button className={`${styles.toggleBtn} ${view === 'table' ? styles.toggleActive : ''}`} onClick={() => setView('table')}>≡ Table</button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className={styles.summaryRow}>
        <div className={styles.summCard}>
          <span className={styles.summNum}>{subjects.length}</span>
          <span className={styles.summLabel}>Total Subjects</span>
        </div>
        <div className={styles.summCard}>
          <span className={styles.summNum}>{totalUnits}</span>
          <span className={styles.summLabel}>Total Units</span>
        </div>
        <div className={styles.summCard}>
          <span className={styles.summNum}>{coreSubjects.length}</span>
          <span className={styles.summLabel}>Core Subjects</span>
        </div>
        <div className={styles.summCard}>
          <span className={styles.summNum}>{appliedSubjects.length}</span>
          <span className={styles.summLabel}>Applied/Track Subjects</span>
        </div>
      </div>

      {view === 'cards' ? (
        <>
          {coreSubjects.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <span className={styles.sectionDot} style={{ background: 'var(--teal-500)' }} />
                Core Subjects
                <span className={styles.sectionCount}>{coreSubjects.length}</span>
              </div>
              <div className={styles.subjectGrid}>
                {coreSubjects.map(sub => <SubjectCard key={sub.id} subject={sub} />)}
              </div>
            </div>
          )}
          {appliedSubjects.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <span className={styles.sectionDot} style={{ background: 'var(--warning)' }} />
                Applied / Track Subjects
                <span className={styles.sectionCount}>{appliedSubjects.length}</span>
              </div>
              <div className={styles.subjectGrid}>
                {appliedSubjects.map(sub => <SubjectCard key={sub.id} subject={sub} />)}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject Name</th>
                <th>Units</th>
                <th>Type</th>
                <th>Teacher</th>
                <th>Schedule</th>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(sub => (
                <tr key={sub.id}>
                  <td><code className={styles.subCode}>{sub.subject_code}</code></td>
                  <td><strong>{sub.subject_name}</strong></td>
                  <td className={styles.units}>{sub.units}</td>
                  <td>
                    <span className={`${styles.typeBadge} ${sub.is_core ? styles.coreType : styles.electiveType}`}>
                      {sub.is_core ? 'Core' : 'Applied'}
                    </span>
                  </td>
                  <td>{sub.teacher || 'TBA'}</td>
                  <td className={styles.schedule}>{sub.schedule}</td>
                  <td>{sub.room}</td>
                  <td><span className={styles.enrolledBadge}>Enrolled</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SubjectCard({ subject }) {
  return (
    <div className={`${styles.subjectCard} ${subject.is_core ? styles.cardCore : styles.cardElective}`}>
      <div className={styles.cardTop}>
        <span className={`${styles.cardType} ${subject.is_core ? styles.typeCore : styles.typeElective}`}>
          {subject.is_core ? 'Core' : 'Applied'}
        </span>
        <span className={styles.cardUnits}>{subject.units} units</span>
      </div>
      <div className={styles.cardCode}>{subject.subject_code}</div>
      <h4 className={styles.cardName}>{subject.subject_name}</h4>
      <div className={styles.cardDetails}>
        <div className={styles.cardDetail}>
          <FiUser className={styles.detailIcon} />
          <span>{subject.teacher || 'TBA'}</span>
        </div>
        <div className={styles.cardDetail}>
          <FiClock className={styles.detailIcon} />
          <span>{subject.schedule}</span>
        </div>
        <div className={styles.cardDetail}>
          <FiMapPin className={styles.detailIcon} />
          <span>{subject.room}</span>
        </div>
      </div>
      <div className={styles.cardStatus}>
        <span className={styles.enrolledChip}>✓ Enrolled</span>
      </div>
    </div>
  );
}