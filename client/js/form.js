export default class Form{
    constructor(config){

        if(!config){
            config = {
                isMain:true,
                legend:'Convidado'
            }
        }

        this.config = config
        this.usedInputs = null

        this.inputs = {
            'name':{
                tag:'input',
                type:'text',
                placeholder:'Insira o seu nome',
                $el:null,
                name:'name',
                required:true,
                isValid:undefined
            },
            'phone':{
                tag:'input',
                type:'text',
                placeholder:'exemplo: (99) 99999-9999',
                $el:null,
                name:'phone',
                maxlength:15,
                isValid:undefined,
                required:true,
                config:{
                    mask:function(value){
                        if (!value) return ""
                        value = value.replace(/\D/g,'')
                        value = value.replace(/(\d{2})(\d)/,"($1) $2")
                        value = value.replace(/(\d)(\d{4})$/,"$1-$2")
                        return value
                    },
                    validate:function(value){
                        if(value.length == 15){
                            return true
                        } else {
                            false
                        }
                    },
                    errorMessage(){
                        return 'Você não inseriu corretamente o número do telefone'
                    }
                }
            },
            'escorts':{
                tag:'input',
                type:'number',
                required:false,
                placeholder:'Insira a quantidade de acompanhantes',
                $el:null,
                name:'escorts',
                isValid:undefined
            }
        }

    }

    init(){
        this.setInputs()
    }
    setInputs(){
        let isMain = this.config.isMain

        if(isMain){
            this.usedInputs = {
                "name":this.inputs['name'],
                "phone":this.inputs['phone'],
                "escorts":this.inputs['escorts'],
            }
        } else {
             this.usedInputs = {
                "name":this.inputs['name'],
            }
        }
    }
    buildForm(){
        let self = this
        this.fieldSet = document.createElement('fieldset')

        if(this.config.legend){
            let legend = document.createElement('legend')
            legend.innerHTML = this.config.legend
            this.fieldSet.appendChild(legend)
        }

        Object.entries(this.usedInputs).forEach(([key, value])=> {
            let el = document.createElement(value.tag)

            el.addEventListener('focus', ()=> el.classList.remove('tx-dg'))

            value.placeholder && el.setAttribute('placeholder', value.placeholder)
            value.type && el.setAttribute('type', value.type)
            value.name && el.setAttribute('data-for', value.name)
            value.maxlength && el.setAttribute('maxlength', value.maxlength)

            if(value.hasOwnProperty('config') && value.config.hasOwnProperty('mask')){

                el.addEventListener("keyup", (event) => {
                    el.value = value.config.mask(el.value)
                });
            }

            self.usedInputs[key].$el = el
 
            self.fieldSet.appendChild(el)
        })
        
        this.target.appendChild(self.fieldSet)
    }
    
    setTarget(target){
        this.target = target
    }


}