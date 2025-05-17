export default {
	abrirModalFormTarefa(nomeModal) {
		closeModal("ModalTarefas");
		showModal(nomeModal);
	},
	fecharModalFormTarefa(nomeModal) {
		TabListagemTarefas.setSelectedRowIndex(-1);
		closeModal(nomeModal);
		showModal("ModalTarefas");
	}
}