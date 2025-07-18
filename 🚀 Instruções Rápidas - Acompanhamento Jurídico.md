# 🚀 Instruções Rápidas - Acompanhamento Jurídico

## ⚡ Para Começar Rapidamente

### 1. Alterar Nome do Cliente (Busca Automática)
**Arquivo**: `script.js` - Linha ~185

```javascript
// Substitua 'NOME_DO_CLIENTE_AQUI' pelo nome desejado
if (!cliente) {
    cliente = 'João da Silva'; // ← ALTERE AQUI
}
```

### 2. Trocar URL da API
**Arquivo**: `script.js` - Linha ~3

```javascript
const API_URL = 'SUA_URL_SHEETDB_AQUI'; // ← ALTERE AQUI
```

### 3. Modificar Etapas do Processo
**Arquivo**: `script.js` - Linhas ~5-19

```javascript
const ETAPAS_PROCESSO = [
    'Sua Etapa 1',        // ← ALTERE AQUI
    'Sua Etapa 2',        // ← ALTERE AQUI
    'Sua Etapa 3',        // ← ALTERE AQUI
    // ... adicione mais etapas
];
```

## 📊 Estrutura da Planilha (Obrigatória)

| Coluna | Nome Exato | Exemplo |
|--------|------------|---------|
| A | ID | 1 |
| B | Cliente | João da Silva |
| C | Reclamada | Empresa Exemplo |
| D | Etapa Atual | Envio de documentos para assinatura |
| E | Data da Última Atualização | 18/07/2025 16:40 |
| F | Observações | Pediu urgência |

## 🌐 GitHub Pages - 3 Passos

1. **Criar repositório** no GitHub (público)
2. **Upload dos arquivos**: `index.html`, `styles.css`, `script.js`
3. **Ativar Pages**: Settings → Pages → Source: "main branch"

**Seu site ficará**: `https://seuusuario.github.io/nome-repositorio/`

## 🔗 Link Direto para Cliente

```
https://seusite.github.io/?cliente=Nome%20do%20Cliente
```

## ⚠️ Checklist Antes de Publicar

- [ ] URL da API SheetDB está correta
- [ ] Planilha tem as colunas com nomes exatos
- [ ] Testou localmente abrindo `index.html`
- [ ] Nome do cliente na planilha está igual ao da busca
- [ ] Planilha está pública/acessível

## 🎨 Personalização Rápida de Cores

**Arquivo**: `styles.css`

```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cor de destaque (dourado) */
color: #ffd700;

/* Cor de sucesso (verde) */
background: #2ed573;
```

---

**💡 Dica**: Para links mais amigáveis, use um encurtador como bit.ly!

