class Base {
    constructor(config) {
        // Configurações padrão
        this.config = {
            haveHeader:true,
            haveContent:true,
            haveFooter:true,
        };

        // Mescla as configurações fornecidas com as configurações padrão
        if (config) {
            this.config = deepMerge(this.config, config);
        }
    }
   
    createEl(tag, classes){
        let el = document.createElement(tag)
        
        classes.split(' ').array.forEach(classItem => {
             el.classList.add(classItem)
        });

        return el
    }
    
    // Função para mesclar profundamente objetos
    deepMerge(target, source) {
        for (let key in source) {
            if (source[key] instanceof Object) {
                Object.assign(source[key], deepMerge(target[key], source[key]));
            }
        }
        Object.assign(target || {}, source);
        return target;
    }
}


