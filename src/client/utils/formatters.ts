//===============================
//src/client/utils/formatters.ts
//===============================

export function formatarDocumento(valor: string): string {
  const numeros = valor.replace(/\D/g, '');

  if (numeros.length <= 11) {
    // CPF: 000.000.000-00
    return numeros
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
      .slice(0, 14);
  }

  // CNPJ: 00.000.000/0000-00
  return numeros
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
}

export function formatarNomeCompleto(input: string): string {
  const palavras = input.trim().split(/\s+/);
  const palavrasFormatadas = palavras.map((palavra) => {
    // Corrige palavras como tHiAgO => Thiago
    const baixa = palavra.toLowerCase();
    return baixa.charAt(0).toUpperCase() + baixa.slice(1);
  });
  return palavrasFormatadas.join(" ");
}

export function validarNomeCompleto(nome: string): string | null {
  const palavras = nome.trim().split(/\s+/);
  if (palavras.length < 2) return "Informe nome e sobrenome.";
  if (palavras.some((p) => p.length < 2)) return "Cada nome precisa ter ao menos 2 letras.";
  return null;
}

export function formatarEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validarEmailFormatado(email: string): string | null {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!regex.test(email)) return "E-mail inválido.";
  return null;
}

export function formatarTelefone(ddd: string, numero: string): string {
  const apenasNumeros = numero.replace(/\D/g, '');
  const formatado = apenasNumeros.length === 9
    ? `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5)}`
    : `${apenasNumeros.slice(0, 4)}-${apenasNumeros.slice(4)}`;

  return `(${ddd}) ${formatado}`;
}

export function validarTelefoneCompleto(codigoPais: string, telefone: string): string | null {
  const dddMatch = telefone.match(/\((\d{2})\)/);
  const ddd = dddMatch ? dddMatch[1] : null;
  const numeroLimpo = telefone.replace(/\D/g, "");

  // Lista de DDDs válidos no Brasil
  const dddsValidos = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "21", "22", "24", "27", "28",
    "31", "32", "33", "34", "35", "37", "38",
    "41", "42", "43", "44", "45", "46",
    "47", "48", "49",
    "51", "53", "54", "55",
    "61", "62", "63", "64", "65", "66", "67", "68", "69",
    "71", "73", "74", "75", "77",
    "79",
    "81", "82", "83", "84", "85", "86", "87", "88", "89",
    "91", "92", "93", "94", "95", "96", "97", "98", "99"
  ];

  if (!codigoPais.startsWith("+")) {
    return "Código do país inválido.";
  }

  if (!ddd || !dddsValidos.includes(ddd)) {
    return "DDD inválido.";
  }

  if (numeroLimpo.length < 10 || numeroLimpo.length > 11) {
    return "Número de telefone incompleto.";
  }

  return null; // ✅ Válido
}

