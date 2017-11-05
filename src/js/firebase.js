import firebase from 'firebase'
import $ from 'jquery'
import {delay} from '../js/helpers'
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

        this.bindEvents()
    }

    bindEvents() {
        
        this.$db
            .ref("palestra")
            .once("value")
            .then(snapshot => {
                let palestras = snapshot
                palestras.forEach((value, index) => {
                    this.$ul.append(`<li>
                                            <label class="palestra">
                                                <input type="checkbox" value="${value.val().palestra} " />${value.val().palestra}
                                            </label>
                                    </li>`)
                })

            }).then(() => {
                // let labels = document.getElementsByClassName('palestra')

                // console.log(labels.length)

                // $('.mutliSelect label').on('click', function() {
                //     console.log('porra')
                //     var title = $(this).children[0].value,
                //       title = $(this).val() + ",";
                //     console.log(title)
                //     if ($(this).is(':checked')) {
                //       var html = '<span title="' + title + '">' + title + '</span>';
                //       $('.multiSel').append(html);
                //       $(".hida").hide();
                //     } else {
                //       $('span[title="' + title + '"]').remove();
                //       var ret = $(".hida");
                //       $('.dropdown dt a').append(ret);
                  
                //     }
                //   });
            })


        this.$subscriber.submit.on('click', (e) => {
            e.stopPropagation()
            let subs = this.$subscriber
            let data = {
                name: subs.nome.val(),
                lastname: subs.sobrenome.val(),
                email: subs.email.val(),
                tel: subs.telefone.val() || 'vazio',
                created_at: new Date(Date.now()).toLocaleDateString("pt-BR") + " " + new Date(Date.now()).toLocaleTimeString("pt-BR")
            }



            if (data.name && data.lastname && data.email && data.email.indexOf('@') != -1) {
                e.preventDefault()
                let db = this.$db

                db.ref('subscribers')
                    .push(data)
                    .then( () => {
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
        })
    }
}

export default new Firebase()