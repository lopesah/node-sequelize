const { Router } = require('express');
const CursoController = require('../controllers/CursoController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const matriculaController = new MatriculaController();

const cursoController = new CursoController();

const router = Router();

router.get('/cursos', (req, res) => cursoController.pegaCursos(req, res));
router.get('/cursos/lotados', (req, res) => matriculaController.pegaCursosLotados(req, res));
router.get('/cursos/:id', (req, res) => cursoController.pegaUmPorId(req, res));
router.post('/cursos', (req, res) => cursoController.criaNovo(req, res));
router.put('/cursos/:id', (req, res) => cursoController.atualiza(req, res));
router.delete('/cursos/:id', (req, res) => cursoController.exclui(req, res));

module.exports = router;
