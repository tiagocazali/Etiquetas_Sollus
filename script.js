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
    const col4 = linha.insertCell(3)    //Coluna 3 - Botão de Excluir

    col1.innerText = produto
    col2.innerText = preco
    col3.innerText = quant
    col4.innerHTML = "<i class=exclui title=Excluir>&#10008</i>" //Class exclui esta no CSS
}


tbProdutos.addEventListener("click", (e) => {

    if (e.target.className.includes("exclui")) {

        const produto = e.target.parentElement.parentElement.children[0].innerText
        //Lembre-se que o botão está dentro da celula 3 que esta dentro da linha 

        if (confirm("Quer mesmo excluir o Produto: " + produto + " ?")) {
            e.target.parentElement.parentElement.remove()

        }
    }
})


// Chamada para download do arquivo ao clicar em um botão Gerar Etiquetas
document.getElementById('btCriarEtiquetas').addEventListener('click', () => {

    const [produtos, precos] = getProdutosAsText();
    downloadTxtFile(produtos, 'protutos.txt');
    downloadTxtFile(precos, 'precos.txt');
});


//Cria o arquivo para download
function downloadTxtFile(texto_arquivo, nome_arquivo) {

    const blob = new Blob([texto_arquivo], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nome_arquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


// Função que ira percorrer a Tabela de itens e salvar eles em variáveis separadas
function getProdutosAsText() {

    const linhas = Array.from(document.querySelectorAll('table tr')).slice(1);
    let produtosText = '';
    let precosText = '';

    linhas.forEach(linha => {
        const [produto, preco, quant] = linha.querySelectorAll('td');
        const nomeProduto = produto.innerText;
        const precoProduto = preco.innerText;
        const quantidade = parseInt(quant.innerText);

        for (let i = 0; i < quantidade; i++) {
            produtosText += `${nomeProduto}\n`;
            precosText += `R$ ${precoProduto}\n`;
        }
    });

    return [produtosText, precosText];
}
