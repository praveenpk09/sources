let burger=document.querySelector(".burger");
let links=document.querySelector(".nav-links");
burger.addEventListener('click',()=>{
    links.classList.toggle("nav-show")
})