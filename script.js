const base_url = "https://v6.exchangerate-api.com/v6/979f4c65c28da44b01bf91f4/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency codes
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update flag based on selected currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Handle conversion on button click
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal < 1 || amtVal === "") {
        amtVal = 1;
        amount.value = "1";
    }
    const fromCurr = document.querySelector(".from select").value;
    const toCurr = document.querySelector(".to select").value;

    // Construct the URL dynamically
    const URL = `${base_url}/${fromCurr}`;
    try {
        let response = await fetch(URL);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");

        let result = await response.json();
        console.log(result); // Log the full response for debugging

        // Use the `conversion_rates` object to get the target rate
        let rate = result.conversion_rates[toCurr];
        let finalAmount = amtVal * rate;

        msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount.toFixed(2)} ${toCurr}`;
    } catch (error) {
        console.error(error);
        msg.innerText = "Error fetching exchange rates. Please try again.";
    }
});
