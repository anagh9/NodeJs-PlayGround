const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./new.db");

function Dbdetails(tableName,params){
    const table = tableName;
    const {params1,params2,params3} = params;

    const insert = db.serialize((params1,params2,params3)=>{
        db.run(
            `INSERT INTO ${table}(${obj1},${obj2},${obj3})`,
            [params1,params2,params3],
            function(err){
                if(err)
                    return console.log(err.message);
                console.log("Insertion Done");
            }

        )
    });

}
module.exports = { Dbdetails};
