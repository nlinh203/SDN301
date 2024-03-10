import React from 'react';
import {Button, Hr, Modal} from '@components/uiCore';
import {Loading} from '@components/base';
import {useToastState} from '@store';
import {useNavigate} from "react-router-dom";

const Wrapper = ({isModal, children, title, show, setShow, size}) => {
    if (isModal) return <Modal title={title} show={show} setShow={setShow} size={size}>{children}</Modal>
    else return <div className="bg-white rounded-lg shadow-xl">
        {title &&
            <h2 className="font-semibold uppercase leading-normal pt-6 px-6 text-neutral-800 dark:text-neutral-200">{title}</h2>}
        {children}
    </div>
}

const FormDetail = (props) => {
    const navigate = useNavigate()
    const {showToast} = useToastState();
    const {
        type = 'modal',
        title,
        children,
        show,
        setShow = () => {
        },
        isUpdate,
        insertApi,
        updateApi,
        handleData = () => {
        },
        handleSubmit = () => {
        },
        setParams = () => {
        },
        onSuccess = () => {},
        size
    } = props;
    const isModal = type === 'modal'
    const newTitle = `${isUpdate ? 'Cập nhật' : 'Thêm mới'} ${title && String(title).toLocaleLowerCase()}`;

    const onSubmit = async (e) => {

    };

    return (
        <Wrapper title={newTitle} isModal={isModal} show={show} setShow={setShow} size={size}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                    <div className="card relative">
                        {false && (
                            <div
                                className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
                                <Loading size={8} border={4} severity="secondary"/>
                            </div>
                        )}
                        {children}
                    </div>
                </div>
                <Hr/>
                <div className="flex gap-2 justify-end px-6 py-4">
                    <Button label={isModal ? 'Hủy' : 'Trở lại'} severity="secondary" onClick={() => {
                        if (isModal) setShow(false)
                        else navigate(-1)
                    }}/>
                    <Button type="submit" label="Xác nhận"/>
                </div>
            </form>
        </Wrapper>
    );
};

export default FormDetail;
