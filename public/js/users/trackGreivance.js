const complaint= document.querySelector('.tracking-content');
const changeStat= document.querySelector('.change-status');

complaint.addEventListener('click', e=>{
    console.log('click recognized e.traget: '+e.target.classList);
    console.log('e.target.parentElement '+e.target.parentElement.classList);
    if(e.target.classList.contains('dropdown')){
        console.log('dropdown');
        console.log('e.target.classList : '+e.target.classList);
        e.target.parentElement.parentElement.children[1].classList.remove('noDisplay');
        e.target.parentElement.classList.add('noDisplay');
        console.log(e.target.parentElement.parentElement.parentElement.parentElement.children[1].classList);
        e.target.parentElement.parentElement.parentElement.parentElement.children[1].classList.remove('noDisplay')
        console.log('e.target.classList : '+e.target.classList);
    }
    else if(e.target.classList.contains('dropup')){
        console.log('up and up and up');
        e.target.parentElement.classList.add('noDisplay');
        e.target.parentElement.parentElement.children[0].classList.remove('noDisplay');
        console.log(e.target.parentElement.parentElement.parentElement.parentElement.children[1].classList);
        e.target.parentElement.parentElement.parentElement.parentElement.children[1].classList.add('noDisplay')
    }else if(e.target.classList.contains('change-stat')){
        console.log('change status');
        e.target.parentElement.children[1].classList.remove('noDisplay');
        e.target.classList.add('noDisplay');
    }
})

