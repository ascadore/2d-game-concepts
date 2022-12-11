function play() {
var start=document.getElementById('startscreen')
start.parentNode.removeChild(start)

const game= document.querySelector('canvas')
/*querySelector returns the first element with the specified selector/identifier
*/
const type=game.getContext('2d')

game.width=1024
game.height=576
/*fillrect takes 4 arguments: x and y position, width,height) 
*/
type.fillRect(0,0,game.width,game.height)

const acceleration = 0.6

class Sprite {
    constructor({position,Imagesrc,scale,crop,offset,frame=1,skew={x:0,y:0},direction,framehold=10}) {
    this.position=position
    this.image=new Image()
    this.image.src=Imagesrc
    this.height=this.image.height
    this.width=this.image.width
    this.scale=scale
    this.offset=offset
    this.crop=crop
    this.frame=frame
    this.framehold=framehold
    this.subcount=0
    this.skew=skew
    this.direction=direction
    
    }

    draw() {
        type.drawImage(this.image, 
            this.frame*(this.image.width/this.crop)-(this.image.width/this.crop),
            0,
            this.image.width/(this.crop),
            this.image.height,
            this.position.x+this.skew.x,
            this.position.y+this.skew.y,
            (this.image.width/this.crop)*this.scale,
            (this.image.height)*this.scale)
    }


    update() {
    this.draw()
    {this.subcount++
    if (this.subcount==this.framehold) {
      if (this.frame<this.crop)
       {this.frame++}
      else {this.frame=1}
      this.subcount=0
    }
    else {this.frame=this.crop}

    }}
}

const forest= new Sprite ({  
    position: {x:0,y:0},
    Imagesrc:'sky.png',
    scale: 1,
    crop: 1,
    framehold: 12
})

const shop= new Sprite ({  
    position: {x:660,y:200},
    Imagesrc:'shop_anim.png',
    scale: 3,
    crop: 6
})


class character extends Sprite{
    
   
    
    constructor({dead,weapon_width,position,velocity,color,offset,direction,Imagesrc,scale,crop,frame=1,skew,Sprites,framehold=10})  {
        //this.position=position
        super({
            Imagesrc,
            position,
            scale,
            crop,
            frame,
            skew,
            offset,
            direction,
            
        })
        this.dead=dead
        this.WeaponW=weapon_width
        this.velocity=velocity
        this.color=color
        this.health=462
        this.height=200
        this.width=100
        this.is_attacking=false
        this.framehold=framehold
        this.subcount=0
        this.Sprites=Sprites
       
        

        for (const sprite in this.Sprites) { 
            Sprites[sprite].image=new Image()
            Sprites[sprite].image.src= Sprites[sprite].Imagesrc
            console.log(Sprites[sprite])
            

        }
        
        
        }
    
    
    SwitchSprite (action, speed) {
        if (this.image===this.Sprites.Death.image && this.frame < this.Sprites.Death.crop) {
            if (this.frame===this.crop-1) {this.dead=true 
            console.log(this.dead)
        }
            return
            
        }
          
        
        
        if (this.image===this.Sprites.Attack1.image && this.frame < this.Sprites.Attack1.crop)
        { return}

        if (this.image===this.Sprites.Hurt.image && this.frame < this.Sprites.Hurt.crop)
        { return}

        if (this.image != this.Sprites[action].image) {
        this.image=this.Sprites[action].image
        this.crop=this.Sprites[action].crop
        this.frame=1
        }

        if (this==player) {
        if (speed<0) { this.Sprites.Run.image.src='Run' + 'Left.png',
        this.Sprites.idle.image.src='idle' + 'Left.png',
        this.Sprites.Attack1.image.src='Attack1' + 'Left.png',
        this.Sprites.Jump.image.src='Jump' + 'Left.png',
        this.Sprites.Fall.image.src='Fall' + 'Left.png',
        this.Sprites.Hurt.image.src="./Hurt.png",
        this.Sprites.Death.image.src='DeathLeft.png'
        this.direction=-1}

        else if (speed>0) {this.Sprites.Run.image.src='Run' + '.png',
        this.Sprites.idle.image.src='idle' + '.png',
        this.Sprites.Attack1.image.src='Attack1' + '.png',
        this.Sprites.Jump.image.src='Jump' + '.png',
        this.Sprites.Fall.image.src='Fall' + '.png',
        this.Sprites.Hurt.image.src='./Hurt.png',
        this.Sprites.Death.image.src="Death.png"
        this.direction=1


        }


        }  else if (this==enemy) {if (speed>0)  { this.Sprites.Run.image.src='./Huntress/Sprites/Run.png',
        this.Sprites.idle.image.src='./Huntress/Sprites/idle.png',
        this.Sprites.Attack1.image.src='./Huntress/Sprites/Attack1.png',
        this.Sprites.Jump.image.src='./Huntress/Sprites/Jump.png',
        this.Sprites.Fall.image.src='./Huntress/Sprites/Fall.png',
        this.Sprites.Hurt.image.src="./Huntress/Sprites/Hurt.png",
        this.Sprites.Death.image.src="./Huntress/Sprites/Death.png"
        this.direction=1}

        else if(speed<0){ this.Sprites.Run.image.src='./Huntress/Sprites/RunLeft.png',
        this.Sprites.idle.image.src='./Huntress/Sprites/idleLeft.png',
        this.Sprites.Attack1.image.src='./Huntress/Sprites/Attack1Left.png',
        this.Sprites.Jump.image.src='./Huntress/Sprites/JumpLeft.png',
        this.Sprites.Hurt.image.src='./Huntress/Sprites/HurtLeft.png',
        this.Sprites.Fall.image.src='./Huntress/Sprites/FallLeft.png',
        this.Sprites.Death.image.src="./Huntress/Sprites/DeathLeft.png"
        this.direction=-1

        }

    }


        
    
    }

    update() {
        this.draw()
    if (this.dead==false) {
        this.subcount++
    if (this.subcount==this.framehold) {
      if (this.frame<this.crop)
       {this.frame++}
      else {this.frame=1}
      this.subcount=0
    } }
    if (this.dead==true) {}

   
        
        this.weapon = {
            position: {x: this.position.x+this.offset.x, y: this.position.y+this.offset.y},
            width: this.WeaponW*this.direction,
            height: 50}
        // x position
        this.position.x=this.position.x+this.velocity.x
       

        //y position
        this.position.y=this.position.y+this.velocity.y
        if ( this.position.y+this.height>=game.height) {
             this.velocity.y=0
        } else {this.velocity.y +=acceleration}

    }
    
    hitbox() {
        //designate region across which character will take damage
        //type.fillStyle='orange'
        //type.fillRect(this.position.x+this.offset.x1,this.position.y+this.offset.y1,80,this.image.height)
        
    }

    attackbox() {
     //weapon position 
     setTimeout(()=> {
        this.is_Attacking=false},400)
    
     //type.fillStyle='green'

    
    // type.fillRect((this.weapon.position.x),this.weapon.position.y,this.weapon.width,this.weapon.height) 
     
        }
      
    takeHit () {
        this.health-= 46.2

        if (this==enemy) {
        document.querySelector('#enemyHealth').style.width=this.health
       
        this.SwitchSprite('Hurt') 
    }

        else if (this==player) {
            document.querySelector('#playerHealth').style.width=this.health
            this.SwitchSprite('Hurt') }

    }
     
}


const player = new character({
    weapon_width:250,
    position: {x:0,y:0},
    velocity: {x: 0,y:0},
    health: 100,
    color: 'blue',
    direction: 1,
    offset: {x:500, y:70,x1:460,y1:50},
    Imagesrc: 'idle.png',
    crop: 8,
    scale: 3,
    framehold: 4,
    skew: {x: 200,y:-170},
    dead:false,
    Sprites: { idle: {Imagesrc:'idle.png',crop:8 },
     Run: { Imagesrc:'Run.png',crop: 8},
     Attack1: { Imagesrc:'Attack1.png', crop: 6},
     Jump: { Imagesrc: 'Jump.png', crop: 2},
     Fall: { Imagesrc: 'Fall.png', crop: 2},
     Hurt: {Imagesrc: "./Hurt.png",crop: 4   },
     Death:{Imagesrc: "./Death.png",crop: 6   }
}
    
})


const enemy = new character({
    dead: false,
    weapon_width:180,
    position: {x:300,y:0},
    velocity: {x:0,y:0},
    health: 100,
    color: 'red',
    direction: -1,
    offset: {x:500,y:70,x1:450,y1:70},
    Imagesrc: 'C:/Users/Austin/Desktop/pythonScripts/Huntress/Sprites/Idle.png',
    crop: 8,
    scale: 4,
    framehold: 4,
    skew: {x: 200,y:-192},
    Sprites: { idle: {Imagesrc:'./Huntress/Sprites/Idle.png',crop:8 },
    Run: { Imagesrc:"./Huntress/Sprites/Run.png",crop: 8},
    Attack1: { Imagesrc:"./Huntress/Sprites/Attack1.png", crop: 5},
    Jump: { Imagesrc: "./Huntress/Sprites/Jump.png", crop: 2},
    Fall: { Imagesrc: "./Huntress/Sprites/Fall.png", crop: 2},
    Hurt: {Imagesrc: "./Huntress/Sprites/Hurt.png",crop: 3   },
    Death: {Imagesrc: "./Huntress/Sprites/Death.png",crop: 8 }
}

})

const keys= {
    //player keys
    a: {pressed:false},
    d: {pressed: false},

    //enemy keys
    ArrowRight: {pressed:false},
    ArrowLeft: {pressed:false}

}

function collision (rect1,rect2) {
    const D1=Math.abs((rect1.position.x+rect1.offset.x)-(rect2.position.x+rect2.offset.x1))
    const D3=Math.abs((rect1.position.y+rect1.offset.y)-(rect2.position.y))
    return (D1<Math.abs(rect1.weapon.width) && (rect1.position.y+rect1.offset.y>rect2.position.y) && (rect1.position.y+rect1.offset.y<(rect2.position.y+rect2.image.height)) )
}

var counter=document.getElementById("timer").innerHTML


function determineWinner({player,enemy,timerID}) {
    clearTimeout(timerID)
    if(player.health>enemy.health && document.getElementById("output").innerHTML=='') {
        document.getElementById("output").innerHTML='You win'
        }  
    else if(player.health==enemy.health && document.getElementById("output").innerHTML=='') {
        document.getElementById("output").innerHTML='Tie'
        
    } 
    else if (player.health<enemy.health && document.getElementById("output").innerHTML==''){document.getElementById("output").innerHTML='Youve lost!'
   }
  
}

let timerID
function gameTime() {
if (counter==0) {
    determineWinner({player,enemy,timerID}) }
else if (counter>0) {
  timerID=setTimeout(gameTime,1000)
  counter-=1
  document.getElementById("timer").innerHTML=counter}

}


gameTime()

/*
console.log(Object.getOwnPropertyNames(player.image))
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(player.image)))
console.log(game.height)
console.log(document.getElementById("output").innerHTML)
console.log(player.Sprites)
*/

console.log(player.dead)
console.log(enemy.dead)

function animate() {
    type.fillStyle='black'
    type.fillRect(0,0,game.width,game.height)
    forest.update()
    shop.update()
    //instantiate player with velocity component
   
    player.update()
    //player.attackbox() ---------remove if line114 functions
  
    enemy.update()

    const xf_distance=((player.weapon.position.x)-(enemy.position.x))
    const xb_distance=Math.abs((player.weapon.position.x)-(enemy.position.x+100))
    const y_distance=Math.abs((player.weapon.position.y)-(enemy.position.y))

    //orient players so that theyre always facing eachother
   // if (xf_distance<=0) {player.direction=1, enemy.direction=-1}
    //else {player.direction=-1,enemy.direction=1}
    
    //detect enemy proximity to player weapon
    /*
    if (player.is_attacking==true) {player.attackbox()}
    if (collision({
         rect1: player,
         rect2: enemy
    }) && player.is_attacking==true) {
        player.is_attacking=false
        console.log('player_hits_enemy')
        enemy.health -= 46.2
        document.querySelector('#enemyHealth').style.width=enemy.health
        }
    else {} 
   
    //

    //detect player proximity to enemy weapon
    if (enemy.is_attacking==true) {enemy.attackbox()}
    if ( collision({
        rect1: enemy,
        rect2: player
   })&& enemy.is_attacking==true) {
        enemy.is_attacking=false
        player.health -= 46.2
        document.querySelector('#playerHealth').style.width=player.health} 
    else {} 
    */
    //listen for player input (moving left or right)
    //console.log(collision(player,enemy))
    //console.log(Math.abs((player.weapon.position.x)-(enemy.position.x+enemy.offset.x1)))
    //console.log(Math.abs((player.position.y+player.offset.y)-(enemy.position.y)))


    if (player.is_Attacking==true && collision(player,enemy)) {player.SwitchSprite('Attack1')
    player.attackbox()
    player.hitbox()
    //enemy.hitbox()
    enemy.takeHit()
    player.is_Attacking=false

  
    if (player.velocity.y==0){
        if (keys.a.pressed==true & keys.d.pressed==false) {
            player.velocity.x=-5
            player.SwitchSprite('Attack1',player.velocity.x)
            
        }else if (keys.d.pressed==true & keys.a.pressed==false) { 
            player.velocity.x=5
            player.SwitchSprite('Attack1',player.velocity.x)
          
        } else if (keys.d.pressed && keys.a.pressed) {
            player.velocity.x=0
            player.SwitchSprite('Attack1')
            
        }else {player.velocity.x=0}
        } else if(player.velocity.y<0){
            if (keys.a.pressed==true & keys.d.pressed==false) {
                player.velocity.x=-5
                player.SwitchSprite('Attack1',player.velocity.x)
            }else if (keys.d.pressed==true & keys.a.pressed==false) { 
                player.velocity.x=5
                player.SwitchSprite('Attack1',player.velocity.x)
            } else if (keys.d.pressed && keys.a.pressed) {
                player.velocity.x=0
                
            }else {player.velocity.x=0}
             
        } else if(player.velocity.y>0){
            if (keys.a.pressed==true & keys.d.pressed==false) {
                player.velocity.x=-5
                player.SwitchSprite('Attack1',player.velocity.x)
             
            }else if (keys.d.pressed==true & keys.a.pressed==false) { 
                player.velocity.x=5
                player.SwitchSprite('Attack1',player.velocity.x)
            
            } else if (keys.d.pressed && keys.a.pressed) {
                player.velocity.x=0
                player.SwitchSprite('Attack1',player.velocity.x)
            
            }else {player.velocity.x=0} 
        }

} else if (player.is_Attacking==true && collision(player,enemy)==false) {player.SwitchSprite('Attack1')
player.attackbox()
player.hitbox()
//enemy.hitbox()
if (player.velocity.y==0){
    if (keys.a.pressed==true & keys.d.pressed==false) {
        player.velocity.x=-5
        player.SwitchSprite('Attack1',player.velocity.x)
        
    }else if (keys.d.pressed==true & keys.a.pressed==false) { 
        player.velocity.x=5
        player.SwitchSprite('Attack1',player.velocity.x)
      
    } else if (keys.d.pressed && keys.a.pressed) {
        player.velocity.x=0
        player.SwitchSprite('Attack1')
        
    }else {player.velocity.x=0}
    } else if(player.velocity.y<0){
        if (keys.a.pressed==true & keys.d.pressed==false) {
            player.velocity.x=-5
            player.SwitchSprite('Attack1',player.velocity.x)
        }else if (keys.d.pressed==true & keys.a.pressed==false) { 
            player.velocity.x=5
            player.SwitchSprite('Attack1',player.velocity.x)
        } else if (keys.d.pressed && keys.a.pressed) {
            player.velocity.x=0
            
        }else {player.velocity.x=0}
         
    } else if(player.velocity.y>0){
        if (keys.a.pressed==true & keys.d.pressed==false) {
            player.velocity.x=-5
            player.SwitchSprite('Attack1',player.velocity.x)
         
        }else if (keys.d.pressed==true & keys.a.pressed==false) { 
            player.velocity.x=5
            player.SwitchSprite('Attack1',player.velocity.x)
        
        } else if (keys.d.pressed && keys.a.pressed) {
            player.velocity.x=0
            player.SwitchSprite('Attack1',player.velocity.x)
        
        }else {player.velocity.x=0} 
    }

} 

else {
    if (player.velocity.y==0){
    if (keys.a.pressed==true & keys.d.pressed==false) {
        player.velocity.x=-5
        player.SwitchSprite('Run',player.velocity.x)
        
    }else if (keys.d.pressed==true & keys.a.pressed==false) { 
        player.velocity.x=5
        player.SwitchSprite('Run',player.velocity.x)
      
    } else if (keys.d.pressed && keys.a.pressed) {
        player.velocity.x=0
        player.SwitchSprite('idle')
    }else {player.velocity.x=0
        player.SwitchSprite('idle')}
    } else if(player.velocity.y<0){
        player.SwitchSprite('Jump')
        if (keys.a.pressed==true & keys.d.pressed==false) {
            player.velocity.x=-5
            player.SwitchSprite('Jump',player.velocity.x)
        
        }else if (keys.d.pressed==true & keys.a.pressed==false) { 
            player.velocity.x=5
            player.SwitchSprite('Jump',player.velocity.x)
        
        } else if (keys.d.pressed && keys.a.pressed) {
            player.velocity.x=0
        
        }else {player.velocity.x=0}
         
    } else if(player.velocity.y>0){
        player.image=player.Sprites.Fall.image
        player.crop=player.Sprites.Fall.crop
        if (keys.a.pressed==true & keys.d.pressed==false) {
            player.velocity.x=-5
            player.SwitchSprite('Fall',player.velocity.x)
        }else if (keys.d.pressed==true & keys.a.pressed==false) { 
            player.velocity.x=5
            player.SwitchSprite('Fall',player.velocity.x)
        } else if (keys.d.pressed && keys.a.pressed) {
            player.velocity.x=0
        
        }else {player.velocity.x=0} 
    }
}
    //(moving up or Fall )
   


    //listen for enemy input
    if (enemy.is_Attacking==true) {enemy.SwitchSprite('Attack1')
    enemy.attackbox()
    enemy.hitbox()
    player.hitbox()

    if (collision(enemy,player)) {
    player.takeHit()
    enemy.is_Attacking=false
    } 

    if (enemy.velocity.y==0){
        if (keys.ArrowLeft.pressed==true & keys.ArrowRight.pressed==false) {
            enemy.velocity.x=-5
            enemy.SwitchSprite('Attack1',enemy.velocity.x)
            
            
        }else if (keys.ArrowRight.pressed==true & keys.ArrowLeft.pressed==false) { 
            enemy.velocity.x=5
            enemy.SwitchSprite('Attack1',enemy.velocity.x)
            
          
        } else if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
            enemy.velocity.x=0
            
        }else {enemy.velocity.x=0}
        } else if(enemy.velocity.y<0){
            if (keys.ArrowLeft.pressed==true & keys.ArrowRight.pressed==false) {
                enemy.velocity.x=-5
                enemy.SwitchSprite('Attack1',enemy.velocity.x)
            
            }else if (keys.ArrowRight.pressed==true & keys.ArrowLeft.pressed==false) { 
                enemy.velocity.x=5
                enemy.SwitchSprite('Attack1',enemy.velocity.x)

            
            } else if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
                enemy.velocity.x=0
            
            }else {enemy.velocity.x=0}
             
        } else if(enemy.velocity.y>0){
            if (keys.ArrowLeft.pressed==true & keys.ArrowRight.pressed==false) {
                enemy.velocity.x=-5
                enemy.SwitchSprite('Attack1',enemy.velocity.x)
            
            }else if (keys.ArrowRight.pressed==true & keys.ArrowLeft.pressed==false) { 
                enemy.velocity.x=5
                enemy.SwitchSprite('Attack1',enemy.velocity.x)
            
            } else if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
                enemy.velocity.x=0
            
            }else {enemy.velocity.x=0} 
        }

} else {
    if (enemy.velocity.y==0){
    if (keys.ArrowLeft.pressed==true & keys.ArrowRight.pressed==false) {
        enemy.velocity.x=-5
        enemy.SwitchSprite('Run',enemy.velocity.x)
        
    }else if (keys.ArrowRight.pressed==true & keys.ArrowLeft.pressed==false) { 
        enemy.velocity.x=5
        enemy.SwitchSprite('Run',enemy.velocity.x)
      
    } else if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
        enemy.velocity.x=0
        enemy.SwitchSprite('idle')
    }else {enemy.velocity.x=0
        enemy.SwitchSprite('idle')}
    } else if(enemy.velocity.y<0){
        enemy.SwitchSprite('Jump')
        if (keys.ArrowLeft.pressed==true & keys.ArrowRight.pressed==false) {
            enemy.velocity.x=-5
            enemy.SwitchSprite('Jump',enemy.velocity.x)
            
        
        }else if (keys.ArrowRight.pressed==true & keys.ArrowLeft.pressed==false) { 
            enemy.velocity.x=5
            enemy.SwitchSprite('Jump',enemy.velocity.x)
        
        } else if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
            enemy.velocity.x=0
        
        }else {enemy.velocity.x=0}
         
    } else if(enemy.velocity.y>0){
        enemy.image=enemy.Sprites.Fall.image
        enemy.crop=enemy.Sprites.Fall.crop
        if (keys.ArrowLeft.pressed==true & keys.ArrowRight.pressed==false) {
            enemy.velocity.x=-5
            enemy.SwitchSprite('Fall',enemy.velocity.x)
        
        }else if (keys.ArrowRight.pressed==true & keys.ArrowLeft.pressed==false) { 
            enemy.velocity.x=5
            enemy.SwitchSprite('Fall',enemy.velocity.x)
        } else if (keys.ArrowLeft.pressed && keys.ArrowRight.pressed) {
            enemy.velocity.x=0
        
        }else {enemy.velocity.x=0} 
    }
}

    
    if (player.health<=0) {
        determineWinner({player,enemy,timerID})
        player.SwitchSprite('Death')
   
        console.log(player.dead)
        console.log(player.frame)
        console.log(player.crop)

        
        
        
    } else if (enemy.health<=0) {
        determineWinner({player,enemy,timerID})
        enemy.SwitchSprite('Death')
        
    }
    
  

    window.requestAnimationFrame(animate)
}

animate()

window.addEventListener('keydown', (event) =>{
    //console.log(event.key)
    
    //player event listeners
    switch (event.key) {
        case 'd':
            if (player.dead) {keys.d.pressed=false}
            else {
            keys.d.pressed=true}
            break;
        case 'a':
            if (player.dead) {keys.a.pressed=false}
            else {keys.a.pressed=true}
            break;
        case 'w':
            if (player.dead) {player.velocity.y=0}
            else{
            player.velocity.y=-15}
        default:
            break;
        case 's':
            if (player.dead) {player.is_Attacking=false}
            else{player.is_Attacking=true}
            break;

    // enemy event listeners 
       case 'ArrowUp':
            if (enemy.dead) {enemy.velocity.y=0}
            else {
            enemy.velocity.y=-15}
            break;
       case "ArrowRight":
            if (enemy.dead) {keys.ArrowRight.pressed=false}
            else {keys.ArrowRight.pressed=true}
            break; 
       case "ArrowDown":
            if (enemy.dead) {enemy.is_Attacking=false}
            else {enemy.is_Attacking=true}
            break;
       case "ArrowLeft":
            if (enemy.dead) {keys.ArrowLeft.pressed=false}
            else {keys.ArrowLeft.pressed=true}
            break;
    }
})

window.addEventListener('keyup', (event) =>{
    //console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed=false
            break;
        case 'a':
            keys.a.pressed=false

            break;
        
        case 'w':
            player.velocity.y=0
        default:
            break;

         // enemy event listeners 
       case 'ArrowUp':
            enemy.velocity.y=0
            break;
       case "ArrowRight":
             keys.ArrowRight.pressed=false
             break; 
       case "ArrowLeft":
             keys.ArrowLeft.pressed=false
             break;
    }
})

//left off at 2:35:10
//error on line 120
}