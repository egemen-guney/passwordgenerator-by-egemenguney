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
const strengthText = document.querySelector(".strength-level");

// OPTIONS
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";
const numberChars = "0123456789";

// FUNC.S
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

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