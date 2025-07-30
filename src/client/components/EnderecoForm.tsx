// =============================
// File: src/client/components/EnderecoForm.tsx
// =============================

import { useEffect, useState } from "react";


type Endereco = {
  cep: string;
  numero: string;
  complemento: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
};

type Props = {
  initialValue?: Partial<Endereco>;
  onChange: (endereco: Endereco) => void;
};

export default function EnderecoForm({ initialValue = {}, onChange }: Props) {
  const [cep, setCep] = useState(initialValue.cep || "");
  const [numero, setNumero] = useState(initialValue.numero || "");
  const [complemento, setComplemento] = useState(initialValue.complemento || "");
  const [logradouro, setLogradouro] = useState(initialValue.logradouro || "");
  const [bairro, setBairro] = useState(initialValue.bairro || "");
  const [cidade, setCidade] = useState(initialValue.cidade || "");
  const [estado, setEstado] = useState(initialValue.estado || "");
  const [erro, setErro] = useState("");

      // 🚩 ADICIONE ESTE USEFFECT!
      useEffect(() => {
        setCep(initialValue.cep || "");
        setNumero(initialValue.numero || "");
        setComplemento(initialValue.complemento || "");
        setLogradouro(initialValue.logradouro || "");
        setBairro(initialValue.bairro || "");
        setCidade(initialValue.cidade || "");
        setEstado(initialValue.estado || "");
      }, [
        initialValue.cep,
        initialValue.numero,
        initialValue.complemento,
        initialValue.logradouro,
        initialValue.bairro,
        initialValue.cidade,
        initialValue.estado,
      ]);


  // Busca endereço ao preencher o CEP (somente números)
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCep(value);

    const cepLimpo = value.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(res => res.json())
        .then(data => {
          if (data.erro) {
            setErro("CEP não encontrado");
            setLogradouro("");
            setBairro("");
            setCidade("");
            setEstado("");
          } else {
            setErro("");
            setLogradouro(data.logradouro || "");
            setBairro(data.bairro || "");
            setCidade(data.localidade || "");
            setEstado(data.uf || "");
          }
          // Dispara atualização sempre que CEP buscar!
          onChange({
            cep: value,
            numero,
            complemento,
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          });
        })
        .catch(() => {
          setErro("Erro ao buscar o CEP");
        });
    } else {
      // Se o usuário está editando, já dispara alteração.
      onChange({
        cep: value,
        numero,
        complemento,
        logradouro,
        bairro,
        cidade,
        estado,
      });
    }
  };

  // Demais campos
  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumero(e.target.value);
    onChange({
      cep,
      numero: e.target.value,
      complemento,
      logradouro,
      bairro,
      cidade,
      estado,
    });
  };
  const handleComplementoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplemento(e.target.value);
    onChange({
      cep,
      numero,
      complemento: e.target.value,
      logradouro,
      bairro,
      cidade,
      estado,
    });
  };

  return (
    <div className="grid gap-3">
      <div>
        <label className="block font-medium">CEP*</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={cep}
          onChange={handleCepChange}
          placeholder="00000-000"
        />
        {erro && <p className="text-red-600 text-sm mt-1">{erro}</p>}
      </div>

      <div>
        <label className="block font-medium">Número*</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={numero}
          onChange={handleNumeroChange}
        />
      </div>

      <div>
        <label className="block font-medium">Complemento</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={complemento}
          onChange={handleComplementoChange}
        />
      </div>
    </div>
  );
}
