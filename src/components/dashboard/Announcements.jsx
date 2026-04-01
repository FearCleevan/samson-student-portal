import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { format } from 'date-fns';
import { MOCK_ANNOUNCEMENTS } from '../../data/mockData';
import styles from './Announcements.module.css';

const PRIORITY_META = {
  high:   { label: 'Urgent', emoji: '🔴', color: 'high' },
  normal: { label: 'Info',   emoji: '🔵', color: 'normal' },
  low:    { label: 'General',emoji: '⚪', color: 'low' },
};

export default function Announcements() {
  const [announcements] = useState([
    ...MOCK_ANNOUNCEMENTS,
    {
      id: 'ann-004',
      title: 'Career Guidance Seminar — Grade 11 Students',
      body: 'A Career Guidance Seminar is scheduled for all Grade 11 students on August 5, 2024 at the school auditorium. Attendance is required. Please inform your parents or guardians.',
      date: '2024-07-25T09:00:00Z',
      priority: 'normal',
    },
    {
      id: 'ann-005',
      title: 'Lost and Found: Blue Umbrella',
      body: 'A blue umbrella was found near the canteen area. The owner may claim it at the Principal\'s office with proper identification. Unclaimed items will be donated after one week.',
      date: '2024-07-05T10:00:00Z',
      priority: 'low',
    },
  ]);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered = announcements.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q);
    const matchFilter = filterPriority === 'all' || a.priority === filterPriority;
    return matchSearch && matchFilter;
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Announcements</h1>
          <p className={styles.pageSub}>Stay updated with school news and notices</p>
        </div>
        <span className={styles.totalBadge}>{announcements.length} posts</span>
      </div>

      {/* FILTERS */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <FiSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search announcements..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          {['all', 'high', 'normal', 'low'].map(p => (
            <button
              key={p}
              className={`${styles.filterBtn} ${filterPriority === p ? styles.filterActive : ''} ${p !== 'all' ? styles[`filter_${p}`] : ''}`}
              onClick={() => setFilterPriority(p)}
            >
              {p === 'all' ? 'All' : `${PRIORITY_META[p].emoji} ${PRIORITY_META[p].label}`}
            </button>
          ))}
        </div>
      </div>

      {/* ANNOUNCEMENT CARDS */}
      <div className={styles.announcementList}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span>📭</span>
            <p>No announcements found.</p>
          </div>
        ) : filtered.map(a => {
          const meta = PRIORITY_META[a.priority];
          const isExpanded = expanded === a.id;
          return (
            <div key={a.id} className={`${styles.card} ${styles[`card_${a.priority}`]}`}>
              <div className={styles.cardTop}>
                <div className={styles.cardLeft}>
                  <span className={`${styles.priorityBadge} ${styles[`pri_${a.priority}`]}`}>
                    {meta.emoji} {meta.label}
                  </span>
                  <span className={styles.cardDate}>
                    {format(new Date(a.date), 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{a.title}</h3>
              <p className={`${styles.cardBody} ${isExpanded ? styles.cardBodyExpanded : ''}`}>
                {a.body}
              </p>
              {a.body.length > 120 && (
                <button className={styles.readMoreBtn} onClick={() => setExpanded(isExpanded ? null : a.id)}>
                  {isExpanded ? 'Show less ↑' : 'Read more ↓'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}