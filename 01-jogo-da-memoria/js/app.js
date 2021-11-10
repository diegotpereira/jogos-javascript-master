document.addEventListener('DOMContentLoaded', () => {

    // opções card
    const cardArray = [{
            name: 'fritas',
            img: 'imagens/fries.png'
        },
        {
            name: 'X-Burguer',
            img: 'imagens/cheeseburger.png'
        },
        {
            name: 'sorvete',
            img: 'imagens/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'imagens/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'imagens/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'imagens/hotdog.png'
        },
        {
            name: 'fritas',
            img: 'imagens/fries.png'
        },
        {
            name: 'X-Burguer',
            img: 'imagens/cheeseburger.png'
        },
        {
            name: 'sorvete',
            img: 'imagens/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'imagens/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'imagens/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'imagens/hotdog.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#resultado')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []


    // criar seu painel 
    function criarPainel() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'imagens/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipcard)
            grid.appendChild(card)

        }
    }

    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'imagens/blank.png')
            cards[optionTwoId].setAttribute('src', 'imagens/blank.png')
            alert('Você clicou na mesma imagem!')

        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('você encontrou uma correspondência')
            cards[optionOneId].setAttribute('src', 'imagens/white.png')
            cards[optionTwoId].setAttribute('src', 'imagens/white.png')
            cardsWon.push(cardsChosen)

        } else {
            cards[optionOneId].setAttribute('src', 'imagens/blank.png')
            cards[optionTwoId].setAttribute('src', 'imagens/blank.png')
            alert('Desculpe, tente novamente')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = "Parabéns! Você encontrou todos eles!"
        }
    }

    // virar seu cartão
    function flipcard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }

    }

    criarPainel()

})