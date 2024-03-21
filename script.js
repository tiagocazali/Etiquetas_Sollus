const frm = document.querySelector("form")
const tbProdutos = document.querySelector("table")


frm.addEventListener("submit", (e) => {

    e.preventDefault()

    const produto = frm.inProduto.value
    const preco = frm.inPreco.value
    const quant = frm.inQuant.value

    adicionarFilme(produto, preco, quant)
        
    frm.reset()
    frm.inProduto.focus()

})


const adicionarFilme = (produto, preco, quant) => {
    const linha = tbProdutos.insertRow(-1) //adiciona linha no FINAL na Tabela
    
    const col1 = linha.insertCell(0)    //Coluna 0 - Nome do Produto
    const col2 = linha.insertCell(1)    //coluna 1 - Prço
    const col3 = linha.insertCell(2)    //coluna 2 - Quantidade
    const col4 = linha.insertCell(3)    //Botão de Excluir
    
    col1.innerText = produto
    col2.innerText = preco
    col3.innerText = quant
    col4.innerHTML = "<i class=exclui title=Excluir>&#10008</i>" //Class exclui esta no CSS
}


tbProdutos.addEventListener("click", (e) => {

    if(e.target.className.includes("exclui")){
        
        const produto = e.target.parentElement.parentElement.children[0].innerText
        
        if(confirm("Quer mesmo excluir o filme: " + produto + " ?")){
            e.target.parentElement.parentElement.remove()
            localStorage.clear()    //deleta TODO o local Storage

            //agora cria um NOVO LocalStorage só com a lista de filmes que estão na tabela
            for(let i=1; i<tbProdutos.rows.length; i++){
                let auxFilme = tbProdutos.rows[i].cells[0].innerText      //coluna 0 - Nome do Filme
                let auxpreco = tbProdutos.rows[i].cells[1].innerText     //coluna 1 - preco do filme

                gravarLista(auxFilme, auxpreco)
            }
        }        
    }
})