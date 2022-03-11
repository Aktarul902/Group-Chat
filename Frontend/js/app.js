const socket = io()
const textarea = document.querySelector("#textarea");
const massagearea = document.querySelector(".message__area");
var audio = new Audio("/js/tone.mp3")
let user;
do{
   user = prompt("Please Enter Your Name");
}while(!user)
socket.emit("new_user",user)
socket.on("newuser",(newuser)=>{
    const usermsg = document.createElement("div")
    usermsg.classList.add("message","outgoing")
    usermsg.innerHTML=`
    <h4>${newuser}</h4>
    <p>Joined the chat </p>
    `
    massagearea.appendChild(usermsg)
})
socket.on("leftuser",(leftuser)=>{
    const usermsg = document.createElement("div")
    usermsg.classList.add("message","outgoing")
    usermsg.innerHTML=`
    <h4>${leftuser}</h4>
    <p>Left the chat </p>
    `
    massagearea.appendChild(usermsg)
})
console.log(user)
textarea.addEventListener("keyup",(e)=>{
    console.log(e)
    if(e.key==="Enter"){
        sendmassage(e.target.value)
    }
})
function sendmassage(msg){
    textarea.value =""
    let massage = {
        name:user,
        massage:msg
    }
    appendmassage(massage,"outgoing")
    socket.emit("msg",massage)

}
function appendmassage(msg,type){
    const usermsg = document.createElement("div")
    usermsg.classList.add("message",type)
    usermsg.innerHTML=`
    <h4>${msg.name}</h4>
    <p>${msg.massage}</p>
    `
    massagearea.appendChild(usermsg)

}
socket.on("usermsg",massage=>{
    appendmassage(massage,"incoming")
})