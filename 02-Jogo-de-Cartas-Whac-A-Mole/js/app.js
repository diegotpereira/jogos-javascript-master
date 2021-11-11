const quadrado = document.querySelectorAll('.quadrado')
const toupeira = document.querySelector('.toupeira')
const tempoRestante = document.querySelector('#tempo-restante')
const pontuacao = document.querySelector('#pontuacao')

let result = 0

function randomSquare() {
    quadrado.forEach(className => {
        className.classList.remove('toupeira')
    })

    let randomPosition = quadrado[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('toupeira')

    hitPosition = randomPosition.id
}

quadrado.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id == hitPosition) {
            result = result + 1
            pontuacao.textContent = result
                // hitPosition = null
        }
    })
})

function moverToupeira() {
    timerId = setInterval(randomSquare, 1000)
}

moverToupeira()