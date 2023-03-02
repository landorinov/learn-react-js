import { useEffect, useState } from "react"
import { headers, url } from "../../lib/auth"
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import Modal from "../modal"

export default function Kelas() {
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const [totalElements, setTotalElements] = useState("")
    const [pageCount, setpageCount] = useState(0);
    const [numberList, setnumberList] = useState(1);

    const [action, setAction] = useState("")
    const [kelass, setKelass] = useState([])
    // const [regions, setRegions] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [visibleDetail, setVisibleDetail] = useState(false)

    const [inputs, setInputs] = useState({
        id: "",
        nama: "",
        wilayah: ""
    })
    const [errors, setErrors] = useState({
        nama: "",
        wilayah: ""
    })

    const [selectedDetail, setSelectedDetail] = useState({})
    // const [selectedDetail, setSelectedDetail] = useState({
    //     kode: "",
    //     nama: "",
    //     bobot: "",
    //     programStudi: "",
    //     jenisMatkul: ""
    // })

    useEffect(() => {
        getKelass()
        // getRegions()
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

    // const getRegions = async () => {
    //     const host = `${url}/v1/lookup/list?page=0&size=10&type=wilayah_sekolah`
    //     const res = await fetch(host, { headers }).catch(err => console.error(err))
    //     if (res?.ok) {
    //         const newData = await res.json()
    //         setRegions(newData.data)
    //     } else {
    //         console.log("err")
    //     }
    // }

    const showAction = (e, i) => {
        setAction(e)
        setErrors({
            nama: "",
            wilayah: ""
        })
        if (e == 'add') {
            setInputs({
                nama: "",
                wilayah: ""
            })
            setVisible(!visible)
        } else if (e == 'edit') {
            setSelectedDetail({
                id: i.id,
            })
            setVisibleEdit(!visible)
        } else if (e == 'detail') {
            setSelectedDetail(i)
            // setSelectedDetail({
            //     kode: i.kode,
            //     nama: i.nama,
            //     bobot: i.bobotMatkul,
            //     programStudi: i.programStudi.nama,
            //     jenisMatkul: i.jenisMatkul.nama
            // })
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
        if (inputs.nama === '' || inputs.wilayah === '') {
            const name = ['nama', 'wilayah']
            if (inputs.nama == '' && inputs.wilayah == '') {
                for (let i = 0; i < name.length; i++) {
                    setErrors(values => ({ ...values, [name[i]]: "Required" }))
                }
                setLoading(false)
            } else if (inputs.nama == '') {
                setErrors(values => ({ ...values, nama: "Required" }))
                setLoading(false)
            } else {
                setErrors(values => ({ ...values, wilayah: "Required" }))
                setLoading(false)
            }
        } else {
            const dataSchool = {
                nama: inputs.nama,
                wilayah: inputs.wilayah,
            }

            const host = `${url}/v1/kelas/save`
            await fetch(host, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(dataSchool),
            })
                .then(res => res.json())
                .then((data) => {
                    console.log('Success:', data);
                    toast("Successfully added!");
                    getKelass()
                    setLoading(false)
                    setVisible(!visible)
                })
                .catch((err) => {
                    console.error('Error:', err);
                    setLoading(false)
                });
        }
    }
    const editKelas = async () => {
        setLoading(true)
        const dataSchool = {
            id: inputs.id,
            nama: inputs.nama,
            wilayah: inputs.wilayah,
        }

        const host = `${url}/v1/kelas/update`
        await fetch(host, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(dataSchool),
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
                                            <th scope="col">Mata Kuliah</th>
                                            <th scope="col">Semester</th>
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
                                                    <td>{item.mataKuliah.programStudi.nama}</td>
                                                    <td>{item.semester.nama}</td>
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
                        <label htmlFor="wilayah" className="form-label">Wilayah</label>
                        <input
                            type="text"
                            className="form-control"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                            placeholder="Input Wilayah"
                        />
                        {errors.wilayah ? (
                            <div className="invalid-feedback">
                                Masukan Wilayah.
                            </div>
                        ) : (
                            ""
                        )}
                        {/* <select
                            type="text"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.wilayah ? "is-invalid" : ""}`}
                            >
                                <option value="">Select...</option>
                                {regions.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                                ))}
                            </select>
                            {errors.wilayah ? (
                               <div className="invalid-feedback">
                                     Pilih kecamatan.
                                </div>
                            ) : (
                                ""
                            )} */}
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
                        <label htmlFor="nama" className="form-label">Nama Sekolah</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nama"
                            name="nama"
                            value={inputs.nama || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wilayah" className="form-label">Wilayah</label>
                        <input
                            type="text"
                            className="form-control"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                        />
                        {/* <select
                            type="text"
                            className="form-select"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                            >
                             <option value="">Select...</option>
                                {regions.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                                ))}
                            </select> */}
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
                        <label htmlFor="nama" className="form-label">Mata Kuliah : {selectedDetail?.mataKuliah?.programStudi.nama}</label>
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