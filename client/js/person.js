  import Form from './form.js'
  export default class Person{
    #config = {
        parent:null,
        identifier:null,
        name:null,
        email:null,
        isMain:true,
        escorts:new Array()
    }
    constructor(config){
        this.#config = config
    }

    setForm(){
        this.form = new Form({
            isMain:this.#config.isMain,
            legend:this.#config.isMain?'Convidado':'Acompanhante'
        })

        this.form.init()
        this.form.setTarget(this.target)
        this.form.buildForm()
    } 

    getForm(){
        return this.form
    }

    setTarget(target){
        this.target = target
    }


}
