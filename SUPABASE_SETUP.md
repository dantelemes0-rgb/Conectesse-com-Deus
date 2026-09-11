# Backend gratuito do Logos

O site funciona sem backend usando `localStorage`. Para sincronizar notas e progresso entre dispositivos, use o plano gratuito do Supabase.

1. Crie uma conta em https://supabase.com/dashboard.
2. Crie um projeto gratuito.
3. No SQL Editor, execute todo o conteúdo de `supabase-schema.sql`.
4. Em Authentication > Providers > Anonymous sign-ins, habilite o login anônimo.
5. Em Project Settings > API, copie a URL do projeto e a chave `anon` pública.
6. Preencha `supabase-config.js`:

```js
window.LOGOS_SUPABASE = {
  url: 'https://seu-projeto.supabase.co',
  anonKey: 'sua-chave-anon-publica'
};
```

7. Faça commit e push. O GitHub Pages publicará a nova versão automaticamente.

Nunca coloque no site a chave `service_role`. A chave `anon` é a única apropriada para o navegador.
