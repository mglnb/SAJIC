import firebase from 'firebase'
import $ from 'jquery'
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
                                            <label>
                                                <input type="checkbox" value="${value.val().palestra} " />${value.val().palestra}
                                            </label>
                                    </li>`)
                })

            });


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
                $.post('https://www.google.com/recaptcha/api/siteverify', {
                        'secret': '6LfDLDcUAAAAAPJR7wcSCVlBKI4CY0TSKeLQHSet',
                        'reponse': $('.g-recaptcha').val()
                    }).done(function () {
                        db.ref('subscribers')
                            .push(data)
                            .then(function () {
                                alert('Inscrição realizada com sucesso')
                            })
                            .catch(function (e) {
                                alert('Ocorreu um erro na inscrição')
                                console.log(e)
                            })
                    })
                    .fail(function () {
                        alert("error");
                    })
                    .always(function () {
                        alert("finished");
                    });


            }
        })
    }
}

export default new Firebase();