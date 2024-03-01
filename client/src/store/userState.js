import { create } from 'zustand';

const initState = {
  username: '',
  fullName: '',
  email: '',
  bio: '',
  address: '',
  role: '',
  courses: [],
  posts: []
};

const useUserState = create((set, get) => ({
  userInfo: initState,
  isAuthenticated: false,
  role: false,
  setUserInfo: (userInfo) => set({ userInfo, isAuthenticated: true, role: userInfo?.role }),
  clearUserInfo: () => set({ userInfo: initState, isAuthenticated: false, role: false })
}));

const getUserState = () => useUserState.getState();
export { useUserState, getUserState };
