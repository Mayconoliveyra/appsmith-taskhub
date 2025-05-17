export default {
	async consultarCliente(tipo) {
		try {
			const resultado = tipo === "registro"? await consultarClienteRegistro.run(): await consultarClienteCnpj.run();

			if (!resultado) {
				showAlert("Cliente não encontrado",'error');
				return;
			}

			// Preenche os inputs
			InputRegistroNovaEmpresa.setValue(resultado[0].id || '');
			InputCnpjCpfNovaEmpresa.setValue(resultado[0].cnpj || '');
			util.aplicarMascara(InputCnpjCpfNovaEmpresa,util.mascaras.cpfCnpj)
			InputNomeNovaEmpresa.setValue(resultado[0].fantasia || '')
		} catch (e) {
			showAlert("Cliente não encontrado",'error');
		}
	}
}