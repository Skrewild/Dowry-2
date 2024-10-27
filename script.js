const calculate = () => {
    const brideName = document.getElementById("name").value.trim();
    const startingBid = parseFloat(document.getElementById("starting_bid").value);

    if (brideName === "" || isNaN(startingBid) || startingBid < 0) {
        alert("Incorrect inputs");
        return;
    }

    const educationValue = document.getElementById("education").value;
    const educoef = getEducationCoefficient(educationValue);

    const networthValue = document.getElementById("networth").value;
    const netcoef = getNetWorthCoefficient(networthValue);

    const casteValue = document.getElementById("caste").value;
    const castecost = getCasteCost(casteValue);

    const skills = document.getElementsByClassName("skills");
    const skillcost = getCheckboxValuesFilterReduce(skills, 0);

    const ageOptions = document.getElementsByName("age");
    let agecoef = getRadioValue(ageOptions, 1);

    let finalPrice = startingBid;
    finalPrice *= educoef; 
    finalPrice *= netcoef; 
    finalPrice += castecost; 
    finalPrice += skillcost; 
    finalPrice *= agecoef; 

    
    let reputationcoef = 0;
    const reputationChecks = [
        { id: "gossparents", deduction: 0.15 },
        { id: "gosscharacter", deduction: 0.1 },
        { id: "gossgeneral", deduction: 20 }
    ];
    
    for (let check of reputationChecks) {
        if (document.getElementById(check.id).checked) {
            if (check.id === "gossgeneral") {
                reputationcoef += check.deduction; 
            } else {
                reputationcoef += finalPrice * check.deduction; 
            }
        }
    }

    finalPrice -= reputationcoef; 

    
    const loveLetter = document.getElementById("love_letter").value;

    
    let person = {
        bride_name: brideName || "Unknown", 
        bride_price: finalPrice.toFixed(2),
        letter_to_bride: loveLetter
    };

    
    document.getElementById("result").innerHTML = `Your price for ${person.bride_name} is $${person.bride_price}. <br> Your love letter: ${person.letter_to_bride}`;
};


document.getElementById("submit").addEventListener("click", calculate);


const getEducationCoefficient = (education) => {
    switch (education) {
        case "bachelor":
            return 1.5;
        case "college":
            return 1.2;
        case "high_school":
            return 1.05;
        case "middle_school":
            return 0.9;
        default:
            return 1; 
    }
}


const getNetWorthCoefficient = (networth) => {
    switch (networth) {
        case "upper_class":
            return 2;
        case "middle_class":
            return 1.5;
        case "lower_class":
            return 1.2;
        default:
            return 1; 
    }
}


const getCasteCost = (caste) => {
    switch (caste) {
        case "brahmin":
            return 100;
        case "kshatriya":
            return 50;
        case "vaishya":
            return 20;
        case "shudra":
            return 10;
        case "varna":
            return -50;
        default:
            return 0; 
    }
}


const getCheckboxValuesFilterReduce = (html_collection, price) => {
    const list = Array.from(html_collection).filter(filteration); 
    const result = list.reduce(reducer, price); 
    return result;
}

const reducer = (accumulator, item) => {
    return accumulator + Number(item.value); 
}

const filteration = (item) => {
    return item.checked; 
}


const getRadioValue = (node_list, price) => {  
    node_list.forEach(item => {
        if (item.checked) {
            price *= Number(item.value); 
        }
    });
    return price;
}
