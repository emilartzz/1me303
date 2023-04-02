class Player extends rune.display.Sprite {

  constructor(playerID = 0) {
    super(20, 20, 32, 32, "character");
    this.m_buttons = [];
    this.m_gamepad = null;
    this.m_gamepads = Array();
    this.m_playerID = playerID || 0;
    this.m_speed = .5;
    this.m_currentRoom = null;
  }

  init() {
    super.init();
    this.characterAnimation();
    this.m_initGamepad();

    const text = new rune.text.BitmapField(this.m_playerID.toString());
    text.autoSize = true;
    this.addChild(text);


  }

  update(step) {
    super.update(step);
    this.updateInput(step);
  }

  m_initGamepad() {
    if (this.m_gamepad == null && this.gamepads != null) {
      this.m_gamepad = this.gamepads.get(this.m_playerID);
      this.m_gamepads.push(this.m_gamepad);
    }
  }

  updateInput(step) {
    this.updateKeyboard(step);
    this.updateGamepad(step);
  }

  updateGamepad() {

    if (this.m_gamepad.connected){
      if (this.m_gamepad.stickLeft){
        this.x += this.m_gamepad.stickLeft.x * this.m_speed;
        this.y += this.m_gamepad.stickLeft.y * this.m_speed;
      }
    }

  }

  updateKeyboard() {

    if (this.keyboard.pressed(this.m_playerKeyboardControls[this.m_playerID].left)) {
      this.x -= this.m_speed;
      this.animation.gotoAndPlay("walk_left");
    }

    if (this.keyboard.pressed(this.m_playerKeyboardControls[this.m_playerID].right)) {
      this.x += this.m_speed;
      this.animation.gotoAndPlay("walk_right");
    }

    if (this.keyboard.pressed(this.m_playerKeyboardControls[this.m_playerID].up)) {
      this.y -= this.m_speed;
      this.animation.gotoAndPlay("walk_up");
    }

    if (this.keyboard.pressed(this.m_playerKeyboardControls[this.m_playerID].down)) {
      this.y += this.m_speed;
      this.animation.gotoAndPlay("walk_down");
    }

    if (this.keyboard.pressed(this.m_playerKeyboardControls[this.m_playerID].sprint)) {
      this.m_speed = 1;
    }

    if (this.keyboard.justReleased(this.m_playerKeyboardControls[this.m_playerID].sprint)) {
      this.m_speed = .5;
    }

  }


  characterAnimation() {
    this.animation.create("walk_down", characterAnims.walk_down, 3, true);
    this.animation.create("walk_up", characterAnims.walk_up, 3, true);
    this.animation.create("walk_right", characterAnims.walk_right, 3, true);
    this.animation.create("walk_left", characterAnims.walk_left, 3, true);
    this.animation.create("idle_down", characterAnims.idle_down, 3, true);
    this.animation.create("idle_up", characterAnims.idle_up, 3, true);
    this.animation.create("idle_right", characterAnims.idle_right, 3, true);
    this.animation.create("idle_left", characterAnims.idle_left, 3, true);

    this.animation.gotoAndPlay("walk_right");
  }
}

characterAnims = {
  walk_down: [1, 4],
  walk_up: [7, 10],
  walk_right: [13, 16],
  walk_left: [19, 22],
  idle_down: [31, 35],
  idle_up: [37, 41],
  idle_right: [43, 47],
  idle_left: [49, 53],

}

Player.prototype.m_playerKeyboardControls = {
  0: {
    left: 'A',
    right: 'D',
    up: 'W',
    down: 'S',
    sprint: 'SHIFT'
  },
  1: {
    left: 'LEFT',
    right: 'RIGHT',
    up: 'UP',
    down: 'DOWN',
    sprint: 'SHIFT'
  }
}

Player.prototype.getCurrentRoom = function() {
  return this.m_currentRoom;
}

Player.prototype.setCurrentRoom = function(room) {
  this.m_currentRoom = room;
}