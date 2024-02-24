import React, {useCallback, useEffect, useState} from 'react'
import {removeSpecialCharacter} from '@utils'
import {useToastState} from "@store";
import {Button, Hr, Link, Modal} from "@components/uiCore";
import {useDropzone} from "react-dropzone";
import {FiUpload} from "react-icons/fi";
import {Loading} from "@components/base/index";

const Import = (props) => {
    const {showToast} = useToastState();
    const {
        title, action, template, show, setShow, handleSuccess = () => {
        }
    } = props
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectFile, setSelectFile] = useState('')

    const onDrop = useCallback(
        (acceptedFiles) => {
            const name = acceptedFiles[0]?.name
            const isExcelFile = /\.(xlsx|xls)$/i.test(name);
            if (!isExcelFile) {
                showToast({title: 'Vui lòng chỉ chọn file excel!', severity: 'error'});
                return
            }
            setFile(acceptedFiles);
            setSelectFile(name);
        },
        [file]
    );

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    useEffect(() => {
        if (!show) {
            setFile(null)
            setSelectFile('')
        }
    }, [show])

    async function fetchDataSubmit(info) {

    }

    const onSubmit = async () => {
        if (file) {
            let info = {formData: {file}}
            setLoading(true)
            const response = await action(info)
            setLoading(false)
            if (response) {
                handleSuccess()
                const downloadLink = document.createElement('a')
                downloadLink.href = URL.createObjectURL(response)
                downloadLink.download = (title && `ket-qua-import-${removeSpecialCharacter(title)}.xlsx`) || 'data.xlsx'
                downloadLink.click()
                showToast({title: `Import ${title} thành công!`, severity: 'success'});
            }
        } else showToast({title: 'Vui lòng chọn file excel!', severity: 'error'});
    }

    return (
        <Modal size="lg" show={show} setShow={setShow} title={'Import ' + title}>
            <div className="justify-content-center text-center py-6">
                <input {...getInputProps()} className="cursor-pointer"/>
                <div className={'flex justify-center'}>
                    <div className={'w-[200px] cursor-pointer'} {...getRootProps()}>
                        <Button><FiUpload size={20}/> Chọn file</Button>
                    </div>
                </div>
                {selectFile && <div className={'mt-2'}>Select file: {selectFile}</div>}
            </div>
            <Hr/>
            <div className="flex gap-2 justify-center py-4 mr-4">
                <Button label="Hủy" severity="secondary" onClick={() => setShow(false)}/>
                <Button label="Bỏ chọn file" severity="danger" onClick={() => {
                    setFile(null)
                    setSelectFile('')
                }}/>
                <Button
                    onClick={async () => await onSubmit()}
                    disabled={loading}
                >{loading && <Loading size={4} severity="neutral"/>} Xác nhận</Button>
                <Link to={process.env.REACT_APP_API_URL + '/import' + template}>
                    <Button label="Tải file mẫu"/>
                </Link>
            </div>
        </Modal>

    )
}

export default Import
