import { useEffect, useState } from "react"
import { headers, url } from "../../lib/auth"
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import Modal from "../modal"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Kelas() {
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const [totalElements, setTotalElements] = useState("")
    const [pageCount, setpageCount] = useState(0);
    const [numberList, setnumberList] = useState(1);

    const [action, setAction] = useState("")

    const [kelass, setKelass] = useState([])
    const [prodis, setProdis] = useState([])
    const [semesters, setSemesters] = useState([])
    const [mataKuliahs, setMataKuliahs] = useState([])
    const [lingkups, setLingkups] = useState([])
    const [modes, setModes] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [visibleDetail, setVisibleDetail] = useState(false)

    const [inputs, setInputs] = useState({
        id: "",
        nama: "",
        programStudi: { id: 0 },
        semester: { id: 0 },
        mataKuliah: { id: 0 },
        lingkup: { id: 0 },
        mode: { id: 0 },
        tglMulaiEfektif: startDate,
        tglAkhirEfektif: endDate
    })
    const [errors, setErrors] = useState({
        nama: "",
        programStudi: "",
        semester: "",
        mataKuliah: "",
        lingkup: "",
        mode: "",
        tglMulaiEfektif: "",
        tglAkhirEfektif: "",
    })

    const [selectedDetail, setSelectedDetail] = useState({})

    useEffect(() => {
        getKelass()
        getProdis()
        getSemesters()
        getMataKuliahs()
        getLingkups()
        getModes()
    }, [])

    const getKelass = async (e, i, a) => {
        const limitData = e;
        const activePage = i;
        const searchData = a;
        const host = `${url}/v1/kelas/list?page=${activePage !== undefined ? i : page}&size=${limitData !== undefined ? e : limit}&nama=${searchData !== undefined ? a : search}`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setKelass(newData.data.content)
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

    const getSemesters = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=semester`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setSemesters(newData.data)
        } else {
            console.log("err")
        }
    }

    const getMataKuliahs = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=jenis_mata_kuliah`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setMataKuliahs(newData.data)
        } else {
            console.log("err")
        }
    }

    const getLingkups = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=lingkup_kelas`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setLingkups(newData.data)
        } else {
            console.log("err")
        }
    }

    const getModes = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=mode_kelas`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setModes(newData.data)
        } else {
            console.log("err")
        }
    }

    const showAction = (e, i) => {
        setAction(e)
        setErrors({
            nama: "",
            wilayah: ""
        })
        if (e == 'add') {
            setInputs({
                nama: "",
                programStudi: { id: 0 },
                semester: { id: 0 },
                mataKuliah: { id: 0 },
                lingkup: { id: 0 },
                mode: { id: 0 },
                tglMulaiEfektif: startDate,
                tglAkhirEfektif: endDate
            })
            setVisible(!visible)
        } else if (e == 'edit') {
            setInputs({
                id: i.id,
                nama: i.nama,
                programStudi: { id: i.programStudi?.id },
                semester: { id: i.semester?.id },
                mataKuliah: { id: i.mataKuliah?.id },
                lingkup: { id: i.lingkup?.id },
                mode: { id: i.mode?.id },
                tglMulaiEfektif: i.tglMulaiEfektif,
                tglAkhirEfektif: i.tglAkhirEfektif,
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
        console.log(inputs);
    }

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({ ...values, [name]: value }))
        setErrors(values => ({ ...values, [name]: "" }))
    }
    const handleChangeSearch = e => {
        setSearch(e.target.value)
        getKelass(undefined, undefined, e.target.value)
    }
    const handleChangeLimit = e => {
        setLimit(e.target.value)
        setPage(0)
        getKelass(e.target.value, undefined, undefined)
    }
    const handleModal = () => {
        setVisibleDelete(false)
    }

    const postKelas = async () => {
        setLoading(true)
        // if (inputs.nama === '' || inputs.wilayah === '') {
        //     const name = ['nama', 'wilayah']
        //     if (inputs.nama == '' && inputs.wilayah == '') {
        //         for (let i = 0; i < name.length; i++) {
        //             setErrors(values => ({ ...values, [name[i]]: "Required" }))
        //         }
        //         setLoading(false)
        //     } else if (inputs.nama == '') {
        //         setErrors(values => ({ ...values, nama: "Required" }))
        //         setLoading(false)
        //     } else {
        //         setErrors(values => ({ ...values, wilayah: "Required" }))
        //         setLoading(false)
        //     }
        // } else {
        const dataKelas = {
            nama: inputs.nama,
            programStudi: inputs.programStudi,
            semester: inputs.semester,
            mataKuliah: inputs.mataKuliah,
            lingkup: inputs.lingkup,
            mode: inputs.mode,
            tglMulaiEfektif: inputs.tglMulaiEfektif,
            tglAkhirEfektif: inputs.tglAkhirEfektif
        }

        console.log(dataKelas);

        // const host = `${url}/v1/kelas/save`
        // await fetch(host, {
        //     method: "POST",
        //     headers: headers,
        //     body: JSON.stringify(dataKelas),
        // })
        //     .then(res => res.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //         toast("Successfully added!");
        //         getKelass()
        //         setLoading(false)
        //         setVisible(!visible)
        //     })
        //     .catch((err) => {
        //         console.error('Error:', err);
        //         setLoading(false)
        //     });

        // }
    }
    const editKelas = async () => {
        setLoading(true)
        const dataKelas = {
            id: inputs.id,
            nama: inputs.nama,
            programStudi: inputs.programStudi,
            semester: inputs.semester,
            mataKuliah: inputs.mataKuliah,
            lingkup: inputs.lingkup,
            mode: inputs.mode,
            tglMulaiEfektif: inputs.tglMulaiEfektif,
            tglAkhirEfektif: inputs.tglAkhirEfektif
        }

        const host = `${url}/v1/kelas/update`
        await fetch(host, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(dataKelas),
        })
            .then(res => res.json())
            .then((data) => {
                console.log('Success:', data);
                toast("Successfully updated!");
                getKelass()
                setLoading(false)
                setVisibleEdit(false)
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false)
            });
    }
    const deleteKelas = async () => {
        setLoading(true)
        const dataKuliah = {
            id: selectedDetail.id
        }

        const host = `${url}/v1/kelas/delete`
        await fetch(host, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(dataKuliah),
        })
            .then(res => res.json())
            .then((data) => {
                console.log('Success:', data);
                toast("Successfully deleted!");
                getKelass()
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
            `${url}/v1/kelas/list?page=${currentPage - 1}&size=${limit}`,
            { headers }
        );
        const data = await res.json();
        return data.data.content;
    };
    const handleClick = async (data) => {
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchItems(currentPage);
        setKelass(commentsFormServer);
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
                                    <strong>List</strong><span className="small ms-1">Kelas, Total data <strong>{totalElements}</strong></span>
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
                                            <th scope="col">Mata Kuliah</th>
                                            <th scope="col">Bobot MK</th>
                                            <th scope="col">Bobot Praktikum</th>
                                            <th scope="col">Bobot Simulasi</th>
                                            <th scope="col">Bobot Tatap Muka</th>
                                            <th scope="col">Bobot Praktek Lapangan</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            kelass.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + numberList}</th>
                                                    <td>{item.nama}</td>
                                                    <td>{item.mataKuliah.programStudi.nama}</td>
                                                    <td>{item.mataKuliah.bobotMatkul}</td>
                                                    <td>{item.mataKuliah.bobotPratikum}</td>
                                                    <td>{item.mataKuliah.bobotSimulasi}</td>
                                                    <td>{item.mataKuliah.bobotTatapMuka}</td>
                                                    <td>{item.mataKuliah.bobotPraktekLapangan}</td>
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
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.wilayah ? (
                            <div className="invalid-feedback">
                                Pilih program studi.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="semester" className="form-label">Semester</label>
                        <select
                            type="text"
                            id="semester"
                            name="semester"
                            value={inputs.semester || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.semester ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {semesters.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.semester ? (
                            <div className="invalid-feedback">
                                Pilih semester.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mataKuliah" className="form-label">Mata Kuliah</label>
                        <select
                            type="text"
                            id="mataKuliah"
                            name="mataKuliah"
                            value={inputs.mataKuliah || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.mataKuliah ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {mataKuliahs.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.mataKuliah ? (
                            <div className="invalid-feedback">
                                Pilih mata kuliah.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lingkup" className="form-label">Lingkup Kelas</label>
                        <select
                            type="text"
                            id="lingkup"
                            name="lingkup"
                            value={inputs.lingkup || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.lingkup ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {lingkups.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.lingkup ? (
                            <div className="invalid-feedback">
                                Pilih lingkup kelas.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mode" className="form-label">Mode Kelas</label>
                        <select
                            type="text"
                            id="mode"
                            name="mode"
                            value={inputs.mode || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.mode ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {modes.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.mode ? (
                            <div className="invalid-feedback">
                                Pilih mode kelas.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="mode" className="form-label">Tanggal Mulai Efektif</label>
                                <DatePicker className="px-2" selected={startDate} dateFormat={'dd/MM/yy'} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="mode" className="form-label">Tanggal Akhir Efektif</label>
                                <DatePicker className="px-2" selected={endDate} dateFormat={'dd/MM/yy'} onChange={(date) => setEndDate(date)} />
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
                        <CButton color="primary" onClick={() => postKelas()}>Save</CButton>
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
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.wilayah ? (
                            <div className="invalid-feedback">
                                Pilih program studi.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="semester" className="form-label">Semester</label>
                        <select
                            type="text"
                            id="semester"
                            name="semester"
                            value={inputs.semester || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.semester ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {semesters.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.semester ? (
                            <div className="invalid-feedback">
                                Pilih semester.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mataKuliah" className="form-label">Mata Kuliah</label>
                        <select
                            type="text"
                            id="mataKuliah"
                            name="mataKuliah"
                            value={inputs.mataKuliah || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.mataKuliah ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {mataKuliahs.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.mataKuliah ? (
                            <div className="invalid-feedback">
                                Pilih mata kuliah.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lingkup" className="form-label">Lingkup Kelas</label>
                        <select
                            type="text"
                            id="lingkup"
                            name="lingkup"
                            value={inputs.lingkup || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.lingkup ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {lingkups.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.lingkup ? (
                            <div className="invalid-feedback">
                                Pilih lingkup kelas.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mode" className="form-label">Mode Kelas</label>
                        <select
                            type="text"
                            id="mode"
                            name="mode"
                            value={inputs.mode || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.mode ? "is-invalid" : ""}`}
                        >
                            <option value="">Select...</option>
                            {modes.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>
                        {errors.mode ? (
                            <div className="invalid-feedback">
                                Pilih mode kelas.
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="mode" className="form-label">Tanggal Mulai Efektif</label>
                                <DatePicker className="px-2" selected={startDate} dateFormat={'dd/MM/yy'} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="mode" className="form-label">Tanggal Akhir Efektif</label>
                                <DatePicker className="px-2" selected={endDate} dateFormat={'dd/MM/yy'} onChange={(date) => setEndDate(date)} />
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
                        <CButton color="primary" onClick={() => editKelas()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CModal visible={visibleDetail} onClose={() => setVisibleDetail(false)}>
                <CModalHeader>
                    <CModalTitle>Detail data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Mata Kuliah : {selectedDetail?.mataKuliah?.programStudi?.nama}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Semester : {selectedDetail?.semester?.nama}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Bobot MK : {selectedDetail?.mataKuliah?.bobotMatkul}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Bobot Praktikum : {selectedDetail?.mataKuliah?.bobotPratikum}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Bobot Simulasi : {selectedDetail?.mataKuliah?.bobotSimulasi}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Bobot Tatap Muka : {selectedDetail?.mataKuliah?.bobotTatapMuka}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Bobot Praktek Lapangan : {selectedDetail?.mataKuliah?.bobotPraktekLapangan}</label>
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
                deleteKelasx={deleteKelas}
                loadingx={loading}
            />

            <ToastContainer />
        </>
    )
}