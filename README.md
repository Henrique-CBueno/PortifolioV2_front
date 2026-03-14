Portifolio V2

Portifolio pessoal desenvolvido com React, TypeScript, Vite e Tailwind CSS v4.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- ESLint

## Estrutura Principal

```text
src/
  App.tsx
  index.css
  assets/
  components/
    Header/
    Main/
    About/
    Journey/
    Stacks/
    Projects/
    Contact/
    Footer/
    MouseGlow.tsx
  styles/
    custom-cursor.css
    layout-animations.css
```

## Como Rodar

No diretório `front_portifolioV2`:

```bash
pnpm install
pnpm dev
```

App disponível em: `http://localhost:5173`

## Scripts

- `pnpm dev`: inicia ambiente de desenvolvimento
- `pnpm build`: executa typecheck e build de produção
- `pnpm preview`: sobe a versão de produção localmente
- `pnpm lint`: roda lint

## Estilo e Tema

- Tokens de tema em `src/index.css` usando `@theme`
- Config do Tailwind referenciada em `src/index.css` via `@config "../tailwind.config.ts"`
- Animações globais em `src/styles/layout-animations.css`

## Seções da Página

- Header
- Hero
- About
- Professional Journey
- Core Technology Stack
- Projects
- Contact
- Footer

## Observações

- O arquivo `index.html` na raiz do workspace (`/v2/index.html`) é legado da versão estática.
- A aplicação React ativa está em `front_portifolioV2`.
