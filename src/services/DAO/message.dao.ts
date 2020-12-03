import { Select,Insert,Update,Delete, SelectOne } from "./connection";


export class MessageDAO {
    private collectionName = "messages";
    private static _instance: MessageDAO;
    public static get instance() {
        if (!this._instance) {
            this._instance = new MessageDAO();
        }
        return this._instance;
    }
    public all() {
        return Select(this.collectionName);
    }

    public getOne(params:string) {
        return SelectOne(this.collectionName,params);
    }
    
    public save(data: MessageModel ){
        return Insert(this.collectionName, data);
    }


    public update(data: MessageModel, params: string ){
        return Update(this.collectionName,params, (data as any));
    }

    public delete(params:string){
        return Delete(this.collectionName,params);
    }


}