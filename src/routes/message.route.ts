import express from 'express';
import moment from '../config/moment'
// tslint:disable-next-line: no-implicit-dependencies
import { MessageDAO } from "@services/DAO/message.dao";
export class MessageRoute {
    private static _instance: MessageRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new MessageRoute();
        }
        return this._instance;
    }
    public async get(req: express.Request, res: express.Response){


        try{
            const resultats = await MessageDAO.instance.all();
            const voirData:any = [];
            resultats.forEach((Message)=>{
                voirData.push({
                    id: Message.id,
                    commentaire: Message.data().commentaire,
                    createdAt: moment(Message.data().createdAt.toDate()).fromNow()
                })
            })
            res.send(voirData)

        }catch(err){
            res.status(500).send(err);
        }
    }




    public async getOne(req: express.Request, res: express.Response){

        try{
            const MessageId: string = req.params.id;
            const Message:any = await MessageDAO.instance.getOne(MessageId);
            res.send({
                id: Message.id,
                commentaire: Message.data().commentaire,
                createdAt: Message.data().createdAt.toDate()  
            });

        }catch(err){
            res.status(500).send(err);
        }
    }

    public async post(req: express.Request, res: express.Response){
        try{

            const data:any = await MessageDAO.instance.save(req.body);
            res.status(201).send({
                id:data.id
            })
            
    
        }catch(error){
            res.status(500).send(error);
        }
    }

    public async update(req:express.Request, res: express.Response){
        try{
            const MessageId: string = req.params.id;
            const data = await MessageDAO.instance.update(req.body, MessageId);
            res.status(201).json(data)
            

        }catch(error){
            res.status(500).send(error);
        }
    }

    public async delete(req:express.Request, res: express.Response){
        try{
            
            const MessageId: string = req.params.id;


            await MessageDAO.instance.delete(MessageId);
            res.status(201).send({
                id:MessageId
            });

        }catch(error){
            res.status(500).send(error);
        }
    }



}