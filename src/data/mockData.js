// ============================================================
// MOCK DATA — Student Portal
// ============================================================

export const MOCK_PORTAL_STUDENTS = [
  {
    id: 'stu-001',
    student_id: '2024-0001',
    password: 'Student@1234',
    first_name: 'John',
    middle_name: 'Cruz',
    last_name: 'Dela Cruz',
    gender: 'Male',
    birthdate: '2007-05-15',
    address: 'Davao City, Davao del Sur',
    contact_number: '09171234567',
    student_email: 'john.delacruz@gmail.com',
    guardian_name: 'Maria Dela Cruz',
    portal_activated: true,
    status: 'active',
    grade_level: 'Grade 11',
    strand: 'ABM',
    track: 'Accountancy, Business and Management',
    section: 'ABM-11A',
    school_year: '2024-2025',
    semester: '1st',
    profile_picture_url: null,
  },
  {
    id: 'stu-003',
    student_id: '2024-0003',
    password: 'Student@1234',
    first_name: 'Carlo',
    middle_name: 'Bautista',
    last_name: 'Villanueva',
    gender: 'Male',
    birthdate: '2006-03-10',
    address: 'Digos City, Davao del Sur',
    contact_number: '09331234567',
    student_email: 'carlo.villanueva@gmail.com',
    guardian_name: 'Elena Villanueva',
    portal_activated: true,
    status: 'active',
    grade_level: 'Grade 12',
    strand: 'ABM',
    track: 'Accountancy, Business and Management',
    section: 'ABM-12A',
    school_year: '2024-2025',
    semester: '1st',
    profile_picture_url: null,
  },
];

export const MOCK_STUDENT_SUBJECTS = {
  'stu-001': [
    { id: 'sub-001', subject_code: 'CORE-OC', subject_name: 'Oral Communication', units: 2, teacher: 'Rosa Garcia', schedule: 'MWF 7:30–8:30 AM', room: 'Room 201', semester: '1st', grade_level: 'Grade 11', is_core: true, status: 'enrolled' },
    { id: 'sub-002', subject_code: 'CORE-RW', subject_name: 'Reading and Writing', units: 2, teacher: 'Rosa Garcia', schedule: 'TTh 7:30–9:00 AM', room: 'Room 201', semester: '1st', grade_level: 'Grade 11', is_core: true, status: 'enrolled' },
    { id: 'sub-004', subject_code: 'CORE-GM', subject_name: 'General Mathematics', units: 3, teacher: 'Ana Reyes', schedule: 'MWF 8:30–9:30 AM', room: 'Room 203', semester: '1st', grade_level: 'Grade 11', is_core: true, status: 'enrolled' },
    { id: 'sub-005', subject_code: 'CORE-ES', subject_name: 'Earth Science', units: 3, teacher: 'Pedro Lim', schedule: 'TTh 9:00–10:30 AM', room: 'Lab 1', semester: '1st', grade_level: 'Grade 11', is_core: true, status: 'enrolled' },
    { id: 'sub-006', subject_code: 'CORE-PE', subject_name: 'PE and Health 1', units: 2, teacher: 'TBA', schedule: 'Sat 7:30–9:30 AM', room: 'Gym', semester: '1st', grade_level: 'Grade 11', is_core: true, status: 'enrolled' },
    { id: 'sub-007', subject_code: 'ABM-BS', subject_name: 'Business Mathematics', units: 3, teacher: 'Carlo Mendoza', schedule: 'MWF 9:30–10:30 AM', room: 'Room 205', semester: '1st', grade_level: 'Grade 11', is_core: false, status: 'enrolled' },
    { id: 'sub-008', subject_code: 'ABM-OBM', subject_name: 'Organization & Management', units: 3, teacher: 'Carlo Mendoza', schedule: 'TTh 10:30 AM–12:00 PM', room: 'Room 205', semester: '1st', grade_level: 'Grade 11', is_core: false, status: 'enrolled' },
  ],
  'stu-003': [
    { id: 'sub-g12-01', subject_code: 'CORE-PR1', subject_name: 'Practical Research 1', units: 3, teacher: 'Rosa Garcia', schedule: 'MWF 7:30–8:30 AM', room: 'Room 301', semester: '1st', grade_level: 'Grade 12', is_core: true, status: 'enrolled' },
    { id: 'sub-g12-02', subject_code: 'CORE-FP', subject_name: 'Filipino sa Piling Larang', units: 2, teacher: 'TBA', schedule: 'TTh 7:30–9:00 AM', room: 'Room 301', semester: '1st', grade_level: 'Grade 12', is_core: true, status: 'enrolled' },
    { id: 'sub-g12-03', subject_code: 'CORE-PE3', subject_name: 'PE and Health 3', units: 2, teacher: 'TBA', schedule: 'Sat 7:30–9:30 AM', room: 'Gym', semester: '1st', grade_level: 'Grade 12', is_core: true, status: 'enrolled' },
    { id: 'sub-g12-04', subject_code: 'ABM-ACC1', subject_name: 'Fundamentals of ABM 1', units: 3, teacher: 'Carlo Mendoza', schedule: 'MWF 9:30–10:30 AM', room: 'Room 305', semester: '1st', grade_level: 'Grade 12', is_core: false, status: 'enrolled' },
  ],
};

export const MOCK_STUDENT_PAYMENTS = {
  'stu-001': [
    { id: 'pay-001', or_number: 'OR-20240601-00001', category: 'Tuition Fee', amount: 5000, payment_method: 'gcash', reference_number: 'GC-123456789', payment_date: '2024-06-01T10:00:00Z', status: 'completed' },
    { id: 'pay-002', or_number: 'OR-20240601-00002', category: 'Miscellaneous Fee', amount: 500, payment_method: 'over_the_counter', reference_number: null, payment_date: '2024-06-01T10:30:00Z', status: 'completed' },
    { id: 'pay-003', or_number: 'OR-20240615-00001', category: 'School Uniform', amount: 1200, payment_method: 'gcash', reference_number: 'GC-234567890', payment_date: '2024-06-15T11:00:00Z', status: 'completed' },
  ],
  'stu-003': [
    { id: 'pay-005', or_number: 'OR-20240603-00001', category: 'Tuition Fee', amount: 5000, payment_method: 'card', reference_number: 'CARD-111222333', payment_date: '2024-06-03T09:00:00Z', status: 'completed' },
    { id: 'pay-006', or_number: 'OR-20240603-00002', category: 'Examination Fee', amount: 300, payment_method: 'gcash', reference_number: 'GC-555666777', payment_date: '2024-06-03T11:00:00Z', status: 'completed' },
  ],
};

export const MOCK_ANNOUNCEMENTS = [
  { id: 'ann-001', title: 'Enrollment for 2nd Semester Now Open', body: 'Enrollment for the 2nd semester of SY 2024-2025 will open on October 15, 2024. Please prepare your requirements and coordinate with your section adviser.', date: '2024-09-20T09:00:00Z', priority: 'high' },
  { id: 'ann-002', title: 'Schedule of Examinations — 1st Quarter', body: 'Quarterly examinations are scheduled from July 22–26, 2024. Students are reminded to settle their examination fees before the exam week.', date: '2024-07-10T08:00:00Z', priority: 'normal' },
  { id: 'ann-003', title: 'School Uniform Policy Reminder', body: 'All students are required to wear the prescribed school uniform every Monday, Wednesday, and Friday. PE uniform is required on PE days.', date: '2024-06-15T07:00:00Z', priority: 'low' },
];

export const SCHOOL_PORTAL_INFO = {
  name: 'Meridian Senior High School',
  address: '123 Education Avenue, Davao City, Davao del Sur 8000',
  email: 'info@meridian-shs.edu.ph',
  phone: '(082) 123-4567',
  logo_text: 'MSHS',
};

// Alias for backward compatibility with auth components
export const SCHOOL_INFO = SCHOOL_PORTAL_INFO;