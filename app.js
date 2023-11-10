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


addBtn.addEventListener("click",()=>{

    console.log("is clicked");
    console.log(yourIncome.textContent);
    yourIncome.textContent = income.value;

})

saveBtn.addEventListener("click", ()=>{
    let tr = document.createElement("tr")

    let trNew = spendBody.appendChild(tr)

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
    tdTrash.appendChild(trashI)
   
    trNew.appendChild(tdTrash, trNew)

    calculateSpend(trNew)

    // <i class="fa-solid fa-trash"></i>
    


})


const calculateSpend = (trNew)=>{
    let sumQuantity = 0;
    let allQuantity =  [...spendBody.querySelectorAll(".quantityN")]
    
    
    
    let sumAll = allQuantity.reduce((sum, item)=>sum + Number(item.textContent), 0);
    console.log(sumAll);
 
    yourSpend.textContent = sumAll;

    // console.log(allQuantity);
}