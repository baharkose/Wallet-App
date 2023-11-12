//! selectors
//* gelir formu
const ekleBtn=document.getElementById("ekle-btn")
const gelirInput=document.getElementById("gelir-input")
const gelirFormu=document.getElementById("ekle-formu")
//! sonuc tablosu
const gelirinizTd=document.getElementById("geliriniz")
const giderinizTd=document.getElementById("gideriniz")
const kalanTd=document.getElementById("kalan")
//!harcama formu
const harcamaFormu=document.getElementById("harcama-formu")
const harcamaAlaniInput=document.getElementById("harcama-alani")
const tarihInput=document.getElementById("tarih")
const miktarInput=document.getElementById("miktar")
//!harcamatablosu
const harcamaBody=document.getElementById("harcama-body")
const temizleBtn=document.getElementById("temizle-btn")
//! local değişkenler
let gelirler=0
let harcamaListesi=[]
//!========events
gelirFormu.addEventListener("submit",(e)=>{
    e.preventDefault();
    gelirler= gelirler + Number(gelirInput.value)
    localStorage.setItem("gelirler", gelirler)
    gelirFormu.reset()
    hesaplaGuncelle()
})
window.addEventListener("load", ()=>{
    gelirler= Number(localStorage.getItem("gelirler"))
    harcamaListesi=JSON.parse(localStorage.getItem("harcamalar")) || []
})
harcamaFormu.addEventListener("submit",(e)=>{
    e.preventDefault();
    const yeniHarcama={
        tarih:tarihInput.value,
        alan:harcamaAlaniInput.value,
        miktar:miktarInput.value,
        id:new Date().getTime(),
    }
// harcamaListesi=[...harcamaListesi, yeniHarcama]
    harcamaListesi.push(yeniHarcama)
    localStorage.setItem("harcamalar",JSON.stringify(harcamaListesi))
harcamayıEkranaYaz(yeniHarcama)
hesaplaGuncelle()
harcamaFormu.reset()
})
//! harcama alanı tablosu
harcamaBody.addEventListener("click", (e)=>{
    if (e.target.classList.contains("fa-trash-can")) {
        e.target.parentElement.parentElement.remove()
        const id=e.target.id
        harcamaListesi=harcamaListesi.filter((harcama)=>harcama.id!=id)
        hesaplaGuncelle()
    }
})
//! temizle butonu
temizleBtn.addEventListener("click",()=>{
    gelirler=0
    harcamaListesi=[]
    harcamaBody.innerText=""
    localStorage.clear()
    hesaplaGuncelle()
})
//!fonksıyonlar
const hesaplaGuncelle=()=>{
    gelirinizTd.innerText=gelirler
    const giderler=harcamaListesi.reduce((toplam, harcama)=>toplam+Number(harcama.miktar),0)
    giderinizTd.innerText=giderler
    kalanTd.innerText=gelirler-giderler
}
const harcamayıEkranaYaz=({tarih, miktar, alan, id})=>{
    harcamaBody.innerHTML+=`<tr>
    <td>${tarih}</td>
    <td>${alan}</td>
    <td>${miktar}</td>
    <td><i id=${id} class= "fa-solid fa-trash-can text-danger" type="button"></i></td>
    </tr> `
}