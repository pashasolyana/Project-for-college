const Router = require('express');
const TodoControoler = require('../Controllers/Controllers');
const router = new Router();

router.get('/user',TodoControoler.getUser) 
router.post('/reg',TodoControoler.regUser)
router.post('/login',TodoControoler.logUser)
router.get('/todos',TodoControoler.getTodos) 
router.put('/todos',TodoControoler.putTodos)
router.post('/todos',TodoControoler.deleteTodos) 

module.exports = router;