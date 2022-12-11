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

class character {
    constructor({position,velocity,color,health,offset,direction})  {
        this.position=position
        this.velocity=velocity
        this.color=color
        this.health=health
        this.height=200
        this.width=100
        this.is_attacking=false
        this.offset=offset
        this.direction=direction
        }
        
    
    //generate healthbars for enemy and player
    healthbar1() {
       type.fillstyle='red'
       type.fillRect(0,0,200,50)
    }

    healthbar2() {
        type.fillStyle='red'
        type.fillRect(824,0,200,50)
    }

    update() {
        this.weapon = {
            position: this.position,
            width: 200*this.direction,
            height: 50}

        type.fillStyle=this.color
        type.fillRect(this.position.x,this.position.y,this.width,this.height)
        // x position
        this.position.x=this.position.x+this.velocity.x
       

        //y position
        this.position.y=this.position.y+this.velocity.y
        if ( this.position.y+this.height>=game.height) {
             this.velocity.y=0
        } else {this.velocity.y +=acceleration}

    }
    
    attackbox() {
     //weapon position 
     setTimeout(()=> {
        this.is_attacking=false},100)
     type.fillStyle='green'
     type.fillRect(this.weapon.position.x+this.offset,this.weapon.position.y,this.weapon.width,this.weapon.height)

        }
      
     s
}


const player = new character({
    position: {x:0,y:0},
    velocity: {x: 0,y:0},
    health: 100,
    color: 'blue',
    direction: 1,
    offset: 0
    
})


const enemy = new character({
    position: {x:500,y:0},
    velocity: {x:0,y:0},
    health: 100,
    color: 'red',
    direction: -1,
    offset: 100

   

})

const keys= {
    //player keys
    a: {pressed:false},
    d: {pressed: false},

    //enemy keys
    ArrowRight: {pressed:false},
    ArrowLeft: {pressed:false}

}

//function collision ()


function animate() {
  
    //console.log((enemy.weapon.width))
    type.fillStyle='black'
    type.fillRect(0,0,game.width,game.height)
    //instantiate player with velocity component
    player.update()
    //player.attackbox() ---------remove if line114 functions
    player.healthbar1()
    enemy.update()
    enemy.healthbar2()
    
    //detect enemy proximity to player weapon
    const xf_distance=((player.weapon.position.x)-(enemy.position.x))
    const xb_distance=Math.abs((player.weapon.position.x)-(enemy.position.x+100))
    const y_distance=Math.abs((player.weapon.position.y)-(enemy.position.y))
    console.log(xf_distance)
    console.log(player.position.x)
    if (player.is_attacking==true) {player.attackbox(),console.log(player.position.x),
    console.log('is ')}
    if (xf_distance>=-200 && xf_distance<=100 && y_distance<=50 && player.is_attacking==true) {
        console.log('player_hits_enemy')
        }
    else {console.log('')} 

    //

    //detect player proximity to enemy weapon
    if (enemy.is_attacking==true) {enemy.attackbox()}
    if (xf_distance<=200 && xf_distance>=-100 && y_distance<=50 && enemy.is_attacking==true) {
        console.log('enemy hits player')}
    else {console.log(' ')} 

    //listen for player input
    if (keys.a.pressed==true & keys.d.pressed==false) { 
        player.velocity.x=-5
    }else if (keys.d.pressed==true & keys.a.pressed==false) { 
        player.velocity.x=5
    } else if (keys.d.pressed && keys.a.pressed) {
        player.velocity.x=0
    }else {player.velocity.x=0}

    //listen for enemy input
    if (keys.ArrowRight.pressed==true & keys.ArrowLeft.pressed==false) { 
        enemy.velocity.x=5
    }else if (keys.ArrowLeft.pressed==true & keys.ArrowRight.pressed==false) { 
        enemy.velocity.x=-5
    } else if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
        enemy.velocity.x=0
    }else {enemy.velocity.x=0}

    

    

    window.requestAnimationFrame(animate)
}

animate()

window.addEventListener('keydown', (event) =>{
    console.log(event.key)
    
    //player event listeners
    switch (event.key) {
        case 'd':
            keys.d.pressed=true
            break;
        case 'a':
            keys.a.pressed=true

            break;
        case 'w':
            player.velocity.y=-15
        default:
            break;
        case 'v':
            player.is_attacking=true
            break;

    // enemy event listeners 
       case 'ArrowUp':
            enemy.velocity.y=-15
            break;
       case "ArrowRight":
            keys.ArrowRight.pressed=true
            break; 
       case "p":
            enemy.is_attacking=true
            break;
       case "ArrowLeft":
            keys.ArrowLeft.pressed=true
            break;
    }
})

window.addEventListener('keyup', (event) =>{
    console.log(event.key)
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

//left off at 108:10