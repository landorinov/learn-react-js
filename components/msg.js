var date = new Date();
var YYYY = date.getFullYear();
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

export const defaultvalue = `<p><span style="font-size:15px;font-family:Arial;color:#222222;background-color:#ffffff"><br>
    </span></p>
    <div style="display: flex;">
<div class="se-component se-image-container __se__float-left" contenteditable="false">
        <img src="http://localhost:8081/api/showFile/tmp/logo_piksi.jpeg" alt="" data-rotate=""
            data-proportion="true" data-rotatex="" data-rotatey="" data-size="128px,139px" data-align="left"
            data-index="3" data-file-name="logo_piksi.jpeg" data-file-size="0" data-origin=","
            style="width: 128px; height: 139px;">
</div>
<p style="margin-left: 20px;margin-top: 0;">
    <span
        style="font-family: Arial; background-color: rgb(255, 255, 255); color: rgb(0, 85, 255); font-size: 26px;"><strong>POLITEKNIK</strong>
    </span><span style="color: rgb(0, 85, 255);"><br></span>
    <span
        style="font-family: Arial; background-color: rgb(255, 255, 255); color: rgb(0, 85, 255); font-size: 26px;"><strong>
            PIKSI INPUT SERANG</strong>
    </span><span style="color: rgb(0, 85, 255);"></span><br><span
        style="font-size:15px;font-family:Arial;color:#222222;background-color:#ffffff"> </span>
    <span
        style="font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-size: 12px;">SK.Mendiknas
        No.133/D/0/2001 Akreditasi Institusi No. 1244/SK/BAN-PT/Ak-KP/PT/iX/2022</span><br>
    <span style="font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-size: 12px;">
        Jl. Raya Cilegon-Serang KM. 08 Kramatwatu Kabupaten Serang Telp 081293333386</span><br>
    <span style="font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-size: 12px;">
        Email:<a href="http://localhost:3000/social/admin@piksiinputserang.ac.id" alt="admin@piksiinputserang.ac.id"
            class="on">admin@piksiinputserang.ac.id</a> Website: <a href="http://www.piksiinputserang.ac.id"
            alt="www.piksiinputserang.ac.id">www.piksiinputserang.ac.id</a></span>
</p>
</div>
<hr class="__se__solid">
<p><span
        style="font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align); font-size: 15px; font-family: Arial; color: rgb(34, 34, 34);">Nomor&nbsp;
        &nbsp; &nbsp; :&nbsp; &nbsp;033&nbsp; /Poltek-PIS/PMB/II/</span><span
        style="font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align); font-size: 15px; font-family: Arial; color: rgb(34, 34, 34);">${YYYY}</span><br>
</p>
<p><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Lampiran&nbsp; : -</span>
</p>
<p><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Perihal&nbsp; &nbsp; &nbsp;
        :&nbsp;</span>
    <span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Informasi Penerimaan
        Mahasiswa Baru</span>
</p>
<p><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Kepada Yth,</span></p>
<p>
    <span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">FORMAT_NAMA_DARI_BE</span>
    <span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent"><br></span><span
        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">FORMAT_SEKOLAH_DARI_BE</span>
</p>
<p><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">di</span></p>
<p><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">&nbsp; &nbsp;Tempat</span>
</p>
<p style="text-align: justify"><span
        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Disampaikan dengan hormat,
        Panitia Penerimaan Mahasiswa Baru Politeknik Piksi Input Serang Tahun Akademik </span><span
        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">${YYYY}/${YYYY+1}</span><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">
        memberikan kesempatan kepada Anda untuk bergabung sebagai calon mahasiswa baru di Kampus kami melalui jalur
        pilihan terbaik sebagai berikut :</span></p>
<p><strong></strong></p>
<ol>
    <li>
        <p style="text-align: justify"><strong><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Jalur
                    Reguler</span><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">, merupakan
                    jalur umum dalam penerimaan mahasiswa baru&nbsp;</span><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Politeknik Piksi
                    Input Serang</span><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">.</span></strong>
        </p>
    </li>
    <li>
        <p style="text-align: justify"><strong><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Jalur Beasiswa
                    Program KIP - Kuliah</span><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">, merupakan
                    :</span></strong></p>
    </li>
    <ul>
        <li>
            <p style="text-align: justify"><strong><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Bantuan
                        biaya pendidikan / kuliah&nbsp; Program KIP - Kuliah dari Pemerintah RI bagi lulusan
                        SMA/SMK/MA/Sederajat tahun </span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">${YYYY-2}</span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">,
                    </span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">${YYYY-1}</span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent"> atau
                    </span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">${YYYY}</span></strong>
            </p>
        </li>
    </ul>
    <li>
        <p style="text-align: justify"><strong><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Jalur Beasiswa
                    KCS,&nbsp;</span><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">merupakan
                    :</span></strong></p>
    </li>
    <ul>
        <li>
            <p style="text-align: justify"><strong><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Bantuan
                        biaya pendidikan dari Pemerintah Kota Cilegon bagi warga</span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">&nbsp;Kota
                        Cilegon</span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">&nbsp;
                        lulusan SMA/SMK/MA/Sederajat tahun </span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">${YYYY-2}</span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">,
                    </span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">${YYYY-1}</span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent"> atau
                    </span><span
                        style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">${YYYY}</span></strong>
            </p>
        </li>
    </ul>
    <li>
        <p style="text-align: justify"><strong><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Jalur Reguler
                    Karyawan</span><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">, merupakan
                    jalur kelas bagi anda karyawan yang berminat untuk melanjutkan jenjang pendidikan&nbsp; di
                    Politeknik Piksi Input Serang.</span></strong></p>
    </li>
</ol>
<p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Dengan pilihan
            Program Studi yang sebagai berikut :</span></strong></p>
<p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">PROGRAM SARJANA
            TERAPAN (S1/D4)</span></strong></p>
<ol>
    <li>
        <p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">S1 -
                    Akuntansi Perpajakan</span></strong></p>
    </li>
    <li>
        <p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">S1 -&nbsp;
                    Bisnis Digital</span></strong></p>
    </li>
    <li>
        <p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">S1 -
                    Rekayasa Keamanan Siber</span></strong></p>
    </li>
</ol>
<p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">PROGRAM DIPLOMA
            TIGA (D3)</span></strong></p>
<ol>
    <li>
        <p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">D3 -
                    Manajemen Informatika</span></strong></p>
    </li>
    <li>
        <p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">D3 -
                    Akuntansi</span></strong></p>
    </li>
    <li>
        <p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">D3 -
                    Sekretari&nbsp;</span></strong></p>
    </li>
</ol>
<p style="text-align: justify"><strong><span
            style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Sehubungan dengan hal
            tersebut, apabila Anda berminat dan ingin Kuliah, kami memberikan kesempatan terbaik kepada Anda untuk
            bergabung bersama Politeknik Piksi Input Serang dengan melakukan pendaftaran secara online melalui
            :</span></strong></p>
<ul>
    <li>
        <p style="text-align: justify"><strong><a href="https://pmb.piksiinputserang.ac.id/"><span
                        style="font-size:15px;font-family:Arial;color:#1155cc;background-color:transparent">https://pmb.piksiinputserang.ac.id</span></a><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">&nbsp;</span></strong>
        </p>
    </li>
    <li>
        <p style="text-align: justify"><strong><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Untuk informasi
                    lebih lanjut bisa dilihat di&nbsp;</span><a href="http://s.id/brosurpis"><span
                        style="font-size:15px;font-family:Arial;color:#1155cc;background-color:transparent">sini</span></a><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">&nbsp; atau
                    menghubungi kami melalui nomor WA&nbsp;&nbsp;</span><span
                    style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">081219333386</span></strong>
        </p>
    </li>
</ul>
<p style="text-align: justify"><strong><span
            style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Demikian informasi kami
            sampaikan, selamat memanfaatkan fasilitas dengan sebaik-baik dan raih kesempatan untuk sukses bersama
            Politeknik Piksi Input Serang .</span></strong></p>
<p><strong><span style="font-size:15px;font-family:Arial;color:#222222;background-color:transparent">Panitia Penerimaan
            Mahasiswa Baru TA ${YYYY-1}/${YYYY}</span></strong></p>
<p></p>`