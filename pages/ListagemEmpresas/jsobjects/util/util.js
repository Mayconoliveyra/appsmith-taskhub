export default {
	mascaras: {
		cpf: ['XXX.XXX.XXX-XX'],
		cnpj: ['XX.XXX.XXX/XXXX-XX'],
		cpfCnpj: ['XXX.XXX.XXX-XX', 'XX.XXX.XXX/XXXX-XX'],
		telefone: ['(XX) XXXXX-XXXX'],
		cep: ['XXXXX-XXX']
	},
	formatosDataHora: {
		completo: 'YYYY-MM-DD HH:mm:ss',          // Ex: 2025-03-08 14:30:45
		dataSimples: 'YYYY-MM-DD',                // Ex: 2025-03-08
		dataBR: 'DD/MM/YYYY',                     // Ex: 08/03/2025
		hora: 'HH:mm:ss',                         // Ex: 14:30:45
		horaSemSegundos: 'HH:mm:00',              // Ex: 14:30:00
		iso: 'YYYY-MM-DDTHH:mm:ssZ',              // Ex: 2025-03-08T14:30:45Z
		longo: 'MMMM Do YYYY, h:mm:ss a',         // Ex: March 8th 2025, 2:30:45 pm
		diaHoraAbreviado: 'ddd, hA',              // Ex: Sat, 2PM
		dataComHifen: 'DD-MM-YYYY',               // Ex: 08-03-2025
		dataHoraCurta: 'DD/MM/YY HH:mm',          // Ex: 08/03/25 14:30
		dataHoraCompletaBR: 'DD/MM/YYYY HH:mm:ss' // Ex: 08/03/2025 14:30:45
	},
	tratarComoNumero(valor) {
		return valor?.replace(/[^\d]/g, '') || '';
	},
	aplicarMascara(input, mascaras) {
		const valorAtual = input.text || '';
		const valorNumericoAtual = util.tratarComoNumero(valorAtual);

		// Chave única por input
		const chaveStore = `__mascaraAnterior_${input.widgetName}`;
		const valorAnterior = appsmith.store[chaveStore] || '';
		const valorNumericoAnterior = util.tratarComoNumero(valorAnterior);

		const apagando = valorNumericoAtual.length < valorNumericoAnterior.length;
		const mesmoValor = valorAtual === valorAnterior;

		storeValue(chaveStore, valorAtual); // Armazena por input

		if (mesmoValor) return;

		const mascarasOrdenadas = [...mascaras].sort(
			(a, b) => (a.match(/X/g)?.length || 0) - (b.match(/X/g)?.length || 0)
		);

		const mascaraAplicada = mascarasOrdenadas.find(m => {
			const qtdDigitos = (m.match(/X/g) || []).length;
			return valorNumericoAtual.length <= qtdDigitos;
		}) || mascarasOrdenadas[mascarasOrdenadas.length - 1];

		let resultado = '';
		let i = 0;

		for (let char of mascaraAplicada) {
			if (char === 'X') {
				if (valorNumericoAtual[i]) {
					resultado += valorNumericoAtual[i++];
				} else {
					break;
				}
			} else {
				if (i > 0 && valorNumericoAtual.length > i) {
					resultado += char;
				}
			}
		}

		if (apagando && valorAtual.length > resultado.length) return;

		if (resultado !== valorAtual) {
			input.setValue(resultado);
		}
	},
	exibirMascara(valor, mascaras) {
		const valorAtual = valor || '';
		const valorNumericoAtual = util.tratarComoNumero(valorAtual);

		if (!valorNumericoAtual) return valorAtual;

		const mascarasOrdenadas = [...mascaras].sort(
			(a, b) => (a.match(/X/g)?.length || 0) - (b.match(/X/g)?.length || 0)
		);

		const mascaraAplicada = mascarasOrdenadas.find(m => {
			const qtdDigitos = (m.match(/X/g) || []).length;
			return valorNumericoAtual.length <= qtdDigitos;
		}) || mascarasOrdenadas[mascarasOrdenadas.length - 1];

		let resultado = '';
		let i = 0;

		for (let char of mascaraAplicada) {
			if (char === 'X') {
				if (valorNumericoAtual[i]) {
					resultado += valorNumericoAtual[i++];
				} else {
					break;
				}
			} else {
				if (i > 0 && valorNumericoAtual.length >= i) {
					resultado += char;
				}
			}
		}

		return resultado;
	},
	resetIndexTab(tabElement){
		tabElement.setSelectedRowIndex(-1)
	},
	formatarDataHora(data, formato = 'YYYY-MM-DD HH:mm:ss') {
		moment.locale('pt-br'); // Define idioma padrão para "pt-br"

		if (!data) return null; // Se data não for passada, retorna null
		return moment(data).format(formato);
	}
};