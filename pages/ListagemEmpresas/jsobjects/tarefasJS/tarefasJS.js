export default {
	StatusCorHex: {
		NOVO: '#3AAFF3',         // Azul Claro
		PENDENTE: '#FFC107',     // Amarelo
		PROCESSANDO: '#FF9800',  // Laranja
		FINALIZADO: '#4CAF50',   // Verde
		CONSULTAR: '#1976D2',    // Azul Escuro
		CANCELADA: '#9E9E9E',    // Cinza
		ERRO: '#F44336',         // Vermelho
	},
	podeSolicitar() {
		const status = TabListagemTarefas.selectedRow.te_status;
		const paramMC = TabListagemTarefas.selectedRow.t_param_mc;
		const paramSS = TabListagemTarefas.selectedRow.t_param_ss;
		const paramSH = TabListagemTarefas.selectedRow.t_param_sh;
		const paramApiIm = TabListagemTarefas.selectedRow.t_param_api_im;
		const statusBloqueado = ['NOVO', 'CANCELADA', 'ERRO', 'FINALIZADO'].includes(status);
		const condParamMC = paramMC === null ? true : paramMC;
		const condParamSS = paramSS === null ? true : paramSS;
		const condParamSH = paramSH === null ? true : paramSH;
		const condParamApiIm = paramApiIm === null ? true : paramApiIm;

		return !(statusBloqueado && condParamMC && condParamSS && condParamSH && condParamApiIm);
	},
	carregarHistorico() {
		const tabSelect = TabsTarefListagem.selectedTab;
		const empresaAtiva = TabListagemEmpresas.selectedRow.ativo === 'Ativa'? true : false;

		if(tabSelect === 'Histórico de Tarefas' && empresaAtiva){
			console.log('CHAMAAAA',TabsTarefListagem.selectedTab)
			listagemTarefasHistorico.run().catch(() => {
				showAlert(listagemTarefasHistorico.data.errors.default || "Houve um erro!", 'error');
			});
		}

	}
}