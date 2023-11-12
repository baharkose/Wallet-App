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

let incomeT = 0;
let paymentForm = 0






//!=========== events ============

// form etiketi kullanmak istiyorsak eğer

// ekleBtn.addEventListener("submit", (e)=>{
//     // click değil submit dinlenir
//     e.preventDefault()
//     // sayfayı yenileme
// })

//  Ekle butonuna basıldığında yapılacaklar...

addBtn.addEventListener("click",()=>{


    // gelirleri local storage da depolamak için alan oluşturuldu.
localStorage.setItem("gelirler", "a")

let a = income.value
    if(isNaN(a)){
        alert("Please enter a valid income")
        
    }
    else{incomeT = yourIncome.textContent = income.value;
        calculateSpend(incomeT)
        console.log("is clicked");
        console.log(yourIncome.textContent);

        // storagetaki gelirleri income.value yap
        localStorage.setItem("gelirler", a)

       

        

        
    }
    
    
    // a.preventDefault();
    

})



// local stroga'da harcama formunu tutmak için verileri saklama amaçlı bir dizi tanımlandı

let newList = [] 

saveBtn.addEventListener("click", ()=>{
    let tr = document.createElement("tr")

    let geriyeKalan = []


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



    trashI.addEventListener("click", ()=>{
        console.log("is clicked");
        trashI.closest(".trNew").remove();
        calculateSpend(trNew);
        // trashI.closest(".trNew").tdQuantity.textContent = "";
    })
   
    trNew.appendChild(tdTrash, trNew)

    calculateSpend(incomeT)

    // <i class="fa-solid fa-trash"></i>

    newList = [date.value,spendArea.value,  quantity.value]

    geriyeKalan.push(newList)

    localStorage.setItem("geriyeKalan", JSON.stringfy(geriyeKalan));
  
})



const calculateSpend = (incomeT)=>{

    // incomeT = 0;
    console.log(incomeT);
    let sumQuantity = 0;
    let allQuantity =  [...spendBody.querySelectorAll(".quantityN")]

  
    let sumAll = allQuantity.reduce((sum, item)=>sum + Number(item.textContent), 0);
    console.log(sumAll);
 
    yourSpend.textContent = sumAll;

    let totalSavedMoney = incomeT - sumAll;
        yourSaving.textContent = totalSavedMoney;
        
       
        
    let newDate = new Date().getFullYear()
    console.log(newDate);

    let spanValue = span.textContent = newDate;
    
    result.innerHTML = `<span class="bg-danger fw-bold">${spanValue} </span>tarihli toplam birikim tutarınız<span class="bg-danger fw-bold"> ${totalSavedMoney} </span>'dir. `

    return yourSaving.textContent;
    }

    
    
    // console.log(allQuantity);
    clearBtn.addEventListener("click", ()=>{
    income.value = "";
    yourSpend.textContent = ""
    yourIncome.textContent = ""
    spendArea.value = "";
    date.value = ""; //
    quantity.value = "";
    yourSaving.textContent = ""


});



window.onload = function() {

     // sonra onu al ve göster
     goster = localStorage.getItem("gelirler")
     console.log(goster);
     yourIncome.textContent = goster;
}
