// ==============================
// File: src/client/pages/Termos.tsx
// ==============================

import { Link } from "react-router-dom";

export default function Termos() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">Termos de Serviço — v1.0</h1>

      <p className="mb-4">
        Estes Termos de Serviço regulam o uso da plataforma digital fornecida por <strong>MTM - Soluções Digitais</strong>, incluindo
        o painel de controle, o bot automatizado e demais funcionalidades oferecidas em modelo SaaS (Software como Serviço).
        Ao utilizar nossos serviços, você concorda com os termos abaixo.
      </p>

      <h2 className="text-lg font-semibold mt-6">1. Objeto</h2>
      <p>
        O serviço consiste na disponibilização de um sistema baseado em inteligência artificial capaz de realizar atendimento
        automatizado, qualificação de leads e suporte à venda, por meio de integrações com plataformas como WhatsApp.
      </p>

      <h2 className="text-lg font-semibold mt-6">2. Cadastro e acesso</h2>
      <p>
        O uso da plataforma exige a criação de uma conta vinculada a uma empresa (tenant). A veracidade e atualização dos dados
        fornecidos são de responsabilidade exclusiva do usuário.
      </p>

      <h2 className="text-lg font-semibold mt-6">3. Uso permitido</h2>
      <p>
        O sistema deve ser utilizado apenas para fins lícitos, respeitando a legislação vigente e as boas práticas comerciais.
        É expressamente proibido:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>Utilizar o sistema para práticas ilegais, spam ou fraudes.</li>
        <li>Compartilhar credenciais de acesso com terceiros.</li>
        <li>Modificar, copiar ou distribuir o software sem autorização.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6">4. Limitações de responsabilidade</h2>
      <p>
        Embora nos esforcemos para manter o serviço disponível e seguro, não garantimos funcionamento ininterrupto, nem
        nos responsabilizamos por danos indiretos, perda de dados, lucros cessantes ou falhas decorrentes de terceiros
        (como operadoras de API de mensagens).
      </p>

      <h2 className="text-lg font-semibold mt-6">5. Dados e privacidade</h2>
      <p>
        Os dados cadastrados e processados pelo sistema serão utilizados exclusivamente para prestação do serviço.
        Cada empresa é responsável por obter os devidos consentimentos de seus clientes finais para uso das informações.
      </p>

      <h2 className="text-lg font-semibold mt-6">6. Propriedade intelectual</h2>
      <p>
        Todo o código, design, fluxos de automação, templates e ferramentas fornecidos fazem parte da propriedade intelectual
        da plataforma e não podem ser utilizados fora do escopo do contrato sem autorização expressa.
      </p>

      <h2 className="text-lg font-semibold mt-6">7. Suporte e atualizações</h2>
      <p>
        O suporte técnico será prestado de acordo com o plano contratado. A plataforma pode passar por atualizações sem aviso
        prévio, visando melhorias de segurança, performance ou funcionalidade.
      </p>

      <h2 className="text-lg font-semibold mt-6">8. Cancelamento</h2>
      <p>
        O usuário poderá solicitar o cancelamento a qualquer momento. Ao encerrar a conta, os dados poderão ser apagados
        definitivamente após 30 dias, salvo obrigação legal de retenção.
      </p>

      <h2 className="text-lg font-semibold mt-6">9. Alterações nestes termos</h2>
      <p>
        Os Termos de Serviço poderão ser atualizados periodicamente. A continuidade do uso do sistema após modificações
        implica concordância com os novos termos.
      </p>

      <h2 className="text-lg font-semibold mt-6">10. Foro</h2>
      <p>
        Fica eleito o foro da comarca de São José dos Campos – SP, com renúncia expressa a qualquer outro, por mais privilegiado que seja,
        para dirimir eventuais controvérsias relativas ao uso da plataforma.
      </p>

      <div className="mt-8">
        <Link to="/signup" className="text-blue-600 underline">
          Voltar para cadastro
        </Link>
      </div>
    </div>
  );
}
