import { connectDb } from "./src/db/index.js";
import app from "./app.js";

connectDb()
.then(()=>{
    app.on("error",function(error){
        console.log("error on setting server "+ error);
    })

    app.listen(3000,function(){
        console.log("server started");
    })
})