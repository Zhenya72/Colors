const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function generateRandomColor() {
    const hexCode = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++){
        color+=hexCode[Math.floor(Math.random()*hexCode.length)]
    } 
    return '#' + color
}

function setColor(el, color) {
    const luminance = chroma(color).luminance()
    el.style.color=luminance > 0.5 ? 'black' : 'white'
}

function setRandomColors() {
    cols.forEach((col) => {
        const isLoced=col.querySelector('i').classList.contains('bxs-lock-alt')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        const color = generateRandomColor()
        if (!isLoced) {
            text.textContent=color
            col.style.background = color
            setColor(text, color)
            setColor(button, color)
        }
    })
}

setRandomColors()

document.addEventListener('click', (event) => {
    if (event.target.dataset.type === "lock") {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
        node.classList.toggle('bxs-lock-alt')
        node.classList.toggle('bxs-lock-open-alt')
    } else if (event.target.dataset.type === "copy") {
        const textParent = event.target.textContent
        copyToClickboard(textParent)

        const tooltip = document.querySelectorAll('.tooltip');
        
        let arrayTextContent = [];
        cols.forEach((event) => {
            const arrayElements = event.children[0].textContent
            let k = ''
            for (let i = 0; i < arrayElements.length; i++){
                k += arrayElements[i]
                if (k.length === 7) {
                    arrayTextContent.push(k)
                    k=''
                }
            }
        })

        for (let i = 0; i < arrayTextContent.length; i++) {
            if (textParent === arrayTextContent[i]) {
                tooltip[i].classList.add("show");
                setTimeout(function () {
                    tooltip[i].classList.remove("show");
                }, 2000);
            }
        }
    }
})

