 import Person from './person.js'
//  import Modal from './modal.js'
 
 document.addEventListener("DOMContentLoaded", function (event) {
        
        setTimeout(() => {
            init()
        }, 2000);

    });

    function init() {
        // let mdConfirm = new Modal()
        // mdConfirm.setContents({
            
        // })
        // mdConfirm.init()
        let container = document.getElementsByClassName('container')[0]
        let btn = document.getElementsByClassName('confirm')[0]
        
        container.style.cssText = 'opacity:1;' + 'marginTop:15px;'
        btn.addEventListener("click", ()=> triggerForm(container));
    }

    function triggerInitial(container){
        let wrapper = container.getElementsByClassName('wrapper')[0]
        let form = container.getElementsByClassName('form')[0]
        container.style.opacity = 1
        form.style.display = 'none'
        wrapper.style.display = 'block'
        container.style.opacity = 0
    }
    
    function triggerForm(container) {
        let wrapper = container.getElementsByClassName('wrapper')[0];
        let form = container.getElementsByClassName('form')[0];
        container.style.opacity = 0;
        form.style.display = 'block';
        wrapper.style.display = 'none';
        container.style.opacity = 1;

        initForms(form)
    }

    function initForms(container){
        let target = container.getElementsByClassName('inputs')[0]
        let footer = container.getElementsByClassName('form-footer')[0]
        let submit = footer.getElementsByClassName('next')[0]

        let main = new Person({
            parent:null,
            identifier:generateRandomString(5),
            name:null,
            email:null,
            isMain:true,
            escorts:new Array()
        })

        main.setTarget(target)
        main.setForm()

        let escortsInput = main.getForm().usedInputs['escorts'].$el
        
        escortsInput.addEventListener('input', function() {

            let target = document.getElementsByClassName('inputs')[0];

            Array.from(target.children).forEach((el) => {
                if(el != main.getForm().fieldSet){
                    el.remove()
                }
            });

            for (let index = 0; index < this.value; index++) {
                // const element = array[index];
                let target = container.getElementsByClassName('inputs')[0]

                let main = new Person({
                    parent:null,
                    identifier:generateRandomString(5),
                    name:null,
                    email:null,
                    isMain:false,
                    escorts:new Array()
                })

                main.setTarget(target)
                main.setForm()
                
            }
        });

        submit.addEventListener('click', function(){
            validate(container)
        })

    }

    function validate(container){
        let fieldSets = container.getElementsByTagName('fieldset')
        let collection = new Array()
        Array.from(fieldSets).forEach((el)=>{
            let inputs = el.getElementsByTagName('input')
            let item = new Object()

            Array.from(inputs).forEach(function(input){
               let name = input.getAttribute('data-for')
               item[name] = input.value
            })
            collection.push(item)
        })

        triggerRequest(collection)
    }

   async function triggerRequest(collection) {
    try {
        let response = await fetch('http://localhost:3000/confirmar', {
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
        
    } catch (error) {
        console.error('Erro:', error);
    }
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