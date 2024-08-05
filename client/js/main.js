 import Person from './person.js'
 import Modal from './modal.js'
 import Popup from './pop-up.js'
 import {getList} from './list.js'

 let peoples = new Array()
 
 document.addEventListener("DOMContentLoaded", function (event) {

    // triggerPopUp('olá meu nome é thiago cazuni sou desenvolvedor web e quero fazer projetos incriveis','info-circle', '#fc4646')
        
        setTimeout(() => {
            init()
                // triggerProcessing()
            
        }, 2000);

    });

    function init() {

        let mdConfirm = new Modal({
            haveHeader:false,
            haveContent:true,
            haveFooter:true,
        }) 

        mdConfirm.setButtons([
            {
                classes:'confirm',
                html:'Confirmar Presença',
                click:function(){
                    mdConfirm.close()
                    triggerForm()
                }
            },
             {
                classes:'confirm-2',
                html:'Ver lista',
                 click:function(){
                    
                    triggerList(mdConfirm.close())
                }
            }
        ])
       
        mdConfirm.setContents({
            content: getLayout("md-trigger-confirm")[0].innerHTML
        })

        mdConfirm.init()
        mdConfirm.appendButtons()

    }

    function getLayout(value) {
        // Seleciona todos os elementos <hide>
        let hideElements = document.getElementsByTagName('hide');
        // Array para armazenar os elementos encontrados
        let matchedElements = [];

        // Itera sobre os elementos <hide>
        for (let hideElement of hideElements) {
            // Seleciona os elementos dentro de cada <hide> com o atributo data-layout igual ao valor fornecido
            let elements = hideElement.querySelectorAll(`[data-layout="${value}"]`);
            // Adiciona os elementos encontrados ao array de elementos correspondentes
            elements.forEach(element => matchedElements.push(element));
        }

        return matchedElements;
    }


    function triggerForm() {
    
        let mdConfirm = new Modal({
            haveHeader:true,
            haveContent:true,
            haveFooter:true,
        }) 

        mdConfirm.setButtons([
             {
                classes:'confirm',
                html:'Confirmar',
                click:function(event){
                
                    // if(peoples.length == 0){
                    //     triggerPopUp('Nenhuma entrada de dados foi encontrada, você precisa preencher o formulário','info-circle', '#fc4646')
                    //     return
                    // }

                    validate(mdConfirm)
                }
            },
            {
              classes:'confirm-2',
                html:'Voltar',
                click:function(){
                    mdConfirm.close()
                    init()
                }
            }
        ])
       
        mdConfirm.setContents({
            header:'Confirme sua presença',
            content: getLayout("md-confirm")[0].innerHTML
        })

        mdConfirm.init()
        mdConfirm.appendButtons()

        initForms(mdConfirm.content)
    } 

    async function triggerList(cb) {
        
        let response = await getList()

        try {


            if(response.list && Array.isArray(response.list)){
                cb && cb()
                let container =  document.createElement('div')
                let ul = document.createElement('ul')

                container.classList.add('list')

                container.append(ul)
    
                response.list.forEach(element => {
                    addRow(element, ul)    
                });

                canContinue(container)
            } 

            console.log(response);
            if(response.hasOwnProperty('errorcode') && response.errorcode != 0){
                 throw new Error('teste2 deu erro');
            }

            function canContinue(container){

                let mdConfirm = new Modal({
                    haveHeader:true,
                    haveContent:true,
                    haveFooter:true,
                    classes:'list-md'
                }) 
        
                mdConfirm.setButtons([
                    {
                        classes:'confirm-2',
                        html:'Voltar',
                        click:function(){
                            mdConfirm.close()
                            init()
                        }
                    }
                ])
            
                mdConfirm.setContents({
                    header:'Confirmados',
                    content:container.outerHTML
                })
        
                mdConfirm.init()
                mdConfirm.appendButtons()
            }
            
        } catch (error) {
            triggerPopUp('Não foi possível encontrar a lista de confirmados, por favor tente mais tarde', 'info-circle', '#EC7586')
            init()
            console.log(error);
        }
        
    }

    function addRow(data, container) {
        let item = document.createElement('li')
        item.innerHTML = data.name
        container.appendChild(item)
    }

    function initForms(container){
        let target = container.getElementsByClassName('inputs')[0]

        let main = new Person({
            parent:null,
            identifier:generateRandomString(5),
            name:null,
            email:null,
            phone:null,
            isMain:true,
            escorts:new Array()
        })

        peoples.push(main)
        main.setTarget(target)
        main.setForm()

        let escortsInput = main.getForm().usedInputs['escorts'].$el
        
        escortsInput.addEventListener('input', inputEvent);
 
        //função que será executada no evento de input
        function inputEvent() {

            peoples = new Array()
            peoples.push(main)
            
            // let target = document.getElementsByClassName('inputs')[0];

            Array.from(target.children).forEach((el) => {

                if(el != main.getForm().fieldSet)
                el.remove()
            });

            for (let index = 0; index < this.value; index++) {
                let target = container.getElementsByClassName('inputs')[0]

                let person = new Person({
                    parent:null,
                    identifier:generateRandomString(5),
                    name:null,
                    email:null,
                    phone:null,
                    isMain:false,
                    escorts:new Array()
                })

                peoples.push(person)
                person.setTarget(target)
                person.setForm()
                
            }
        }

    }
 
    
    function validate(mdConfirm){
        let inputsEnabled = new Array()
       
        peoples.every(person => {
            let form = person.form
            let item = new Object()
            
            if(Object.entries(form.inputs).length > 0){
                let inputs = form.usedInputs
   
             
               let personValid = Object.entries(inputs).every(([key, input]) => {
                    let name = input.name
                    let value = input.$el.value
                    let config = input.config
                    item[name] = value 
                     
                    if(value && value != ''){
                        input.isValid = true
                    } else {
                        input.isValid = false
                    }

                    if(input.hasOwnProperty('config')){
                        if(!config.validate(value)){
                            inputsEnabled = false
                            triggerPopUp(config.errorMessage(),'info-circle', '#fc4646')
                            input.$el.classList.add('tx-dg') 
                            return false
                        }
                    }
             
                    if(input.required && !input.isValid){
                        inputsEnabled = false
                        triggerPopUp('Você precisa preencher este(s) campo','info-circle', '#fc4646')
                        input.$el.classList.add('tx-dg') 

                        return false 
                          
                    } else {
                        input.$el.classList.remove('tx-dg') 

                        return true
                    }

                })

                if(personValid){
                    inputsEnabled.push(item)
                } else {
                    inputsEnabled = false
                }

                return personValid
            }
        })

         

        if(inputsEnabled && inputsEnabled.length > 0){
            mdConfirm.close() 
            let mdProcessing = triggerProcessing()
            setTimeout(() => triggerRequest(inputsEnabled, mdProcessing), 1000);
	    peoples = new Array()
        }
        
        // let fieldSets = mdConfirm.content.getElementsByTagName('fieldset')
        // let collection = new Array()

        // Array.from(fieldSets).forEach((el) => {
        //     let inputs = el.getElementsByTagName('input')
        //     let item = new Object()

        //     Array.from(inputs).forEach(function(input){
        //        let name = input.getAttribute('data-for')
        //        item[name] = input.value
        //     })

        //     collection.push(item)
        // }) 

        // mdConfirm.close() 
        // let mdProcessing = triggerProcessing()

        // setTimeout(() => triggerRequest(collection, mdProcessing), 1000);
    }

    function triggerPopUp(message, icon, bgColor) {
        if(!Popup.existsPopUp){
            let pop = new Popup(message, icon, bgColor);
            pop.open()
        }
    }
 
   async function triggerRequest(collection, mdProcessing) {

        try {
            let response = await fetch('/lista/confirmar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collection)
            });
            

            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            } 

            let data = await response.json();
            if(data && data.errorCode == 0){
                mdProcessing.close()
                triggerThankyou()
            }
            
        } catch (error) {
            mdProcessing.close()
            triggerPopUp('Não foi possível adicionar o seu registro, tente novamente mais tarde. erro:' + error.message, 'info-circle','#fc4646' )
            init() 
            return false;
        }
    }

    function triggerThankyou(){
         let mdConfirm = new Modal({
            haveHeader:true,
            haveContent:true,
            haveFooter:false,
            classes:'thanks-md'
        }) 
       
        mdConfirm.setContents({
            header:'Presença confirmada!',
            content: getLayout("md-trigger-thanks")[0].innerHTML
        })

        mdConfirm.init()
        mdConfirm.appendButtons()

        setTimeout(() => {
            // mdConfirm.close()
            triggerList(mdConfirm.close())
        }, 2750);
    }

    function triggerProcessing(){
        let container = document.createElement('div')
        let wrapper = document.createElement('div')
        let loaderCt = document.createElement('div')
        let loader = document.createElement('div')
        let text = document.createElement('div')
 
        container.classList.add('processing-md')
        wrapper.classList.add('processing-wrapper')
        loaderCt.classList.add('loader-grid')
        loader.classList.add('loader')
        text.classList.add('processing-text')
        
        text.append('Processando suas informações...')
        wrapper.append(loaderCt, text)
        loaderCt.append(loader)
        container.append(wrapper)

        let md = new Modal({
            haveHeader:false,
            haveContent:true,
            haveFooter:false,
        }) 
        // md.content.css({
        //     display:'flex',
        //     flexDirection:'column'
        // })
        
        
        md.setContents({
            content: container.outerHTML
        })
        
        md.init()
        md.content.style.cssText = 'flex-direction:column;' + 'display:flex';
        
        return md
    }


    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

