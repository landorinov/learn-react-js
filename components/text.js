var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
switch(hari) {
    case 0: hari = "Minggu"; break;
    case 1: hari = "Senin"; break;
    case 2: hari = "Selasa"; break;
    case 3: hari = "Rabu"; break;
    case 4: hari = "Kamis"; break;
    case 5: hari = "Jum'at"; break;
    case 6: hari = "Sabtu"; break;
   }
switch(bulan) {
    case 0: bulan = "Januari"; break;
    case 1: bulan = "Februari"; break;
    case 2: bulan = "Maret"; break;
    case 3: bulan = "April"; break;
    case 4: bulan = "Mei"; break;
    case 5: bulan = "Juni"; break;
    case 6: bulan = "Juli"; break;
    case 7: bulan = "Agustus"; break;
    case 8: bulan = "September"; break;
    case 9: bulan = "Oktober"; break;
    case 10: bulan = "November"; break;
    case 11: bulan = "Desember"; break;
   }

export const defaultvalue = `<p>Nomor     : 261 /Poltek-PIS/PMB/IV/2022<br>Lampiran : -<br>Perihal     : Pendaftaran Mahasiswa Baru TA 2022/2023<br><br>Kepada yth;<br>FORMAT_NAMA_DARI_BE<br>FORMAT_SEKOLAH_DARI_BE<br>di <br>  Tempat<br><br>     Disampaikan dengan hormat, Panitia Penerimaan Mahasiswa Baru Politeknik Piksi Input Serang Tahun Akademik 2022/2023 memberikan penawaran kepada Anda sebagai calon mahasiswa baru Penerima Bantuan Mahasiswa melalui jalur pilihan terbaik sbb:<br>Jalur Reguler, merupakan jalur umum dalam penerimaan mahasiswa baru Politeknik Piksi Input Serang yang akan diberikan bantuan Beasiswa Peduli Banten atau Beasiswa Parsial dari Yayasan  Piksi Input Serang;<br>Jalur Beasiswa, Program KIP-Kuliah, merupakan :<br>Bantuan Program KIP-Kuliah dari Pemerintah RI;<br>Biaya Pendidikan dari Pemerintah RI bagi lulusan SMA/SMK/MA/Sederajat yang memiliki potensi akademik baik, namun memiliki keterbatasan ekonomi;<br>Mendapatkan Bantuan Biaya Hidup/Uang Saku sebesar Rp. 4.800.000,- ( Empat Juta Delapan Ratus Ribu Rupiah ) per semester;<br>Bersedia aktif mengikuti Pendidikan sampai lulus tepat waktu dan di Wisuda.<br>Jalur Reguler Karyawan, merupakan jalur kelas karyawan dalam penerimaan mahasiswa baru Politeknik Piksi Input Serang yang akan diberikan bantuan Beasiswa Parsial dari Yayasan Piksi Input Serang.<br>     Sehubungan dengan hal tersebut, apabila Anda berminat dan ingin Kuliah kami berikan kesempatan terbaik kepada anda untuk bergabung bersama Politeknik Piksi Input Serang dengan melakukan pendaftaran :<br>Melalui Link https://pmb.piksiinputserang.ac.id atau untuk informasi lebih lanjut dapat menghubungi WA 0812 1933 3386<br>Dengan pilihan program sudi yang ada :<br><br>PROGRAM SARJANA TERAPAN (S1/D4)<br>Akuntansi Perpajakan<br>Bisnis Digital<br>Rekayasa Keamanan Siber<br>PROGRAM DIPLOMA TIGA ( D3 )<br>Manajemen Informatika<br>Akuntansi<br>Sekretari<br>     Demikianlah informasi ini kami sampaikan, selamat memanfaatkan fasilitas dengan sebaik- baiknya dan raih kesempatan untuk sukses bersama Politeknik Piksi Input Serang.<br><br>Serang,     ${bulan} ${tahun}<br>Ketua Tim PMB<br><br><br><br>Yudiansyah Fauzi, S.Kom;M.Kom<br>NIDN : 04050592004<br></p>`