const formulario = document.getElementById('formulario');
const logradouro = document.getElementById('endereco');
const complemento = document.getElementById('complemento');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const mensagemErro = document.getElementById('erro');

async function buscaEndereco(cep) {
    mensagemErro.innerHTML = '';

    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPConvertida = await consultaCEP.json();

        if(consultaCEPConvertida.erro) {
            exibeErro('CEP inexistente! Tente novamente.');

            throw Error('CEP inexistente!');
        }

        logradouro.value = consultaCEPConvertida.logradouro;
        complemento.value = consultaCEPConvertida.complemento;
        bairro.value = consultaCEPConvertida.bairro;
        cidade.value = consultaCEPConvertida.localidade;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch(erro) {
        if(cep === '') {
            exibeErro('Preencha este campo.');
        } else if(!/^[0-9]+$/.test(cep)) {
            exibeErro('O CEP deve conter apenas números.');
        } else if(cep.length !== 8) {
            exibeErro('O CEP deve conter 8(oito) números.');
        }

        logradouro.value = '';
        complemento.value = '';
        bairro.value = '';
        cidade.value = '';
        estado.value = '';

        console.log(erro);
    }
}

function exibeErro(mensagem) {
    mensagemErro.innerHTML = `
        <img class="erro__imagem">
        <p class="erro__texto">${mensagem}</p>
    `;
}

const userCEP = document.getElementById('cep');
userCEP.addEventListener('focusout', () => buscaEndereco(userCEP.value));

formulario.addEventListener('submit', e => {
    e.preventDefault();
    location.replace('./cadastro-finalizado.html');
})