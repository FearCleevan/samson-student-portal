import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiSave, FiX, FiLock } from 'react-icons/fi';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useStudentAuthStore } from '../../store/authStore';
import styles from './MyProfile.module.css';

export default function MyProfile() {
  const { student } = useStudentAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [profile, setProfile] = useState({ ...student });
  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  const handleSave = () => {
    toast.success('Profile information updated successfully!');
    setEditMode(false);
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    if (!passForm.current) { toast.error('Enter your current password.'); return; }
    if (passForm.newPass.length < 8) { toast.error('New password must be at least 8 characters.'); return; }
    if (passForm.newPass !== passForm.confirm) { toast.error('Passwords do not match.'); return; }
    toast.success('Password changed successfully!');
    setShowChangePass(false);
    setPassForm({ current: '', newPass: '', confirm: '' });
  };

  const fullName = `${student?.first_name} ${student?.middle_name ? student.middle_name + ' ' : ''}${student?.last_name}`;
  const initials = `${student?.first_name?.charAt(0)}${student?.last_name?.charAt(0)}`;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Profile</h1>
          <p className={styles.pageSub}>View and manage your personal information</p>
        </div>
      </div>

      {/* PROFILE HERO */}
      <div className={styles.profileHero}>
        <div className={styles.heroContent}>
          <div className={styles.avatarWrap}>
            <div className={styles.bigAvatar}>{initials}</div>
            <div className={styles.avatarOnline} />
          </div>
          <div className={styles.heroInfo}>
            <h2 className={styles.heroName}>{fullName}</h2>
            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>{student?.student_id}</span>
              <span className={styles.heroBadge}>{student?.grade_level}</span>
              <span className={styles.heroBadge}>{student?.strand}</span>
              <span className={styles.heroBadge}>{student?.section}</span>
            </div>
            <p className={styles.heroEmail}>{student?.student_email}</p>
          </div>
        </div>
        <div className={styles.heroActions}>
          {!editMode ? (
            <button className={styles.editBtn} onClick={() => setEditMode(true)}>
              <FiEdit2 /> Edit Profile
            </button>
          ) : (
            <div className={styles.editActions}>
              <button className={styles.saveBtn} onClick={handleSave}><FiSave /> Save</button>
              <button className={styles.cancelBtn} onClick={() => setEditMode(false)}><FiX /> Cancel</button>
            </div>
          )}
          <button className={styles.changePassBtn} onClick={() => setShowChangePass(!showChangePass)}>
            <FiLock /> Change Password
          </button>
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      {showChangePass && (
        <div className={styles.changePassCard}>
          <h3 className={styles.sectionTitle}><FiLock /> Change Password</h3>
          <form onSubmit={handleChangePass} className={styles.passForm}>
            {[
              { key: 'current', label: 'Current Password', placeholder: 'Enter current password' },
              { key: 'newPass', label: 'New Password', placeholder: 'Minimum 8 characters' },
              { key: 'confirm', label: 'Confirm New Password', placeholder: 'Re-enter new password' },
            ].map(f => (
              <div key={f.key} className={styles.passField}>
                <label>{f.label}</label>
                <div className={styles.passInputWrap}>
                  <input
                    type={showPass[f.key] ? 'text' : 'password'}
                    value={passForm[f.key]}
                    onChange={e => setPassForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className={styles.passInput}
                  />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(s => ({ ...s, [f.key]: !s[f.key] }))}>
                    {showPass[f.key] ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.passActions}>
              <button type="submit" className={styles.saveBtn}>Update Password</button>
              <button type="button" className={styles.cancelBtn} onClick={() => setShowChangePass(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* INFO SECTIONS */}
      <div className={styles.infoGrid}>
        {/* Personal */}
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}><FiUser /> Personal Information</h3>
          <div className={styles.infoList}>
            <InfoRow icon={<FiUser />} label="Full Name" val={fullName} editMode={editMode} />
            <InfoRow icon={<FiCalendar />} label="Date of Birth" val={student?.birthdate ? format(new Date(student.birthdate), 'MMMM d, yyyy') : '—'} editMode={false} />
            <InfoRow icon={<FiUser />} label="Gender" val={student?.gender} editMode={false} />
            <InfoRow icon={<FiMapPin />} label="Address" val={student?.address || '—'} editMode={editMode}
              onChange={v => setProfile(p => ({ ...p, address: v }))} currentVal={profile.address} />
            <InfoRow icon={<FiPhone />} label="Contact No." val={student?.contact_number || '—'} editMode={editMode}
              onChange={v => setProfile(p => ({ ...p, contact_number: v }))} currentVal={profile.contact_number} />
          </div>
        </div>

        {/* Academic */}
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>🎓 Academic Information</h3>
          <div className={styles.infoList}>
            <InfoRow icon="📋" label="LRN" val={student?.lrn || '—'} editMode={false} />
            <InfoRow icon="🏫" label="Grade Level" val={student?.grade_level} editMode={false} />
            <InfoRow icon="📚" label="Track" val={student?.track} editMode={false} />
            <InfoRow icon="📌" label="Strand" val={student?.strand} editMode={false} />
            <InfoRow icon="🏷️" label="Section" val={student?.section} editMode={false} />
            <InfoRow icon="📅" label="School Year" val={`${student?.school_year} — ${student?.semester} Semester`} editMode={false} />
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>✅</span>
              <span className={styles.infoLabel}>Status</span>
              <span className={`${styles.infoVal} ${styles.activeStatus}`}>Active / Enrolled</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}><FiMail /> Contact & Guardian</h3>
          <div className={styles.infoList}>
            <InfoRow icon={<FiMail />} label="Email" val={student?.student_email} editMode={false} />
            <InfoRow icon={<FiUser />} label="Guardian" val={student?.guardian_name || '—'} editMode={editMode}
              onChange={v => setProfile(p => ({ ...p, guardian_name: v }))} currentVal={profile.guardian_name} />
            <InfoRow icon={<FiPhone />} label="Guardian Contact" val={student?.guardian_contact || '—'} editMode={editMode}
              onChange={v => setProfile(p => ({ ...p, guardian_contact: v }))} currentVal={profile.guardian_contact} />
          </div>
        </div>

        {/* Portal */}
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>🔐 Portal Account</h3>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>🆔</span>
              <span className={styles.infoLabel}>Student ID (Username)</span>
              <code className={styles.idCode}>{student?.student_id}</code>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>✅</span>
              <span className={styles.infoLabel}>Portal Status</span>
              <span className={styles.activePill}>Activated</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>🔑</span>
              <span className={styles.infoLabel}>Password</span>
              <span className={styles.hiddenPass}>••••••••</span>
            </div>
          </div>
          <div className={styles.portalNote}>
            Your Student ID is your permanent username and cannot be changed.
            Contact the school admin for account issues.
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, val, editMode, onChange, currentVal }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoIcon}>{icon}</span>
      <span className={styles.infoLabel}>{label}</span>
      {editMode && onChange ? (
        <input
          className={styles.infoInput}
          value={currentVal || val}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <span className={styles.infoVal}>{val}</span>
      )}
    </div>
  );
}