
var bgimg, splash
var gameState = "wait"
var goteggimg, eggimg, eggmissedimg, playbutton, nextbutton, eggsGroup,bombimg
var score = 0
var lostscore = 0
var score1 = 0
var lostscore1 = 0
var bomb,bombsGroup ,bgmusic,got,lost


function preload() {

   splash = loadImage("assets/bgimg.gif")
//    goteggimg = loadImage("assets/gotegg.png")
   eggimg = loadImage("assets/joanna-casaje-fantasyicons-moneybags-bag01-removebg-preview.png")
   eggmissedimg = loadImage("assets/ezgif.com-resize.gif")
   bgimg = loadImage("assets/bgfin.jpg")
   basketimg = loadImage("assets/playerM.png")
   birdimg = loadImage("assets/enemy1.png")
   bombimg=loadImage("assets/pellet.png")
   bgmusic=loadSound("assets/laser-gun-shot.wav")
 





}



function setup() {
    createCanvas(windowWidth, windowHeight)
 
    playbutton = createImg("assets/play_button.png")
    playbutton.position(width / 2 - 120, height - 230)
    playbutton.size(300, 300)
 
 
    // invisible ground to collide the player
    invisibleGround = createSprite(width / 2, height - 10, width, 20)
    invisibleGround.visible = false
 
    basket = createSprite(70, height - 100)
    basket.addImage("basket", basketimg)
    // basket.debug=true
    basket.setCollider("circle", 0, -2, 40)
    basket.scale=0.3
    // basket.addImage("got", goteggimg)
    basket.visible = false
 
 
    bird = createSprite(width / 2, 100)
    bird.addImage(birdimg)
    bird.visible = false
    bird.velocityX = 4
    bird.scale=0.4
 
    eggsGroup = new Group()
    bombsGroup= new Group()
 
 
 bgmusic.setVolume(0.1)

 bgmusic.play()
 }
 
 function draw() {
 
    if (!bgmusic.isPlaying()) {
 bgmusic.play()
 
       
    }
    if (gameState == "wait") {
       playbutton.show()
       background(splash)
    }
 
    basket.collide(invisibleGround)
    playbutton.mousePressed(() => {
       playbutton.hide()
       gameState = "about"
    })
 
    if (gameState == "about") {
 
       popabout()
    }
 
    if (bird.x > width) {
       bird.x = 50
    }
 
 
 
    if (gameState == "level1") {
       background(bgimg)
    //    ground.visible = true
       basket.visible = true
       bird.visible = true

 
       movememt()
       layeggs()
 
       for (i = 0; i < eggsGroup.length; i++) {
          if (basket.isTouching(eggsGroup.get(i))) {
             // basket.changeImage("got")
             eggsGroup.get(i).remove()
             console.log("got it")
             score += 5
 // got.play()
          }
 
          if (invisibleGround.isTouching(eggsGroup.get(i))) {
             // basket.changeImage("got")
             eggsGroup.get(i).changeImage("missed")
             // eggsGroup.get(i).remove()
             console.log("got it")
             // lost.play()
             if(score>=5 && invisibleGround.isTouching(eggsGroup.get(i))){
             lostscore1 = score-2
             // score -=2
          }
 
          }
        }
 
 
 
        if(score>=10  ){
          level1won()
          
       //  got.play()
        }
       }
 
 
 if(gameState=="level2"){
    background(bgimg)
    // ground.visible = true
    basket.visible = true
    bird.visible = true

 
    movememt()
    layeggslevel2()
 
 
    for (i = 0; i < eggsGroup.length; i++) {
       if (basket.isTouching(eggsGroup.get(i))) {
          // basket.changeImage("got")
          eggsGroup.get(i).remove()
          console.log("got it")
          score1 += 5
 
       }
 
      }
     for (i = 0; i < bombsGroup.length; i++) {
       if (basket.isTouching(bombsGroup.get(i))) {
          // basket.changeImage("got")
          bombsGroup.get(i).remove()
          console.log("lost")
      gameState="over"
 
       }
    }
 
     if(score1>=30  ){
       level2won()
     
     }
 
 }
    drawSprites()
 
 
    if (gameState == "level1") {
       fill("darkgreen")
       stroke("yellow")
       strokeWeight(4)
       textSize(20)
       text("SCORE : " + score, width/2, 50)
       text("LEVEL 1", 100, 50)
       // text("BROKEN EGGS : " + lostscore, width -200, 50)
    }
 
    if (gameState == "level2") {
       fill("darkgreen")
       stroke("yellow")
       strokeWeight(4)
       textSize(20)
       text("SCORE : " + score1, width/2, 50)
       text("LEVEL 2", 100, 50)
       // text("LIFE : " + lostscore, width -200, 50)
    }
 
 
 if(gameState=="over")
 {
    eggsGroup.destroyEach()
    bombsGroup.destroyEach()
    bird.visible=false
 gameOver()
 
 
 }
 
 }
function popabout() {
   swal({
      title: "You are in a WARZONE \n Aim of the Game is to Collect the RELIEF FUND!!",
      text: "To win!! collect maximum fund and avoid being HIT!",
      imageUrl: "assets/playerM.png",
      imageSize: "200x200",
      confirmButtonText: "START ",
      confirmButtonColor: "green"

   },
      function () {
         gameState = "level1"
      })


}
 
function level1won() {
       swal({
          title: "You collected Enough RELIEF FUND !!",
           text: "To win!! collect more Money \nBUT \n BEWARE of being HIT!!",
          imageUrl: "assets/joanna-casaje-fantasyicons-moneybags-bag01-removebg-preview.png",
          imageSize: "200x200",
          confirmButtonText: "LEVEL 2 ",
          confirmButtonColor: "green"
    
       },
          function () {
             gameState = "level2"
          })
    
    
    }
 
 
function level2won() {
   swal({
      title: "You are a PRO!!",
       text: "You have collected ENOUGH MONEY to save the People!!",
      imageUrl: "assets/thumbs_up-removebg-preview.png",
      imageSize: "200x200",
      confirmButtonText: "RESTART ",
      confirmButtonColor: "green"

   },
      function () {
         window.location.reload();
      })


}
 
 
 function gameOver() {
    swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        imageUrl: "assets/thumbsdown-removebg-preview.png",
        imageSize: "100x100",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Replay'
    },
 
        function () {
 
            window.location.reload();
        }
    );
 }
 // movememt
 function movememt() {
 
    if (keyDown("RIGHT_ARROW")) {
       basket.x += 8
    }
    if (keyDown("LEFT_ARROW")) {
       basket.x -= 5
    }
 
    if (basket.x < 10) {
       basket.x = 70
    }
 
    if (basket.x > width) {
       basket.x = width - 70
 
    }
 

 
 }
 function layeggs() {
    if (frameCount % 60 == 0) {
       egg = createSprite(bird.x, bird.y)
       egg.addImage("egg", eggimg)
       egg.addImage("missed", eggmissedimg)
       egg.visible = false
       egg.scale = 0.2
       basket.x -= 2
       // egg.x = bird.x
       egg.visible = true
       egg.velocityY = 4
       bird.depth = egg.depth
       egg.depth = 1
 
       eggsGroup.add(egg)
 
    }
 
 }
 
 
 
 function layeggslevel2() {
 
    var randobject = Math.round(random(1, 2))
    basket.x -= 2
    switch (randobject) {
 
       case 1:
          if (frameCount % 60 == 0) {
             egg = createSprite(bird.x, bird.y)
             egg.addImage("egg", eggimg)
             egg.addImage("missed", eggmissedimg)
             egg.visible = false
             egg.scale = 0.2
          
             // egg.x = bird.x
             egg.visible = true
             egg.velocityY = 4
             bird.depth = egg.depth
             egg.depth = 1
             eggsGroup.add(egg)
 
          }
 
             break
 
 
       case 2:
          if (frameCount % 90 == 0) {
             bomb = createSprite(bird.x, bird.y)
             bomb.addImage("bomb", bombimg)
             // bomb.addImage("missed", eggmissedimg)
             bomb.visible = false
             bomb.scale = 0.4
            
             // egg.x = bird.x
             bomb.visible = true
             bomb.velocityY = 4
             bird.depth = bomb.depth
             bomb.depth = 1
 
             bombsGroup.add(bomb)
 
          }
             break;
 
 
 default: break;
 
          
       }
 
    
    }
 
 
