const botao = document.querySelector('.bt')
const input = document.querySelector('#input-pokemon')
const container = document.querySelector('#container')
//Caso der erro
function erro(){
    limpaInputEFocus()
    const tela = document.querySelector('.mostrar')
    const p = '<p class="erro">Pokemon não encontrado</p>'
    
    tela.innerHTML = p 
    setTimeout(() =>{
        const elemento = document.querySelector('.erro')
    
        elemento.parentNode.removeChild(elemento);
    },2000)
}

function limpaInputEFocus(){
    onfocus= input.value='';
    input.focus()
}

function printTela(pokemons){
    const pokemonsreduce = pokemons.reduce((accumualdor, pokemon_atual) =>{
        const tipo = pokemon_atual.types.map((item) => item.type.name)
        accumualdor += `
                    <li class="pokemon">
                    <div class="item-img imagem_01">
                        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon_atual.id}.png" alt="">
                    </div>
                    <h1 class="nome">${pokemon_atual.name}</h1>
                    <p class="tipo">${tipo.join(' | ')}</p>
                    <li>
                    `
            return accumualdor
    },'')  
    container.innerHTML = pokemonsreduce
}

function nameOrId(poke){
    return `https://pokeapi.co/api/v2/pokemon/${poke}`
}
//Pega 20 pokemons ao inciar a pagina
const fecthApi = () =>{
    limpaInputEFocus()
    var listaPokemon = []
    for(var i = 1; i <= 35; i++){
        listaPokemon.push(fetch(nameOrId(i)).then(resposta =>resposta.json()))
    }
    Promise.all(listaPokemon)
    .then((pokemons) => {
        printTela(pokemons)
    })
}   
 
fecthApi()

//Pega pokemons por nome ou ID
const pokemonName = (namePokemon) => {  
    limpaInputEFocus()  
    const listapokemon = []
        fetch(nameOrId(namePokemon))   
        .then((resposta) => resposta.json())
        .catch((r) => erro() )
        .then((pokemon) => { 
            listapokemon.push(pokemon)
            printTela(listapokemon)       
    })
}

// EVENTOS BOTAO E CLICK
botao.addEventListener('click',evento =>{
    const inputvalor = input.value.toLowerCase()
    if(inputvalor === ''){
        erro()
        return
    }
    evento.preventDefault() 
    pokemonName(inputvalor) 
})

input.addEventListener('keypress', function(e){
    const inputvalor = input.value  
    if(e.which == 13){
        if(inputvalor == ''){
            erro()
            return  
        }
        pokemonName(inputvalor)    
    }  
 }, false);
 
 // click logo redirecionar pagina inicial
 document.addEventListener('click',(e) =>{
     const elemento = e.target
    if(elemento.classList.contains('pokemons')){
        fecthApi()
    }
 })
 





 
