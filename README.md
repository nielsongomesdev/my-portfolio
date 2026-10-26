# Nielson Gomes · Portfólio

Portfólio pessoal de Nielson Gomes, Desenvolvedor Full Stack. Apresenta projetos, experiência profissional, formação, competências e formas de contato, em português e inglês.

Site publicado: [portfolio-nielson.vercel.app](https://portfolio-nielson.vercel.app/)

## Stack

- **Next.js 16** (App Router, páginas estáticas por idioma) e **React 19**
- **TypeScript**
- **Tailwind CSS 4** com tokens de design definidos em `src/app/globals.css`
- **next-intl** para internacionalização (`/` em inglês, `/pt` em português)
- **Motion** (`motion/react`) para animações de revelação ao rolar, com respeito a `prefers-reduced-motion`
- **lucide-react** para ícones de interface e **react-icons** apenas para marcas (GitHub, LinkedIn)
- **ESLint** para qualidade de código

## Estrutura

```
messages/            textos em pt e en (inclui descrições dos projetos)
public/              imagens dos projetos, foto de perfil e currículo em PDF
src/app/[locale]/    layout, páginas, template de transição, 404 e imagem Open Graph
src/app/api/         rota de envio do formulário de contato (EmailJS)
src/components/      header, navegação mobile, rodapé, botões, cards de projeto, reveal
src/data/            dados estruturados dos projetos, stack e links
src/sections/        seções das páginas (Hero, Projetos, Sobre, Contato…)
```

## Como rodar localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env.local` com as variáveis do EmailJS usadas pelo formulário de contato:

   ```
   EMAILJS_SERVICE_ID=
   EMAILJS_TEMPLATE_ID=
   EMAILJS_PUBLIC_KEY=
   EMAILJS_PRIVATE_KEY=
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse a URL exibida no terminal (por padrão `http://localhost:3000`).

## Scripts

- `npm run dev`: servidor de desenvolvimento
- `npm run build`: build de produção (com `postbuild` para a Vercel)
- `npm run start`: serve o build de produção
- `npm run lint`: ESLint

## Atualizando conteúdo

- **Projetos**: dados estruturados em `src/data/projects.ts`; textos em `messages/pt.json` e `messages/en.json` (`projects.items`).
- **Experiência, formação e competências**: textos em `messages/*.json` (`about`) e grupos de skills em `src/data/site.ts`.
- **Currículo**: substitua `public/curriculo.pdf`.
