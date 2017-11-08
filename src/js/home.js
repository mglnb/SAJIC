import {
    scrollIt,
    delay
} from './helpers'
import Map from './maps/map'
import $ from 'jquery'

class Home {
    constructor() {
        this.$map = document.querySelectorAll("#map-svg [class^='fil']")
        this.$modals = document.querySelectorAll(".modal")
        this.$closes = document.querySelectorAll(".close")
        this.$btn_inscricao = document.getElementById("btn-inscricao")
        this.$modal_inscricao = document.getElementById("modal-inscricao")
        this.map = new Map('#eventMap')
        this.bindEvents()
        this.applyMasks()
        this.initMap()
        this.loading()
    }

    bindEvents() {
        this.$closes.forEach((value, index) => {
            value.addEventListener('click', function () {
                // console.log("clico")
                value.offsetParent.offsetParent.classList.remove('active')
            })
        })

        this.$map.forEach((value, index) => {
            let self = value
            if (value.id) {
                let elem = {}
                this.$modals.forEach((value, index) => {
                    if (value.getAttribute('data-id') == self.id) {
                        elem = this.$modals[index]
                    }
                })
                value.addEventListener('click', function () {
                    try {
                        elem.classList.add('active')
                    } catch (e) {
                        // console.log("Item do mapa selecionado não tem informações")
                    }
                })
            }
        })

        this.$btn_inscricao.addEventListener('click', () => {
            this.$modal_inscricao.classList.add('active')
        })

    }

    applyMasks() {

        $('#cpf').mask('000.000.000-00')
        $('#telefone').mask('(00) 00000-0000')
    }

    initMap() {
        this.map
            .fetchLocation('Faculdade de Tecnologia Senac Pelotas')
            .then(() => {
                this.map.init()
            })
    }

    loading() {
        let div = document.getElementById('loading-wrapper')
        let content = document.getElementsByClassName('content')[0]
        

        window.onload = () => {
            delay(1000).then(()=> {
                div.classList.add('deactive')
            }).then(() => {
                    content.classList.add('animate')                    
            })
        }
    }


}

export default new Home()