function calcularFerias() {
    const salarioBase = parseFloat(document.getElementById('salario').value) || 0;
    const dias = parseInt(document.getElementById('dias').value) || 0;
    const dependentes = parseInt(document.getElementById('dependentes').value) || 0;
    const extras = parseFloat(document.getElementById('extras').value) || 0;
    const comissoes = parseFloat(document.getElementById('comissoes').value) || 0;
    const quer13 = document.getElementById('decimoTerceiro').value;

    if (dias < 1 || dias > 30) { alert("Os dias de férias devem ser entre 1 e 30."); return; }

    const baseCalculo = salarioBase + extras + comissoes;
    const valorProporcional = (baseCalculo / 30) * dias;
    const tercoConstitucional = valorProporcional / 3;
    const brutoFerias = valorProporcional + tercoConstitucional;

    let adiantamento13 = quer13 === 'sim' ? baseCalculo / 2 : 0;

    let inss = 0;
    if (brutoFerias <= 1412.00) inss = brutoFerias * 0.075;
    else if (brutoFerias <= 2666.68) inss = (brutoFerias * 0.09) - 21.18;
    else if (brutoFerias <= 4000.03) inss = (brutoFerias * 0.12) - 101.18;
    else if (brutoFerias <= 7786.02) inss = (brutoFerias * 0.14) - 181.18;
    else inss = 908.85; 

    const baseIrrf = brutoFerias - inss - (dependentes * 189.59);
    let irrf = 0;
    if (baseIrrf > 2259.20 && baseIrrf <= 2826.65) irrf = (baseIrrf * 0.075) - 169.44;
    else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05) irrf = (baseIrrf * 0.15) - 381.44;
    else if (baseIrrf > 3751.05 && baseIrrf <= 4664.68) irrf = (baseIrrf * 0.225) - 662.77;
    else if (baseIrrf > 4664.68) irrf = (baseIrrf * 0.275) - 896.00;
    if (irrf < 0) irrf = 0; 

    const totalLiquido = brutoFerias + adiantamento13 - inss - irrf;

    // --- LÓGICA DO RAIO-X FINANCEIRO ---
    const baseGrafico = brutoFerias + adiantamento13; // O montante total antes dos descontos
    
    // Calculando as fatias da pizza em porcentagem
    let pctInss = baseGrafico > 0 ? (inss / baseGrafico) * 100 : 0;
    let pctIrrf = baseGrafico > 0 ? (irrf / baseGrafico) * 100 : 0;
    let pctLiquido = baseGrafico > 0 ? (totalLiquido / baseGrafico) * 100 : 0;

    // Injetando as larguras nas divs (Animando a barra)
    document.getElementById('barLiquido').style.width = pctLiquido + '%';
    document.getElementById('barInss').style.width = pctInss + '%';
    document.getElementById('barIrrf').style.width = pctIrrf + '%';

    // Injetando os textos de porcentagem na legenda
    document.getElementById('pctLiquido').innerText = pctLiquido.toFixed(1) + '%';
    document.getElementById('pctInss').innerText = pctInss.toFixed(1) + '%';
    document.getElementById('pctIrrf').innerText = pctIrrf.toFixed(1) + '%';

    // --- ATUALIZAÇÃO DOS TEXTOS (R$) ---
    const fm = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('resProporcional').innerText = fm(valorProporcional);
    document.getElementById('resTerco').innerText = fm(tercoConstitucional);
    document.getElementById('resInss').innerText = fm(inss);
    document.getElementById('resIrrf').innerText = fm(irrf);
    document.getElementById('resLiquido').innerText = fm(totalLiquido);

    const linha13 = document.getElementById('linha13');
    if (quer13 === 'sim') {
        linha13.style.display = 'flex';
        document.getElementById('res13').innerText = fm(adiantamento13);
    } else {
        linha13.style.display = 'none';
    }

    document.getElementById('boxResultado').style.display = 'block';
}