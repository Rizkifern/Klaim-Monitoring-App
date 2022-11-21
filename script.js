//declare all variable from indexHTML as an input
const claimForm = document.getElementById('claim-form');
const nomorPolis = document.getElementById('nomorPolis');
const kerugian = document.getElementById('kerugian');
const lokasiKerugian = document.getElementById('lokasiKerugian');
const penyebab = document.getElementById('penyebab');
const dol = document.getElementById('dol');
const dml = document.getElementById('dml');
const kronologi  = document.getElementById('kronologi');
const submitInput = document.getElementById('submitClaim');
const filePendukung =document.getElementById('file-pendukung');


//declare Variable claim status
const klaimBaru = "New Claim";
const survei = "Survei";
const docCollection = "Proses permintaan Dokumen";
const reviewKlaim = "Review Klaim";
const proposeKlaimAcc = "Pengajuan klaim ACC";
const claimAccepted = "Claim Accepted";
const claimRejected = "claimRejected";
const waitLod = "waiting LoD";
const paymentProcess = "payment Process";
const finish = "finish";
const salvageProcess = "Salavage on process";

//popup
const popupwindow = document.getElementById('popup');

//array database adalah yang akan ditampilkan di web
let databaseArray = []
let indexDatabase = 0;

//declare a random policy data (array of Object), 
// assuming it is a data connected to care
//hide saja database carenya biar ga keos 
let careArray =[
{   //data
    carePolis : "010109082200001",
    careJaminan : "PAR",
    careTertanggung: "PT. Balcom Indonesia",
    carePeriodeStart: "2021-10-20",
    carePeriodeEnd: "2022-10-20",
    careSI: 200000000,
    careLokasiPolis: "Kp Bulu RT 003/010 Desa Setia Mekar Kec Tambun Selatan Kab Bekasi",
    careOkupansi: "Kantor",
    deductible: "10% of Loss any one occurence",
    clausul : [1,2,3,4,5,6,7,8,9,10]
},
{   //data
    carePolis : "010101092200315",
    careJaminan : "FLEXAS",
    careTertanggung: "PT. Graha Karya Inti",
    carePeriodeStart: "2021-12-30",
    carePeriodeEnd: "2022-12-30",
    careSI: 700000000,
    careLokasiPolis: "Apartment French Walk, Kelapa Gading Square, Jakarta Utara",
    careOkupansi: "Rumah Tinggal",
    deductible: "10% of Loss any one occurence",
    clausul : [1,2,3,4,5,6,7,8,9,10]
},
{   //data
    carePolis : "010101092100564",
    careJaminan : "PAR",
    careTertanggung: "PT ASIA SEJAHTERA PERDANA PHARMACEUTICAL",
    carePeriodeStart: "2022-03-14",
    carePeriodeEnd: "2023-03-14",
    careSI: 1000000000,
    careLokasiPolis: "Komplek Pergudangan KL BIZHUB Blok D 12 RT 3 RW 4, Malang",
    careOkupansi: "Gudang",
    deductible: "10% of Loss any one occurence",
    clausul : [1,2,3,4,5,6,7,8,9,10]
},
{   //data
    carePolis : "010101982000001",
    careJaminan : "FLEXAS",
    careTertanggung: "PT. Professional Telekomunikasi Indonesia",
    carePeriodeStart: "2022-01-01",
    carePeriodeEnd: "2023-01-01",
    careSI: 3200000000,
    careLokasiPolis: "Site KNT-ENT-0001-Y-P Ngencung RT.018/RW.05, Watu, Langke Rembong, Manggarai, NTT",
    careOkupansi: "Pabrik minuman",
    deductible: "10% of Loss any one occurence",
    clausul : [1,2,3,4,5,6,7,8,9,10]
},
{   //data
    carePolis : "010903022200010",
    careJaminan : "PAR",
    careTertanggung: "PT. David Bali Cargotama",
    carePeriodeStart: "2022-01-14",
    carePeriodeEnd: "2023-01-14",
    careSI: 4000000000,
    careLokasiPolis: "Kp Melayu RT 003/010 Jakarta Timur",
    careOkupansi: "Rumah",
    deductible: "10% of Loss any one occurence",
    clausul : [1,2,3,4,5,6,7,8,9,10]
},
{   //data
    carePolis : "010108122100253",
    careJaminan : "FLEXAS",
    careTertanggung: "PT. GLOBAL DIGITAL NIAGA",
    carePeriodeStart: "2022-08-15",
    carePeriodeEnd: "2023-08-15",
    careSI: 450000000,
    careLokasiPolis: "Jakarta",
    careOkupansi: "Gudang",
    deductible: "10% of Loss any one occurence",
    clausul : [1,2,3,4,5,6,7,8,9,10]
}
];
//functions untuk oper dari care
const getFromCare = (noPolis, obj) => {
    let newArray = careArray.filter(x=>x.carePolis==noPolis);
    //alert if no data found
    if(newArray.length==0) {
        
        return 0;
    }
    else {
        obj.careJaminan = newArray[0].careJaminan;
        obj.careTertanggung= newArray[0].careTertanggung;
        obj.carePeriodeStart= newArray[0].carePeriodeStart;
        obj.carePeriodeEnd= newArray[0].carePeriodeEnd;
        obj.careSI= newArray[0].careSI;
        obj.careLokasiPolis= newArray[0].careLokasiPolis;
        obj.deductible= newArray[0].deductible;
        obj.clausul = newArray[0].clausul;
        obj.okupansi = newArray[0].careOkupansi;
    }
}

//Awal buka page langsung getItem dari Local Storage
if(localStorage.getItem("database")==null ||localStorage.getItem("database")=='[]' )  {
    databaseArray = [
        {
            "index": 0,
            "noPolis": "010109082200001",
            "lokasiKerugian": "Kp Bulu RT 003/010 Desa Setia Mekar Kec Tambun Selatan Kab Bekasi",
            "dol": "2022-09-14",
            "cause": "Kebakaran",
            "kerugian": "3000000",
            "kronologi": "Kebakaran karena korsleting listrik pada jam 11 malam. Cepat padam setelah 2 jam ditangani damkar.\n\nJendela rusak, pergantian kaca jendela",
            "filePendukung": "C:\\fakepath\\HANDBOOK CGI001_BCAINSURANCE 2022.pdf",
            "dml": "2022-09-21",
            "progress": "Survei",
            "careJaminan": "PAR",
            "careTertanggung": "PT. Balcom Indonesia",
            "carePeriodeStart": "2021-10-20",
            "carePeriodeEnd": "2022-10-20",
            "careSI": 200000000,
            "careLokasiPolis": "Kp Bulu RT 003/010 Desa Setia Mekar Kec Tambun Selatan Kab Bekasi",
            "deductible": "10% of Loss any one occurence",
            "clausul": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ],
            "okupansi": "Kantor",
            "noClaim": "0101090822000001",
            "liability": "",
            "rekomendasi": "membutuhkan Survei",
            "listLiability": "<li>Tanggal Kejadian masuk dalam Periode pertanggungan polis</li><li>Jarak tanggal Pelaporan dengan tanggal kejadian masih berada dalam jarak 14 hari</li><li>Lokasi kerugian sesuai dengan lokasi objek pertanggungan pada Polis</li><li>Polis tertanggung adalah polis PAR, risiko Kebakaran ada dalam jaminan Polis</li><li>Polis Tertanggung memiliki Appraisement clause 10%. Kerugian yang dialami sebesar Rp. 3000000 kurang dari 10% TSI, maka tidak diperlukan perhitungan pro rata</li>",
            "jadwalSurvei": "2022-11-30"
        },
        {
            "index": 1,
            "noPolis": "010101092200315",
            "lokasiKerugian": "Apartment French Walk, Kelapa Gading Square, Jakarta Utara",
            "dol": "2022-10-06",
            "cause": "Ledakan",
            "kerugian": "100000000",
            "kronologi": "Ada ledakan tabung oksigen di ruang tamu, menyebabkan kaca kaca jendela pecah",
            "filePendukung": "",
            "dml": "2022-10-13",
            "progress": "Proses permintaan Dokumen",
            "careJaminan": "FLEXAS",
            "careTertanggung": "PT. Graha Karya Inti",
            "carePeriodeStart": "2021-12-30",
            "carePeriodeEnd": "2022-12-30",
            "careSI": 700000000,
            "careLokasiPolis": "Apartment French Walk, Kelapa Gading Square, Jakarta Utara",
            "deductible": "10% of Loss any one occurence",
            "clausul": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ],
            "okupansi": "Rumah Tinggal",
            "noClaim": "undefined",
            "listLiability": "<li>Tanggal Kejadian masuk dalam Periode pertanggungan polis</li><li>Jarak tanggal Pelaporan dengan tanggal kejadian masih berada dalam jarak 14 hari</li><li>Lokasi kerugian sesuai dengan lokasi objek pertanggungan pada Polis</li><li>Polis tertanggung adalah polis FLEXAS, risiko Ledakan ada dalam jaminan Polis</li><li>Polis Tertanggung memiliki Appraisement clause 10%. Kerugian yang dialami sebesar Rp. 100000000 lebih dari 10% TSI, maka diperlukan perhitungan pro rata</li>",
            "liability": "undefined",
            "rekomendasi": "undefined",
            "jadwalSurvei": ""
        },
        {
            "index": 2,
            "noPolis": "010101092100564",
            "lokasiKerugian": "Komplek Pergudangan KL BIZHUB Blok D 12 RT 3 RW 4, Malang",
            "dol": "2022-10-03",
            "cause": "Kebakaran",
            "kerugian": "3000000",
            "kronologi": "Korsleting llistrik jam 3 subuh. padam jam 7 pagi. beberapa perabot rusak.\n\nSudah disruvei dan didapatkan harga pasarnya seperti yang tercantum pada table adjustment",
            "filePendukung": "",
            "dml": "2022-10-05",
            "progress": "payment Process",
            "careJaminan": "PAR",
            "careTertanggung": "PT ASIA SEJAHTERA PERDANA PHARMACEUTICAL",
            "carePeriodeStart": "2022-03-14",
            "carePeriodeEnd": "2023-03-14",
            "careSI": 1000000000,
            "careLokasiPolis": "Komplek Pergudangan KL BIZHUB Blok D 12 RT 3 RW 4, Malang",
            "deductible": "10% of Loss any one occurence",
            "clausul": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ],
            "okupansi": "Gudang",
            "noClaim": "0101010921000564",
            "listLiability": "<li>Tanggal Kejadian masuk dalam Periode pertanggungan polis</li><li>Jarak tanggal Pelaporan dengan tanggal kejadian masih berada dalam jarak 12 hari</li><li>Lokasi kerugian sesuai dengan lokasi objek pertanggungan pada Polis</li><li>Polis tertanggung adalah polis PAR, risiko Kebakaran ada dalam jaminan Polis</li><li>Polis Tertanggung memiliki Appraisement clause 10%. Kerugian yang dialami sebesar Rp. 3000000 kurang dari 10% TSI, maka tidak diperlukan perhitungan pro rata</li>",
            "liability": "Tanggal Kejadian masuk dalam Periode pertanggungan polis\nJarak tanggal Pelaporan dengan tanggal kejadian masih berada dalam jarak 12 hari\nLokasi kerugian sesuai dengan lokasi objek pertanggungan pada Polis\nPolis tertanggung adalah polis PAR, risiko Kebakaran ada dalam jaminan Polis\nPolis Tertanggung memiliki Appraisement clause 10%. Kerugian yang dialami sebesar Rp. 3000000 kurang dari 10% TSI, maka tidak diperlukan perhitungan pro rata",
            "rekomendasi": "bayar full Rp.3,000,000",
            "jadwalSurvei": ""
        },
        {
            "index": 3,
            "noPolis": "010101982000001",
            "lokasiKerugian": "Site KNT-ENT-0001-Y-P Ngencung RT.018/RW.05, Watu, Langke Rembong, Manggarai, NTT",
            "dol": "2022-08-02",
            "cause": "Petir",
            "kerugian": "Rp.10,000,000 - Rp.50,000,000",
            "kronologi": "Tersambar petir sehingga perabot rusak",
            "filePendukung": "",
            "dml": "2022-09-13",
            "progress": "Claim Rejected",
            "careJaminan": "FLEXAS",
            "careTertanggung": "PT. Professional Telekomunikasi Indonesia",
            "carePeriodeStart": "2022-01-01",
            "carePeriodeEnd": "2023-01-01",
            "careSI": 3200000000,
            "careLokasiPolis": "Site KNT-ENT-0001-Y-P Ngencung RT.018/RW.05, Watu, Langke Rembong, Manggarai, NTT",
            "deductible": "10% of Loss any one occurence",
            "clausul": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ],
            "okupansi": "Pabrik minuman",
            "noClaim": "undefined",
            "listLiability": "<li>Tanggal Kejadian masuk dalam Periode pertanggungan polis</li><li>Tanggal Pelaporan sudah lewat 12 hari sejak tanggal kejadian</li><li>Lokasi kerugian sesuai dengan lokasi objek pertanggungan pada Polis</li><li>Polis tertanggung adalah polis FLEXAS, risiko Petir ada dalam jaminan Polis</li><li>Polis Tertanggung memiliki Appraisement clause 10%. Kerugian yang dialami sebesar Rp. Rp.10,000,000 - Rp.50,000,000 lebih dari 10% TSI, maka diperlukan perhitungan pro rata</li>",
            "liability": "Tertanggung telat lapor",
            "rekomendasi": "Tertanggung tidak melapor kerugian dalam jangka waktu yang telah ditetapkan oleh Polis",
            "jadwalSurvei": ""
        },
        {
            "index": 4,
            "noPolis": "010903022200010",
            "lokasiKerugian": "Kp Melayu RT 003/010 Jakarta Timur",
            "dol": "2022-11-15",
            "cause": "Asap",
            "kerugian": "Rp.50,000,000 - Rp. 100,000,000",
            "kronologi": "Sedang bakar-bakar di halaman depan, tapi asapnya merusak wallpaper bangunan tanpa disadari",
            "filePendukung": "",
            "dml": "2022-11-18",
            "progress": "Claim Rejected",
            "careJaminan": "PAR",
            "careTertanggung": "PT. David Bali Cargotama",
            "carePeriodeStart": "2022-01-14",
            "carePeriodeEnd": "2023-01-14",
            "careSI": 4000000000,
            "careLokasiPolis": "Kp Melayu RT 003/010 Jakarta Timur",
            "deductible": "10% of Loss any one occurence",
            "clausul": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ],
            "okupansi": "Rumah",
            "noClaim": "undefined",
            "listLiability": "<li>Tanggal Kejadian masuk dalam Periode pertanggungan polis</li><li>Jarak tanggal Pelaporan dengan tanggal kejadian masih berada dalam jarak 12 hari</li><li>Lokasi kerugian sesuai dengan lokasi objek pertanggungan pada Polis</li><li>Polis tertanggung adalah polis PAR, risiko Asap ada dalam jaminan Polis</li><li>Polis Tertanggung memiliki Appraisement clause 10%. Kerugian yang dialami sebesar Rp. Rp.50,000,000 - Rp. 100,000,000 lebih dari 10% TSI, maka diperlukan perhitungan pro rata</li>",
            "liability": "Tindakan sengaja",
            "rekomendasi": "Tindakan sengaja oleh tertanggung, klaim ini tidak  liable",
            "jadwalSurvei": ""
        }
    ]
    localStorage.setItem('database',JSON.stringify(databaseArray));
    localStorage.setItem('indexDatabase','4');
    indexDatabase = 4;
}
else{
    
    databaseArray = JSON.parse(localStorage.getItem('database'));
    indexDatabase = parseInt(localStorage.getItem('indexDatabase'));
}
if(localStorage.getItem("careData")!=null) {
    careArray = JSON.parse(localStorage.getItem('careData'));
}


//Function untuk add database dari page index.html

const addToDatabaseArray = () => {
    let objectToPush = {
        index: indexDatabase + 1,
        noPolis: nomorPolis.value,
        lokasiKerugian: lokasiKerugian.value,
        dol:dol.value,
        cause:penyebab.value,
        kerugian: kerugian.value,
        kronologi:kronologi.value,
        filePendukung: filePendukung.value,
        dml: dml.value        
    }
    objectToPush.progress = klaimBaru;
    getFromCare(objectToPush.noPolis,objectToPush);
    if(objectToPush.careJaminan==undefined) {
        alert('Data Polis tidak ditemukan pada Care!')
        return false;
    }
    else {
        databaseArray.push(objectToPush);
    }
    
    //save database ke Storage (Saat ini pakai localStorage)
    localStorage.setItem('database',JSON.stringify(databaseArray));
    localStorage.setItem('indexDatabase',indexDatabase+1);
    
}


//PopUp Functions
function showPopup() {
    popupwindow.classList.add('openPopup');
}
function closePopup() {
    let popupArray = []
    popupArray.push(document.getElementById('nomorPolisPopup').value)
    popupArray.push(document.getElementById('jaminanPopup').value)
    popupArray.push(document.getElementById('tertanggungPopup').value)
    popupArray.push(document.getElementById('periodeStartPopup').value)
    popupArray.push(document.getElementById('periodeEndPopup').value)
    popupArray.push(document.getElementById('siPopup').value)
    popupArray.push(document.getElementById('lokasiPolisPopup').value)
    popupArray.push(document.getElementById('okupansiPopup').value)
    popupArray.push(document.getElementById('deductiblePopup').value)
    popupArray.push(document.getElementById('clausulPopup').value)

    let checkArray = careArray.filter(x=>x.carePolis==popupArray[0]);

    if(checkArray.length>0){
        alert('Nomor Polis tersebut sudah ada di Care!')
        return false;
    }
    else {
        let objPopup = {
            carePolis : popupArray[0],
            careJaminan : popupArray[1],
            careTertanggung: popupArray[2],
            carePeriodeStart: popupArray[3],
            carePeriodeEnd: popupArray[4],
            careSI: popupArray[5],
            careLokasiPolis: popupArray[6],
            careOkupansi: popupArray[7],
            deductible: popupArray[8],
            clausul : popupArray[9]
        }
        careArray.push(objPopup);
        localStorage.setItem('careData',JSON.stringify(careArray));
        popupwindow.classList.remove('openPopup');
    }    
}

function closePopupAja(){
    popupwindow.classList.remove('openPopup');
}















