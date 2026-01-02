# Karaoke App 🎤

**Karaoke App** é um projeto front-end que oferece uma interface para navegar por um catálogo de músicas, criar uma fila de reprodução (queue) e tocar vídeos do YouTube no modo karaokê.

---

## ✨ Recursos principais

- Catálogo de músicas filtrável por categoria e artista
- Fila de reprodução (Queue) para organizar músicas
- Player integrado ao YouTube (iframe API) para tocar vídeos
- Componente de karaokê que exibe letras sincronizadas (quando disponíveis)
- Estado gerenciado com `zustand` para simplicidade

---

## 🛠 Tecnologias

- React + Vite
- Tailwind CSS
- Zustand
- react-player
- YouTube IFrame API (carregada dinamicamente)

---

## 📁 Estrutura relevante do projeto

- `src/components/` — componentes principais (Catalog, KaraokePlayer, QueuePanel, YouTubePlayer)
- `src/data/musicas.json` — catálogo de músicas (JSON)
- `src/utils/loadYouTubeAPI.js` — utilitário que carrega a API do YouTube dinamicamente
- `src/hooks/` — hooks personalizados (ex.: `useSound.js`)
- `src/store/` — stores do aplicativo (`queueStore.js`, `uiStore.js`)

> Observação: consulte o conteúdo do arquivo para entender o formato atual das músicas (ex.: `id`, `categoria`, `artista`, `titulo`, `letra`, `youtubeUrl`).

---

## 🚀 Instalação e execução

Requisitos: Node.js (v18+ recomendado) e npm

1. Instale dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Build para produção:

```bash
npm run build
```

4. Visualizar build localmente:

```bash
npm run preview
```

---

## 🔧 Desenvolvimento

- Linter: `npm run lint`
- O projeto usa Vite para hot-reload rápido durante o desenvolvimento.
- Para adicionar ou editar músicas, altere `src/data/musicas.json`. Cada item segue esse formato básico:

```json
{
  "id": 1,
  "categoria": "Pop",
  "artista": "Artista",
  "titulo": "Nome da Música",
  "letra": "...",
  "youtubeUrl": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
}
```

---

## ℹ️ Sobre a integração com o YouTube

A API do YouTube é carregada dinamicamente via `src/utils/loadYouTubeAPI.js` (adiciona o script `https://www.youtube.com/iframe_api`). Não é necessário adicionar chaves de API para reproduzir vídeos públicos via iframe.

---

## 🤝 Contribuição

Contribuições são bem-vindas!

- Abra uma issue para discutir mudanças antes de enviar um Pull Request.
- Mantenha o estilo de código e adicione testes/descrições quando relevante.

---

## 📜 Licença

Este projeto segue os termos em `LICENSE`.

---

## ✉️ Contato

Se precisar de ajuda ou quiser colaborar, abra uma issue no repositório ou envie uma mensagem para os mantenedores do projeto.

---