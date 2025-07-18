// Configuração da API
const API_URL = 'https://sheetdb.io/api/v1/c3mt9imh9arig';

// Definição das etapas do processo jurídico
const ETAPAS_PROCESSO = [
    'Consulta inicial',
    'Análise do caso',
    'Coleta de documentos',
    'Envio de documentos para assinatura',
    'Protocolo da ação',
    'Aguardando citação',
    'Contestação',
    'Audiência de conciliação',
    'Instrução processual',
    'Sentença',
    'Recurso (se necessário)',
    'Execução',
    'Finalizado'
];

// Elementos DOM
const clienteInput = document.getElementById('clienteInput');
const buscarBtn = document.getElementById('buscarBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const resultado = document.getElementById('resultado');
const nomeCliente = document.getElementById('nomeCliente');
const parteReclamada = document.getElementById('parteReclamada');
const ultimaAtualizacao = document.getElementById('ultimaAtualizacao');
const timeline = document.getElementById('timeline');
const observacoes = document.getElementById('observacoes');
const observacoesContainer = document.getElementById('observacoesContainer');

// Event listeners
buscarBtn.addEventListener('click', buscarCliente);
clienteInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarCliente();
    }
});

// Função principal para buscar cliente
async function buscarCliente() {
    const nomeClienteBusca = clienteInput.value.trim();
    
    if (!nomeClienteBusca) {
        mostrarErro('Por favor, digite o nome do cliente.');
        return;
    }
    
    mostrarLoading();
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Erro na consulta à API');
        }
        
        const dados = await response.json();
        
        // Buscar cliente exato (case insensitive)
        const clienteEncontrado = dados.find(item => 
            item.Cliente && item.Cliente.toLowerCase() === nomeClienteBusca.toLowerCase()
        );
        
        if (clienteEncontrado) {
            exibirResultado(clienteEncontrado);
        } else {
            mostrarErro('Cliente não encontrado. Verifique se o nome está correto.');
        }
        
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        mostrarErro('Erro ao consultar os dados. Tente novamente em alguns instantes.');
    }
}

// Função para exibir o resultado
function exibirResultado(dados) {
    esconderElementos();
    
    // Preencher informações básicas
    nomeCliente.textContent = dados.Cliente || 'Não informado';
    parteReclamada.textContent = dados.Reclamada || 'Não informado';
    ultimaAtualizacao.textContent = formatarData(dados['Data da Última Atualização']) || 'Não informado';
    
    // Criar timeline
    criarTimeline(dados['Etapa Atual']);
    
    // Exibir observações se existirem
    if (dados.Observações && dados.Observações.trim()) {
        observacoes.textContent = dados.Observações;
        observacoesContainer.classList.remove('hidden');
    } else {
        observacoesContainer.classList.add('hidden');
    }
    
    resultado.classList.remove('hidden');
}

// Função para criar a timeline
function criarTimeline(etapaAtual) {
    timeline.innerHTML = '';
    
    const etapaAtualIndex = ETAPAS_PROCESSO.findIndex(etapa => 
        etapa.toLowerCase() === (etapaAtual || '').toLowerCase()
    );
    
    ETAPAS_PROCESSO.forEach((etapa, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Determinar status da etapa
        if (index < etapaAtualIndex) {
            timelineItem.classList.add('completed');
        } else if (index === etapaAtualIndex) {
            timelineItem.classList.add('active');
        }
        
        timelineItem.innerHTML = `
            <div class="timeline-step">${etapa}</div>
            <div class="timeline-date">${getStatusText(index, etapaAtualIndex)}</div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Função para obter texto do status
function getStatusText(index, etapaAtualIndex) {
    if (index < etapaAtualIndex) {
        return 'Concluído';
    } else if (index === etapaAtualIndex) {
        return 'Em andamento';
    } else {
        return 'Pendente';
    }
}

// Função para formatar data
function formatarData(dataString) {
    if (!dataString) return null;
    
    try {
        // Tentar diferentes formatos de data
        let data;
        
        // Formato DD/MM/YYYY HH:MM
        if (dataString.includes('/') && dataString.includes(':')) {
            const [datePart, timePart] = dataString.split(' ');
            const [dia, mes, ano] = datePart.split('/');
            data = new Date(ano, mes - 1, dia);
            return `${datePart} às ${timePart}`;
        }
        
        // Formato DD/MM/YYYY
        if (dataString.includes('/')) {
            const [dia, mes, ano] = dataString.split('/');
            data = new Date(ano, mes - 1, dia);
            return dataString;
        }
        
        // Formato ISO
        data = new Date(dataString);
        if (!isNaN(data.getTime())) {
            return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        return dataString;
    } catch (err) {
        return dataString;
    }
}

// Funções de controle de interface
function mostrarLoading() {
    esconderElementos();
    loading.classList.remove('hidden');
}

function mostrarErro(mensagem) {
    esconderElementos();
    error.querySelector('p').textContent = mensagem;
    error.classList.remove('hidden');
}

function esconderElementos() {
    loading.classList.add('hidden');
    error.classList.add('hidden');
    resultado.classList.add('hidden');
}

// Função para buscar automaticamente se houver parâmetro na URL
function buscarAutomatico() {
    const urlParams = new URLSearchParams(window.location.search);
    const cliente = urlParams.get('cliente');
    
    if (cliente) {
        clienteInput.value = decodeURIComponent(cliente);
        buscarCliente();
    }
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', function() {
    buscarAutomatico();
    
    // Focar no campo de busca
    clienteInput.focus();
});

// Função para gerar link personalizado (útil para compartilhamento)
function gerarLinkPersonalizado(nomeCliente) {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?cliente=${encodeURIComponent(nomeCliente)}`;
}

// Adicionar funcionalidade de compartilhamento (opcional)
function adicionarBotaoCompartilhar() {
    const clienteAtual = clienteInput.value.trim();
    if (clienteAtual && !resultado.classList.contains('hidden')) {
        const link = gerarLinkPersonalizado(clienteAtual);
        
        // Criar botão de compartilhar se não existir
        let botaoCompartilhar = document.getElementById('botaoCompartilhar');
        if (!botaoCompartilhar) {
            botaoCompartilhar = document.createElement('button');
            botaoCompartilhar.id = 'botaoCompartilhar';
            botaoCompartilhar.innerHTML = '<i class="fas fa-share"></i> Compartilhar Link';
            botaoCompartilhar.className = 'btn-compartilhar';
            botaoCompartilhar.style.cssText = `
                background: linear-gradient(135deg, #2ed573 0%, #17c0eb 100%);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 0.9rem;
                margin-top: 20px;
                transition: all 0.3s ease;
            `;
            
            botaoCompartilhar.addEventListener('click', function() {
                navigator.clipboard.writeText(link).then(function() {
                    botaoCompartilhar.innerHTML = '<i class="fas fa-check"></i> Link Copiado!';
                    setTimeout(() => {
                        botaoCompartilhar.innerHTML = '<i class="fas fa-share"></i> Compartilhar Link';
                    }, 2000);
                });
            });
            
            resultado.appendChild(botaoCompartilhar);
        }
    }
}

