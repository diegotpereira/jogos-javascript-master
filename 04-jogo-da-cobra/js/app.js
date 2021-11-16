document.addEventListener('DOMContentLoaded', () => {
    const quadrados = document.querySelectorAll('.grid div')
    const exibirPontuacao = document.querySelector('span')
    const iniciarBtn = document.querySelector('.iniciar')

    const width = 10
    let atualIndex = 0
    let appleIndex = 0
    let atualCobra = [2, 1, 0]

    let direcao = 1
    let pontuacao = 0
    let velocidade = 0.9
    let intervaloTemp = 0
    let intervalo = 0

    function iniciarJogo() {
        atualCobra.forEach(index => quadrados[index].classList.remove('cobra'))
        quadrados[appleIndex].classList.remove('apple')
        clearInterval(intervalo)
        pontuacao = 0
        randomApple()
        direcao = 1
        exibirPontuacao.innerText = pontuacao
        intervaloTemp = 1000
        atualCobra = [2, 1, 0]
        atualIndex = 0
        atualCobra.forEach(index => quadrados[index].classList.add('cobra'))
        intervalo = setInterval(moveOutcomes, intervaloTemp)
    }

    function moveOutcomes() {

        //deals with snake hitting border and snake hitting self
        if (
            (atualCobra[0] + width >= (width * width) && direcao === width) || //if snake hits bottom
            (atualCobra[0] % width === width - 1 && direcao === 1) || //if snake hits right wall
            (atualCobra[0] % width === 0 && direcao === -1) || //if snake hits left wall
            (atualCobra[0] - width < 0 && direcao === -width) || //if snake hits the top
            quadrados[atualCobra[0] + direcao].classList.contains('cobra') //if snake goes into itself
        ) {
            return clearInterval(intervalo) //this will clear the interval if any of the above happen
        }

        const cauda = atualCobra.pop()
        quadrados[cauda].classList.remove('cobra')
        atualCobra.unshift(atualCobra[0] + direcao)

        if (quadrados[atualCobra[0]].classList.contains('apple')) {
            quadrados[atualCobra[0]].classList.remove('apple')
            quadrados[cauda].classList.add('cobra')
            atualCobra.push(cauda)
            randomApple()
            pontuacao++
            exibirPontuacao.textContent = pontuacao
            clearInterval(intervalo)
            intervaloTemp = intervaloTemp * velocidade
            intervalo = setInterval(moveOutcomes, intervaloTemp)
        }
        quadrados[atualCobra[0]].classList.add('cobra')
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * quadrados.length)
        }
        while (quadrados[appleIndex].classList.contains('cobra'))
        quadrados[appleIndex].classList.add('apple')
    }

    function controle(e) {
        quadrados[atualIndex].classList.remove('cobra')

        if (e.keyCode === 39) {
            direcao = 1 //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direcao = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
            direcao = -1 // if we press left, the snake will go left one div
        } else if (e.keyCode === 40) {
            direcao = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
        }
    }

    document.addEventListener('keyup', controle)
    iniciarBtn.addEventListener('click', iniciarJogo)
})