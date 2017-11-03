import {
    scrollIt
} from './helpers';

class Home {
    constructor() {
        this.$map = document.querySelectorAll("#map-svg [class^='fil']")
        this.$modals = document.querySelectorAll(".modal")
        this.$closes = document.querySelectorAll(".close")
        this.bindEvents();
    }

    bindEvents() {
        this.$closes.forEach((value, index) => {
            value.addEventListener('click', function() {
                console.log("clico")
                value.offsetParent.offsetParent.classList.remove('active')
            })
        })
        this.$map.forEach((value, index) => {
            let self = value;
            if (value.id) {
                let elem = {}
                this.$modals.forEach((value, index) => {
                    if (value.getAttribute('data-id') == self.id) {
                        elem = this.$modals[index]
                    }
                })
                value.addEventListener('click', function () {
                    try{
                        elem.classList.add('active')
                    }catch(e){}
                })
            }
        })


        // window.addEventListener('scroll', () => {
        //     const targetSection = document.querySelector('.section-schedule');
        //     const start = targetSection.offsetTop;
        //     const end = start + targetSection.offsetHeight;

        //     const changingPoint = window.scrollY + this.$hamburguer.offsetTop;

        //     const targetSection2 = document.querySelector('.section-partners');
        //     const start2 = targetSection2.offsetTop;
        //     const end2 = start2 + targetSection2.offsetHeight;

        //     if((changingPoint >= start && changingPoint <= end) || (changingPoint >= start2 && changingPoint <= end2)) 
        //        return this.$hamburguer.classList.toggle('nav-dark', true);

        //     this.$hamburguer.classList.remove('nav-dark');

        // });

        // this.$hamburguer.addEventListener('click', () => {
        //     this.$menu.classList.toggle('active');
        //     this.$menu.classList.toggle('inactive');
        // });

        // this.$btns.forEach((element, index, array) => {
        //     element.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         this.$menu.classList.toggle('active');
        //         this.$menu.classList.toggle('inactive');
        //         scrollIt(this.$sections[index]);
        //     })
        // });

        // this.$scrollTopButton.addEventListener('click', () => {
        //     scrollIt(this.$sections[0]);
        // })
    }
}

export default new Home();