import express from 'express';
// tslint:disable-next-line: no-implicit-dependencies
// import { UserRoute} from '@routes/user.route';
// tslint:disable-next-line: no-implicit-dependencies
import { MessageRoute} from '@routes/message.route';
export const router = express.Router();


/**
 * Message Routing
 */ 
router.get('/messages',MessageRoute.instance.get);
router.post('/messages',MessageRoute.instance.post);
router.put('/messages/:id',MessageRoute.instance.update);
router.delete('/messages/:id',MessageRoute.instance.delete);
router.get('/messages/:id',MessageRoute.instance.getOne);


/**
 * produit Routing
 */ 
// router.get('/categorie',CategorieRoute.instance.get);
// router.post('/categorie',CategorieRoute.instance.post);
// router.get('/categorie/:id',CategorieRoute.instance.get);
// router.delete('/categorie/:id',CategorieRoute.instance.delete);
// router.put('/categorie',CategorieRoute.instance.update);