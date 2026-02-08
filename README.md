 Sistema de Gestão de Frotas

 Visão Geral

Este projeto é uma aplicação web de gestão de frotas desenvolvida para controlar veículos, motoristas e movimentações, oferecendo também um dashboard analítico com indicadores operacionais e financeiros.

O sistema foi pensado para cenários reais de empresas que precisam acompanhar:

* Quem está dirigindo
* Qual veículo está em rota
* Quilometragem percorrida
* Custos estimados de combustível
* Performance por motorista e por veículo

---

Principais Funcionalidades

Cadastro de Veículos

Cadastro de veículos com modelo, placa, ano e KM atual
Controle automático de status:

  * Disponível
  * Em rota
Atualização automática do KM do veículo ao encerrar uma movimentação

Cadastro de Motoristas

Cadastro de motoristas com CNH e validade Validação automática de:

  * CNH vencida
  * Motorista ativo/inativo

Movimentações

Registro de saída de veículos com:

  * Motorista
  * Veículo
  * Origem e destino
  * Data/hora de saída
  * KM de saída (validado com o KM atual do veículo)

Encerramento de movimentação com:

  * KM de retorno
  * Atualização automática:

    * Status do veículo
    * KM atual do veículo

Regras de negócio implementadas:

  * Veículo não pode sair se já estiver em rota
  * KM de saída não pode ser menor que o KM atual
  * KM de retorno deve ser maior que o KM de saída

Dashboard Operacional

* Indicadores em tempo real:

  * Veículo que mais rodou
  * Motorista que mais rodou
  * Gasto total estimado de combustível

* Gráficos interativos:

  * KM rodado por veículo (BarChart)
  * Gasto por veículo (PieChart)

* Filtros por período (data inicial e final)

* Modo Dark / Light

* Exportação do dashboard em PDF

---

 Tecnologias Utilizadas

Frontend

* React + TypeScript
* Vite
* React Router DOM
* Recharts (gráficos)
* Axios (requisições HTTP)
* HTML2Canvas + jsPDF(exportação PDF)

Backend (esperado)

* API REST (.NET)
* https://github.com/jeronimoclima/FrotaVeicular


 Como Rodar o Projeto Localmente

 Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

* Node.js (versão 18 ou superior)
* NPM ou Yarn
* Git
* Backend da API rodando 


 Clonar o Repositório

 Instalar Dependências
npm install
ou
yarn
npm run dev
ou
yarn dev

 Dados Importantes para Testes

* Cadastre veículos antes de criar movimentações
* Cadastre motoristas com CNH válida
* Um veículo não pode estar em duas movimentações ao mesmo tempo



Autor

Projeto desenvolvido como sistema completo de gestão de frotas, focado em boas práticas, regras de negócio reais e visual profissional.

Se este projeto te ajudou ou serviu como base, ⭐ considere dar uma estrela no repositório!
