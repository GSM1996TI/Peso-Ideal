// Referências aos elementos HTML que serão manipulados
const inNome = document.getElementById("inNome");
const rbMasculino = document.getElementById("rbMasculino");
const rbFeminino = document.getElementById("rbFeminino");
const rbAdolescente = document.getElementById("rbAdolescente");
const inAltura = document.getElementById("inAltura");
const outResposta = document.getElementById("outResposta");
const statusMessage = document.getElementById("statusMessage");

/**
 * Função principal para calcular o peso ideal de acordo com a categoria.
 * Realiza validações de entrada e utiliza operadores lógicos para a tomada de decisão.
 */
function calcularPeso() {
  // Limpa mensagens de resultado e status anteriores
  outResposta.textContent = "";
  statusMessage.textContent = "";

  // Obtém os valores dos campos de entrada
  const nome = inNome.value.trim(); // .trim() remove espaços em branco no início/fim
  const isMasculino = rbMasculino.checked;
  const isFeminino = rbFeminino.checked;
  const isAdolescente = rbAdolescente.checked;
  // Converte a altura para número, substituindo vírgula por ponto para garantir o formato decimal
  const altura = Number(inAltura.value.replace(',', '.'));

  // --- Início das Validações com Operadores Lógicos ---

  // Valida se o campo Nome foi preenchido
  if (nome === "") {
    statusMessage.textContent = "Por favor, informe o nome.";
    inNome.focus(); // Posiciona o foco no campo
    return; // Interrompe a execução da função
  }

  // Valida se pelo menos uma categoria (Masculino, Feminino, Adolescente) foi selecionada.
  // Usa o operador LÓGICO NOT (!) para verificar se a condição de NENHUMA categoria selecionada é verdadeira.
  // (isMasculino || isFeminino || isAdolescente) retorna true se PELO MENOS UMA for marcada.
  // (!) inverte o resultado, então (!true) é false (nenhum erro), e (!false) é true (erro).
  if (!(isMasculino || isFeminino || isAdolescente)) {
    statusMessage.textContent = "Por favor, selecione uma categoria (Masculino, Feminino ou Adolescente).";
    rbMasculino.focus();
    return;
  }

  // Valida se mais de uma categoria foi selecionada, o que seria um erro lógico.
  // Usa o operador LÓGICO AND (&&) para verificar combinações e OR (||) para agrupar as combinações.
  // Se (Masculino E Feminino) OU (Masculino E Adolescente) OU (Feminino E Adolescente) for verdadeiro.
  if ((isMasculino && isFeminino) || (isMasculino && isAdolescente) || (isFeminino && isAdolescente)) {
    statusMessage.textContent = "Selecione APENAS uma categoria (Masculino, Feminino ou Adolescente).";
    rbMasculino.focus();
    return;
  }

  // Valida se a altura foi informada corretamente (número positivo).
  // Usa o operador LÓGICO OR (||). Se altura for menor ou igual a zero OU não for um número.
  if (altura <= 0 || isNaN(altura)) {
    statusMessage.textContent = "Por favor, informe a altura corretamente (ex: 1.75).";
    inAltura.focus();
    return;
  }

  // --- Fim das Validações ---

  let pesoIdeal; // Variável para armazenar o peso ideal calculado

  // Lógica para aplicar a fórmula correta baseada na categoria selecionada
  if (isMasculino) {
    pesoIdeal = 22 * Math.pow(altura, 2); // Fórmula para homens
  } else if (isFeminino) {
    pesoIdeal = 21 * Math.pow(altura, 2); // Fórmula para mulheres
  } else if (isAdolescente) {
    pesoIdeal = 20 * Math.pow(altura, 2); // Fórmula para adolescentes
  } 
  // Não é necessário um 'else' final aqui, pois as validações garantem que uma categoria será selecionada.

  // Exibe o resultado na área de resposta, formatando o peso com 3 casas decimais
  outResposta.textContent = `${nome}: Seu peso ideal é ${pesoIdeal.toFixed(3)} kg`;
}

/**
 * Função para limpar todos os campos do formulário e as mensagens exibidas.
 */
function limparCampos() {
  inNome.value = "";
  rbMasculino.checked = false;
  rbFeminino.checked = false;
  rbAdolescente.checked = false;
  inAltura.value = "";
  outResposta.textContent = "";
  statusMessage.textContent = "";
  inNome.focus(); // Retorna o foco para o campo de nome
}

// Associa as funções aos eventos de clique dos botões
const btCalcular = document.getElementById("btCalcular");
btCalcular.addEventListener("click", calcularPeso);

const btLimpar = document.getElementById("btLimpar");
btLimpar.addEventListener("click", limparCampos);
