import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_PORTAL_STUDENTS } from '../data/mockData';

export const useStudentAuthStore = create(
  persist(
    (set) => ({
      student: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (studentId, password) => {
        set({ isLoading: true, error: null });
        await new Promise(r => setTimeout(r, 1000));
        const found = MOCK_PORTAL_STUDENTS.find(
          s => s.student_id === studentId && s.password === password && s.portal_activated && s.status === 'active'
        );
        if (found) {
          const { password: _, ...safeStudent } = found;
          set({ student: safeStudent, isAuthenticated: true, isLoading: false });
          return { success: true };
        }
        if (MOCK_PORTAL_STUDENTS.find(s => s.student_id === studentId && !s.portal_activated)) {
          set({ isLoading: false, error: 'Your portal account is not yet activated. Please check your email for the activation link.' });
          return { success: false, error: 'Account not yet activated.' };
        }
        set({ isLoading: false, error: 'Invalid Student ID or password.' });
        return { success: false, error: 'Invalid Student ID or password.' };
      },

      logout: () => set({ student: null, isAuthenticated: false, error: null }),
      clearError: () => set({ error: null }),
    }),
    { name: 'student-portal-auth', partialize: s => ({ student: s.student, isAuthenticated: s.isAuthenticated }) }
  )
);