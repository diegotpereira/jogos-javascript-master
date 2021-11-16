document.addEventListener('DOMContentLoaded', () => {
    const quadrados = document.querySelectorAll('.grid div')
    const logsRestante = document.querySelectorAll('.log-left')
    const logsCerto = document.querySelectorAll('.log-right')
    const carrosRestante = document.querySelectorAll('.car-left')
    const carrosCerto = document.querySelectorAll('.car-right')
    const tempoRestante = document.querySelector('#tempo-restante')
    const resultado = document.querySelector('#resultado')
    const iniciarBtn = document.querySelector('#button')
    const width = 9
    let atualIndex = 76
    let atualTempo = 20
    let timerId

    function moverfrog(e) {
        quadrados[atualIndex].classList.remove('frog')

        switch (e.keyCode) {
            case 37:
                if (atualIndex % width !== 0) atualIndex -= 1
                break
            case 38:
                if (atualIndex - width >= 0) atualIndex -= width
                break
            case 39:
                if (atualIndex % width < width - 1) atualIndex += 1
                break
            case 40:
                if (atualIndex + width < width * width) atualIndex += width
                break
        }
        quadrados[atualIndex].classList.add('frog')
        perdeu()
        venceu()
    }

    // mover carros 
    function autoMoverCarros() {
        carrosRestante.forEach(carroRestante => moverCarroRestante(carroRestante))
        carrosCerto.forEach(carroCerto => moverCarroCerto(carroCerto))
    }

    function moverCarroRestante(carroRestante) {
        switch (true) {
            case carroRestante.classList.contains('c1'):
                carroRestante.classList.remove('c1')
                carroRestante.classList.add('c2')
                break
            case carroRestante.classList.contains('c2'):
                carroRestante.classList.remove('c2')
                carroRestante.classList.add('c3')
                break

            case carroRestante.classList.contains('c3'):
                carroRestante.classList.remove('c3')
                carroRestante.classList.add('c1')
                break
        }
    }

    function moverCarroCerto(carroCerto) {
        switch (true) {
            case carroCerto.classList.contains('c1'):
                carroCerto.classList.remove('c1')
                carroCerto.classList.add('c3')
                break
            case carroCerto.classList.contains('c2'):
                carroCerto.classList.remove('c2')
                carroCerto.classList.add('c1')
                break

            case carroCerto.classList.contains('c3'):
                carroCerto.classList.remove('c3')
                carroCerto.classList.add('c2')
                break
        }
    }

    function autoMoverLogs() {
        logsRestante.forEach(logRestante => moverLogRestante(logRestante))
        logsCerto.forEach(logCerto => moverLogCerto(logCerto))
    }

    function moverLogRestante(logRestante) {
        switch (true) {
            case logRestante.classList.contains('l1'):
                logRestante.classList.remove('l1')
                logRestante.classList.add('l2')
                break
            case logRestante.classList.contains('l2'):
                logRestante.classList.remove('l2')
                logRestante.classList.add('l3')
                break

            case logRestante.classList.contains('l3'):
                logRestante.classList.remove('l3')
                logRestante.classList.add('l4')
                break

            case logRestante.classList.contains('l4'):
                logRestante.classList.remove('l4')
                logRestante.classList.add('l5')
                break

            case logRestante.classList.contains('l5'):
                logRestante.classList.remove('l5')
                logRestante.classList.add('l1')
                break
        }
    }

    function moverLogCerto(logCerto) {
        switch (true) {
            case logCerto.classList.contains('l1'):
                logCerto.classList.remove('l1')
                logCerto.classList.add('l5')
                break
            case logCerto.classList.contains('l2'):
                logCerto.classList.remove('l2')
                logCerto.classList.add('l1')
                break

            case logCerto.classList.contains('l3'):
                logCerto.classList.remove('l3')
                logCerto.classList.add('l2')
                break

            case logCerto.classList.contains('l4'):
                logCerto.classList.remove('l4')
                logCerto.classList.add('l3')
                break

            case logCerto.classList.contains('l5'):
                logCerto.classList.remove('l5')
                logCerto.classList.add('l4')
                break
        }
    }

    function moverComCarroRestante() {
        if (atualIndex >= 27 && atualIndex < 35) {
            quadrados[atualIndex].classList.remove('frog')
            atualIndex += 1
            quadrados[atualIndex].classList.add('frog')
        }
    }

    function moverComCarroCerto() {
        if (atualIndex > 18 && atualIndex <= 26) {
            quadrados[atualIndex].classList.remove('frog')
            atualIndex -= 1
            quadrados[atualIndex].classList.add('frog')
        }
    }

    function venceu() {
        if (quadrados[4].classList.contains('frog')) {
            resultado.innerHTML = 'Você Venceu'
            quadrados[atualIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup', moverfrog)
        }
    }

    function perdeu() {
        if ((atualTempo === 0) ||
            (quadrados[atualIndex].classList.contains('c1')) ||
            (quadrados[atualIndex].classList.contains('l5')) ||
            (quadrados[atualIndex].classList.contains('l4'))) {

            resultado.innerHTML = 'Você Perdeu'
            quadrados[atualIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup', moverfrog)
        }
    }

    function moverPecas() {
        atualTempo--
        tempoRestante.textContent = atualTempo
        autoMoverCarros()
        autoMoverLogs()
        moverComCarroRestante()
        moverComCarroCerto()
        perdeu()
    }

    iniciarBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)

        } else {
            timerId = setInterval(moverPecas, 1000)
            document.addEventListener('keyup', moverfrog)
        }
    })
})