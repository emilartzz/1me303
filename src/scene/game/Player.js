class Player extends rune.display.Sprite {

  constructor(playerID = 0) {
    super(20, 20, 32, 32, "character");
    this.m_buttons = [];
    this.m_gamepad = null;
    this.m_playerID = playerID || 0;
  }

  init() {
    super.init();
    this.debug = true;
    this.characterAnimation();
  }

  m_initGamepad() {
    if (this.m_gamepad == null && this.gamepads != null) {
      this.m_gamepad = this.gamepads.get(this.m_playerID);
    }
  }


  updateInput(step) {

    if (this.m_playerID == 0) {
      if (this.keyboard.pressed('LEFT')) {
        this.animation.gotoAndPlay("walk_left");
        this.x -= .5;
      }

      if (this.keyboard.pressed('RIGHT')) {
        this.animation.gotoAndPlay("walk_right");
        this.x += .5;
      }

      if (this.keyboard.pressed('UP')) {
        this.animation.gotoAndPlay("walk_up");
        this.y -= .5;
      }

      if (this.keyboard.pressed('DOWN')) {
        this.animation.gotoAndPlay("walk_down");
        this.y += .5;
      }

      if (this.keyboard.justReleased('LEFT')) {
        this.animation.gotoAndPlay("idle_left");
      }

      if (this.keyboard.justReleased('RIGHT')) {
        this.animation.gotoAndPlay("idle_right");
      }

      if (this.keyboard.justReleased('UP')) {
        this.animation.gotoAndPlay("idle_up");
      }

      if (this.keyboard.justReleased('DOWN')) {
        this.animation.gotoAndPlay("idle_down");
      }
    }
    else if (this.m_playerID == 1) {
      if (this.keyboard.pressed('A')) {
        this.animation.gotoAndPlay("walk_left");
        this.x -= .5;
      }

      if (this.keyboard.pressed('D')) {
        this.animation.gotoAndPlay("walk_right");
        this.x += .5;
      }

      if (this.keyboard.pressed('W')) {
        this.animation.gotoAndPlay("walk_up");
        this.y -= .5;
      }

      if (this.keyboard.pressed('S')) {
        this.animation.gotoAndPlay("walk_down");
        this.y += .5;
      }

      if (this.keyboard.justReleased('A')) {
        this.animation.gotoAndPlay("idle_left");
      }

      if (this.keyboard.justReleased('D')) {
        this.animation.gotoAndPlay("idle_right");
      }

      if (this.keyboard.justReleased('W')) {
        this.animation.gotoAndPlay("idle_up");
      }

      if (this.keyboard.justReleased('S')) {
        this.animation.gotoAndPlay("idle_down");
      }
    }
    else{
      return;
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