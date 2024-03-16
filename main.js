song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
x = "";

function preload(){
    song1 = loadSound("Husn - Anuv Jain.mp3");
    song2 = loadSound("295 Moosetape.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
    
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    

    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 10);
        song2.stop();
        if(song1.isPlaying()){
            song1.play();
            document.getElementById("song").innerHTML = "Husn song is playing";       
        }
    }
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist = " + rightWristX + " rightWristY = " + rightWristY);
    }
}