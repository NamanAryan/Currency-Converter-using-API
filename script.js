const base_url = "https://v6.exchangerate-api.com/v6/b11f18ac3d7d91d1e6a56cf3/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode == "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    }) 
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal < 1 || amtVal === ""){
        amtVal = 1;
        amount.value = "1";
    }
    const fromCurr = document.querySelector(".from select")
    const toCurr = document.querySelector(".to select")

    const URL = `${base_url}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = response.json().then(result =>{
        let rate = result.conversion_rates[toCurr.value]
        console.log(rate)
        let finalAmount = amtVal * rate;
        console.log(`Converted amount: ${finalAmount}`);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    });  
})


