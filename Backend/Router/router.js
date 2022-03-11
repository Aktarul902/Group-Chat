function router(app){
         app.get("/",(req,res)=>{
             res.sendFile(__dirname+"./Frontend/index")
         })
}
module.exports = router