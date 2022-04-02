img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage('background.jpg');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}



function modelLoaded()
{
    console.log("model is loaded");
    status = true;
    objectDetector.detect(video, gotResult); 
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);    
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0, 0, 380, 380);
    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: object detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects of detected are" + objects.length
            fill("#000000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            textSize(16);
            noFill();
            stroke("#000000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        }
    }
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);    
    }
    console.log(results);
    objects = results;
}
