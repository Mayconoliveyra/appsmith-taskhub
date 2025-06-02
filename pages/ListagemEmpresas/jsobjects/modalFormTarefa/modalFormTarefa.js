export default {
	abrirModalFormTarefa(nomeModal) {
		closeModal("ModalTarefas");
		showModal(nomeModal);

		if(nomeModal === 'ModTarAnaNFSe'){
			listagemPadroesNFSe.run().catch(() => {
				showAlert(listagemPadroesNFSe.data.errors.default || "Houve um erro!", 'error');
			});
		}
	},
	fecharModalFormTarefa(nomeModal) {
		TabListagemTarefas.setSelectedRowIndex(-1);
		closeModal(nomeModal);
		showModal("ModalTarefas");
	}
}