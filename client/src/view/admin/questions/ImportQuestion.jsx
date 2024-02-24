import {Import} from "@components/base";
import {importQuestionApi} from "@api";

const ImportQuestion = (props) => {
    const {show, setShow, setParams} = props

    return <Import action={importQuestionApi} handleSuccess={() => setParams(pre => ({...pre, render: !pre.render}))}
                   title={'câu hỏi'} template={'/import-question.xlsx'} show={show} setShow={setShow}/>
}

export default ImportQuestion;