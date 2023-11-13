
//* INPUTLAR

const gelirInput = document.querySelector("#gelir-input")
const harcamaAlani = document.querySelector("#harcama-alani")
const tarih = document.querySelector("#tarih")
const miktar = document.querySelector("#miktar")

//*  BUTONLAR

const ekleBtn = document.querySelector("#ekle-btn")
const kaydet = document.querySelector("#kaydet")


//* TEXTCONTENTLER

let geliriniz = document.querySelector("#geliriniz")
let gideriniz = document.querySelector("#gideriniz")
let kalan = document.querySelector("#kalan")

//* TABLOLAR

const harcamaBody = document.querySelector("#harcama-body")
console.log(harcamaBody);



//* Hesap İşlemleri

let miktarToplam = 0;






//?     **********  TIKLAMA OLAYLARI  **********


//* EKLE BUTONUNA TIKLANDIĞINDA

ekleBtn.addEventListener("click", (e)=>{


    //* LOCALSTORAGE İŞLEMLERİ

        localStorage.setItem("geliriniz",gelirInput.value);


        // formun varsayılan ayarlarına dönmesini engeller.
        e.preventDefault();

        let gelirValue = gelirInput.value
        if(isNaN(gelirValue)){
            alert("lütfen bir sayı giriniz")
        }
        else{
            geliriniz.textContent = gelirValue;
        }
});


//* KAYDETE TIKLANDIĞINDA

kaydet.addEventListener("click", (e)=>{
        e.preventDefault()
        satirOlustur()
        harcamaAlaniHesapla()
        sil()


        // localStorage.set("harcamaBody",)
})


//* SİLME FONKSYİONU

function sil() {
    harcamaBody.addEventListener("click", (e)=>{

        console.log(e.target);
    
        //* * * * * * *SİLME İŞLEMİ* * * * * *
    
        if(e.target.classList.contains("fa-trash")){

            // let mktr = e.target.closest(".tdMiktarC");
             e.target.closest(".yeniSatir").remove();
             harcamaAlaniHesapla()
 
        }
  
    })

    
}





//?    *********   FONKSİYONLAR   *********


//* SATIR OLUŞTURMA FONKSİYONU

const satirOlustur = ()=>{

   
            // satır oluştur
            let tr = document.createElement("tr")
            harcamaBody.appendChild(tr)
            tr.setAttribute("class", "yeniSatir")
            // harcamaBody.textContent = harcamaAlani.value
            

            // sütunları oluştur
            let tdTarih = document.createElement("td")
            tr.appendChild(tdTarih)
            tdTarih.textContent = tarih.value;
            console.log(tarih.value);
            

            let tdHarcamaAlani = document.createElement("td")
            tr.appendChild(tdHarcamaAlani)
            tdHarcamaAlani.textContent = harcamaAlani.value
            console.log(harcamaAlani.value);


            let tdMiktar = document.createElement("td")
            tr.appendChild(tdMiktar)
            tdMiktar.setAttribute("class","tdMiktarC")
            tdMiktar.textContent = miktar.value

            // Bu da hesaplar...
            // gider += Number(miktar.value)
            // console.log(gider);
            // gideriniz.textContent = gider;
         
    
            let tdİslem = document.createElement("td")
            tr.appendChild(tdİslem)
            let copI = document.createElement("i")

            // birden fazla class ekleme
            copI.setAttribute('class', 'fa-solid fa-trash')
            copI.setAttribute('style', 'font-size:1.5rem; color:red')
            // copI.style.color = "red";
            tdİslem.appendChild(copI)
            copI.style.cursor= "pointer"




          
   

//    console.log(harcamaAlani);

   // miktarları çekmek için fonksiyon çağırıldı. 
   harcamaAlaniHesapla() 
   
}



// //* HESAPLAMA FONKSİYONU

const harcamaAlaniHesapla = () =>{

            let gelir = geliriniz.textContent

            let tumMiktarlar =  [...harcamaBody.querySelectorAll(".tdMiktarC")]

            console.log(tumMiktarlar);

            miktarToplam = tumMiktarlar.reduce((sum, item) =>sum + Number(item.textContent),0);


            gideriniz.textContent = miktarToplam;
            console.log(miktarToplam);

            let kalanD = gelir - miktarToplam
            kalan.textContent = kalanD;
            return miktarToplam;


            // local storage


            // let harcamaVerileri = [...harcamaBody.querySelectorAll(".yeniSatir")] 
            // console.log(harcamaVerileri);
   
                               
    
}


window.onload = function() {
            let gelirStorage = localStorage.getItem("geliriniz")
            console.log(gelirStorage);
            geliriniz.textContent = gelirStorage
};

    







