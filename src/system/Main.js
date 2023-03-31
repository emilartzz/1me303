//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
Fighton.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "net.warelius",
        app: "Fighton",
        build: "0.0.0",
        scene: Fighton.scene.Game,
        resources: Fighton.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 60,
        debug: true
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Fighton.system.Main.prototype = Object.create(rune.system.Application.prototype);
Fighton.system.Main.prototype.constructor = Fighton.system.Main;