import firebase from 'firebase'
import $ from 'jquery'
import {
    delay
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
            nome: $('#nome'),
            sobrenome: $('#sobrenome'),
            email: $('#email'),
            telefone: $('#telefone'),
            submit: $('#submit')
        }
        this.$db = this.$firebase.database()
        this.$auth = this.$firebase.auth()
        this.$palestras = []
        this.bindEvents()
    }

    bindEvents() {

        this.$db
            .ref("palestra")
            .once("value")
            .then(snapshot => {
                let palestras = snapshot
                palestras.forEach((value, index) => {
                    console.log('i', value.key)
                    this.$ul.append(`<li>
                                            <div class="palestra">
                                                <input id="palestra-${value.key}" type="checkbox" value="${value.val().palestra}" />
                                                <label for="palestra-${value.key}">${value.val().palestra}</span>
                                            </div>
                                    </li>`)
                })

            }).then(() => {
                let self = this;
                let palestras = document.querySelectorAll('.palestra')
                palestras.forEach((value, index) => {
                    value.addEventListener('change', function () {
                        if (this.children[0].checked == true) {
                            self.$palestras.push(this.children[0].value)

                            let html = `<span title="${self.$palestras[self.$palestras.length - 1]}">${self.$palestras[self.$palestras.length - 1]}</span>`
                            $('.multiSel').append(html)
                            console.log('checkado', self.$palestras)
                            $('.hida').hide();
                        } else {
                            let index = self.$palestras.indexOf(this.children[0].value)
                            console.log(index)
                            if (index > -1) {
                                self.$palestras.splice(index, 1);
                            }
                            let html = `<span title="${self.$palestras}">${self.$palestras}</span>`
                            // $(`span[title=${self.$palestras[index]}]`).remove()

                            $('.multiSel').html(html)
                            if (self.$palestras.length < 1) {
                                $('span[title]').remove()
                                $('.hida').show();

                            }
                            console.log('descheckou', self.$palestras)
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
                palestras: this.$palestras,
                created_at: new Date(Date.now()).toLocaleDateString("pt-BR") + " " + new Date(Date.now()).toLocaleTimeString("pt-BR")
            }



            if (data.name && data.lastname && data.email && data.email.indexOf('@') != -1) {
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
                    db.ref('subscribers')
                        .push(data)
                        .then(() => {
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
                            this.$notification.addClass('error')
                            this.$notification.html('<p>Ocorreu um erro, tente mais tarde</p>')
                            this.$notification.slideToggle('slow')
                            delay(3000).then(() => {
                                this.$notification.slideToggle('slow')
                            }).then(() => {
                                this.$notification.removeClass('error')
                            })
                        })

                }
            }
        })
    }
}

export default new Firebase()