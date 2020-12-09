const complaint= document.querySelector('.tracking-content');

complaint.addEventListener('click', e=>{
    console.log('click recognized')
    console.log('e.target.parentElement '+e.target.parentElement);
    if(e.target.classList.contains('dropdown')){
        console.log('dropdown');
        console.log('e.target.classList : '+e.target.classList);
        e.target.parentElement.children[1].classList.remove('noDisplay');
        e.target.classList.add('noDisplay');
        console.log(e.target.parentElement.parentElement.parentElement.children[1].classList);
        e.target.parentElement.parentElement.parentElement.children[1].classList.remove('noDisplay')
        console.log('e.target.classList : '+e.target.classList);
    }
    else if(e.target.classList.contains('dropup')){
        console.log('up and up and up');
        e.target.classList.add('noDisplay');
        e.target.parentElement.children[1].classList.remove('noDisplay');
        console.log(e.target.parentElement.parentElement.parentElement.children[1].classList);
        e.target.parentElement.parentElement.parentElement.children[1].classList.add('noDisplay')
    }
})