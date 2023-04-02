class Game extends rune.scene.Scene {

  menu = null;
  m_players = [];
  m_cams = null;
  m_camera_is_splitted = false;
  m_rooms = [];
  m_debug = true;

  constructor() {
    super();
  }

  init() {
    super.init();
    this.cameras.removeCameras(true);

    const Player1 = new Player(0);
    this.m_players.push(Player1);

    const Player2 = new Player(1);
    this.m_players.push(Player2);

    const text = new rune.text.BitmapField("This is a test");
    text.autoSize = true;


    this.stage.addChild(Player1);
    this.stage.addChild(Player2);
    this.stage.addChild(text);

    var w = this.application.screen.width;
    var h = this.application.screen.height;

    this.m_cams = [];
    this.m_cams[0] = this.cameras.createCamera(0, 0, w, h);
    this.m_cams[0].targets.add(Player1);
    this.m_cams[0].targets.add(Player2);

    this.cameras.addCamera(this.m_cams[0]);

    if (this.m_debug){
      this.stage.forEachChild(child => {
        child.debug = true;
      });
    }
  }

  update(step) {
    super.update(step);

    this.m_players.forEach(player => {
      player.updateInput(step);
    });

    if (this.m_players.length > 0) {
      this.calcCamera();
    }
  }

  dispose() {
    super.dispose();
  }

  calcCamera() {

    var playerOnePos = { x: this.m_players[0].globalX, y: this.m_players[0].globalY };
    var playerTwoPos = { x: this.m_players[1].globalX, y: this.m_players[1].globalY };

    if (!this.m_camera_is_splitted) {
      if (Math.abs(playerOnePos.x - playerTwoPos.x) > this.application.screen.width - 50 || Math.abs(playerOnePos.y - playerTwoPos.y) > this.application.screen.height - 50) {
        this.cameras.removeCameras(true);
        this.m_cams = [];

        this.m_cams[0] = this.cameras.createCamera(0, 0, this.application.screen.width / 2, this.application.screen.height);
        this.m_cams[1] = this.cameras.createCamera(this.application.screen.width / 2, 0, this.application.screen.width / 2, this.application.screen.height);

        this.m_cams[1].targets.add(this.m_players[1]);
        this.m_cams[0].targets.add(this.m_players[0]);

        this.cameras.addCamera(this.m_cams[0]);
        this.cameras.addCamera(this.m_cams[1]);

        console.log(this.m_cams[0].targets.length);
        console.log(this.m_cams[1].targets);

        this.m_camera_is_splitted = true;

      }
    }

    if (this.m_camera_is_splitted) {
      // If users are close to each other, merge the cameras
      if (Math.abs(playerOnePos.x - playerTwoPos.x) < this.application.screen.width - 50 && Math.abs(playerOnePos.y - playerTwoPos.y) < this.application.screen.height - 50) {
        this.cameras.removeCameras(true);
        this.m_cams = [];

        this.m_cams[0] = this.cameras.createCamera(0, 0, this.application.screen.width, this.application.screen.height);
        this.m_cams[0].targets.add(this.m_players[0]);
        this.m_cams[0].targets.add(this.m_players[1]);

        this.cameras.addCamera(this.m_cams[0]);

        this.m_camera_is_splitted = false;
      }
    }


  }


}

Fighton.scene.Game = Game;
