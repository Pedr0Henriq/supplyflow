SupplyFlow ERP

SupplyFlow é um ERP moderno, ágil e escalável, desenvolvido para otimizar o gerenciamento de inventário, controle de clientes e o fluxo financeiro de pequenas e médias empresas.
🚀 Sobre o Projeto

O SupplyFlow nasceu da necessidade de centralizar operações críticas de negócio em uma única plataforma intuitiva e esteticamente agradável. Construído com foco em Clean Architecture e SOLID, o sistema oferece:

    Dashboard Gerencial: Visão consolidada de métricas essenciais.

    Gestão de Estoque: Cadastro, edição e controle de produtos.

    CRM: Gestão completa de clientes com validação de unicidade.

    Controle Financeiro: Registro de receitas e despesas com categorização visual.

🛠 Tecnologias Utilizadas

    Frontend: Next.js, TailwindCSS, Shadcn UI, Axios, React Hook Form + Zod.

    Backend: NestJS, TypeScript.

    Autenticação: Supabase.

💻 Como rodar o projeto
Pré-requisitos

Certifique-se de ter instalado em sua máquina:

    Node.js (v20+)

    pnpm

1. Configuração do Ambiente

Na raiz do projeto, certifique-se de configurar as variáveis de ambiente necessárias (.env.local no frontend e .env no backend):
Snippet de código

    1.1 Frontend (.env.local)
    
        NEXT_PUBLIC_API_URL="http://localhost:3001/api"
        NEXT_PUBLIC_SUPABASE_URL="https://sua-url.supabase.co"
        NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anon"
    
    1.2 Backend (.env)
        
        PORT=3001
2. Iniciando o Backend
   
        Navegue até a pasta do backend: cd backend
        Instale as dependências: npm install
        Inicie o servidor: npm run start:dev

3. Iniciando o Frontend
   
        Navegue até a pasta do frontend: cd apps/web
        Instale as dependências: pnpm install
        Inicie o ambiente de desenvolvimento: pnpm --filter web dev
