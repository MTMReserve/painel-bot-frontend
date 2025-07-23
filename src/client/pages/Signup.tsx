// ===============================
// File: src/client/pages/Signup.tsx
// ===============================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@client/services/api";
import { useAuthStore } from "@client/store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  validateCPF,
  validateEmail,
  validatePhone,
  validateNomeCompleto,
  validateEmpresa,
  validateDate,
  validateSenhaIguais,
} from "@client/utils/validators";
import { formatarDocumento } from "@client/utils/formatters";
import { formatarNomeCompleto, validarNomeCompleto } from "@client/utils/formatters";
import { formatarEmail, validarEmailFormatado} from "@client/utils/formatters";
import { validarTelefoneCompleto } from "@client/utils/formatters";
import { validarSenhaForte } from "@client/utils/validators";
import { Link } from "react-router-dom";

async function verificarCampoExistente(
  campo: "cpf" | "email" | "telefone" | "tenant_id",
  valor: string
): Promise<boolean> {
  try {
    const res = await api.post("/auth/verificar-existencia", { [campo]: valor });
    return res.data[campo] === true;
  } catch {
    return false;
  }
}




export default function Signup() { // Este formulário está em conformidade com o CERTIFICADO OFICIAL v1.0.1
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    tenant_id: "",
    nome_empresa: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    aceitouTermos: false,
    plano: "mensal",
    termo_versao: "v1.0",
    tipo_pessoa: "CPF",
    // Campos adicionais obrigatórios
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    bairro: "",
    cpf: "",
    nome_completo: "",
    data_nascimento: "",
    cnpj: "",
    razao_social: "",
    nome_fantasia: "",
    responsavel_legal_nome: "",
    responsavel_legal_cpf: ""
  });


  const [errosPorCampo, setErrosPorCampo] = useState<{ [key: string]: string }>({});
    const [codigoPais, setCodigoPais] = useState("+55");
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [senhaForte, setSenhaForte] = useState(true);
  const [senhaIgual, setSenhaIgual] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    console.log("🟢 Signup.tsx - clientId lido em tempo de uso:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

    if (import.meta.env) {
      console.log("📦 Todas variáveis do Vite:", import.meta.env);
    }
  }, []);
    useEffect(() => {
    const cleanedCep = form.cep.replace(/\D/g, "");

  if (cleanedCep.length === 8) {
    axios
      .get(`https://viacep.com.br/ws/${cleanedCep}/json/`)
      .then((res) => {
        if (res.data.erro) throw new Error("CEP não encontrado");

        setForm((prev) => ({
          ...prev,
          logradouro: res.data.logradouro || "",
          bairro: res.data.bairro || "",
          cidade: res.data.localidade || "",
          estado: res.data.uf || "",
        }));
        setErrosPorCampo((prev) => {
          const novo = { ...prev };
          delete novo.cep;
          return novo;
        });
      })
      .catch(() => {
        setForm((prev) => ({
          ...prev,
          logradouro: "",
          bairro: "",
          cidade: "",
          estado: "",
        }));
        setErrosPorCampo((prev) => ({
          ...prev,
          cep: "CEP inválido ou não encontrado.",
        }));
      });
  }
}, [form.cep]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const novosErros: { [key: string]: string } = {};

    if (!form.aceitouTermos) {
      novosErros.aceitouTermos = "Você precisa aceitar os termos de serviço.";
    }

    if (!form.tenant_id) {
      novosErros.tenant_id = "Nome de usuário obrigatório.";
    } else if (errosPorCampo.tenant_id) {
      novosErros.tenant_id = errosPorCampo.tenant_id;
    }



    const emailErro = validateEmail(form.email);
    if (emailErro) novosErros.email = emailErro;

    const telefoneErro = validatePhone(form.telefone);
    if (telefoneErro) novosErros.telefone = telefoneErro;

    const empresaErro = validateEmpresa(form.nome_empresa);
    if (empresaErro) novosErros.nome_empresa = empresaErro;

    const senhaErro = validateSenhaIguais(form.senha, form.confirmarSenha);
    if (senhaErro) novosErros.confirmarSenha = senhaErro;

    if (form.tipo_pessoa === "CPF") {
      const cpfErro = validateCPF(form.cpf);
      if (cpfErro) novosErros.cpf = cpfErro;

      const nomeErro = validateNomeCompleto(form.nome_completo);
      if (nomeErro) novosErros.nome_completo = nomeErro;

      const nascimentoErro = validateDate(form.data_nascimento);
      if (nascimentoErro) novosErros.data_nascimento = nascimentoErro;
    }

      if (Object.keys(novosErros).length > 0) {
        setErrosPorCampo(novosErros);
        return;
      }

      // 🔄 Verificação de existência duplicada
      const cpfLimpo = form.cpf.replace(/\D/g, "");
      const telefoneLimpo = form.telefone.replace(/\D/g, "");
      const telefoneCompleto = `${codigoPais}${telefoneLimpo}`;
      const emailCorrigido = formatarEmail(form.email);
      const tenantId = form.tenant_id.trim();

      const [cpfExiste, telefoneExiste, emailExiste, tenantExiste] = await Promise.all([
        verificarCampoExistente("cpf", cpfLimpo),
        verificarCampoExistente("telefone", telefoneCompleto),
        verificarCampoExistente("email", emailCorrigido),
        verificarCampoExistente("tenant_id", tenantId),
      ]);

      const errosFinais = { ...novosErros };
      if (cpfExiste) errosFinais.cpf = "Este CPF já está cadastrado.";
      if (telefoneExiste) errosFinais.telefone = "Este telefone já está cadastrado.";
      if (emailExiste) errosFinais.email = "Este e-mail já está cadastrado.";
      if (tenantExiste) errosFinais.tenant_id = "Este nome de usuário já está em uso.";

      if (Object.keys(errosFinais).length > 0) {
        setErrosPorCampo(errosFinais);
        return;
      }

      setErrosPorCampo({}); // limpa erros


    try {
      setLoadingLocal(true);

        // Monta o telefone completo a partir do DDI e dos 2 dígitos iniciais do telefone
        const telefoneLimpo = form.telefone.replace(/\D/g, "");
        const ddi = codigoPais.startsWith("+") ? codigoPais : `+${codigoPais}`;
        const telefoneCompleto = `${ddi}${telefoneLimpo}`;

        const response = await api.post("/auth/signup", {
          ...form,
          telefone: telefoneCompleto,

        data_nascimento: form.data_nascimento
          ? new Date(form.data_nascimento).toISOString().split("T")[0]
          : null,
        confirmar_senha: form.confirmarSenha,
        aceitou_termos_em: new Date().toISOString(),
      });


      const data = response.data;

      localStorage.setItem("tenant_id", data.tenant_id);
      if (data.token) localStorage.setItem("token", data.token);

      login(data.token, { nome: data.nome_empresa }, data.tenant_id);

      // Aguarda o Zustand atualizar antes de redirecionar
      await new Promise((resolve) => setTimeout(resolve, 50));

      navigate("/dashboard");

      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data?.errors) {
          const errorMap: Record<string, string> = Object.fromEntries(
            Object.entries(err.response.data.errors).map(([campo, valor]) => {
              const mensagens = (valor as { _errors?: string[] })?._errors;
              return [campo, mensagens?.[0] || "Erro ao validar campo"];
            })
          );
          setErrosPorCampo(errorMap);
        } else if (axios.isAxiosError(err)) {
          setErrosPorCampo({ geral: err.message || "Erro ao cadastrar" });
        } else {
          setErrosPorCampo({ geral: "Erro desconhecido" });
        }
      }

    
    finally {
      setLoadingLocal(false);
    }
  };

  const isCPF = form.tipo_pessoa === "CPF";
  const isCNPJ = form.tipo_pessoa === "CNPJ";
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Cadastre sua empresa</h2>

        {errosPorCampo.geral && (
          <p className="text-red-600 text-sm mb-3 text-center">{errosPorCampo.geral}</p>
        )}


        <GoogleLogin
          onSuccess={(res) =>
            api.post("/auth/google", { credential: res.credential }).then(() => {
              navigate("/dashboard");
            })
          }
          onError={() => setErrosPorCampo({ geral: "Erro no login com Google" })}

        />

        <div className="my-4 text-gray-400 text-sm text-center">OU</div>

        <select
          name="tipo_pessoa"
          value={form.tipo_pessoa}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="CPF">Pessoa Física (CPF)</option>
          <option value="CNPJ">Pessoa Jurídica (CNPJ)</option>
        </select>

        {isCPF && (
          <>
        <input
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={(e) => {
            const cpfFormatado = formatarDocumento(e.target.value);
            setForm((prev) => ({ ...prev, cpf: cpfFormatado }));

            // Validação em tempo real para remover erro se CPF ficar válido
            const erro = validateCPF(cpfFormatado);
            setErrosPorCampo((prev) => {
              const novo = { ...prev };
              if (!erro) delete novo.cpf;
              return novo;
            });
          }}
          onBlur={async () => {
            const erro = validateCPF(form.cpf); // mantém validação com máscara

            if (erro) {
              setErrosPorCampo((prev) => ({ ...prev, cpf: erro }));
              return;
            }

            const jaExiste = await verificarCampoExistente("cpf", form.cpf); // ✅ envia com máscara
            if (jaExiste) {
              setErrosPorCampo((prev) => ({ ...prev, cpf: "Este CPF já está cadastrado." }));
            } else {
              setErrosPorCampo((prev) => {
                const novo = { ...prev };
                delete novo.cpf;
                return novo;
              });
            }
          }}

          className={`w-full p-2 border rounded mb-1 ${errosPorCampo.cpf ? "border-red-500" : ""}`}
        />

        {errosPorCampo.cpf && (
          <span className="text-red-500 text-sm mb-2 block">{errosPorCampo.cpf}</span>
        )}


            <input
              name="nome_completo"
              placeholder="Nome completo"
              value={form.nome_completo}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  nome_completo: e.target.value,
                }))
              }
              onBlur={() => {
                const nomeCorrigido = formatarNomeCompleto(form.nome_completo);
                const erro = validarNomeCompleto(nomeCorrigido);
                setForm((prev) => ({ ...prev, nome_completo: nomeCorrigido }));
                setErrosPorCampo((prev) => ({
                  ...prev,
                  nome_completo: erro || "",
                }));
              }}
              className={`w-full p-2 border rounded mb-1 ${
                errosPorCampo.nome_completo ? "border-red-500" : ""
              }`}
            />
            {errosPorCampo.nome_completo && (
              <span className="text-red-500 text-sm mb-2 block">
                {errosPorCampo.nome_completo}
              </span>
            )}


            <input
              name="data_nascimento"
              placeholder="Data de nascimento"
              type="date"
              value={form.data_nascimento}
              onChange={handleChange}
              className={`w-full p-2 border rounded mb-1 ${
                errosPorCampo.data_nascimento ? "border-red-500" : ""
              }`}
            />
            {errosPorCampo.data_nascimento && (
              <span className="text-red-500 text-sm mb-2 block">
                {errosPorCampo.data_nascimento}
              </span>
            )}
          </>
        )}

        {isCNPJ && (
          <>
          <input
            name="cnpj"
            placeholder="CNPJ"
            value={form.cnpj}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                cnpj: formatarDocumento(e.target.value),
              }))
            }
            className="w-full p-2 border rounded mb-3"
          />
            <input name="razao_social" placeholder="Razão Social" value={form.razao_social} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
            <input name="nome_fantasia" placeholder="Nome Fantasia" value={form.nome_fantasia} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
            <input name="responsavel_legal_nome" placeholder="Nome do responsável legal" value={form.responsavel_legal_nome} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
            <input name="responsavel_legal_cpf" placeholder="CPF do responsável legal" value={form.responsavel_legal_cpf} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          </>
        )}

          <input
            name="email"
            type="email"
            placeholder="E-mail corporativo"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            onBlur={async () => {
              const emailCorrigido = formatarEmail(form.email);
              const erro = validarEmailFormatado(emailCorrigido);
              setForm((prev) => ({ ...prev, email: emailCorrigido }));

              if (erro) {
                setErrosPorCampo((prev) => ({ ...prev, email: erro }));
                return;
              }

              const jaExiste = await verificarCampoExistente("email", emailCorrigido);
              if (jaExiste) {
                setErrosPorCampo((prev) => ({ ...prev, email: "Este e-mail já está cadastrado." }));
              } else {
                setErrosPorCampo((prev) => {
                  const novo = { ...prev };
                  delete novo.email;
                  return novo;
                });
              }
            }}
            className={`w-full p-2 border rounded mb-1 ${errosPorCampo.email ? "border-red-500" : ""}`}
          />

          {errosPorCampo.email && (
            <span className="text-red-500 text-sm mb-2 block">{errosPorCampo.email}</span>
          )}


      <div className="flex gap-2 mb-1 items-center">
        {/* Código do país (DDI) */}
        <select
          name="codigoPais"
          value={codigoPais}
          onChange={(e) => setCodigoPais(e.target.value)}
          className="w-[100px] p-2 border rounded bg-white text-center"
        >
          <option value="+55">+55</option>
          <option value="+1">+1</option>
          <option value="+351">+351</option>
          <option value="+34">+34</option>
          <option value="+33">+33</option>
          <option value="+49">+49</option>
          <option value="+81">+81</option>
          <option value="+86">+86</option>
          <option value="+54">+54</option>
          <option value="+52">+52</option>
        </select>

        {/* Telefone com DDD embutido e máscara */}
        <input
          name="telefone"
          type="tel"
          placeholder="(11) 91234-5678"
          value={form.telefone}
          onChange={(e) => {
            const valor = e.target.value.replace(/\D/g, "").slice(0, 11);
            const comMascara =
              valor.length >= 10
                ? `(${valor.slice(0, 2)}) ${valor.slice(2, valor.length - 4)}-${valor.slice(-4)}`
                : valor;
            setForm((prev) => ({
              ...prev,
              telefone: comMascara,
            }));
          }}
          onBlur={async () => {
            const erro = validarTelefoneCompleto(codigoPais, form.telefone);
            if (erro) {
              setErrosPorCampo((prev) => ({ ...prev, telefone: erro }));
              return;
            }

            const telefoneLimpo = form.telefone.replace(/\D/g, "");
            const ddi = codigoPais.startsWith("+") ? codigoPais : `+${codigoPais}`;
            const telefoneCompleto = `${ddi}${telefoneLimpo}`; // ✅ garante +55...

            const jaExiste = await verificarCampoExistente("telefone", telefoneCompleto);

            if (jaExiste) {
              setErrosPorCampo((prev) => ({ ...prev, telefone: "Este telefone já está cadastrado." }));
            } else {
              setErrosPorCampo((prev) => {
                const novo = { ...prev };
                delete novo.telefone;
                return novo;
              });
            }
          }}


            className={`flex-1 p-2 border rounded ${errosPorCampo.telefone ? "border-red-500" : ""}`}
          />

      </div>

      {errosPorCampo.telefone && (
        <span className="text-red-500 text-sm mb-2 block">{errosPorCampo.telefone}</span>
      )}


 
        <input
          name="nome_empresa"
          type="text"
          placeholder="Nome da empresa"
          value={form.nome_empresa}
          onChange={handleChange}
          className={`w-full p-2 border rounded mb-1 ${errosPorCampo.nome_empresa ? "border-red-500" : ""}`}
        />
        {errosPorCampo.nome_empresa && (
          <span className="text-red-500 text-sm mb-2 block">{errosPorCampo.nome_empresa}</span>
        )}

        <div className="relative mb-1">
        <input
          name="tenant_id"
          type="text"
          placeholder="Nome de Usuário"
          value={form.tenant_id}
          onChange={(e) => {
            const novo = e.target.value;
            setForm((prev) => ({ ...prev, tenant_id: novo }));
          }}
          onBlur={async () => {
            const tenantId = form.tenant_id.trim();

            if (!tenantId) {
              setErrosPorCampo((prev) => ({ ...prev, tenant_id: "Nome de usuário obrigatório." }));
              return;
            }

            const jaExiste = await verificarCampoExistente("tenant_id", tenantId);

            if (jaExiste) {
              setErrosPorCampo((prev) => ({ ...prev, tenant_id: "Este nome de usuário já está em uso." }));
            } else {
              setErrosPorCampo((prev) => {
                const novo = { ...prev };
                delete novo.tenant_id;
                return novo;
              });
            }
          }}
          className={`w-full p-2 border rounded pr-10 ${
            errosPorCampo.tenant_id ? "border-red-500" : ""
          }`}
        />

        {errosPorCampo.tenant_id && (
          <span className="text-red-500 text-sm mb-2 block">{errosPorCampo.tenant_id}</span>
        )}



        <input
          name="cep"
          placeholder="CEP"
          value={form.cep}
          onChange={handleChange}
          className={`w-full p-2 border rounded mb-1 ${errosPorCampo.cep ? "border-red-500" : ""}`}
        />
        {errosPorCampo.cep && (
          <span className="text-red-500 text-sm mb-2 block">{errosPorCampo.cep}</span>
        )}
          <input
            name="logradouro"
            placeholder="Rua / Avenida"
            value={form.logradouro}
            readOnly
            className="w-full p-2 border border-gray-300 rounded mb-3 bg-gray-100"
          />
          <input
            name="bairro"
            placeholder="Bairro"
            value={form.bairro}
            readOnly
            className="w-full p-2 border border-gray-300 rounded mb-3 bg-gray-100"
          />


        <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
        <input name="complemento" placeholder="Complemento (opcional)" value={form.complemento} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

    
        <input
          name="cidade"
          placeholder="Cidade"
          value={form.cidade}
          readOnly
          className="w-full p-2 border border-gray-300 rounded mb-3 bg-gray-100"
        />
        <input
          name="estado"
          placeholder="Estado (UF)"
          value={form.estado}
          readOnly
          className="w-full p-2 border border-gray-300 rounded mb-3 bg-gray-100"
        />
  

      {/* Campo SENHA com botão olho */}
      <div className="relative mb-2">
        <input
          type={mostrarSenha ? "text" : "password"}
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => {
            const novaSenha = e.target.value;
            setForm({ ...form, senha: novaSenha });
            setSenhaForte(validarSenhaForte(novaSenha));
            setSenhaIgual(novaSenha === form.confirmarSenha);
          }}
          className={`w-full p-2 border rounded pr-10 ${!senhaForte ? "border-red-500" : ""}`}
        />
        <button
          type="button"
          onClick={() => setMostrarSenha(!mostrarSenha)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {mostrarSenha ? "🙈" : "👁️"}
        </button>
      </div>

      {/* Campo CONFIRMAR SENHA com botão olho */}
      <div className="relative mb-2">
        <input
          type={mostrarConfirmacao ? "text" : "password"}
          name="confirmarSenha"
          placeholder="Confirmar senha"
          value={form.confirmarSenha}
          onChange={(e) => {
            const confirmacao = e.target.value;
            setForm({ ...form, confirmarSenha: confirmacao });
            setSenhaIgual(confirmacao === form.senha);
          }}
          className={`w-full p-2 border rounded pr-10 ${!senhaIgual ? "border-red-500" : ""}`}
        />
        <button
          type="button"
          onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {mostrarConfirmacao ? "🙈" : "👁"}
        </button>
      </div>

      {/* Validações */}
      {!senhaForte && (
        <p className="text-red-500 text-sm mb-1">
          A senha deve ter ao menos 8 caracteres, incluindo número, letra e caractere especial.
        </p>
      )}

      {!senhaIgual && (
        <p className="text-red-500 text-sm mb-1">
          As senhas não coincidem.
        </p>
      )}

      {errosPorCampo.confirmarSenha && (
        <span className="text-red-500 text-sm mb-2 block">
          {errosPorCampo.confirmarSenha}
        </span>
      )}



        <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <input type="checkbox" name="aceitouTermos" checked={form.aceitouTermos} onChange={handleChange} />
          Eu li e aceito os{" "}
        <Link to="/termos" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Termos de Serviço (v1.0)
        </Link>
        </label>
        {errosPorCampo.aceitouTermos && (
          <span className="text-red-500 text-sm mb-2 block">{errosPorCampo.aceitouTermos}</span>
        )}

        <button
          onClick={handleSubmit}
          disabled={loadingLocal || Object.values(errosPorCampo).some((v) => v?.length > 0)}
          className={`w-full py-2 rounded text-white ${
            loadingLocal ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loadingLocal ? "Cadastrando..." : "Criar conta"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Já possui uma conta?{" "}
          <a href="/login" className="text-blue-600 underline">
            Fazer login
          </a>
        </p>
      </div>
      </div>
    </div>
  );
}
