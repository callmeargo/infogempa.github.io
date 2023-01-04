const iconElm = document.querySelectorAll('.iconElement');
const testText = document.querySelectorAll('.iconElement .textElement')
const actElms = document.querySelectorAll('.iconElement .element');
const sideButton = document.querySelector('.theNav .sidebar');
const navIcon = document.querySelector('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4');

const classes = navIcon.classList;
const sideBtn = sideButton.classList;
navIcon.onclick = function(e){
    classes.toggle('open');
    setTimeout(() => {
        sideBtn.toggle('showSide')
    }, 200);
    sideButton.style.display = 'block';
}

if (screen.width > 575){
for (let index = 0; index < iconElm.length; index++) {
    const text = testText[index];
    const actElm = actElms[index];
    iconElm[index].addEventListener("click", function(){
        
        actElms.forEach(e => {
            e.classList.remove('on')
        })

        actElm.classList.add('on')
    });

    iconElm[index].onmouseenter = function(){
        text.style.display = 'flex';
        actElm.classList.add('active')
        setTimeout(() => {
            text.classList.add('theShow')
        }, 200);
    }
    
    iconElm[index].onmouseleave = function(){
        text.classList.remove('theShow')
        actElm.classList.remove('active')
        setTimeout(() => {
            text.style.display = 'none';
        }, 200);
    }
}
}

// query data

function getBmkgData() {
    const res = fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
    return res.then(x => x.json());
}

const bujur = document.querySelectorAll('.bujur')
const coordinate = document.querySelectorAll('.coordinate')
const lokasiGempa = document.querySelectorAll('.lokasiGempa')
const jamText = document.querySelectorAll('.jamText')
const kedalaman = document.querySelectorAll('.kedalaman')
const lintang = document.querySelectorAll('.lintang')
const MagnitudeText = document.querySelectorAll('.MagnitudeText')
const potensi = document.querySelectorAll('.potensi')
const tanggalNum = document.querySelectorAll('.tanggalNum')
const wilayah = document.querySelectorAll('.wilayah')

async function dataBmkg(){
    const datas = await getBmkgData();
    const data = datas.Infogempa.gempa;
    const texts = [bujur, coordinate, lokasiGempa ,jamText,kedalaman ,lintang ,MagnitudeText, potensi,tanggalNum,wilayah];
    const types = ['Bujur', 'Coordinates', 'Dirasakan' ,'Jam','Kedalaman' ,'Lintang' ,'Magnitude', 'Potensi','Tanggal','Wilayah'];

    const highlightDate = data['Tanggal'].split(' ')
    document.querySelector('.textday').innerHTML = highlightDate[0]
    document.querySelector('.textmonth').innerHTML = highlightDate[1]
    document.querySelector('.textyear').innerHTML = highlightDate[2]

    for (let i = 0; i < texts.length; i++) {
        const element = texts[i];
        const type = types[i];
        element.forEach(e => {
            e.innerHTML = data[type];
        })
    }

}

dataBmkg();