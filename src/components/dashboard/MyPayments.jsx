import { useState } from 'react';
import { FiDollarSign, FiPrinter } from 'react-icons/fi';
import { format } from 'date-fns';
import { useStudentAuthStore } from '../../store/authStore';
import { MOCK_STUDENT_PAYMENTS, SCHOOL_PORTAL_INFO } from '../../data/mockData';
import styles from './MyPayments.module.css';

export default function MyPayments() {
  const { student } = useStudentAuthStore();
  const payments = MOCK_STUDENT_PAYMENTS[student?.id] || [];
  const [selectedPayment, setSelectedPayment] = useState(null);

  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);

  const handlePrint = (payment) => {
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Receipt - ${payment.or_number}</title>
      <style>
        body{font-family:'Courier New',monospace;padding:24px;max-width:360px;margin:0 auto;font-size:12px;}
        h2{text-align:center;font-size:15px;text-transform:uppercase;margin-bottom:2px;}
        p{text-align:center;font-size:11px;color:#666;margin-bottom:12px;}
        hr{border:none;border-top:1px dashed #999;margin:10px 0;}
        .row{display:flex;justify-content:space-between;margin:4px 0;}
        .amt{text-align:center;font-size:26px;font-weight:900;margin:10px 0;}
        .footer{text-align:center;font-size:10px;color:#888;margin-top:12px;}
        @media print{body{margin:0;}}
      </style></head>
      <body>
        <h2>${SCHOOL_PORTAL_INFO.name}</h2>
        <p>${SCHOOL_PORTAL_INFO.address}</p>
        <p style="font-weight:bold;font-size:13px;letter-spacing:2px">OFFICIAL RECEIPT</p>
        <hr>
        <div class="row"><span>OR No.:</span><strong>${payment.or_number}</strong></div>
        <div class="row"><span>Date:</span><span>${format(new Date(payment.payment_date),'MMMM d, yyyy h:mm a')}</span></div>
        <hr>
        <div class="row"><span>Student:</span><strong>${student.first_name} ${student.last_name}</strong></div>
        <div class="row"><span>Student ID:</span><span>${student.student_id}</span></div>
        <hr>
        <div class="row"><span>Payment For:</span><strong>${payment.category}</strong></div>
        <div class="row"><span>Method:</span><span>${payment.payment_method === 'over_the_counter' ? 'Over the Counter' : payment.payment_method.toUpperCase()}</span></div>
        ${payment.reference_number ? `<div class="row"><span>Ref #:</span><span>${payment.reference_number}</span></div>` : ''}
        <hr>
        <div class="amt">₱${payment.amount.toLocaleString('en-PH',{minimumFractionDigits:2})}</div>
        <hr>
        <div class="footer">Thank you! Please keep this receipt for your records.<br>${SCHOOL_PORTAL_INFO.email} | ${SCHOOL_PORTAL_INFO.phone}</div>
      </body></html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 300);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Payments</h1>
          <p className={styles.pageSub}>Your payment history and official receipts</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className={styles.summaryRow}>
        <div className={styles.summCard}>
          <span className={styles.summIcon}>💰</span>
          <div>
            <span className={styles.summVal}>₱{totalPaid.toLocaleString()}</span>
            <span className={styles.summLabel}>Total Paid</span>
          </div>
        </div>
        <div className={styles.summCard}>
          <span className={styles.summIcon}>🧾</span>
          <div>
            <span className={styles.summVal}>{payments.length}</span>
            <span className={styles.summLabel}>Transactions</span>
          </div>
        </div>
        <div className={styles.summCard}>
          <span className={styles.summIcon}>✅</span>
          <div>
            <span className={styles.summVal}>{payments.filter(p => p.status === 'completed').length}</span>
            <span className={styles.summLabel}>Completed</span>
          </div>
        </div>
      </div>

      {/* PAYMENT CARDS */}
      {payments.length === 0 ? (
        <div className={styles.empty}>
          <FiDollarSign size={32} />
          <p>No payment records found.</p>
        </div>
      ) : (
        <div className={styles.paymentList}>
          {payments.map(p => (
            <div key={p.id} className={styles.paymentCard}>
              <div className={styles.payLeft}>
                <div className={styles.payMethodIcon}>
                  {p.payment_method === 'gcash' ? '📱' : p.payment_method === 'card' ? '💳' : '🏦'}
                </div>
                <div className={styles.payInfo}>
                  <h4 className={styles.payCat}>{p.category}</h4>
                  <div className={styles.payMeta}>
                    <code className={styles.orNum}>{p.or_number}</code>
                    <span className={styles.sep}>·</span>
                    <span>{format(new Date(p.payment_date), 'MMMM d, yyyy')}</span>
                    <span className={styles.sep}>·</span>
                    <span className={`${styles.methodBadge} ${styles[`method_${p.payment_method}`]}`}>
                      {p.payment_method === 'over_the_counter' ? 'Counter' : p.payment_method === 'gcash' ? 'GCash' : 'Card'}
                    </span>
                  </div>
                  {p.reference_number && (
                    <div className={styles.payRef}>Ref: {p.reference_number}</div>
                  )}
                </div>
              </div>
              <div className={styles.payRight}>
                <span className={styles.payAmount}>₱{p.amount.toLocaleString()}</span>
                <span className={`${styles.statusBadge} ${styles[`status_${p.status}`]}`}>{p.status}</span>
                <button className={styles.printBtn} onClick={() => handlePrint(p)} title="Print Receipt">
                  <FiPrinter />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}