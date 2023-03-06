import { useEffect, useState } from "react"
import { headers, url } from "../../lib/auth"
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import Modal from "../modal"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Kurikulum() {
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const [totalElements, setTotalElements] = useState("")
    const [pageCount, setpageCount] = useState(0);
    const [numberList, setnumberList] = useState(1);

    const [action, setAction] = useState("")

    const [kurikulums, setKurikulums] = useState([])
    const [prodis, setProdis] = useState([])
    const [startDate, setStartDate] = useState(new Date());

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [visibleDetail, setVisibleDetail] = useState(false)

    const [inputs, setInputs] = useState({
        id: "",
        nama: "",
        programStudi: 0,
        bobotMatkulPilihan: "",
        bobotMatkulWajib: "",
        tglMulaiEfektif: startDate,
    })
    const [errors, setErrors] = useState({
        nama: "",
        programStudi: "",
        bobotMatkulPilihan: "",
        bobotMatkulWajib: "",
        tglMulaiEfektif: "",
    })

    const [selectedDetail, setSelectedDetail] = useState({})

    useEffect(() => {
        getKurikulums()
        getProdis()
    }, [])

    const getKurikulums = async (e, i, a) => {
        const limitData = e;
        const activePage = i;
        const searchData = a;
        const host = `${url}/v1/kurikulum/list?page=${activePage !== undefined ? i : page}&size=${limitData !== undefined ? e : limit}&nama=${searchData !== undefined ? a : search}`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setKurikulums(newData.data.content)
            setTotalElements(newData.data.totalElements)

            const total = newData.data.totalElements;
            const size = newData.data.numberOfElements;
            setpageCount(Math.ceil(total / size));
        } else {
            console.log("err")
        }
    }

    const getProdis = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=program_studi`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setProdis(newData.data)
        } else {
            console.log("err")
        }
    }

    const showAction = (e, i) => {
        setAction(e)
        setErrors({
            nama: "",
            programStudi: "",
            bobotMatkulPilihan: "",
            bobotMatkulWajib: "",
            tglMulaiEfektif: "",
        })
        if (e == 'add') {
            setInputs({
                nama: "",
                programStudi: 0,
                bobotMatkulPilihan: "",
                bobotMatkulWajib: "",
                tglMulaiEfektif: convertDate(startDate),
            })
            setVisible(!visible)
        } else if (e == 'edit') {
            setInputs({
                id: i.id,
                nama: i.nama,
                programStudi: Number(i.programStudi?.id),
                bobotMatkulPilihan: i.bobotMatkulPilihan,
                bobotMatkulWajib: i.bobotMatkulWajib,
                tglMulaiEfektif: i.tglMulaiEfektif,
            })
            setVisibleEdit(!visible)
        } else if (e == 'detail') {
            setSelectedDetail(i)
            setVisibleDetail(!visibleDetail)
        } else {
            setSelectedDetail({
                id: i.id,
            })
            setVisibleDelete(!visible)
        }
    }

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({ ...values, [name]: value }))
        setErrors(values => ({ ...values, [name]: "" }))
    }
    const handleChangeSearch = e => {
        setSearch(e.target.value)
        getKurikulums(undefined, undefined, e.target.value)
    }
    const handleChangeLimit = e => {
        setLimit(e.target.value)
        setPage(0)
        getKurikulums(e.target.value, undefined, undefined)
    }
    const handleModal = () => {
        setVisibleDelete(false)
    }

    const convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
    }

    const postKurikulum = async () => {
        setLoading(true)
        const dataSchool = {
            nama: inputs.nama,
            programStudi: { id: Number(inputs.programStudi) },
            bobotMatkulPilihan: inputs.bobotMatkulPilihan,
            bobotMatkulWajib: inputs.bobotMatkulWajib,
            tglMulaiEfektif: inputs.tglMulaiEfektif,
        }

        const host = `${url}/v1/kurikulum/save`
        await fetch(host, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(dataSchool),
        })
            .then(res => res.json())
            .then((data) => {
                console.log('Success:', data);
                toast("Successfully added!");
                getKurikulums()
                setLoading(false)
                setVisible(!visible)
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false)
            });
    }
    const editKurikulum = async () => {
        setLoading(true)
        const dataSchool = {
            id: inputs.id,
            nama: inputs.nama,
            programStudi: { id: Number(inputs.programStudi) },
            bobotMatkulPilihan: inputs.bobotMatkulPilihan,
            bobotMatkulWajib: inputs.bobotMatkulWajib,
            tglMulaiEfektif: inputs.tglMulaiEfektif,
        }

        const host = `${url}/v1/kurikulum/update`
        await fetch(host, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(dataSchool),
        })
            .then(res => res.json())
            .then((data) => {
                console.log('Success:', data);
                toast("Successfully updated!");
                getKurikulums()
                setLoading(false)
                setVisibleEdit(false)
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false)
            });
    }
    const deleteKurikulum = async () => {
        setLoading(true)
        const dataKuliah = {
            id: selectedDetail.id
        }

        const host = `${url}/v1/kurikulum/delete`
        await fetch(host, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(dataKuliah),
        })
            .then(res => res.json())
            .then((data) => {
                console.log('Success:', data);
                toast("Successfully deleted!");
                getKurikulums()
                setLoading(false)
                setVisibleDelete(false)
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false)
            });
    }

    const fetchItems = async (currentPage) => {
        const res = await fetch(
            `${url}/v1/kurikulum/list?page=${currentPage - 1}&size=${limit}`,
            { headers }
        );
        const data = await res.json();
        return data.data.content;
    };
    const handleClick = async (data) => {
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchItems(currentPage);
        setKurikulums(commentsFormServer);
        if (currentPage !== 1) {
            setnumberList(limit * currentPage - limit + 1);
        } else {
            setnumberList(1);
        }
    };

    return (
        <>
            <div className="body flex-grow-1 px-3">
                <div className="container-lg">
                    <div className="car"></div>
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <div className="mt-2 p-2">
                                    <strong>List</strong><span className="small ms-1">Kurikulum, Total data <strong>{totalElements}</strong></span>
                                </div>
                                <div className="p-2">
                                    <button type="button" className="btn btn-primary float-right" onClick={() => showAction('add')}>
                                        <span className="cil-contrast btn-icon mr-2"></span> + Add data
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="col-auto">
                                    <select className="form-select" name="search" value={limit} onChange={handleChangeLimit}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="500">500</option>
                                    </select>
                                </div>

                                <div className="col-auto">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="search"
                                        aria-describedby="emailHelp"
                                        name="search"
                                        value={search || ""}
                                        placeholder="Search"
                                        onChange={handleChangeSearch}
                                    />
                                </div>
                            </div>

                            <div className="table-responsive mt-3">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Program Studi</th>
                                            <th scope="col">Bobot MK Pilihan</th>
                                            <th scope="col">Bobot MK Wajib</th>
                                            <th scope="col">Jumlah SKS</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            kurikulums.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + numberList}</th>
                                                    <td>{item.nama}</td>
                                                    <td>{item.programStudi?.nama}</td>
                                                    <td>{item.bobotMatkulPilihan}</td>
                                                    <td>{item.bobotMatkulWajib}</td>
                                                    <td>{item.jumlahSks}</td>
                                                    <td>
                                                        <span className="m-2">
                                                            <button type="button" className="btn btn-sm btn-success" onClick={() => showAction('edit', item)}>
                                                                <span className="cil-contrast btn-icon mr-2"></span> Edit
                                                            </button>
                                                        </span>
                                                        <button type="button" className="btn btn-sm btn-danger" onClick={() => showAction('delete', item)}>
                                                            <span className="cil-contrast btn-icon mr-2"></span> Delete
                                                        </button>
                                                        <span className="m-2">
                                                            <button type="button" className="btn btn-sm btn-info" onClick={() => showAction('detail', item)}>
                                                                <span className="cil-contrast btn-icon mr-2"></span> Detail
                                                            </button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={handleClick}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />

                        </div>
                    </div>
                </div>
            </div>

            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama</label>
                        <input
                            type="text"
                            id="nama"
                            name="nama"
                            value={inputs.nama || ""}
                            onChange={handleChange}
                            placeholder="Input Nama"
                            className={`form-control ${errors.nama ? "is-invalid" : ""}`}
                        />
                        {errors.nama ? (
                            <div className="invalid-feedback">
                                Masukan nama.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="programStudi" className="form-label">Program Studi</label>
                        <select
                            type="text"
                            id="prodi"
                            name="programStudi"
                            value={inputs.programStudi || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.programStudi ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {prodis.content?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.programStudi ? (
                            <div className="invalid-feedback">
                                Pilih program studi.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bobotMatkulPilihan" className="form-label">Bobot Mata Kuliah Pilihan</label>
                        <input
                            type="text"
                            id="bobotMatkulPilihan"
                            name="bobotMatkulPilihan"
                            value={inputs.bobotMatkulPilihan || ""}
                            onChange={handleChange}
                            placeholder="Input Bobot Mata Kuliah Pilihan"
                            className={`form-control ${errors.bobotMatkulPilihan ? "is-invalid" : ""}`}
                        />
                        {errors.bobotMatkulPilihan ? (
                            <div className="invalid-feedback">
                                Masukan Bobot Mata Kuliah Pilihan.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bobotMatkulWajib" className="form-label">Bobot Mata Kuliah Wajib</label>
                        <input
                            type="text"
                            id="bobotMatkulWajib"
                            name="bobotMatkulWajib"
                            value={inputs.bobotMatkulWajib || ""}
                            onChange={handleChange}
                            placeholder="Input Bobot Mata Kuliah Wajib"
                            className={`form-control ${errors.bobotMatkulWajib ? "is-invalid" : ""}`}
                        />
                        {errors.bobotMatkulWajib ? (
                            <div className="invalid-feedback">
                                Masukan Bobot Mata Kuliah Wajib.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <label htmlFor="mode" className="form-label">Tanggal Mulai Efektif</label>
                                <DatePicker className="px-2" selected={startDate} dateFormat={'dd/MM/yy'} onChange={(date) => setStartDate(date)} />
                            </div>
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    {loading ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                    ) : (
                        <CButton color="primary" onClick={() => postKurikulum()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                <CModalHeader>
                    <CModalTitle>Edit data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama</label>
                        <input
                            type="text"
                            id="nama"
                            name="nama"
                            value={inputs.nama || ""}
                            onChange={handleChange}
                            placeholder="Input Nama"
                            className={`form-control ${errors.nama ? "is-invalid" : ""}`}
                        />
                        {errors.nama ? (
                            <div className="invalid-feedback">
                                Masukan nama.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="programStudi" className="form-label">Program Studi</label>
                        <select
                            type="text"
                            id="prodi"
                            name="programStudi"
                            value={inputs.programStudi || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.programStudi ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {prodis.content?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.programStudi ? (
                            <div className="invalid-feedback">
                                Pilih program studi.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bobotMatkulPilihan" className="form-label">Bobot Mata Kuliah Pilihan</label>
                        <input
                            type="text"
                            id="bobotMatkulPilihan"
                            name="bobotMatkulPilihan"
                            value={inputs.bobotMatkulPilihan || ""}
                            onChange={handleChange}
                            placeholder="Input Bobot Mata Kuliah Pilihan"
                            className={`form-control ${errors.bobotMatkulPilihan ? "is-invalid" : ""}`}
                        />
                        {errors.bobotMatkulPilihan ? (
                            <div className="invalid-feedback">
                                Masukan Bobot Mata Kuliah Pilihan.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bobotMatkulWajib" className="form-label">Bobot Mata Kuliah Wajib</label>
                        <input
                            type="text"
                            id="bobotMatkulWajib"
                            name="bobotMatkulWajib"
                            value={inputs.bobotMatkulWajib || ""}
                            onChange={handleChange}
                            placeholder="Input Bobot Mata Kuliah Wajib"
                            className={`form-control ${errors.bobotMatkulWajib ? "is-invalid" : ""}`}
                        />
                        {errors.bobotMatkulWajib ? (
                            <div className="invalid-feedback">
                                Masukan Bobot Mata Kuliah Wajib.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <label htmlFor="mode" className="form-label">Tanggal Mulai Efektif</label>
                                <DatePicker className="px-2" selected={startDate} dateFormat={'dd/MM/yy'} onChange={(date) => setStartDate(date)} />
                            </div>
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                        Close
                    </CButton>
                    {loading ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                    ) : (
                        <CButton color="primary" onClick={() => editKurikulum()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CModal visible={visibleDetail} onClose={() => setVisibleDetail(false)}>
                <CModalHeader>
                    <CModalTitle>Detail data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama : {selectedDetail?.nama}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Program Studi : {selectedDetail?.programStudi?.nama}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Bobot MK Pilihan : {selectedDetail?.bobotMatkulPilihan}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Bobot MK Wajib : {selectedDetail?.bobotMatkulWajib}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Jumlah SKS : {selectedDetail?.jumlahSks}</label>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleDetail(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>

            <Modal
                title={action}
                visibleDeletex={visibleDelete}
                setVisibleDeletex={handleModal}
                deleteKurikulumx={deleteKurikulum}
                loadingx={loading}
            />

            <ToastContainer />
        </>
    )
}