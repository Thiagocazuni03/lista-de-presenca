//  document.addEventListener("DOMContentLoaded", async function (event) {
//     let container = document.getElementsByClassName('container')[0]
//     let list = document.getElementsByClassName('list')[0]
//     let ol = document.createElement('ul')
//     // container.prepend(title)
//     fetch('http://localhost:3000/confirmados').then(response=> response.json())
//     .then(response => {

//         let items = JSON.parse(response)

//         items.forEach(element => {
//             let item = document.createElement('li')
//             item.innerHTML = element.name
//             ol.appendChild(item)
//         });

//         list.append(ol)

//         container.style.opacity = 1
//     })
// })

export function getList(){
    // let container = document.getElementsByClassName('container')[0]
    // let list = document.getElementsByClassName('list')[0]
    // let ol = document.createElement('ul') 
    return fetch('http://localhost:3000/lista/confirmados').then(response=> response.json()).then(response => {
        
       return {
            errorcode:0,
            list:JSON.parse(response)
       }
    }).catch(error => {
        return {
            errorcode:1,
            message:'Exibindo o erro:' + error.message
        }
    }) 
    // .then(response => {

    //     let items = JSON.parse(response)

    //     items.forEach(element => {
    //         let item = document.createElement('li')
    //         item.innerHTML = element.name
    //         ol.appendChild(item)
    //     });

    //     list.append(ol)

    //     container.style.opacity = 1
    // })

}
