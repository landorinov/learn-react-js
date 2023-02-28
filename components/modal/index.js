import { 
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react'

export default function Modal(props) {
    const capitalize = e => e && e[0].toUpperCase() + e.slice(1)
    return (
        <>
            <CModal visible={props.visibleDeletex} onClose={props.setVisibleDeletex}>
                <CModalHeader>
                    <CModalTitle>{capitalize(props.title)} data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                   <p>Apakah Anda yakin akan menghapus data ini?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={props.setVisibleDeletex}>
                    Close
                    </CButton>
                    {props.loadingx ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>                           
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                        ) : (
                        <CButton color="primary" onClick={props.deleteSchoolx}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>
        </>
    )
}