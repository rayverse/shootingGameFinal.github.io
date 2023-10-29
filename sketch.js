var bgimg
var gameState = "wait"
var play, sound, mute, player
var playerimg
var pellets = []
var enemies = []
var crash = []
var playButton
var score1 = 0
var enemy1, enemy2, enemy3
var enemy1img, enemy2img, enemy3img, ground, bglevel1


function preload() {
    bgimg = loadImage("assets/bgimg.gif")
    bglevel1 = loadImage("assets/bgfin.jpg")
    playerimg = loadImage("assets/playerM.png")
    enemy1img = loadImage("assets/enemy1.png")
    enemy2img = loadImage("assets/enemy2.png")
    enemy3img = loadImage("assets/enemy3.png")

    pellets = loadImage("assets/pellet.png")
    crash = loadAnimation("assets/crash1.png", "assets/crash2.png", "assets/crash3.png", "assets/crash4.png")
    // playButton=loadImage("assets/play_button.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playButton = createImg("assets/play_button.png")
    playButton.position(width / 2 - 120, height - 230)
    playButton.size(300, 300)

    // ground = createSprite(width / 2, height - 130, width, 20)
    // ground.visible = false

    player = new Player()
    enemies=new Enemy()

}

function draw() {


    if (gameState == "wait") {
        background(bgimg)

    }

    playButton.mousePressed(() => {
        playButton.hide()
        gameState = "about"
    })


    if (gameState == "about") {

        popabout()
    }


    if (gameState == "level1") {
        background(bglevel1)


        player.show()
        player.move()
        enemies.show()
        enemies.move()

        // if(enemies.x>=width-50){
        // enemies.velocityX=-2}
        // elseIf(enemies.x>=10 && enemies.x<=width-50)
        // {
        //     enemies.velocityX=2}
        enemies.velocityX=2
    }



    drawSprites()
}


class Player {
    constructor() {
        this.x = width / 2
        this.y = height -150
        playerimg = loadImage("assets/playerM.png")

    }


    move() {
        if (keyIsDown(LEFT_ARROW) && this.x > 0) {
            this.x -= 5
        }

        if (keyIsDown(RIGHT_ARROW) && this.x < width) {
            this.x += 5
        }

        if (keyIsDown(SPACE) && this.x < width) {
            image(pellets,this.position.x,this.position.y,100,100)
        }
    }

    show() {
        fill(0, 0, 255)
        image(playerimg,this.x-100, this.y-150,200,250)
    }
}

class Enemy {
    constructor() {
        this.x = width / 2
        this.y = height/4
        enemy1img = loadImage("assets/enemy1.png")
        enemy2img = loadImage("assets/enemy2.png")
        enemy3img = loadImage("assets/enemy3.png")
    }

    show() {
        fill(0, 0, 255)
        image(enemy1img,this.x-200, this.y-200,200,200)
    }

    
    move(){
this.x +=5

//    if(this.x<=width){
//     this.x -=5}
         if(this.x>=10 && this.x<=width-50)
        {   
            this.x +=5
        }
            if(this.x>=width){
                this.x =50}
         
    }
    
  
    
}

function popabout() {
    swal({
        title: "Combat!!",
        text: "To win!! defeat the enemy starships and move a level UP!!",
        imageUrl: crash,
        imageSize: "200x200",
        confirmButtonText: "START ",
        confirmButtonColor: "green"

    },
        function () {
            gameState = "level1"
        })


}