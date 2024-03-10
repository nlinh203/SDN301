import { create } from 'zustand';

const useDataState = create((set, get) => ({
  courses: [],
  lessons: [],
  users: [],
  setUsers: (users) => set({ users }),
  setCourses: (courses) => set({ courses }),
  setLessons: (lessons) => set({ lessons })
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
