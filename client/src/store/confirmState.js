import { create } from 'zustand';

const initState = {
  title: '',
  children: '',
  action: () => {}
};

const useConfirmState = create((set, get) => ({
  confirmInfo: initState,
  show: false,
  showConfirm: (confirmInfo) => set({ confirmInfo, show: true }),
  hideConfirm: () => set({ confirmInfo: initState, show: false })
}));

const getConfirmState = () => useConfirmState.getState();
export { useConfirmState, getConfirmState };
