AFRAME.registerComponent("bullets", {
    init: function () {
      this.shootBullet();
    },
    shootBullet: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bullet = document.createElement("a-entity");
  
          bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          bullet.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera-rig");
  
          pos = cam.getAttribute("position");
  
          bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
  
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          bullet.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  
          bullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
          });
  
          bullet.addEventListener("collide", this.removeBullet);
  
          scene.appendChild(bullet);
  
          this.shootSound();
        }
      });
    },
    removeBullet: function (e) {
      var element = e.detail.target.el;
  
      var elementHit = e.detail.body.el;
      console.log(elementHit.id)
      if(elementHit.id.includes("wall")) {

        var splash = document.createElement("a-image")
        splash.setAttribute("geometry",{
          width : 1,
          height : 1
        })
        splash.setAttribute("material",{
          src : "./splash.png"
        })

        pos = element.getAttribute("position")
        rot = elementHit.getAttribute("rotation")


        splash.setAttribute("position",pos)
        splash.setAttribute("rotation",rot)
        console.log(rot)

        var scene = document.querySelector("#scene");


        if(elementHit.id.includes("wall")){
          scene.appendChild(splash)
        }

        element.removeEventListener("collide", this.removeBullet);

        scene.removeChild(element);
      }
    },
    shootSound: function () {
      var entity = document.querySelector("#sound1");
      entity.components.sound.playSound();
    },
  });
  
  