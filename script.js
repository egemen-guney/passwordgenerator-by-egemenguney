const passwordVal = document.getElementById("password");
const copyButton = document.getElementById("copy-button");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const symbolsCheckbox = document.getElementById("symbols");
const numbersCheckbox = document.getElementById("numbers");
const generateButton = document.getElementById("generate-button");
const strengthBar = document.querySelector(".strength");
const strengthText = document.getElementById("strength-level");

// OPTIONS
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
const numberChars = "0123456789";

// FUNC.S
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

copyButton.addEventListener("click", () => {
    if(!passwordVal.value) return; // nothing to copy

    navigator.clipboard.writeText(passwordVal.value)
    .then(() => copySucceed())
    .catch((error) => alert("Could not copy to clipboard. Please try again.", error));
});

generateButton.addEventListener("click", makePassword);

function copySucceed() {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check"); 

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
    }, 1500);
}

function makePassword() {
    const length = Number(lengthSlider.value);
    const useUppercase = uppercaseCheckbox.checked;
    const useLowercase = lowercaseCheckbox.checked;
    const useSymbols = symbolsCheckbox.checked;
    const useNumbers = numbersCheckbox.checked;

    if (!useUppercase && !useLowercase && !useSymbols && !useNumbers) {
        alert("Please select at least one character type.");
        return;
    }

    const newPassword = generatePassword(length, useUppercase, useLowercase, useSymbols, useNumbers);
    passwordVal.value = newPassword;
    updateStrengthBar(newPassword);
}

function generatePassword(length, useUppercase, useLowercase, useSymbols, useNumbers) {
    let optionChars = "";
    let password = "";

    if (useUppercase) optionChars += uppercaseChars;
    if (useLowercase) optionChars += lowercaseChars;
    if (useSymbols) optionChars += symbolChars;
    if (useNumbers) optionChars += numberChars;

    for (let i = 0; i < length; i++) {
        const randomIdx = Math.floor(Math.random() * optionChars.length);
        password += optionChars[randomIdx];
    }

    return password;
}

function updateStrengthBar(password) {
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);
    const hasNumbers = /[0-9]/.test(password);

    let strength = 0;
    strength += Math.min(length * 1.5, 40); // check logic later
    if (hasUppercase) strength += 17;
    if (hasLowercase) strength += 17;
    if (hasSymbols) strength += 17;
    if (hasNumbers) strength += 9;

    if (length < 9) strength = Math.min(strength, 40);

    const strengthBound = Math.max(15, Math.min(strength, 100));

    strengthBar.style.width = strengthBound + "%";

    let strengthLevel = "";
    let strengthColor = "";

    if (strength <= 40) { // weak
        strengthLevel = "Weak";
        strengthColor = "#c80000";
    } else if (strength <= 70) { // medium
        strengthLevel = "Medium";
        strengthColor = "#ffa500";
    } else { // strong
        strengthLevel = "Strong";
        strengthColor = "#009600";
    }

    strengthText.textContent = strengthLevel;
    strengthText.style.color = strengthColor;
    strengthBar.style.backgroundColor = strengthColor;
}

// DEFAULT BEHAVIOUR ON REFRESH
window.addEventListener("DOMContentLoaded", makePassword);