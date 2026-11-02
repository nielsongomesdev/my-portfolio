# Nielson Gomes · Portfólio

Portfólio pessoal de Nielson Gomes, Desenvolvedor Full Stack. Apresenta projetos, experiência profissional, formação, competências e formas de contato, em português e inglês.

Site publicado: [portfolio-nielson.vercel.app](https://portfolio-nielson.vercel.app/)

## Stack

- **Next.js 16** (App Router, páginas estáticas por idioma) e **React 19**
- **TypeScript**
- **Tailwind CSS 4** com tokens de design definidos em `src/app/globals.css`
- **next-intl** para internacionalização (veja [Idiomas](#idiomas))
- **Motion** (`motion/react`) para revelação ao rolar, barra de progresso de leitura e fundo animado
- **Lenis** para rolagem suave, desligada quando o sistema pede menos movimento
- **lucide-react** para ícones de interface e **react-icons** para marcas (GitHub, LinkedIn) e ícones das tecnologias
- **next/og** para gerar a imagem de compartilhamento
- **ESLint** para qualidade de código

Camada visual feita no próprio projeto, sem bibliotecas extras:

- partículas do topo da home em `<canvas>`
- fundo aurora em CSS
- efeitos de cursor (halo, destaque nos cards e botões magnéticos), só com mouse
- foto com degradê nas bordas (utilitários `portrait-fade` em `globals.css`)

Todas as animações respeitam `prefers-reduced-motion`.

## Idiomas

- Inglês em `/` e português em `/pt`.
- Na primeira visita a `/`, o next-intl detecta o idioma do navegador: quem usa o navegador em português é redirecionado para `/pt`. Para ver a versão em inglês nesse caso, use o seletor de idioma do site.

## Estrutura

```
messages/            textos em pt e en (inclui descrições dos projetos)
public/              imagens dos projetos, foto de perfil, ícones do app e currículo em PDF
src/app/             estilos globais, ícones, manifest, sitemap e robots
src/app/[locale]/    layout, páginas, transição, 404 e imagem de compartilhamento
src/app/api/         rota do formulário de contato (EmailJS)
src/assets/          fontes (com licenças OFL) e foto usadas na imagem de compartilhamento
src/components/      header, navegação, rodapé, botões, cards, foto de perfil, ícones das tecnologias e efeitos visuais
src/data/            dados dos projetos, grupos de competências e links
src/i18n/            configuração de idiomas e navegação do next-intl
src/sections/        seções das páginas (Hero, Projetos, Sobre, Contato…)
src/utils/           utilitários
src/proxy.ts         middleware do next-intl (redirecionamento por idioma)
```

## Como rodar localmente

Requer **Node.js 20.9 ou mais recente** (exigência do Next.js 16).

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env.local` com as variáveis do EmailJS. **As quatro são obrigatórias**; se alguma faltar, o formulário de contato responde com erro 503.

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

### Configurando o EmailJS

O envio é feito pelo servidor (`src/app/api/route.ts`), não pelo navegador. No painel do EmailJS:

- Em **Account → Security**, ative **Allow EmailJS API for non-browser applications** e **Use Private Key**. Sem isso, o EmailJS recusa o envio.
- No template de e-mail, use as variáveis `{{user_name}}`, `{{user_email}}`, `{{subject}}` e `{{message}}`.

## Scripts

- `npm run dev`: servidor de desenvolvimento
- `npm run build`: build de produção (com `postbuild` para a Vercel, veja [Deploy](#deploy))
- `npm run start`: serve o build de produção
- `npm run lint`: ESLint
- `npx tsc --noEmit`: checagem de tipos

## Atualizando conteúdo

- **Projetos**: dados estruturados em `src/data/projects.ts`; textos em `messages/pt.json` e `messages/en.json` (`projects.items`).
- **Experiência, formação e competências**: textos em `messages/*.json` (`about`) e grupos de competências em `src/data/site.ts`.
- **Currículo**: substitua `public/curriculo.pdf`.

### Trocando a foto de perfil

A foto aparece em três lugares (topo da home, avatares e imagem de compartilhamento), então a troca envolve mais de um arquivo:

1. Substitua `public/profile.png` por uma foto em PNG com fundo transparente.
2. Atualize `width` e `height` em `src/components/ProfilePhoto/index.tsx` para o tamanho da nova foto.
3. Gere uma cópia menor (cerca de 640 px de altura) em `src/assets/og/photo.png`. Se a proporção mudar, ajuste também o `width` e `height` da `<img>` em `src/app/[locale]/opengraph-image.tsx`.
4. Se a foto encostar na borda direita, ajuste `--portrait-fade-right` em `src/app/globals.css` (e o mesmo valor em `opengraph-image.tsx`) para o degradê começar depois do rosto.

## Deploy

O site é publicado na **Vercel** a partir do branch `main`.

- Cadastre as quatro variáveis do EmailJS em **Project Settings → Environment Variables**.
- O `vercel.json` instala com `npm ci`, então o `package-lock.json` precisa estar em dia com o `package.json`.
- O script `postbuild` cria `.next/server/middleware.js.nft.json`, arquivo que o build da Vercel procura. Não remova sem testar um deploy.

## Segurança

- A rota `/api` só aceita requisições do próprio site, em JSON e com até 10 KB. Ela limita o tamanho dos campos, descarta envios que preenchem o campo isca `website` e desiste do EmailJS após 10 segundos.
- O código não limita a quantidade de envios; para isso, use uma regra de rate limit no firewall da Vercel.
- `next.config.ts` define cabeçalhos de segurança (`X-Frame-Options`, `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy`).
