// Capture elements with simplified variable names
const name = document.getElementById("brideGroomNameInput");
const bid = document.getElementById("initialBidInput");
const education = document.getElementById("educationLevelSelect");
const networth = document.getElementById("familyNetWorthSelect");
const caste = document.getElementById("casteSelect");
const skills = document.querySelectorAll(".skillsCheckboxes");
const age = document.getElementsByClassName("ageRadioButtons");
const reputation = document.querySelectorAll(".reputationCheckboxes");
const letter = document.getElementById("loveLetterTextarea");
const result = document.getElementById("resultContainer");
const calculate = document.getElementById("calculatePriceButton");

// Calculate function using simplified variable names
const calculatePrice = () => {
    let personName = name.value;
    let price = Number(bid.value);

    if (!personName || !price) {
        result.innerHTML = "<p class='text-danger'>Please enter both name and starting bid!</p>";
        return;
    }

    // Apply education coefficient
    price *= Number(education.value);

    // Apply net worth coefficient
    price *= Number(networth.value);

    // Add caste value to price
    price += Number(caste.value);

    // Add selected skills values
    const skillsTotal = Array.from(skills)
        .filter(skill => skill.checked)
        .reduce((sum, skill) => sum + Number(skill.value), 0);
    price += skillsTotal;

    // Apply age coefficient
    Array.from(age).forEach(option => {
        if (option.checked) price *= Number(option.value);
    });

    // Apply reputation adjustments
    reputation.forEach(rep => {
        if (rep.checked) {
            if (rep.value > 0) {
                price *= Number(rep.value);
            } else {
                price += Number(rep.value);
            }
        }
    });

    const loveLetter = letter.value;

    // Create and display result object
    let calculatedResult = {
        name: personName,
        finalPrice: price.toFixed(2),
        loveLetter: loveLetter
    };

    result.innerHTML = `
        <h5>Calculation Result</h5>
        <p>Your price for <strong>${calculatedResult.name}</strong> is <strong>$${calculatedResult.finalPrice}</strong></p>
        <p><strong>Love Letter:</strong> ${calculatedResult.loveLetter}</p>
    `;
};

// Add event listener to button
calculate.addEventListener("click", calculatePrice);
