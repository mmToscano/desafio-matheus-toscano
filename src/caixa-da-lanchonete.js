let lanchesJson = [
    {codigo: "cafe", descricao: "Cafe", valor: 3.00, extra: null},
    {codigo: "chantily", descricao: "Chantily", valor: 1.50, extra: "cafe"},
    {codigo: "suco", descricao: "Suco Natural", valor: 6.20, extra: null},
    {codigo: "sanduiche", descricao: "Sanduiche", valor: 6.50, extra: null},
    {codigo: "queijo", descricao: "Queijo", valor: 2.00, extra: "sanduiche"},
    {codigo: "salgado", descricao: "Salgado", valor: 7.25, extra: null},
    {codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.50, extra: null},
    {codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.50, extra: null}
];

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        let lanchesTemp = [];
        let quantidadesDosLanches = [];
        let lanchesExtra = [];
        let valor = 0;
        let desconto = 0;

        //verificar se existem itens pedidos
        if(itens.length == 0){
            return "Não há itens no carrinho de compra!";
        }

        //verificar método de pagamento
        switch(metodoDePagamento){
            case 'dinheiro':
                desconto = -5;
                break;
            case 'credito':
                desconto = 3;
                break;
            case 'debito':
                
                break;
            default:    
                return "Forma de pagamento inválida!"
        }

        //retorna os itens respectivos
        lanchesTemp = this.retornarItens(itens);

        if(lanchesTemp == false){
            return "Item inválido!";
        }

        //verificar se houve item extra
        for(let i in lanchesTemp){
            if(lanchesTemp[i].extra != null){
                if(this.existeNo(lanchesExtra, lanchesTemp[i]) == false){
                    lanchesExtra.push(lanchesTemp[i]);
                }
            }
        }
        
        if(lanchesExtra != null){
            for(let i in lanchesExtra){
                if(this.existeExtraNo(lanchesTemp, lanchesExtra[i])==false){
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        //pega a quantidade de cada item pedido
        for(let i in itens){
            quantidadesDosLanches.push(itens[i].split(",")[1]);
        }

        //verifica se a quantidade de itens é diferente de zero
        for(let i in quantidadesDosLanches){
            if(quantidadesDosLanches[i] == 0){
                return "Quantidade inválida!";
            }
        }

        //pegar valor bruto
        for(let i in lanchesTemp){
            valor += lanchesTemp[i].valor * quantidadesDosLanches[i];
        }
        
        
        //return (valor + (desconto/100 * valor));
        return "R$ " + (valor+(desconto/100*valor)).toFixed(2).toString().replace(".", ",");
    }



    //métodos auxiliares
    retornarItens(itens){
        let lanchesTemp = [];
        for(let i in itens){
            for(let j in lanchesJson){
                if(itens[i].split(",")[0] == lanchesJson[j].codigo){
                    lanchesTemp.push(lanchesJson[j])
                }
            }
        }
        //verifica a validade dos itens
        if(itens.length != lanchesTemp.length){
            return false;
        }
        return lanchesTemp;
    }

    existeNo(array, item){
        let existe = false;

        for(let i in array){
            if(array[i].codigo == item.codigo){
                existe = true;
                return existe;
            }
        }
        return existe;
    }

    existeExtraNo(array, item){
        let existe = false;

        for(let i in array){
            if(item.extra == array[i].codigo){
                existe = true;
            }
        }
        return existe;
    }


}

let caixa = new CaixaDaLanchonete();

export { CaixaDaLanchonete };
