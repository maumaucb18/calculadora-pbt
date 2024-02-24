document
        .getElementById("calculator-form")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          var pbt = parseFloat(document.getElementById("pbt").value);
          var pesoAtual = parseFloat(
            document.getElementById("peso-atual").value
          );
          var excessoPBT = calcularExcessoPBT(pesoAtual, pbt);
          var numFrações = Math.ceil(excessoPBT / 200);
          var valorMulta = calcularMulta(excessoPBT);

          var resultadoDiv = document.getElementById("resultado");
          resultadoDiv.innerHTML =
            "Excesso de PBT: " + excessoPBT.toFixed(2) + " kg<br>";
          resultadoDiv.innerHTML +=
            "Número de Frações Utilizadas: " + numFrações + "<br>";
          resultadoDiv.innerHTML +=
            "Valor Total da Multa: R$" + valorMulta.toFixed(2);
        });

      function calcularExcessoPBT(pesoAtual, pbt) {
        var pbtComAdicional = pbt * 1.05; // Adiciona 5% ao PBT
        var excesso = pesoAtual - pbtComAdicional;
        return excesso > 0 ? excesso : 0;
      }

      function calcularMulta(excessoPBT) {
        var tabelaMulta = {
          A: { limite: 600, valorPorFração: 5.32 },
          B: { limite: 800, valorPorFração: 10.64 },
          C: { limite: 1000, valorPorFração: 21.28 },
          D: { limite: 3000, valorPorFração: 31.92 },
          E: { limite: 5000, valorPorFração: 42.56 },
          F: { limite: Infinity, valorPorFração: 53.2 }, // Última faixa (acima de 5000 kg)
        };

        var faixa = "";
        for (var key in tabelaMulta) {
          if (excessoPBT <= tabelaMulta[key].limite) {
            faixa = key;
            break;
          }
        }

        var numFrações = Math.ceil(excessoPBT / 200);
        var valorMulta =
          numFrações * tabelaMulta[faixa].valorPorFração + 130.16;
        return valorMulta;
      }