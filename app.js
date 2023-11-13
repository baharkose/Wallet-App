//  Değişkenler Alındı

const income = document.querySelector("#gelir-input")
const spendArea = document.querySelector("#harcama-alani")
const date = document.querySelector("#tarih")
const quantity = document.querySelector("#miktar")
const addBtn = document.querySelector("#ekle-btn")
const saveBtn = document.querySelector("#kaydet")
let yourIncome = document.querySelector("#geliriniz")
let yourSpend = document.querySelector("#gideriniz")
let yourSaving = document.querySelector("#kalan")
const spendBody  = document.querySelector("#harcama-body")
const clearBtn  = document.querySelector("#temizle-btn")
const result  = document.querySelector(".result")
let span = document.querySelector(".span")
const sonucGoster = document.querySelector(".sonuc-goster")

let incomeT = 0;
let paymentForm = 0


//  Ekle butonuna basıldığında yapılacaklar...

addBtn.addEventListener("click",()=>{

// gelirleri local storage da depolamak için alan oluşturuldu.

localStorage.setItem("gelirler", "a")

        let a = income.value
            if(isNaN(a)){
                alert("Please enter a valid income")
                
            }
            else{

                incomeT = yourIncome.textContent = income.value;
                calculateSpend(incomeT)
                console.log("is clicked");
                console.log(yourIncome.textContent);

                // storagetaki gelirleri income.value yap
                localStorage.setItem("gelirler", a)

            }       

});

// local stroga'da harcama formunu tutmak için verileri saklama amaçlı bir dizi tanımlandı

let harcamaListesi = [] 

saveBtn.addEventListener("click", ()=>{
    harcamaListesi
    let tr = document.createElement("tr")

    let trNew = spendBody.appendChild(tr)
    trNew.className = "trNew"

    let tdDate = document.createElement("td")
    tdDate.textContent = date.value
    trNew.appendChild(tdDate)

    let tdSpend = document.createElement("td")
    tdSpend.textContent = spendArea.value
    trNew.appendChild(tdSpend)

    let tdQuantity = document.createElement("td")
    tdQuantity.textContent = quantity.value
    tdQuantity.className = "quantityN"
    trNew.appendChild(tdQuantity)

    let tdTrash = document.createElement("td")
    let trashI = document.createElement("i") 
    trashI.className="fa-solid";
    trashI.className+=" fa-trash";
    trashI.style.cursor = "pointer";
    tdTrash.appendChild(trashI)

    // çöpe tıklandığında satırı sil.

    trashI.addEventListener("click", ()=>{

        console.log("is clicked");
        trashI.closest(".trNew").remove();
        calculateSpend(incomeT);

});

    trNew.appendChild(tdTrash, trNew)

    // kaydet butonunu basınca hesaplama fonksiyonunu aktifleştir.
    calculateSpend(incomeT)

    // Local storage'da verileri depolamak için harcama listesinden gelen verileri liste halinde depola.
    const newHarcama = {
            tarih: date.value,
            haracamaAlani: spendArea.value,
            miktar: quantity.value
    }



    harcamaListesi.push(newHarcama) 
    console.log(harcamaListesi);
    //! atarken JSON stringfy alırken JSON parse

    // JSON stringfy arraymış gibi veriyi gömer.
    // harcama listesini local strorage e ekle.
    // alıdığın verileri liste halinde JSON.stringfy ile sakla.

    localStorage.setItem("harcamaListesi", JSON.stringify(harcamaListesi) )

    return trNew;
  
});

// hesaplama işlemi

const calculateSpend = (incomeT)=>{

                // gelen spendBody'den gelen NodeList verileri öncelikle ayır. 

                console.log(incomeT);
               
                let allQuantity =  [...spendBody.querySelectorAll(".quantityN")]

                // ayırdığın verileri sayılara çevir ve hepsini topla.

                let sumAll = allQuantity.reduce((sum, item)=>sum + Number(item.textContent), 0);
                console.log(sumAll);
            
                // ekranda yazdır.
                yourSpend.textContent = sumAll;

                //  gelirden gideri çıkar.

                let totalSavedMoney = incomeT - sumAll;
                    yourSaving.textContent = totalSavedMoney;
                    

                // bugün itibariyle birikimi yazdır. 
                let newDate = new Date().getFullYear()
                console.log(newDate);

                let newDate2 = new Date();
                // ayı çek
                let ayIsimleri = [
                    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
                  ];

                  let bulundugumuzAy = ayIsimleri[newDate2.getMonth()+1];
               

                let spanValue = span.textContent = newDate;
                
                //  ekranda süs
                result.innerHTML = `<span class="bg-danger fw-bold">${bulundugumuzAy} ayına ait ${spanValue} </span>tarihli toplam birikim tutarınız<span class="bg-danger fw-bold"> ${totalSavedMoney} </span>'tl'dir. `



                sonucGoster.addEventListener("click",()=>{
                    console.log("is clicked");
                    Swal.fire({
                        title: "Toplam Birikim",
                        text: `${bulundugumuzAy} ayına ait ${spanValue} tarihli toplam birikim tutarınız ${totalSavedMoney} 'tl'dir. `,
                        width: 600,
                        padding: "3em",
                        color: "#716ADD",
                        background: "#fff url(/images/trees.png)",
                        backdrop: `
                          rgba(0,0,123,0.4)
                          url("/images/nyan-cat.gif")
                          left top
                          no-repeat
                        `
                      });
                })


                return yourSaving.textContent;

                }

                
                // temizleye basınca her şeyi sfırlar.
                // console.log(allQuantity);
                clearBtn.addEventListener("click", ()=>{
            
                        income.value = "0";
                        yourSpend.textContent = "0"
                        yourIncome.textContent = "0"
                        spendArea.value = "0";
                        date.value = "0"; //
                        quantity.value = "0";
                        yourSaving.textContent = "0"

                        // localStorage sıfırla
                        // her şeyi siler
                        localStorage.clear();
                        window.location.reload()

    });

    // sayfa yenilendiğinde local storagedan verileri çekme
    window.onload = function() {

        // sonra onu al ve göster
        incomeT = localStorage.getItem("gelirler")
        
        console.log(incomeT);
        yourIncome.textContent = incomeT;

        // harcama listesini şimdi al ve göster
        // aldığın listeyi liste formatında dışarı çıkar.

        harcamaListesi = JSON.parse(localStorage.getItem("harcamaListesi"))
        console.log(harcamaListesi);
        

        if(harcamaListesi){
                            harcamaListesi.forEach(item=>{
                            // listenin elemanlarını tek tek oluşturduğun satırlara yaz.
                            let tr = document.createElement("tr")

                            // let trNew = spendBody.appendChild(tr) // tek işlem olarak algıladı
                             tr.className = "trNew"

                            let tdDate = document.createElement("td")
                            tdDate.textContent = item.tarih
                            tr.appendChild(tdDate)

                            let tdSpend = document.createElement("td")
                            tdSpend.textContent = item.haracamaAlani
                            tr.appendChild(tdSpend)

                            let tdQuantity = document.createElement("td")
                            tdQuantity.textContent = item.miktar
                            tdQuantity.className = "quantityN"
                            tr.appendChild(tdQuantity)

                            let tdTrash = document.createElement("td")
                            tr.appendChild(tdTrash)
                            let trashI = document.createElement("i")
                            console.log(trashI); 
                            trashI.className="fa-solid";
                            trashI.className+=" fa-trash";
                            trashI.style.cursor = "pointer";
                            tdTrash.appendChild(trashI)
                            spendBody.appendChild(tr)


                                trashI.addEventListener("click", ()=>{
                                    console.log("is clicked");
                                    trashI.closest(".trNew").remove();
                                    calculateSpend(incomeT)
                                    // Identify the clicked row and remove it from the table
                                    let selectedRow = trashI.closest(".trNew");
                                    selectedRow.remove();

                                    // Identify the index of the clicked item in the harcamaListesi array
                                    let selectedIndex = harcamaListesi.findIndex(item => item.tarih === tdDate.textContent);

                                    // Remove the item from the harcamaListesi array
                                    if (selectedIndex !== -1) {
                                        harcamaListesi.splice(selectedIndex, 1);

                                        // Update local storage with the modified array
                                        let aaa=  localStorage.setItem("harcamaListesi", JSON.stringify(harcamaListesi));
                                            console.log(aaa);

                                 }

                            });
                            
     
    
        });


        calculateSpend(incomeT)
            
        }
        calculateSpend(incomeT)
            
        

    }



   