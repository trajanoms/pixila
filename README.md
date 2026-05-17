# Pixila Clone

Aplicação React/Vite preparada para receber os assets públicos do Pixila (`draco`, `models` e `pictures`) e renderizar uma experiência 3D com Three.js.

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura de assets

Copie os assets públicos para dentro de `public/` mantendo este layout:

```txt
public/
  draco/
  models/
  pictures/
```

A pasta `_astro` do pacote original não é necessária para esta primeira versão React.

## Modelo GLB

Por padrão, a página usa um placeholder 3D para não quebrar enquanto os arquivos reais não existem. Depois de copiar o GLB para `public/models`, informe o caminho com uma variável Vite:

```bash
VITE_PIXILA_MODEL=/models/seu-arquivo.glb npm run dev
```

O carregador Draco já aponta para `/draco/`, então os decoders devem ficar em `public/draco/`.

## Scripts

- `npm run dev`: inicia o servidor Vite.
- `npm run build`: gera a versão de produção.
- `npm run preview`: serve o build localmente.
- `npm run lint`: executa ESLint.
