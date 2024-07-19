function calcular() {
  const pbtc = parseFloat(document.getElementById('pbtc').value);
  const tara = parseFloat(document.getElementById('tara').value);
  const pesoCarga = parseFloat(document.getElementById('pesoCarga').value);

  if (isNaN(pbtc) || isNaN(tara) || isNaN(pesoCarga)) {
    document.getElementById('result').textContent = 'Por favor, insira valores válidos.';
    return;
  }

  const capacidadeCarga = pbtc - tara;
  const excessoPeso = pesoCarga - capacidadeCarga;

  let resultText = `Capacidade de carga: ${capacidadeCarga} kg\n`;

  if (excessoPeso > 0) {
    const numFrações = Math.ceil(excessoPeso / 200);
    const valorMulta = calcularMulta(excessoPeso);

    resultText += `Excesso de peso: ${excessoPeso.toFixed(2)} kg\n`;
    resultText += `Número de frações utilizadas: ${numFrações}\n`;
    resultText += `Valor total da multa: R$ ${valorMulta.toFixed(2)}`;
  } else {
    resultText += 'Não há excesso de peso.';
  }

  document.getElementById('result').textContent = resultText;
}

function calcularMulta(excessoPeso) {
  const tabelaMulta = {
    A: { limite: 600, valorPorFração: 5.32 },
    B: { limite: 800, valorPorFração: 10.64 },
    C: { limite: 1000, valorPorFração: 21.28 },
    D: { limite: 3000, valorPorFração: 31.92 },
    E: { limite: 5000, valorPorFração: 42.56 },
    F: { limite: Infinity, valorPorFração: 53.2 } // Última faixa (acima de 5000 kg)
  };

  let faixa = '';
  for (let key in tabelaMulta) {
    if (excessoPeso <= tabelaMulta[key].limite) {
      faixa = key;
      break;
    }
  }

  const numFrações = Math.ceil(excessoPeso / 200);
  let valorMulta = numFrações * tabelaMulta[faixa].valorPorFração + 130.16;

  if (excessoPeso > 1000 && excessoPeso <= 5000) {
    valorMulta += 293.47;
  }

  return valorMulta;
}