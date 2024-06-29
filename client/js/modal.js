import Base from './base.js'

export default class Modal extends Base {
    constructor(config) {
        super(config)
        // Configurações padrão
        this.config = {
            haveHeader:true,
            haveContent:true,
            haveFooter:true,
        };

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

    appendButtons(){
        if(Array.isArray(this.buttons)){
            this.buttons.forEach((button)=>{
                button.createEl('button', button.classes)
            })
        }
    }
    
    init(){
        let config = this.config
        this.container = this.createEl('div', 'md-ct')
        config.haveHeader && (this.buildHeader()) & (this.container.append(this.header))
        config.haveContent && (this.buildContent()) & (this.container.append(this.content))
        config.haveFooter && (this.buildFooter()) & (this.container.append(this.footer))
    } 
    buildHeader(content){
        this.header = this.createEl('div', 'md-header')

        if(content){
            this.header.innerHtml = content
        }
    }
    buildFooter(content){
        this.header = this.createEl('div', 'md-footer')

        if(content){
            this.header.innerHtml = content
        }
    }
    buildContent(content){
        this.header = this.createEl('div', 'md-content')

        if(content){
            this.header.innerHtml = content
        }
    }
}

