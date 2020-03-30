(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var glib_1 = require("../glib/glib");
var Camera = (function () {
    function Camera() {
        this.gcamera = glib_1.Glib.createPerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
    }
    Camera.active = new Camera();
    return Camera;
}());
exports.Camera = Camera;

},{"../glib/glib":7}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var vector3_model_1 = require("./vector3.model");
var glib_1 = require("../glib/glib");
var Entity = (function () {
    function Entity(element3D) {
        this.position = vector3_model_1.Vector3.zero();
        this.rotation = vector3_model_1.Vector3.zero();
        this.scale = vector3_model_1.Vector3.one();
        if (element3D === undefined) {
            this.element3D = glib_1.Glib.Element3D.empty();
        }
        else {
            this.element3D = element3D;
        }
        Entity.entities.push(this);
        console.log(Entity.entities);
    }
    Entity.updateAll = function (delta) {
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity._update(delta);
        }
    };
    Entity.prototype._update = function (delta) {
        this.element3D.position.x = this.position.x;
        this.element3D.position.y = this.position.y;
        this.element3D.position.z = this.position.z;
        this.element3D.rotation.x = this.rotation.x;
        this.element3D.rotation.y = this.rotation.y;
        this.element3D.rotation.z = this.rotation.z;
        this.element3D.scale.x = this.scale.x;
        this.element3D.scale.y = this.scale.y;
        this.element3D.scale.z = this.scale.z;
        this.update(delta);
    };
    Entity.prototype.update = function (delta) { };
    Entity.entities = [];
    return Entity;
}());
exports.Entity = Entity;

},{"../glib/glib":7,"./vector3.model":4}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var glib_1 = require("../glib/glib");
var Scene = (function () {
    function Scene() {
        this.gscene = glib_1.Glib.createScene();
    }
    Scene.prototype.add = function () {
        var _a;
        var entities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entities[_i] = arguments[_i];
        }
        (_a = this.gscene).add.apply(_a, entities.map(function (e) { return e.element3D; }));
    };
    ;
    Scene.active = new Scene();
    return Scene;
}());
exports.Scene = Scene;

},{"../glib/glib":7}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vector3 = (function () {
    function Vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.add = function (v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    };
    Vector3.prototype.mul = function (v) {
        return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
    };
    Vector3.zero = function () {
        return new Vector3(0, 0, 0);
    };
    Vector3.one = function () {
        return new Vector3(1, 1, 1);
    };
    Vector3.up = function () {
        return new Vector3(0, 1, 0);
    };
    Vector3.right = function () {
        return new Vector3(1, 0, 0);
    };
    Vector3.down = function () {
        return new Vector3(0, -1, 0);
    };
    Vector3.left = function () {
        return new Vector3(-1, 0, 0);
    };
    Vector3.forward = function () {
        return new Vector3(0, 0, 1);
    };
    Vector3.back = function () {
        return new Vector3(0, 0, -1);
    };
    return Vector3;
}());
exports.Vector3 = Vector3;

},{}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var entity_model_1 = require("../engine/entity.model");
var glib_1 = require("../glib/glib");
var vector3_model_1 = require("../engine/vector3.model");
var ocean_shader_1 = require("../shaders/ocean.shader");
var Ocean = (function (_super) {
    __extends(Ocean, _super);
    function Ocean() {
        var _this = this;
        var shader = {
            uniforms: {
                color: { type: 'vec3', value: glib_1.Glib.Color.hex(0x1f63db) },
                texture: { value: glib_1.Glib.Texture.from('textures/water.jpeg') },
                time: { type: 'float', value: 60 }
            },
            fragmentShader: ocean_shader_1.ocean_fragmentShader(),
            vertexShader: ocean_shader_1.ocean_vertexShader()
        };
        var element = glib_1.Glib.Plane.create(15, 15, 20, glib_1.Glib.Color.hex(0x32ab52));
        element.material = glib_1.Glib.Material.custom(shader);
        _this = _super.call(this, element) || this;
        _this.shader = shader;
        _this.rotation.x = -Math.PI / 2;
        _this.position = vector3_model_1.Vector3.zero();
        return _this;
    }
    Ocean.prototype.update = function (delta) {
        this.shader.uniforms.time.value += delta;
    };
    return Ocean;
}(entity_model_1.Entity));
exports.Ocean = Ocean;

},{"../engine/entity.model":2,"../engine/vector3.model":4,"../glib/glib":7,"../shaders/ocean.shader":10}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var entity_model_1 = require("../engine/entity.model");
var glib_1 = require("../glib/glib");
var texture_shader_1 = require("../shaders/texture.shader");
var Otter = (function (_super) {
    __extends(Otter, _super);
    function Otter(type, timeOffset) {
        if (timeOffset === void 0) { timeOffset = 0; }
        var _this = _super.call(this) || this;
        _this.onReady = function () { };
        _this.tailTimer = 0;
        _this.tailSpeed = 4;
        _this.oceanTimer = 60;
        _this.tailTimer = timeOffset;
        _this.rotation.x = -Math.PI / 2;
        var loader = new THREE.ColladaLoader();
        loader.load('models/otter.dae', function (collada) {
            console.log(collada);
            _this.element3D = collada.scene;
            for (var _i = 0, _a = collada.scene.children; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c.name === 'Tail') {
                    for (var _b = 0, _c = c.children; _b < _c.length; _b++) {
                        var t = _c[_b];
                        if (t.name === 'Mesh') {
                            t.material = glib_1.Glib.Material.color(glib_1.Glib.Color.hex(0x9c6433));
                            t.material.skinning = true;
                            t.material.onBeforeCompile = function (shader) {
                                shader.uniforms.color = { type: 'vec3', value: glib_1.Glib.Color.hex(0x9c6433) };
                                shader.vertexShader = 'varying vec3 vUv;\nvarying vec3 vecNormal;\n' + shader.vertexShader;
                                shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', [
                                    '#include <worldpos_vertex>',
                                    'vUv = (modelMatrix * vec4(position, 1.0)).xyz;',
                                    'vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;'
                                ].join('\n'));
                                shader.fragmentShader = 'uniform vec3 color;\nvarying vec3 vUv;\nvarying vec3 vecNormal;\n' + shader.fragmentShader;
                                shader.fragmentShader = shader.fragmentShader.replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );', 'gl_FragColor = vec4(vecNormal, 0) * 0.025 + vec4(mix(color - 0.25, color, 0.5 + vUv.y * 0.5), 1.0);');
                            };
                            t.bind(t.skeleton);
                            _this.tailBones = t.skeleton.bones;
                            t.skeleton.bones[0].rotation.x = 0;
                            t.skeleton.bones[1].rotation.x = 0;
                            t.skeleton.bones[1].position.y = 0;
                            t.skeleton.bones[2].rotation.x = 0;
                            t.skeleton.bones[2].position.y = 0;
                            t.skeleton.bones[3].rotation.x = 0;
                            t.skeleton.bones[3].position.y = 0;
                            t.skeleton.bones[4].rotation.x = 0;
                            t.skeleton.bones[4].position.y = 0;
                        }
                    }
                }
                if (c.name === 'Body' || c.name === 'Arm Right' || c.name === 'Arm Left') {
                    c.material = glib_1.Glib.Material["default"](glib_1.Glib.Color.hex(0x9c6433), true);
                }
                else if (c.name === 'Nose') {
                    c.material = glib_1.Glib.Material.color(glib_1.Glib.Color.hex(0x333333));
                }
                else if (c.name === 'Ear Left' || c.name === 'Ear Right') {
                    c.material = _this.createTextureMaterial('textures/ear.png', 0x734720, 0x9c6433, true);
                }
                else if (c.name === 'Eye Left' || c.name === 'Eye Right') {
                    c.material = _this.createTextureMaterial('textures/eye.png', 0xffffff, 0x333333);
                }
                else if (c.name === 'Heart') {
                    c.visible = type === 'heart';
                    c.material = glib_1.Glib.Material["default"](glib_1.Glib.Color.hex(0xd13530));
                }
                else if (c.name === 'Clam') {
                    c.visible = type === 'clam';
                    c.material = glib_1.Glib.Material["default"](glib_1.Glib.Color.hex(0xf5d864));
                }
                if (c.name === "Leg Right" || c.name === "Leg Left") {
                    if (c.name === "Leg Right") {
                        _this.rightLeg = c;
                    }
                    else {
                        _this.leftLeg = c;
                    }
                    for (var _d = 0, _e = c.children; _d < _e.length; _d++) {
                        var l = _e[_d];
                        if (l.name === "") {
                            l.material = glib_1.Glib.Material["default"](glib_1.Glib.Color.hex(0x9c6433), true);
                        }
                        else {
                            l.material = glib_1.Glib.Material.color(glib_1.Glib.Color.hex(0x333333));
                        }
                    }
                }
            }
            _this.onReady();
        });
        return _this;
    }
    Otter.prototype.calculateSurface = function (time, x, z) {
        var scale = 2.0;
        var y = 0.0;
        y += (Math.sin(x * 1.0 / scale + time * 1.0) + Math.sin(x * 2.3 / scale + time * 1.5) + Math.sin(x * 3.3 / scale + time * 0.4)) / 3.0;
        y += (Math.sin(z * 0.2 / scale + time * 1.8) + Math.sin(z * 1.8 / scale + time * 1.8) + Math.sin(z * 2.8 / scale + time * 0.8)) / 3.0;
        return y;
    };
    Otter.prototype.update = function (delta) {
        this.oceanTimer += delta;
        if (this.element3D) {
            this.element3D.position.y = -0.1 + 0.25 * this.calculateSurface(this.oceanTimer, 0.5 + this.element3D.position.x * 0.1, 0.5);
        }
        if (this.tailBones) {
            this.tailTimer += delta * this.tailSpeed;
            for (var i = 0; i < this.tailBones.length; i += 1) {
                this.tailBones[i].rotation.z = Math.sin(this.tailTimer) * 0.05;
            }
            this.rotation.y = Math.sin(this.tailTimer) * 0.1;
            this.leftLeg.rotation.x = 1.9 + Math.sin((this.tailTimer * 2) - Math.PI / 2) * 0.2;
            this.rightLeg.rotation.x = 1.9 + Math.sin((this.tailTimer * 2) + Math.PI / 2) * 0.2;
        }
    };
    Otter.prototype.createTextureMaterial = function (texture, color1, color2, normals) {
        if (normals === void 0) { normals = false; }
        var shader = {
            uniforms: {
                color1: { type: 'vec3', value: glib_1.Glib.Color.hex(color1) },
                color2: { type: 'vec3', value: glib_1.Glib.Color.hex(color2) },
                texture: { value: glib_1.Glib.Texture.from(texture) }
            },
            fragmentShader: normals ? texture_shader_1.texture_normals_fragmentShader() : texture_shader_1.texture_fragmentShader(),
            vertexShader: texture_shader_1.texture_vertexShader()
        };
        return glib_1.Glib.Material.custom(shader);
    };
    return Otter;
}(entity_model_1.Entity));
exports.Otter = Otter;

},{"../engine/entity.model":2,"../glib/glib":7,"../shaders/texture.shader":11}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var shader_cool_1 = require("./shader-cool");
var Glib;
(function (Glib) {
    var Color = (function () {
        function Color() {
        }
        Color.hex = function (val) {
            return new THREE.Color(val);
        };
        Color.rgb = function (r, g, b) {
            return new THREE.Color(r, g, b);
        };
        return Color;
    }());
    Glib.Color = Color;
    var Texture = (function () {
        function Texture() {
        }
        Texture.from = function (path) {
            var texture = new THREE.TextureLoader().load(path);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            return texture;
        };
        return Texture;
    }());
    Glib.Texture = Texture;
    var Vector3 = (function () {
        function Vector3() {
        }
        Vector3.zero = function () {
            return new THREE.Vector3(0, 0, 0);
        };
        Vector3.one = function () {
            return new THREE.Vector3(1, 1, 1);
        };
        Vector3.xyz = function (x, y, z) {
            return new THREE.Vector3(x, y, z);
        };
        return Vector3;
    }());
    Glib.Vector3 = Vector3;
    var Material = (function () {
        function Material() {
        }
        Material["default"] = function (color, soft) {
            if (soft === void 0) { soft = false; }
            return new THREE.ShaderMaterial({
                uniforms: { color: { type: 'vec3', value: color } },
                fragmentShader: soft ? shader_cool_1.cool_soft_fragmentShader() : shader_cool_1.cool_fragmentShader(),
                vertexShader: shader_cool_1.cool_vertexShader()
            });
        };
        Material.color = function (color) {
            return new THREE.MeshBasicMaterial({ color: color });
        };
        Material.custom = function (params) {
            return new THREE.ShaderMaterial(__assign(__assign({}, params), { side: THREE.DoubleSide }));
        };
        return Material;
    }());
    Glib.Material = Material;
    var Element3D = (function () {
        function Element3D() {
        }
        Element3D.empty = function () {
            return new THREE.Object3D();
        };
        return Element3D;
    }());
    Glib.Element3D = Element3D;
    var Cube = (function (_super) {
        __extends(Cube, _super);
        function Cube() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cube.create = function (width, height, depth, color) {
            var geometry = new THREE.BoxBufferGeometry(width, height, depth);
            var material = new THREE.ShaderMaterial({
                uniforms: { color: { type: 'vec3', value: color } },
                fragmentShader: shader_cool_1.cool_fragmentShader(),
                vertexShader: shader_cool_1.cool_vertexShader()
            });
            return new THREE.Mesh(geometry, material);
        };
        return Cube;
    }(Element3D));
    Glib.Cube = Cube;
    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Plane.create = function (width, height, segments, color) {
            var geometry = new THREE.PlaneGeometry(width, height, segments, segments);
            var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
            return new THREE.Mesh(geometry, material);
        };
        return Plane;
    }(Element3D));
    Glib.Plane = Plane;
    var PerspectiveCamera = (function () {
        function PerspectiveCamera() {
        }
        return PerspectiveCamera;
    }());
    Glib.PerspectiveCamera = PerspectiveCamera;
    var Scene = (function () {
        function Scene() {
        }
        return Scene;
    }());
    Glib.Scene = Scene;
    var Renderer = (function () {
        function Renderer() {
        }
        Renderer.placeInDOM = function (element) {
            element.appendChild(this.instance.domElement);
        };
        Renderer.init = function (width, height) {
            this.instance = new THREE.WebGLRenderer({ antialias: true });
            if (!this.instance.extensions.get('WEBGL_depth_texture')) {
                console.error('WebGL Depth texture is not suported');
            }
            this.instance.setSize(width, height);
        };
        Renderer.getDepthTexture = function () {
            return this.swapTarget ? this.target2.depthTexture : this.target1.depthTexture;
        };
        Renderer.render = function (scene, camera) {
            this.instance.render(scene, camera);
        };
        Renderer.setSize = function (width, height) {
            this.instance.setSize(width, height);
        };
        Renderer.swapTarget = false;
        return Renderer;
    }());
    Glib.Renderer = Renderer;
    function createPerspectiveCamera(fov, aspect, near, far) {
        return new THREE.PerspectiveCamera(fov, aspect, near, far);
    }
    Glib.createPerspectiveCamera = createPerspectiveCamera;
    function createScene() {
        var scene = new THREE.Scene();
        return scene;
    }
    Glib.createScene = createScene;
})(Glib = exports.Glib || (exports.Glib = {}));

},{"./shader-cool":8}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function cool_vertexShader() {
    return "\n    varying vec3 vUv; \n    varying vec3 vecNormal;\n\n    void main() {\n      vUv = (modelMatrix * vec4(position, 1.0)).xyz; \n      vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;\n      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);\n      gl_Position = projectionMatrix * modelViewPosition; \n    }\n  ";
}
exports.cool_vertexShader = cool_vertexShader;
function cool_soft_fragmentShader() {
    return "\n      uniform vec3 color; \n      varying vec3 vUv;\n      varying vec3 vecNormal;\n\n      void main() {\n        gl_FragColor = vec4(vecNormal, 0) * 0.025 + vec4(mix(color - 0.25, color, 0.5 + vUv.y * 0.5), 1.0);\n      }\n  ";
}
exports.cool_soft_fragmentShader = cool_soft_fragmentShader;
function cool_fragmentShader() {
    return "\n      uniform vec3 color; \n      varying vec3 vUv;\n      varying vec3 vecNormal;\n\n      void main() {\n        gl_FragColor = vec4(vecNormal, 0) * 0.025 + vec4(mix(color - 0.25, color, vUv.y * 1.0), 1.0);\n      }\n  ";
}
exports.cool_fragmentShader = cool_fragmentShader;

},{}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var glib_1 = require("./glib/glib");
var entity_model_1 = require("./engine/entity.model");
var scene_model_1 = require("./engine/scene.model");
var camera_model_1 = require("./engine/camera.model");
var ocean_entity_1 = require("./game/ocean.entity");
var otter_entity_1 = require("./game/otter.entity");
;
console.log('Hi there! 🦁');
var container = document.querySelector('.container');
console.log(container);
var stats = new Stats();
glib_1.Glib.Renderer.init(window.innerWidth, window.innerHeight);
glib_1.Glib.Renderer.placeInDOM(container);
window.addEventListener('resize', function () {
    camera_model_1.Camera.active.gcamera.aspect = window.innerWidth / window.innerHeight;
    camera_model_1.Camera.active.gcamera.updateProjectionMatrix();
    glib_1.Glib.Renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
var ocean = new ocean_entity_1.Ocean();
var otterHeart = new otter_entity_1.Otter('heart');
var otterClam = new otter_entity_1.Otter('clam', 0.5);
otterHeart.onReady = function () {
    scene_model_1.Scene.active.add(otterHeart);
    otterHeart.position.z = 1.15;
    otterHeart.position.x = 0.85;
};
otterClam.onReady = function () {
    scene_model_1.Scene.active.add(otterClam);
    otterClam.position.z = 0.85;
    otterClam.position.x = -0.85;
};
scene_model_1.Scene.active.add(ocean);
scene_model_1.Scene.active.gscene.background = glib_1.Glib.Color.hex(0xffffff);
camera_model_1.Camera.active.gcamera.position.z = 7;
camera_model_1.Camera.active.gcamera.position.y = 10;
camera_model_1.Camera.active.gcamera.position.x = 7;
var controls = new THREE.OrbitControls(camera_model_1.Camera.active.gcamera, container);
controls.zoomSpeed = 0.2;
var gridXZ = new THREE.GridHelper(100, 10);
function mainloop() {
    controls.update();
    entity_model_1.Entity.updateAll(1.0 / 60.0);
    glib_1.Glib.Renderer.render(scene_model_1.Scene.active.gscene, camera_model_1.Camera.active.gcamera);
    requestAnimationFrame(mainloop);
}
mainloop();

},{"./engine/camera.model":1,"./engine/entity.model":2,"./engine/scene.model":3,"./game/ocean.entity":5,"./game/otter.entity":6,"./glib/glib":7}],10:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function ocean_vertexShader() {
    return "\n    #define SCALE 2.0\n\n    // varying vec3 vNormal;\n    varying vec2 vUv;\n    uniform float time;\n\n    float calculateSurface(float x, float z) {\n      float y = 0.0;\n      y += (sin(x * 1.0 / SCALE + time * 1.0) + sin(x * 2.3 / SCALE + time * 1.5) + sin(x * 3.3 / SCALE + time * 0.4)) / 3.0;\n      y += (sin(z * 0.2 / SCALE + time * 1.8) + sin(z * 1.8 / SCALE + time * 1.8) + sin(z * 2.8 / SCALE + time * 0.8)) / 3.0;\n      return y;\n    }\n\n    void main() {\n      // vNormal = normal;\n      vUv = uv * vec2(4);\n\n      vec3 pos = position;\n      float strength = 0.25;\n      pos.z += strength * calculateSurface(pos.x, pos.y);\n      // pos.z -= strength * calculateSurface(0.0, 0.0);\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );\n    }\n  ";
}
exports.ocean_vertexShader = ocean_vertexShader;
function ocean_fragmentShader() {
    return "\n    #include <packing>\n\n    // varying vec3 vNormal;\n    varying vec2 vUv;\n    uniform vec3 color;\n    varying vec4 screen;\n    uniform sampler2D texture;\n    uniform float time;\n\n    void main() {\n      vec2 uv = vUv;\n\n      if (sqrt(pow(uv.x / 4.0 - 0.5, 2.0) + pow(uv.y / 4.0 - 0.5, 2.0)) > 0.5) {\n        discard;\n      }\n\n      // uv.y += 0.1 * (sin(uv.x * 1.1 + time * 0.9) + sin(uv.x * 2.2 + time * 1.2)) / 2.0;\n      // uv.x += 0.1 * (cos(uv.y * 1.2 + time * 1.05) + cos(uv.y * 2.1 + time * 0.7)) / 2.0;\n\n      uv.y += 0.01 * (sin(uv.x * 3.5 + time * 0.35) + sin(uv.x * 4.8 + time * 1.05) + sin(uv.x * 7.3 + time * 0.45)) / 3.0;\n      uv.x += 0.06 * (sin(uv.y * 4.0 + time * 0.5) + sin(uv.y * 6.8 + time * 0.75) + sin(uv.y * 11.3 + time * 0.2)) / 3.0;\n      uv.y += 0.05 * (sin(uv.x * 4.2 + time * 0.64) + sin(uv.x * 6.3 + time * 1.65) + sin(uv.x * 8.2 + time * 0.45)) / 3.0;\n\n      uv.y = uv.y * 0.5;\n      uv.y += time * 0.2;\n\n      vec4 tex = texture2D(texture, uv);\n      vec4 tex2 = texture2D(texture, vec2(uv.x + 0.5, uv.y + 0.5));\n      gl_FragColor = tex * 0.15 + vec4(vec3(color), 1.0) - tex2 * 0.05;\n    }\n  ";
}
exports.ocean_fragmentShader = ocean_fragmentShader;
function ocean_vertexShader_depth() {
    return "\n    #define SCALE 2.0\n\n    varying vec3 vNormal;\n    varying vec2 vUv;\n    varying vec4 screen;\n    uniform float time;\n\n    vec4 ComputeScreenPos(vec4 pos) {\n      vec4 o = pos * 0.5;\n      o.xy = vec2(o.x, o.y) + o.w;\n      o.zw = pos.zw;\n      return o;\n    }\n\n    float calculateSurface(float x, float z) {\n      float y = 0.0;\n      y += (sin(x * 1.0 / SCALE + time * 1.0) + sin(x * 2.3 / SCALE + time * 1.5) + sin(x * 3.3 / SCALE + time * 0.4)) / 3.0;\n      y += (sin(z * 0.2 / SCALE + time * 1.8) + sin(z * 1.8 / SCALE + time * 1.8) + sin(z * 2.8 / SCALE + time * 0.8)) / 3.0;\n      return y;\n    }\n\n    void main() {\n      vNormal = normal;\n      vUv = uv; // * vec2(4);\n\n      vec3 pos = position;\n      float strength = 0.2;\n      // pos.z += strength * calculateSurface(pos.x, pos.y);\n      // pos.z -= strength * calculateSurface(0.0, 0.0);\n      screen = ComputeScreenPos(vec4(pos, 1.0));\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );\n    }\n  ";
}
exports.ocean_vertexShader_depth = ocean_vertexShader_depth;
function ocean_fragmentShader_depth() {
    return "\n    #include <packing>\n\n    varying vec3 vNormal;\n    varying vec2 vUv;\n    uniform vec3 color;\n    varying vec4 screen;\n    uniform sampler2D texture;\n    uniform sampler2D depthTexture;\n    uniform float time;\n\n    /*\n    void main() {\n      vec2 uv = vUv;\n\n      // uv.y += 0.1 * (sin(uv.x * 1.1 + time * 0.9) + sin(uv.x * 2.2 + time * 1.2)) / 2.0;\n      // uv.x += 0.1 * (cos(uv.y * 1.2 + time * 1.05) + cos(uv.y * 2.1 + time * 0.7)) / 2.0;\n\n      // uv.y += 0.01 * (sin(uv.x * 3.5 + time * 0.35) + sin(uv.x * 4.8 + time * 1.05) + sin(uv.x * 7.3 + time * 0.45)) / 3.0;\n      // uv.x += 0.12 * (sin(uv.y * 4.0 + time * 0.5) + sin(uv.y * 6.8 + time * 0.75) + sin(uv.y * 11.3 + time * 0.2)) / 3.0;\n      // uv.y += 0.12 * (sin(uv.x * 4.2 + time * 0.64) + sin(uv.x * 6.3 + time * 1.65) + sin(uv.x * 8.2 + time * 0.45)) / 3.0;\n\n      vec4 tex = texture2D(depthTexture, uv);\n      vec4 tex2 = texture2D(texture, vec2(uv.x + 0.4, uv.y + 0.4));\n      gl_FragColor = tex; // + vec4(vec3(color), 1.0) - tex2 * 0.05;\n    }*/\n\n    float readDepth(sampler2D depthSampler, vec4 screen, vec2 coord ) {\n      float fragCoordZ = texture2DProj(depthSampler, screen).x;\n      // float fragCoordZ = texture2D( depthSampler, coord ).x;\n      float viewZ = perspectiveDepthToViewZ( fragCoordZ, 0.1, 100.0 );\n      return viewZToOrthographicDepth( viewZ, 0.1, 100.0 );\n    }\n\n    void main() {\n      float depth = readDepth(depthTexture, screen, vUv);\n\n      gl_FragColor.rgb = 1.0 - vec3( depth );\n      gl_FragColor.a = 1.0;\n    }\n  ";
}
exports.ocean_fragmentShader_depth = ocean_fragmentShader_depth;

},{}],11:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function texture_vertexShader() {
    return "  \n      varying vec2 vUv;\n      varying vec3 vecNormal;\n  \n      void main() {\n        vUv = uv;\n        vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );\n      }\n    ";
}
exports.texture_vertexShader = texture_vertexShader;
function texture_fragmentShader() {
    return "\n      #include <packing>\n  \n      varying vec2 vUv;\n      uniform vec3 color1;\n      uniform vec3 color2;\n      uniform sampler2D texture;\n  \n      void main() {\n        vec2 uv = vUv;\n    \n        vec4 tex = texture2D(texture, uv);\n        if (tex.r > 0.5) {\n            gl_FragColor = vec4(color1, 1.0);\n        } else {\n            gl_FragColor = vec4(color2, 1.0);\n        }\n      }\n    ";
}
exports.texture_fragmentShader = texture_fragmentShader;
function texture_normals_fragmentShader() {
    return "\n        varying vec2 vUv;\n        uniform vec3 color1;\n        uniform vec3 color2;\n        uniform sampler2D texture;\n        varying vec3 vecNormal;\n  \n        void main() {\n\n            vec2 uv = vUv;\n\n            vec4 tex = texture2D(texture, uv);\n            if (tex.r > 0.5) {\n                gl_FragColor = vec4(color1, 1.0);\n            } else {\n                gl_FragColor = vec4(vecNormal, 0) * 0.025 + vec4(mix(color2 - 0.25, color2, 0.5 + vUv.y * 0.5), 1.0);\n            }\n\n        \n        }\n    ";
}
exports.texture_normals_fragmentShader = texture_normals_fragmentShader;

},{}]},{},[9]);
