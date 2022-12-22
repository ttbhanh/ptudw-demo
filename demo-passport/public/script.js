// Kiem tra password va password confirm giong nhau
function checkPasswordConfirm() {
    let password = document.querySelector(`[name=password]`);
    let confirmPassword = document.querySelector(`[name=confirmPassword]`);

    if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords not match!');
    } else {
        confirmPassword.setCustomValidity('');
    }
}