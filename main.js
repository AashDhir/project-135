status="";
objects=[];

function setup(){
    canvas=createCanvas(500, 500)
    canvas.center()
    video= createCapture(VIDEO)
    video.hide()
}

function draw(){
    image(video,0,0, 500,500)
    if(status!=""){
        object_detector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            fill("aquamarine");
            noFill();
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(objects[i].label == object_name){
                video.stop(); 
                object_detector.detect(gotResult)
                document.getElementById("idk").innerHTML= object_name+" found!";
                synt=window.speechSynthesis;
                utter_this=new SpeechSynthesisUtterance(object_name+"found!");
                synt.speak(utter_this);
            }
            else{
                document.getElementById("idk").innerHTML= object_name+" not found!";
            }
        }
    }
}

function Start(){
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stat").innerHTML= "Status: Detecting objects";
    object_name= document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model is Loaded!");
    status= true;
}

function gotResult(error,results){
if(error){
console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}