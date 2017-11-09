import firebase from 'firebase'
import $ from 'jquery'
import {
    delay,
    cpfValidator
} from '../js/helpers'



class Firebase {
    constructor() {
        this.$firebase = firebase.initializeApp({
            apiKey: "AIzaSyB5RE6D57agLEMGeqsZMyZ-NVCtYdAqym0",
            authDomain: "vueqr-85452.firebaseapp.com",
            databaseURL: "https://vueqr-85452.firebaseio.com",
            projectId: "vueqr-85452",
            storageBucket: "vueqr-85452.appspot.com",
            messagingSenderId: "526527730693"
        })
        this.$ul = $('.mutliSelect ul')
        this.$notification = $('.notification')
        this.$subscriber = {
            id: '',
            nome: $('#nome'),
            sobrenome: $('#sobrenome'),
            email: $('#email'),
            cpf: $('#cpf'),
            telefone: $('#telefone'),
            submit: $('#submit')
        }
        this.$db = this.$firebase.database()
        this.$auth = this.$firebase.auth()
        this.$palestras = []
        this.bindEvents()

    }

    bindEvents() {
        let palestraKey
        this.$db
            .ref("palestra")
            .once("value")
            .then(snapshot => {
                let palestras = snapshot
                let contador = 0
                palestras.forEach((value, index) => {
                    palestraKey = value.key
                    // console.log('i', value.key)
                    // console.dir(value.val().subscribers)
                    if (Object.keys(value.val().subscribers).length >= value.val().numeroPessoas) {
                        this.$ul.append(`<li>
                                                <div class="palestra">
                                                    <input id="palestra-${value.key}" type="checkbox" value="${value.val().palestra}" disabled />
                                                    <label for="palestra-${value.key}" disabled><s>${value.val().palestra}</s></span>
                                                    <small>Esgotado</small>
                                                </div>
                                        </li>`)
                    } else {
                        this.$ul.append(`<li>
                                            <div class="palestra">
                                                <input id="palestra-${value.key}" type="checkbox" value="${value.val().palestra}" />
                                                <label for="palestra-${value.key}">${value.val().palestra}</span>
                                            </div>
                                    </li>`)
                    }
                    // Timeline JS


                    // console.warn(contador)    
                    let timelineTemplate = contador % 2 == 0 ?
                        `<li class="entry entry--left">
                      <div class="entry__content">
                          <div class="row entry__img ">
                              <figcaption>${value.val().palestrante}</figcaption>
                              <figure>
                                  <img src="${value.val().img}" alt="">
                              </figure>
                          </div>
                          <div class="row">
                              <div class="fullwidth">
                                  <h2>${value.val().palestra}</h2>
                                  <p>${value.val().descricao}</p>
                                  <p class="time">${value.val().dia}</p>
                              </div>
                          </div>
                      </li>` :
                        `<li class="entry entry--right">
                      <div class="entry__content">
                          <div class="row entry__img ">
                              <figure>
                                  <img src="${value.val().img}" alt="">
                              </figure>
                              <figcaption>${value.val().palestrante}</figcaption>                              
                          </div>
                          <div class="row">
                            <div class="fullwidth">
                                <h2>${value.val().palestra}</h2>
                                <p>${value.val().descricao}</p>
                                <p class="time">${value.val().dia}</p>
                            </div>
                          </div>
                      </li>`
                    contador++
                    let date = value.val().dia
                    // console.log(new Date(value.val().dia.substring(0,10)))                    

                    if (date.includes('22-11-2017')) {
                        $('.timeline--first').append(timelineTemplate)
                    } else if (date.includes('23-11-2017')) {
                        $('.timeline--second').append(timelineTemplate)
                    } else if (date.includes('24-11-2017')) {
                        $('.timeline--last').append(timelineTemplate)
                    }

                    let templateMapa = `
                    <li>
                        <p class="list_content">${value.val().palestra}</p>
                        <div class="row list_row">
                            <span class="column">${value.val().palestrante}</span>
                            <span class="column right">${value.val().dia}</span>
                        </div>
                    </li>
                `

                let sala = value.val().sala !== "Sala" ? value.val().sala.toLowerCase() : "auditório"
                   $(`[data-id="${sala}"]`).find('ul').append(templateMapa)



                })
                return palestraKey
            }).then((key) => {
                // visual
                let arrayPalestras = []
                let self = this;
                let palestras = document.querySelectorAll('.palestra')
                palestras.forEach((value, index) => {
                    value.addEventListener('change', function () {
                        if (this.children[0].checked == true) {
                            // firebase
                            self.$palestras.push(key)
                            // visual
                            arrayPalestras.push(this.children[0].value)

                            let html = `<span title="${arrayPalestras[arrayPalestras.length -1 ]}">${arrayPalestras[arrayPalestras.length -1 ]}</span>`
                            $('.multiSel').append(html)
                            // console.log('checkado', self.$palestras)
                            $('.hida').hide();




                        } else {
                            let index = self.$palestras.indexOf(key)
                            let indexArray = arrayPalestras.indexOf(arrayPalestras[arrayPalestras.length - 1])
                            // console.log(index)
                            if (index > -1) {
                                self.$palestras.splice(index, 1);
                                arrayPalestras.splice(indexArray, 1)
                            }
                            let html = `<span title="${arrayPalestras}">${arrayPalestras}</span>`
                            // $(`span[title=${self.$palestras[index]}]`).remove()

                            $('.multiSel').html(html)
                            if (self.$palestras.length < 1) {
                                $('span[title]').remove()
                                $('.hida').show();
                            }
                            // console.log('descheckou', self.$palestras)
                        }
                    })
                })
            })

        this.$subscriber.submit.on('click', (e) => {
            e.stopPropagation()
            let subs = this.$subscriber
            let data = {
                name: subs.nome.val(),
                lastname: subs.sobrenome.val(),
                email: subs.email.val(),
                tel: subs.telefone.val() || 'vazio',
                cpf: subs.cpf.val().replace(/\.|-/g, ''),
                palestras: this.$palestras,
                created_at: new Date(Date.now()).toLocaleDateString("pt-BR") + " " + new Date(Date.now()).toLocaleTimeString("pt-BR")
            }

            if (!cpfValidator(data.cpf)) {
                this.$notification.addClass('error')
                this.$notification.html('<p>CPF Inválido</p>')
                this.$notification.slideToggle('slow')
                delay(3000).then(() => {
                    this.$notification.slideToggle('slow')
                }).then(() => {
                    this.$notification.removeClass('error')
                })
            } else if (data.name && data.lastname && data.email && data.email.indexOf('@') != -1) {
                e.preventDefault()
                let db = this.$db
                if (data.palestras.length === 0) {
                    this.$notification.addClass('error')
                    this.$notification.html('<p>Preencha as palestras</p>')
                    this.$notification.slideToggle('slow')
                    delay(3000).then(() => {
                        this.$notification.slideToggle('slow')
                    }).then(() => {
                        this.$notification.removeClass('error')
                    })
                } else {
                    db.ref(`subscribers/${data.cpf}`)
                        .set(data)
                        .then((key) => {
                            data.palestras.forEach((value, index) => {
                                db.ref(`palestra/${value}/subscribers/${data.cpf}`).set(data)
                            })
                            this.$notification.addClass('success')
                            this.$notification.html('<p>Inscrição realizada com sucesso</p>')
                            this.$notification.slideToggle('slow')
                            delay(3000).then(() => {
                                this.$notification.slideToggle('slow')
                            }).then(() => {
                                this.$notification.removeClass('success')
                            })
                        })
                        .catch((e) => {
                            if (e.code == "PERMISSION_DENIED") {
                                this.$notification.addClass('error')
                                this.$notification.html('<p>Cadastro já incluido</p>')
                                this.$notification.slideToggle('slow')
                                delay(3000).then(() => {
                                    this.$notification.slideToggle('slow')
                                }).then(() => {
                                    this.$notification.removeClass('error')
                                })
                            } else {
                                this.$notification.addClass('error')
                                this.$notification.html('<p>Ocorreu um erro, tente mais tarde</p>')
                                this.$notification.slideToggle('slow')
                                delay(3000).then(() => {
                                    this.$notification.slideToggle('slow')
                                }).then(() => {
                                    this.$notification.removeClass('error')
                                })
                            }
                        })



                }
            }
        })
    }
}

export default new Firebase()