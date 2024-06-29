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
                name:'name'
            },
            'email':{
                tag:'input',
                type:'text',
                placeholder:'Insira o seu e-mail',
                $el:null,
                name:'email' 
            },
            'escorts':{
                tag:'input',
                type:'number',
                placeholder:'Insira a quantidade de acompanhantes',
                $el:null,
                name:'escorts' 
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
                "email":this.inputs['email'],
                "escorts":this.inputs['escorts'],
            }
        } else {
             this.usedInputs = {
                "name":this.inputs['name'],
                // "email":this.inputs['email'],
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
            el.setAttribute('placeholder', value.placeholder)
            el.setAttribute('type', value.type)
            el.setAttribute('data-for', value.name)
            self.usedInputs[key].$el = el
 
            self.fieldSet.appendChild(el)
        })
        
        this.target.appendChild(self.fieldSet)
    }
    
    setTarget(target){
        this.target = target
    }


}