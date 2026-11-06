// ============================================================
//  InfraControl — CONFIGURAÇÃO DA EMPRESA
//  Este é o ÚNICO arquivo que muda de uma empresa para outra.
//  Para um cliente novo: copie o projeto, edite os campos abaixo e publique.
// ============================================================
window.EMPRESA = {
    // Nome que aparece no app (cabeçalho, tela de PIN, título da aba)
    nome: "Pro Link Serviços",

    // Setor / área que usa o app (aparece abaixo do título)
    setor: "Infraestrutura",

    // Logo da empresa (PNG ou SVG; de preferência com fundo transparente)
    logo: "https://i.postimg.cc/qv7HPLhx/VERDE.png",

    // Cor principal da empresa (botões, títulos, cabeçalho). As variações claras são calculadas sozinhas.
    cor: "#356852",

    // Endereço da implantação do Google Apps Script (planilha) desta empresa
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbwmxS_V6JFwYZWNSPlAw0o_dyviLmxpfUAty8sPr9ejQ4h6lv6VgKZZonZRij8QH_PF/exec",

    // Texto de ajuda da seção "Transporte de materiais" (pode usar <b>negrito</b>). Deixe "" para não mostrar.
    notaTransporte: "Só conta mais de 1 viagem se houver <b>desvio de rota</b>. Ex.: indo para Cícero Dantas, deixar material em Fátima (que faz parte da rota) = 1 viagem. Se também precisar ir a Adustina (muda a rota) = 2 viagens.",

    // Exemplos mostrados na seção de imprevistos. Deixe "" para não mostrar.
    exemplosImprevistos: "na ampliação de uma CTO, outra CTO no caminho estava sem as fusões e precisou ser baixada · no deslocamento, cabo baixo, ferragem danificada ou cabo roçando em árvore que foi ajustado.",

    // Prefixo dos dados salvos no aparelho. NÃO mude depois que a empresa começar a usar
    // (senão registros que estão na fila de envio deixam de aparecer).
    prefixo: "pl"
};
