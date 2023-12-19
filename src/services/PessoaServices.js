const Services = require('./Services.js');
const datasource = require('../database/models');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services('Matricula');
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaTodasAsMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos () {
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async cancelaPessoaEMatriculas(estudanteId) {
    return datasource.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro({ ativo: false }, { id: Number(estudanteId) }, transacao);
      await this.matriculaServices.atualizaRegistro({ status: 'cancelado' }, { estudante_id: Number(estudanteId)}, transacao);  
    })
  }
  
}

module.exports = PessoaServices;
