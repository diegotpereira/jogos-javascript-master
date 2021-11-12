const quadrado = document.querySelectorAll('.quadrado')
const toupeira = document.querySelector('.toupeira')
const tempoRestante = document.querySelector('#tempo-restante')
const pontuacao = document.querySelector('#pontuacao')

let result = 0
let hitPosition
let tempoAtual = 60
let timerId = null

function randomSquare() {
    quadrado.forEach(quadrado => {
        quadrado.classList.remove('toupeira')
    })

    let randomPosition = quadrado[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('toupeira')

    hitPosition = randomPosition.id
}

quadrado.forEach(quadrado => {
    quadrado.addEventListener('mousedown', () => {
        if (quadrado.id == hitPosition) {
            result = result + 1
            pontuacao.textContent = result
            hitPosition = null
        }
    })
})

function moverToupeira() {

    timerId = setInterval(randomSquare, 500)
}

moverToupeira()

function contagemRegressiva() {
    tempoAtual--
    tempoRestante.textContent = tempoAtual

    if (tempoAtual === 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('FIM DE JOGO! Sua pontuação final é ' + result)
    }
}

let countDownTimerId = setInterval(contagemRegressiva, 1000)