class Batery{
    constructor(energy){
        this.energy=energy;
    }

    getEnergy(){
        return this.energy;
    }

    decreaseEnergy(){
        if(this.energy>0){
            this.energy--;
        }
    }
    increaseEnergy(){
        this.energy++;
    }
}

class Mobile{
    constructor(batery){
        this.batery=batery;
        this.inbox=[];
        this.outbox=[];
    }

    getBateryInfo(){
        return this.batery.getEnergy();
    }
    charge(){
        this.batery.increaseEnergy();
    }
    setScreen(screen){
        this.screen=screen;
    }
    checkStatus(){
        if(this.status){
            return 'on';
        }
        else{
            return 'off';
        }
    }
    sendMessage(){
        this.outbox.push(this.screen);
        return this.screen;
    }
    getMessage(mesage){
        this.inbox.push(mesage);
    }
    displayInbox(){
        return this.inbox;
    }
    displayOutbox(){
        return this.outbox;
    }
    turnOn(){
        this.status=true;
    }
    turnOff(){
        this.status=false;
    }
}

let count=0;
// let screen=document.getElementById('screen').value;
let batery=new Batery(100);
let Nokia=new Mobile(batery);
let Iphone= new Mobile(batery);
// document.write(Nokia.getBateryInfo());

Nokia.turnOn();
Iphone.turnOn();
function getBatery(phone,idBatery){
    document.getElementById(idBatery).innerHTML=phone.getBateryInfo()+"%";
}
getBatery(Nokia,'batery1');
getBatery(Iphone,'batery2');

function send(phone1,phone2,i,j){
    let screen=document.getElementById('text'+i);
    phone1.setScreen(screen.value);
    let message=phone1.sendMessage();
    phone2.getMessage(message);
    screen.value='';
    count++;
    document.getElementById('count'+j).style.display='block';
    document.getElementById('count'+j).innerHTML=count;
    phone1.batery.decreaseEnergy();
    getBatery(phone1,'batery'+i);
    let html='<audio autoplay><source src="./mp3/SMSIPhoneRingtone.mp3"></audio>';
    document.getElementById('music').innerHTML=html;
}

function On_Off(phone,i){
    if(phone.checkStatus()=='on'){
        // document.getElementById('main-screen').style.display='hidden'; 
        phone.turnOff();
        document.getElementById('screen'+i).style.backgroundColor='black';
        document.getElementById('screen'+i).style.cursor='not-allowed';
       return;
    //    document.getElementById('main-screen').style.display='block'; 
    }
    if(phone.checkStatus()=='off'){
       phone.turnOn();
       document.getElementById('screen'+i).style.backgroundColor='white';
       document.getElementById('screen'+i).style.cursor='pointer';
       return;
    }
}

function display_textingScreen(phone,i){
    document.getElementById('main-screen'+i).style.display='none';
    document.getElementById('texting-screen'+i).style.display='block';
    phone.batery.decreaseEnergy();
    getBatery(phone,'batery'+i);
}

function display_inbox(phone,i){
    document.getElementById('main-screen'+i).style.display='none';
    document.getElementById('inbox-screen'+i).style.display='table';
    html='';
    arr=phone.displayInbox();
    for(let i=0;i<arr.length;i++){
        html+='<tr>';
        html+='<td>';
        html+=arr[i];
        html+='</td>';
        html+='</tr>';
    }
    document.getElementById('content-inbox'+i).innerHTML=html;
    count=0;
    document.getElementById('count'+i).style.display='none';
    phone.batery.decreaseEnergy();
    getBatery(phone,'batery'+i);
}

function display_outbox(phone,i){
    document.getElementById('main-screen'+i).style.display='none';
    document.getElementById('outbox-screen'+i).style.display='table';
    html='';
    arr=phone.displayOutbox();
    for(let i=0;i<arr.length;i++){
        html+='<tr>';
        html+='<td>';
        html+=arr[i];
        html+='</td>';
        html+='</tr>';
    }
    document.getElementById('content-outbox'+i).innerHTML=html;
    phone.batery.decreaseEnergy();
    getBatery(phone,'batery'+i);
}

function return_mainMenu(screen,i){
    document.getElementById('main-screen'+i).style.display='table';
    document.getElementById(screen).style.display='none';
}
