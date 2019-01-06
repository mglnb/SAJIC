// $(".hamburguer").click(function(){
//   $(".nav-container").toggleClass("open");
//   $(this).toggleClass("toggle");
// });

function toggleHamburguer(){
  let hamburguer = document.querySelector('.hamburguer')
  let nav = document.querySelector('.nav-container')
  
  nav.classList.toggle('open')
  hamburguer.classList.toggle('toggle')

}
const hamburguer = document.querySelector('.hamburguer')
hamburguer.addEventListener('click', toggleHamburguer)
