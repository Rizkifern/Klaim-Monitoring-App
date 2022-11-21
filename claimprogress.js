let databaseArray =[];
let indexLaporan = localStorage.getItem('indexdata');
if(localStorage.getItem("database")!=null) {
    databaseArray = JSON.parse(localStorage.getItem('database'));
}

const headerTertanggung = document.getElementById('headerTertanggung');
const headerDetail = document.getElementById('headerDetail');
const reportPolis = document.getElementById('reportPolis');
const reportNoClaim = document.getElementById('reportNoClaim');//value
const reportJaminan = document.getElementById('reportJaminan');
const reportTertanggung = document.getElementById('reportTertanggung');
const reportPeriode = document.getElementById('reportPeriode');
const reportSI = document.getElementById('reportSI');
const reportLokasiPolis = document.getElementById('reportLokasiPolis');
const reportLokasiKejadian = document.getElementById('reportLokasiKejadian');
const reportOkupansi = document.getElementById('reportOkupansi');
const reportDol = document.getElementById('reportDol');
const reportDml = document.getElementById('reportDml');
const reportPenyebab = document.getElementById('reportPenyebab');
const reportNilaiKlaim = document.getElementById('reportNilaiKlaim');//value
const reportDeductible = document.getElementById('reportDeductible');
const reportKronologi = document.getElementById('reportKronologi');//value
const reportLiability = document.getElementById('reportLiability');
const reportLiabilityArea = document.getElementById('reportLiabilityArea');//value
const reportRekomendasi = document.getElementById('reportRekomendasi');//value
const reportProgress =document.getElementById('progress')

//declare Variable claim status
const klaimBaru = "New Claim";
const survei = "Survei";
const docCollection = "Proses permintaan Dokumen";
const reviewKlaim = "Review Klaim";
const proposeKlaimAcc = "Pengajuan klaim ACC";
const claimAccepted = "Claim Accepted";
const claimRejected = "Claim Rejected";
const waitLod = "waiting LoD";
const paymentProcess = "payment Process";
const finish = "finish"
const salvageProcess = "Salavage on process"

//get Elements needed
const reportProgression = document.getElementById('progress');
const tanggalSurvei = document.getElementById('tanggalSurvei');
const tanggalSurveiLabel = document.getElementById('tanggalSurveiLabel');
//get all buttons to hide 
const allButton = document.querySelectorAll('.willGone');

//liability things
const buttonLiaContainer = document.getElementById('buttonLiaContainer');
function showIt(){
    allButton.forEach(x => {
        x.classList.remove('hide');
    });
    allButton.forEach(x => {
        x.classList.add('show');
    });
    // buttonLiaContainer.classList.remove('hide');
    // buttonLiaContainer.classList.add('show');
    checkLiability();
}
function hideIt(){
    allButton.forEach(x => {
        x.classList.remove('show');
    });
    allButton.forEach(x => {
        x.classList.add('hide');
    });
    // buttonLiaContainer.classList.remove('show');
    // buttonLiaContainer.classList.add('hide');

    reportLiability.innerHTML="";
}



function loadReport() {
    let obj = databaseArray[indexLaporan];
    headerTertanggung.innerHTML = obj.careTertanggung;
    headerTertanggung.setAttribute('onclick','showIt()')
    headerDetail.innerHTML = `${obj.noPolis} ; ${obj.cause} ; ${obj.dol} ; ${obj.progress}`;
    reportPolis.innerHTML = obj.noPolis;
    reportNoClaim.value = obj.noClaim;
    reportJaminan.innerHTML = obj.careJaminan;
    reportTertanggung.innerHTML = obj.careTertanggung;
    reportPeriode.innerHTML = `${obj.carePeriodeStart} s/d ${obj.carePeriodeEnd}`;
    reportSI.innerHTML = obj.careSI;
    reportLokasiPolis.innerHTML = obj.careLokasiPolis;
    reportLokasiKejadian.innerHTML = obj.lokasiKerugian;
    reportOkupansi.innerHTML = obj.okupansi;
    reportDol.innerHTML = obj.dol;
    reportDml.innerHTML = obj.dml;
    reportPenyebab.innerHTML = obj.cause;
    reportNilaiKlaim.value =  obj.kerugian//value
    reportDeductible.innerHTML = obj.deductible;
    reportKronologi.value =  obj.kronologi//value
    //report Liability call function aja
    reportLiability.innerHTML = obj.listLiability;
    reportLiabilityArea.value = obj.liability;
    reportRekomendasi.value = obj.rekomendasi;
    reportProgress.value = obj.progress;
    if(obj.progress==survei){
        tanggalSurveiLabel.setAttribute('style','visibility:visible');
        tanggalSurvei.value = obj.jadwalSurvei;
    }
    else {
        tanggalSurveiLabel.setAttribute('style','visibility:hidden');
    }
    
}

window.addEventListener("load",loadReport())

//Liability Function, append List
function checkLiability() {
    let dol1 = new Date(databaseArray[indexLaporan].dol);
    let dml1 = new Date(databaseArray[indexLaporan].dml);
    let start1 = new Date(databaseArray[indexLaporan].carePeriodeStart);
    let end1 = new Date(databaseArray[indexLaporan].carePeriodeEnd);
    let loss1 = reportNilaiKlaim.value;
    let jaminan1 = databaseArray[indexLaporan].careJaminan;
    let lokasiKerugian1 = databaseArray[indexLaporan].lokasiKerugian;
    let lokasiPolis1 = databaseArray[indexLaporan].careLokasiPolis;
    let cause1 = databaseArray[indexLaporan].cause;
    let tsi1 = databaseArray[indexLaporan].careSI;
    //kosongin dulu
    reportLiability.innerHTML="";


    for(let i=0; i<5;i++){
        let liLiability = document.createElement('li');
        switch(i){
            case 0:
                //Cek DOL
                if(dol1>=start1 && dol1<=end1){
                    liLiability.innerText = 'Tanggal Kejadian masuk dalam Periode pertanggungan polis'
                }
                else {
                    liLiability.innerText = 'Tanggal kejadian tidak masuk dalam periode pertanggungan polis'
                }
                reportLiability.appendChild(liLiability);
            break;
            case 1:
                //cek Tanggal Pelaporan
                if((dml1-dol1)/(1000*60*60*24)>12) {
                    liLiability.innerText = 'Tanggal Pelaporan sudah lewat 7 hari sejak tanggal kejadian'
                }
                else {
                    liLiability.innerText = 'Jarak tanggal Pelaporan dengan tanggal kejadian masih berada dalam jarak 7 hari'
                }
                reportLiability.appendChild(liLiability);
            break;
            case 2:
                //Cek Lokasi
                if(lokasiKerugian1 == lokasiPolis1) {
                    liLiability.innerText = 'Lokasi kerugian sesuai dengan lokasi objek pertanggungan pada Polis'
                }
                else {
                    liLiability.innerText = 'Terdapat perbedaan Lokasi kerugian dengan lokasi objek pertanggungan pada Polis'
                }
                reportLiability.appendChild(liLiability);
            break;
            case 3:
                //Cek Jaminan
                // 
                if(cause1=="Kebakaran" || cause1=="Petir" || cause1=="Ledakan" || cause1=="Kejatuhan Pesawat" || cause1=="Asap"){
                    liLiability.innerText = `Polis tertanggung adalah polis ${jaminan1}, risiko ${cause1} ada dalam jaminan Polis`
                }
                else {
                    liLiability.innerText = `Polis tertanggung adalah polis ${jaminan1}, risiko ${cause1} tidak ada dalam jaminan Polis`
                }
                
                reportLiability.appendChild(liLiability);
            break;
            case 4:
                //Cek Appraisement
                if(loss1 <= tsi1*0.1) {
                    liLiability.innerText = `Polis Tertanggung memiliki Appraisement clause 10%. Kerugian yang dialami sebesar Rp. ${loss1} kurang dari 10% TSI, maka tidak diperlukan perhitungan pro rata`;
                }
                else {
                    liLiability.innerText = `Polis Tertanggung memiliki Appraisement clause 10%. Kerugian yang dialami sebesar Rp. ${loss1} lebih dari 10% TSI, maka diperlukan perhitungan pro rata`;
                }
                reportLiability.appendChild(liLiability);
            break;
        }
        //cek Klausula
    }
    
}

//Save progress Function
function saveProgression() {
    let obj = databaseArray[indexLaporan];
    obj.noClaim = reportNoClaim.value;
    obj.kerugian = reportNilaiKlaim.value;
    obj.kronologi = reportKronologi.value;
    obj.listLiability = reportLiability.innerHTML;
    obj.liability = reportLiabilityArea.value;
    obj.rekomendasi = reportRekomendasi.value;   
    obj.progress = reportProgress.value;
    //if survei then add jadwal survei
    if(obj.progress==survei) {
        let jadwalSurvei = document.getElementById('tanggalSurvei')
        obj.jadwalSurvei = jadwalSurvei.value;
    }
    else {
        obj.jadwalSurvei="";
    }
    localStorage.setItem('database',JSON.stringify(databaseArray));
}


//If Progress == Survei Function -> Show Date Report
function progressionSurvei () {
    if (reportProgression.value == survei) {
        tanggalSurveiLabel.setAttribute('style','visibility:visible')
    }
    else {
        tanggalSurveiLabel.setAttribute('style','visibility:hidden')
    }
}



