import Base from './base.js'

export default class Modal extends Base {
    constructor(config) {
        super(config)
        // Configurações padrão
        this.config = {
            haveHeader:true,
            haveContent:true,
            haveFooter:true,
            classes:null
        };

        this.target = document.getElementsByTagName('body')[0]
        // Mescla as configurações fornecidas com as configurações padrão
        if (config) {
            this.config = this.deepMerge(this.config, config);
        }
    }

    setContents(obj){
        this.contents = obj 
    }

    setButtons(arr, wrapperCss){
       this.buttons = arr
    }

    close(){
        this.container.style.opacity = 0
        setTimeout(() => {
            this.container.remove()
        }, 500);
    }

    appendButtons(){

        if(Array.isArray(this.buttons) && this.config.haveFooter){
            this.buttons.forEach((button)=>{
                let el;

                if(button.hasOwnProperty('classes')){
                    el = this.createEl('button', button.classes)
                } else {
                    el = this.createEl('button')
                }

                if(button.hasOwnProperty('html')){
                    el.innerHTML = button.html
                }

                if(button.hasOwnProperty('click')){
                    el.addEventListener('click', function(){
                        button.click()
                    })
                }

                this.footer.append(el)
            })
        
        }   
    }
    
    init(){
        if(this.contents){
            let config = this.config
            this.container = this.createEl('div', 'md-ct')
            config.classes && (this.container.classList.add(config.classes))
            config.haveHeader && (this.buildHeader()) & (this.container.append(this.header))
            config.haveContent && (this.buildContent()) & (this.container.append(this.content))
            config.haveFooter && (this.buildFooter()) & (this.container.append(this.footer))
            this.target.append(this.container)
        } else {
            throw 'não foi setado o conteúdo'
        }
    } 
    buildHeader(){
        this.header = this.createEl('div', 'md-header')
        let content = this.contents.header
        if(content){
            this.header.innerHTML = content
        }
    }

  buildContent() {
    this.content = this.createEl('div', 'md-content');
    let content = this.contents.content;

    if (content) {
        this.content.innerHTML = content; // Corrigido para innerHTML
    }
}

    buildFooter(){
        this.footer = this.createEl('div', 'md-footer')
        let content = this.contents.footer


        if(content){
            this.footer.innerHTML = content
        } 
    }

}

