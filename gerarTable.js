function mostrarColunas() 
{
    const ignorarColunas = document.getElementById('IgnorarColunas');

    if ( ignorarColunas.className == 'naoMostrar' )
    {
        ignorarColunas.className = 'Mostrar';
    }
    else
    {
        ignorarColunas.className = 'naoMostrar';
    }
}

function mostrarCSS() 
{
    const addCSS = document.getElementById('addCSS');

    if ( addCSS.className == 'naoMostrar' )
    {
        addCSS.className = 'Mostrar';
    }
    else
    {
        addCSS.className = 'naoMostrar';
    } 
}

function mostrarElementos() 
{
    const addElemento = document.getElementById('addElemento');

    if ( addElemento.className == 'naoMostrar' )
    {
        addElemento.className = 'Mostrar';
    }
    else
    {
        addElemento.className = 'naoMostrar';
    }
}

function exemplo() 
{
    document.getElementById('JSON').value = '[  { "Cor":"Vermelho", "Tamanho":"P", "Tipo":"Primeira temporada" }, { "Cor":"Verde", "Tamanho":"M", "Tipo":"Segunda temporada"}, { "Cor":"Azul", "Tamanho":"G", "Tipo":"Outlet" } ]';
    gerarTable();
}

function exemploNaoExibirColunas() 
{
    document.getElementById('JSONCSSaddColuna').value = '[ { "Coluna1": "Tipo", "Coluna2": "Tamanho" } ]';
}

function exemploAddCSSColuna() 
{
    document.getElementById('JSONCSSaddColuna').value = '[ { "Classe1": "ExemploColuna1", "Classe2": "ExemploColuna2" } ]';
}

function exemploAddCSSLinha() 
{
    document.getElementById('JSONCSSaddLinha').value = '[ { "Classe1": "ExemploLinha1", "Classe2": "ExemploLinha2" } ]';
}

function exemploAddElemento() 
{
    document.getElementById('JSONCSSaddLinha').value = '[ { "Classe1": "ExemploLinha1", "Classe2": "ExemploLinha2" } ]';
}

function gerarTable() 
{
    const JSONtexto = document.getElementById('JSON').value;

    let resposta = '';
    
    try
    {
        resposta = JSON.parse(JSONtexto);
    }
    catch (e)
    {
        alert('JSON inválido!');
        return false;
    }

    if ( JSONtexto.length === 0)
    {
        alert('Campo do JSON está vazio!');
        return false;
    }


    const JSONcolunasIgnorarTexto = document.getElementById('JSONcolunasIgnorar').value;

    let JSONcolunasIgnorar = '';

    if ( JSONcolunasIgnorarTexto.length > 0 )
    {
       
        try
        {
            JSONcolunasIgnorar = JSON.parse(JSONcolunasIgnorarTexto);
        }
        catch (e)
        {
            alert('JSON das colunas ignoradas está inválido!');
            return false;
        }
    }

    // Div onde a tabela é removida e criada novamente
    const div_table = document.getElementById('table');

    // Remover tabela atual - Sempre haverá uma tabela como primeiro filho, mesmo que não retorne resultados do php, ao menos a tag TABLE será criada.
    var table_remover = div_table.firstElementChild;
    div_table.removeChild(table_remover);

    // Criar tabela na arvore DOM
    var table = document.createElement('table');		

    table.id='produtos_table';
    table.classList.add("table");
    table.classList.add("table-hover");
    table.classList.add("table-inverse");
    table.classList.add("table-sm");
    table.classList.add("table-bordered");
    table.classList.add("table_format");

    var thead = document.createElement('thead');
    thead.classList.add('thead-light');

    var tr = document.createElement('tr');

    // Classe da coluna
    // tr.classList.add('Status_Ativo');

    table.appendChild(thead);
    thead.appendChild(tr);

    // Cria um vetor com os nomes das colunas
    var colunas = resposta[0];

    // Cria as colunas na tabela
    Object.keys(colunas).forEach
        (function(key) 
            {
            var valor_coluna = key;

            let exit = false;

            if ( JSONcolunasIgnorarTexto.length > 0 )
            {
                
                for (var ncount_linha = 0; ncount_linha < Object.keys(JSONcolunasIgnorar).length; ncount_linha ++) 
                {
                    Object.keys(JSONcolunasIgnorar[ncount_linha]).forEach
                    (
                        function(value) 
                        {
                            let colunaIgnorar = JSONcolunasIgnorar[ncount_linha][value];
                            
                            if( colunaIgnorar  === valor_coluna ) 
                            {
                                exit = true;
                                return;
                            }                                
                        }
                    )
                }
                
            }

            if ( exit )
            {
               return;
            }
                
            // CRIA COLUNA
            var thfor = document.createElement('th');   
            
            // ADICIONA COLUNA DO GRUPO DA COLUNA
            tr.appendChild(thfor);        

            // ALIMENTA LINHA
            thfor.innerHTML = valor_coluna;
            }   
        );

    // Exemplo ao adicionar botões
    // É preciso fazer isso para cada botão
    // var thfor = document.createElement('th');
    // tr.appendChild(thfor);
    // thfor.innerHTML = 'Alterar';


    // CRIA CORPO DAS LINHAS
    var tbody = document.createElement('tbody');
    // ADICIONA CORPO A TABELA
    table.appendChild(tbody);                

    // Adicionando linhas
    for (var ncount_linha = 0; ncount_linha < Object.keys(resposta).length; ncount_linha ++) 
    {
        
        // CRIA GRUPO DE LINHA
        var trfor = document.createElement('tr');

        // Adicionar classe no grupo da linha
        //trfor.classList.add('');

        // ADICIONA GRUPO DA LINHA AO CORPO
        tbody.appendChild(trfor);

        var codigo_para_botao = 0;
        
        // PASSA POR CADA COLUNA DA LINHA ATUAL DO OBJETO
        Object.keys(resposta[ncount_linha]).forEach
            (function(value) 
            {
                var valor_linha = resposta[ncount_linha][value];

                if ( typeof valor_linha === 'object' && valor_linha !== null )
                {
                    return;
                }
                

                let exit = false;
                let valor_coluna = value

                if ( JSONcolunasIgnorarTexto.length > 0 )
                {
                    
                    for (var n_linha = 0; n_linha < Object.keys(JSONcolunasIgnorar).length; n_linha ++) 
                    {
                        Object.keys(JSONcolunasIgnorar[n_linha]).forEach
                        (
                            function(valueIgnorar) 
                            {
                                let colunaIgnorar = JSONcolunasIgnorar[n_linha][valueIgnorar];
                                
                                if( colunaIgnorar  === valor_coluna ) 
                                {
                                    exit = true;
                                    return;
                                }                                
                            }
                        )
                    }
                    
                }
    
                if ( exit )
                {
                   return;
                }                

                // Se precisar utilizar alguma informação, como o ID em botões
                // if (value == 'Codigo')
                // {
                //     codigo_para_botao = valor_linha;
                // }                        

                // CRIA LINHA
                var tdfor = document.createElement('td');

                // ALIMENTA LINHA

                // Exemplo de Imagem
                // if (value == 'Imagem')
                // {
                //     var tdimg = document.createElement('img');
                //     tdimg.setAttribute("src", valor_linha);
                //     tdimg.setAttribute("width", "100");
                //     tdimg.setAttribute("height", "100");
                //     tdimg.setAttribute("alt", "Preview do produto");
                //     tdimg.setAttribute("border", "3");

                //     tdfor.appendChild(tdimg);
                // } 
                // else
                // {
                //     tdfor.innerHTML = valor_linha;
                // }

                tdfor.innerHTML = valor_linha;

                // ADICIONA LINHA AO GRUPO DE LINHA
                trfor.appendChild(tdfor);
            }   
        );  
        
        // Adicionando os botões da grade na linha

        // Exemplo de botão 1 - Editar
        // var tdEditar = document.createElement('td');
        // tdEditar.classList.add('Status_Ativo');

        // var ancoraEditar = document.createElement('a');
        // ancoraEditar.type = 'button';
        // ancoraEditar.classList.add('btn');
        // ancoraEditar.classList.add('btn-primary');
        // ancoraEditar.classList.add('fa');
        // ancoraEditar.classList.add('fa-pencil');
        // ancoraEditar.classList.add('fa-2x');
        // ancoraEditar.classList.add('botoes_grade');
        // ancoraEditar.setAttribute('data-placement','top');
        // ancoraEditar.setAttribute('data-toggle','tooltip');
        // ancoraEditar.title='Alterar cadastro do produto';
        // ancoraEditar.href= 'Produtos_digitar.php?ID=' + codigo_para_botao;
        // tdEditar.appendChild(ancoraEditar);

        // trfor.appendChild(tdEditar);


        // Exemplo de botão 2 - Abrir outra página
        // var tdLoja = document.createElement('td');
        // tdLoja.classList.add('Status_Ativo');

        // var ancoraLoja = document.createElement('a');
        // ancoraLoja.type = 'button';
        // ancoraLoja.classList.add('btn');
        // ancoraLoja.classList.add('btn-info');
        // ancoraLoja.classList.add('fa');
        // ancoraLoja.classList.add('fa-shopping-bag');
        // ancoraLoja.classList.add('fa-2x');
        // ancoraLoja.classList.add('botoes_grade');
        // ancoraLoja.setAttribute('data-placement','top');
        // ancoraLoja.setAttribute('data-toggle','tooltip');
        // ancoraLoja.title='Preview do produto na loja';
        // ancoraLoja.href= 'show_produtos.php?ID=' + codigo_para_botao;
        // tdLoja.appendChild(ancoraLoja);

        // trfor.appendChild(tdLoja);                

        
        // Exemplo de botão 3 - Chamando função
        // var tdInativar = document.createElement('td');
        // tdInativar.classList.add('Status_Ativo');

        // var ancoraInativar = document.createElement('a');
        // ancoraInativar.type = 'button';
        // ancoraInativar.classList.add('btn');
        // ancoraInativar.classList.add('btn-warning');
        // ancoraInativar.classList.add('fa');
        // ancoraInativar.classList.add('fa-warning');
        // ancoraInativar.classList.add('fa-2x');
        // ancoraInativar.classList.add('botoes_grade');
        // ancoraInativar.setAttribute('data-placement','top');
        // ancoraInativar.setAttribute('data-toggle','tooltip');
        // ancoraInativar.title='Desativar produto';
        // ancoraInativar.parametro = codigo_para_botao;
        // ancoraInativar.addEventListener('click',function(e){
        //      desativar_produto(e.currentTarget.parametro);
        // })
        
        // tdInativar.appendChild(ancoraInativar);

        // trfor.appendChild(tdInativar);

    }

    // Adicionando tabela na arvore DOM
    div_table.appendChild(table);    
}