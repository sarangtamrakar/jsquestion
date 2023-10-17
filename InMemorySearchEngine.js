
class inMemorySearch {
    constructor() {
        this.docs = new Map();
    }

    registerNameSpace(nameSpace) {
        this.docs.set(nameSpace, []);
    }

    addDocs(nameSpace, ...docs) {
        // first check it is exits there or not
        try{
            if (this.docs.has(nameSpace)) {
                // get already exiting
                let alreadyExists = this.docs.get(nameSpace);
                this.docs.set(nameSpace, [...alreadyExists, ...docs]);
                return true
            } else {
                this.docs.set(nameSpace, [...docs]);
                return true
            }
        }catch{
            return false;
        }
    }


    search(nameSpace, FilterFn, OrderBy) {
        if (this.docs.has(nameSpace)) {
            let doc = this.docs.get(nameSpace); // []
            let filteredDoc = doc.filter((e) => FilterFn(e));

            if (OrderBy) {
                let { key, asc } = OrderBy;
                let finalSorted = filteredDoc.sort((a, b) => {
                    if (asc) {
                        return a[key] - b[key];
                    } else {
                        return b[key] - a[key];
                    }
                })

                return finalSorted;
            }

            return filteredDoc;



        } else {
            console.log(`${nameSpace} data not found`);
        }

    }

    getAllnamespace() {
        return Array.from(this.docs.keys());
    }
}



let Engine = new inMemorySearch();

Engine.registerNameSpace("sarang1");
Engine.registerNameSpace("sarang2");

let res1 = Engine.addDocs("sarang1",
    { item: "bhindi", price: 20 },
    { item: "began", price: 30 },
    { item: "tamatar", price: 10 },
    { item: "aalu", price: 43 },
)


let res2 = Engine.search("sarang1",(e)=>e.price>=20,{key:"price",asc:false});
console.log(res2);

