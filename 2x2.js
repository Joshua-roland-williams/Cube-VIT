
const animationEngine = ( () => {

    let uniqueID = 0;
  
    class AnimationEngine {
  
      constructor() {
  
        this.ids = [];
        this.animations = {};
        this.update = this.update.bind( this );
        this.raf = 0;
        this.time = 0;
  
      }
  
      update() {
  
        const now = performance.now();
        const delta = now - this.time;
        this.time = now;
  
        let i = this.ids.length;
  
        this.raf = i ? requestAnimationFrame( this.update ) : 0;
  
        while ( i-- )
          this.animations[ this.ids[ i ] ] && this.animations[ this.ids[ i ] ].update( delta );
  
      }
  
      add( animation ) {
  
        animation.id = uniqueID ++;
  
        this.ids.push( animation.id );
        this.animations[ animation.id ] = animation;
  
        if ( this.raf !== 0 ) return;
  
        this.time = performance.now();
        this.raf = requestAnimationFrame( this.update );
  
      }
  
      remove( animation ) {
  
        const index = this.ids.indexOf( animation.id );
  
        if ( index < 0 ) return;
  
        this.ids.splice( index, 1 );
        delete this.animations[ animation.id ];
        animation = null;
  
      }
  
    }
  
    return new AnimationEngine();
  
  } )();
  
  class Animation {
  
    constructor( start ) {
  
      if ( start === true ) this.start();
  
    }
  
    start() {
  
      animationEngine.add( this );
  
    }
  
    stop() {
  
      animationEngine.remove( this );
  
    }
  
    update( delta ) {}
  
  }
  
  class World extends Animation {
  
    constructor( game ) {
  
      super( true );
  
      this.game = game;
  
      this.container = this.game.dom.game;
      this.scene = new THREE.Scene();
  
      this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.container.appendChild( this.renderer.domElement );
  
      this.camera = new THREE.PerspectiveCamera( 2, 1, 0.1, 10000 );
  
      this.stage = { width: 2, height: 3 };
      this.fov = 10;
  
      this.createLights();
  
      this.onResize = [];
  
      this.resize();
      window.addEventListener( 'resize', () => this.resize(), false );
  
    }
  
    update() {
  
      this.renderer.render( this.scene, this.camera );
  
    }
  
    resize() {
  
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
  
      this.renderer.setSize( this.width, this.height );
  
      this.camera.fov = this.fov;
      this.camera.aspect = this.width / this.height;
  
      const aspect = this.stage.width / this.stage.height;
      const fovRad = this.fov * THREE.Math.DEG2RAD;
  
      let distance = ( aspect < this.camera.aspect )
        ? ( this.stage.height / 2 ) / Math.tan( fovRad / 2 )
        : ( this.stage.width / this.camera.aspect ) / ( 2 * Math.tan( fovRad / 2 ) );
  
      distance *= 0.5;
  
      this.camera.position.set( distance, distance, distance);
      this.camera.lookAt( this.scene.position );
      this.camera.updateProjectionMatrix();
  
      const docFontSize = ( aspect < this.camera.aspect )
        ? ( this.height / 100 ) * aspect
        : this.width / 100;
  
      document.documentElement.style.fontSize = docFontSize + 'px';
  
      if ( this.onResize ) this.onResize.forEach( cb => cb() );
  
    }
  
    createLights() {
  
      this.lights = {
        holder:  new THREE.Object3D,
        ambient: new THREE.AmbientLight( 0xffffff, 0.69 ),
        front:   new THREE.DirectionalLight( 0xffffff, 0.36 ),
        back:    new THREE.DirectionalLight( 0xffffff, 0.19 ),
      };
  
      this.lights.front.position.set( 1.5, 5, 3 );
      this.lights.back.position.set( -1.5, -5, -3 );
  
      this.lights.holder.add( this.lights.ambient );
      this.lights.holder.add( this.lights.front );
      this.lights.holder.add( this.lights.back );
  
      this.scene.add( this.lights.holder );
  
    }
  
  }
  