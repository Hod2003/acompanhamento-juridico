# Sistema de Acompanhamento Jurídico

Uma aplicação web simples e elegante para acompanhamento de processos jurídicos, que permite aos clientes visualizar o andamento de seus casos em formato de linha do tempo, similar ao rastreamento de encomendas.

## 🚀 Características

- **Interface Moderna**: Design limpo e responsivo com gradientes e animações
- **Linha do Tempo Interativa**: Visualização clara do progresso do processo
- **Busca por Cliente**: Sistema de busca que filtra dados por nome exato
- **Integração com Google Sheets**: Dados atualizados em tempo real via SheetDB
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Fácil Implantação**: Pronto para GitHub Pages

## 📋 Estrutura dos Dados

A aplicação espera que sua planilha Google Sheets tenha as seguintes colunas:

- **ID**: Identificador único do registro
- **Cliente**: Nome completo do cliente
- **Reclamada**: Nome da parte reclamada
- **Etapa Atual**: Etapa atual do processo (deve corresponder às etapas predefinidas)
- **Data da Última Atualização**: Data e hora da última atualização (formato: DD/MM/YYYY HH:MM)
- **Observações**: Observações adicionais sobre o caso

### Etapas Predefinidas do Processo

O sistema reconhece as seguintes etapas em ordem:

1. Consulta inicial
2. Análise do caso
3. Coleta de documentos
4. Envio de documentos para assinatura
5. Protocolo da ação
6. Aguardando citação
7. Contestação
8. Audiência de conciliação
9. Instrução processual
10. Sentença
11. Recurso (se necessário)
12. Execução
13. Finalizado

## 🔧 Personalização

### Alterando o Nome do Cliente para Busca

Para alterar qual cliente será buscado, você tem duas opções:

#### Opção 1: Busca Manual
O usuário digita o nome do cliente no campo de busca da interface.

#### Opção 2: Link Direto
Você pode criar um link direto para um cliente específico usando o parâmetro `cliente` na URL:

```
https://seusite.github.io/acompanhamento-juridico/?cliente=João%20da%20Silva
```

#### Opção 3: Modificar o Código (Busca Automática)

Para fazer a aplicação buscar automaticamente um cliente específico, edite o arquivo `script.js`:

1. Localize a função `buscarAutomatico()` (linha aproximada 180)
2. Substitua o conteúdo por:

```javascript
function buscarAutomatico() {
    const urlParams = new URLSearchParams(window.location.search);
    let cliente = urlParams.get('cliente');
    
    // Se não houver parâmetro na URL, definir cliente padrão
    if (!cliente) {
        cliente = 'NOME_DO_CLIENTE_AQUI'; // Substitua pelo nome desejado
    }
    
    if (cliente) {
        clienteInput.value = decodeURIComponent(cliente);
        buscarCliente();
    }
}
```

### Personalizando as Etapas do Processo

Para modificar as etapas do processo, edite o arquivo `script.js`:

1. Localize a constante `ETAPAS_PROCESSO` (linha aproximada 4)
2. Modifique o array com suas etapas personalizadas:

```javascript
const ETAPAS_PROCESSO = [
    'Sua Etapa 1',
    'Sua Etapa 2',
    'Sua Etapa 3',
    // ... adicione quantas etapas precisar
];
```

### Alterando a URL da API

Para conectar com sua própria planilha SheetDB:

1. Abra o arquivo `script.js`
2. Localize a linha `const API_URL = 'https://sheetdb.io/api/v1/c3mt9imh9arig';`
3. Substitua pela URL da sua API SheetDB

### Personalizando Cores e Estilo

Para alterar as cores da aplicação, edite o arquivo `styles.css`:

1. **Gradiente Principal**: Localize `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
2. **Cor de Destaque**: Procure por `#ffd700` para alterar a cor dourada
3. **Cores dos Botões**: Modifique os gradientes dos botões conforme necessário

## 📊 Atualizando os Dados

Para atualizar o status de um processo:

1. Acesse sua planilha Google Sheets
2. Localize a linha do cliente
3. Atualize os campos necessários:
   - **Etapa Atual**: Mude para a nova etapa
   - **Data da Última Atualização**: Atualize com a data/hora atual
   - **Observações**: Adicione novas observações se necessário
4. Salve a planilha

As alterações aparecerão automaticamente na aplicação web (pode levar alguns minutos para sincronizar).

## 🌐 Implantação no GitHub Pages

### Passo 1: Criar Repositório no GitHub

1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique em "New repository"
3. Nomeie o repositório (ex: `acompanhamento-juridico`)
4. Marque como "Public"
5. Clique em "Create repository"

### Passo 2: Fazer Upload dos Arquivos

1. Na página do repositório, clique em "uploading an existing file"
2. Arraste e solte os arquivos:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Adicione uma mensagem de commit (ex: "Primeira versão do sistema")
4. Clique em "Commit changes"

### Passo 3: Ativar GitHub Pages

1. No repositório, vá em "Settings"
2. Role para baixo até "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Escolha "main" como branch
5. Clique em "Save"

### Passo 4: Acessar o Site

Após alguns minutos, seu site estará disponível em:
```
https://seuusuario.github.io/nome-do-repositorio/
```

## 🔗 Criando Links Personalizados

Para facilitar o acesso dos clientes, você pode criar links diretos:

```
https://seuusuario.github.io/acompanhamento-juridico/?cliente=Nome%20do%20Cliente
```

**Dica**: Use um encurtador de URL (como bit.ly) para criar links mais amigáveis.

## 📱 Funcionalidades Adicionais

### Compartilhamento de Link

A aplicação inclui funcionalidade para gerar links personalizados automaticamente. Após uma busca bem-sucedida, um botão de compartilhar aparecerá permitindo copiar o link direto para o cliente.

### Busca Case-Insensitive

O sistema ignora diferenças entre maiúsculas e minúsculas na busca, facilitando a localização dos clientes.

### Formatação Automática de Datas

O sistema reconhece e formata automaticamente diferentes formatos de data da planilha.

## 🛠️ Solução de Problemas

### Cliente Não Encontrado

- Verifique se o nome está exatamente igual na planilha
- Confirme se a API SheetDB está funcionando
- Teste a URL da API diretamente no navegador

### Dados Não Atualizando

- Aguarde alguns minutos para sincronização
- Verifique se a planilha está pública
- Confirme se a URL da API está correta

### Problemas de Layout

- Limpe o cache do navegador (Ctrl+F5)
- Verifique se todos os arquivos CSS estão carregando
- Teste em modo incógnito

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique se seguiu todos os passos da documentação
2. Teste a API SheetDB diretamente no navegador
3. Confirme se os nomes dos campos na planilha estão corretos
4. Verifique o console do navegador (F12) para erros JavaScript

---

**Desenvolvido para facilitar o acompanhamento jurídico de forma simples e eficiente.**

