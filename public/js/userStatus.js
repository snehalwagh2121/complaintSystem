const status=document.querySelector('.profile');
const logout=document.querySelector('.logout');

console.log(status.parentElement.children[1].classList);
console.log(status.innerText);
if(status.innerText.toUpperCase()==='LOGOUT'){
    status.parentElement.classList.add('noDisplay');
    logout.classList.remove('noDisplay');
}