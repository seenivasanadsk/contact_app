import Dexie from "dexie";

class DB {
    constructor(){
        this.db = new Dexie('Contacts');
        this.db.version(1).stores({List: "++id,name,email,imageUrl,phone"})
    }
    setData = data => {
        this.db.List.bulkAdd(data);
    }
    viewData = (call) => {
        let res = this.db.List.toArray();
        res.then(x => {
            call(x)
        })
    }
    addData = data => {
        this.db.List.add(data);
    }
    updateData = (id,data)=>{
        this.db.List.update(id,data);
    }
    deleteData = id => {
        this.db.List.delete(parseInt(id));
    }
}

export default DB;