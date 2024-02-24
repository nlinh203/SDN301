import React from 'react';
import { Button, Hr, Modal } from '../uiCore';
import { useConfirmState } from '@store';

const ConfirmModal = () => {
  const { confirmInfo = {}, show, hideConfirm } = useConfirmState();

  return (
    <Modal
      size="md"
      show={show}
      setShow={hideConfirm}
      title="Coursera Replica"
      theme={{ wrapperPositionDefault: 'relative w-auto top-48' }}
      wrapper={'fixed left-0 top-0 z-[1100] h-full w-full overflow-y-auto overflow-x-hidden outline-none'}
    >
      <div className="p-6">{confirmInfo.title || 'Bạn có chắc chắn muốn tiếp tục?'}</div>
      <Hr />
      <div className="flex gap-2 justify-end py-4 mr-4">
        <Button label="Hủy" severity="secondary" onClick={() => hideConfirm()} />
        <Button
          label="Xác nhận"
          onClick={async () => {
            await confirmInfo?.action();
            hideConfirm();
          }}
        />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
