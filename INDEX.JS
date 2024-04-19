
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const idNumber = document.getElementById('idNo');
const reason = document.getElementById('reason');


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const idNumberValue = idNumber.value.trim();
    const reasonValue = reason.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required my G');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(idNumberValue === '') {
        setError(idNumber, 'ID is required');
    } else {
        setSuccess(idNumber);
    }
    if(reasonValue === '') {
        setError(reason, 'Why should we give you money');
    } else {
        setSuccess(reason);
    }

    

};
form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

// repayment
//variables for top
const loanAmountInput = document.querySelector(".amount");
const interestInput = document.querySelector(".interest"); //(.) before declearing the element as it is a css selector
const tenureInput = document.querySelector(".tenure");

//variable bottom
const loanEmi = document.querySelector(".LOAN .value");
const interestPay = document.querySelector(".ToatalI .value");
const totalAmt = document.querySelector(".TotalA .value");

//variable for calculation
const calculationM = document.querySelector(".btn-clr");

//changing the elements to float values
let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestInput.value);
let loanTenure = parseFloat(tenureInput.value);

//declearing my interest rate
let intorest =  interestRate / 12 / 100 ;

//function to calulate the emi
const calculateEMI = () => {
    let emi =  loanAmount*intorest*(Math.pow(1+intorest,loanTenure))/(Math.pow(1+intorest,loanTenure)-1)
    return emi;
}
//function to update all values
const updateData = (emi) => {
    loanEmi.innerHTML = Math.round(emi);

    let totalAmount = Math.round(loanTenure*emi);
    totalAmt.innerHTML = totalAmount;

    let totalInterrest = Math.round(totalAmount-loanAmount);
    interestPay.innerHTML=totalInterrest;

}

//refreshing the values
const refreshInput = () =>{
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestInput.value);
    loanTenure = parseFloat(tenureInput.value);
    intorest =  interestRate / 12 / 100 ;
   
   }
//calling the first 2 fuctions
const init = () =>{
    refreshInput()
    let emi = calculateEMI(); //a function passed as an argument to another fuction
    updateData(emi)

}
init();

calculationM.addEventListener("click",init)

