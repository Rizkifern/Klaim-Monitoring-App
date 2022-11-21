let databaseArray =[];
let filteredArray =[];
if(localStorage.getItem("database")!=null) {
    databaseArray = JSON.parse(localStorage.getItem('database'));
}
const sortTable = document.getElementById('sortTable');
const filterTable = document.getElementById('filterTable');
const listTable = document.getElementsByClassName("table");
const filterPopup = document.getElementById('filterPopup');

//Filter pop up
const filtering = document.getElementById('filtering');
const filterKey = document.getElementById('filterKey');
const fClosePopup = document.getElementById('fClosePopup');

//Sort pop up

//Function Load Claim List
//table dan headingnya udah ada dari HTML
//tinggal append child tr pakai for loop dari panjangnya database array
//Loop buat append semua td yang innerHTMLnya di set berdasarkan data di databaseArray
//Jangan lupa kasih  className untuk button karna mereka akan di CSS berdasarkan status progress dari databaseArray

const loadList = (arrLoad) =>{
    
    let tr = document.createElement('tr');
    listTable[0].appendChild(tr);
    for(let k=0;k<6;k++) {
        let th = document.createElement('th');
        switch(k) {
            case 0: th.innerText="No."; break;
            case 1: th.innerText="The Insured"; break;
            case 2: th.innerText="Nomor Polis"; break;
            case 3: th.innerText="CoL"; break;
            case 4: th.innerText="DoL"; break;
            case 5: th.innerText="Progress"; break;
        }
        tr.appendChild(th);
    }
    for (let i=0; i<arrLoad.length;i++) {
        
        let tr = document.createElement('tr');
        listTable[0].appendChild(tr);
        for(let j=0;j<7;j++){
            let td = document.createElement('td');
            switch (j){
                case 0:
                    //nomor
                    td.innerHTML=i+1;
                break;
                case 1:
                    //The Insured
                    td.innerHTML=arrLoad[i].careTertanggung;
                break;
                case 2:
                    //Nomor Polis
                    td.innerHTML=arrLoad[i].noPolis;
                break;
                case 3:
                    //CoL
                    td.innerHTML=arrLoad[i].cause;
                break;
                case 4:
                    //DoL
                    td.innerHTML=arrLoad[i].dol;
                break;
                case 5:
                    //Progress
                    if (arrLoad[i].progress=="Survei"){
                        td.innerHTML=`${arrLoad[i].progress} ; ${arrLoad[i].jadwalSurvei} `;
                    }
                    else {
                        td.innerHTML=arrLoad[i].progress;
                    }
                    
                break;
                case 6:
                    //Button
                    let anchoring =document.createElement('a');
                    anchoring.setAttribute("href","./report.html")
                    let processButton = document.createElement('button')
                    processButton.setAttribute("onclick","openReport(event)")
                    processButton.value = arrLoad[i].index;
                    processButton.innerText = 'Process';
                    anchoring.appendChild(processButton);
                    td.appendChild(anchoring);
                    let refresher =document.createElement('a')
                    refresher.setAttribute("href","./claim list.html")
                    let deleteButton = document.createElement('button')
                    deleteButton.setAttribute('onclick','deleteDatabase(event)');
                    deleteButton.value = arrLoad[i].index;
                    deleteButton.innerText = 'X';
                    deleteButton.classList.add('delButton');
                    refresher.appendChild(deleteButton);
                    td.appendChild(refresher);
                    td.setAttribute("style","border:none")
                    td.classList.add('tableButton')
                break;
                // case 7:
                //     let refresher =document.createElement('a')
                //     refresher.setAttribute("href","./claim list.html")
                //     let deleteButton = document.createElement('button')
                //     deleteButton.setAttribute('onclick','deleteDatabase(event)');
                //     deleteButton.value = i;
                //     deleteButton.innerText = 'X';
                //     deleteButton.classList.add('delButton');
                //     refresher.appendChild(deleteButton);
                //     td.appendChild(refresher);
                //     td.setAttribute("style","border:none")
                    
                // break;
            }
            tr.appendChild(td)
        }
    }
}

window.addEventListener("load",loadList(databaseArray));

function closePopupAja(x){
    x.classList.remove('openPopup');
}
function showPopup(x) {
    x.classList.add('openPopup');
}

function applyFilter(){
    let y = filtering.value;
    listTable[0].innerHTML=""
    filteredArray = databaseArray.filter(x=> {
        if(y=="kerugian"){
            return x[y] > filterKey.value;
        }
        else {
            return x[y] == filterKey.value;
        }
    }
    )
        
    loadList(filteredArray);
}
//oper index klaim untuk open page Report
function openReport (e) {
    localStorage.setItem('indexdata',e.target.value);
}
function deleteDatabase(e) {
    databaseArray= databaseArray.filter(x=>x.index != e.target.value)
    localStorage.setItem('database',JSON.stringify(databaseArray));
}