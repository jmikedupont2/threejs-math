import * as THREE from 'three';
import ReactDOM from 'react-dom';

let points: THREE.Points;

import React from 'react';

import { RangeStepInput } from 'react-range-step-input';


const forceNumber = function(n: any) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

interface MyProps {
    fov: number;
    xsize: number;
    ysize: number;
    zsize: number;

    xrot: number;
    yrot: number;
    zrot: number;

    scale: number;
    nodeSize: number;
};

let gstate: MyProps;

interface IProps { };

class App extends React.Component<IProps, MyProps> {
    constructor(props: IProps) {
        super(props);
        this.state = gstate;
    }
    render() {
        return <div>
            <div>
                <span>
                    <div className="input-group mb-3">
                        Camera FOV:
                        <RangeStepInput
                            min={1} max={1080}
                            value={this.state.fov} step={1}
                            onChange={this.onChangeFOV.bind(this)}
                        />
                        <span className="input-group-text ml-2">
                            {this.state.fov}
                        </span>
                    </div>
                </span>
            </div>
            <div>
                Model Size:
                <span>
                    <RangeStepInput
                        min={1}
                        max={100}
                        step={1}
                        value={this.state.xsize}
                        onChange={this.onChangeXSize.bind(this)}
                    />
                    <span className="input-group-text ml-2">
                        {this.state.xsize}
                    </span>
                    <RangeStepInput
                        min={1}
                        max={100}
                        step={1}
                        value={this.state.ysize}
                        onChange={this.onChangeYSize.bind(this)}
                    />
                    <span className="input-group-text ml-2">
                        {this.state.ysize}
                    </span>

                    <RangeStepInput
                        min={1}
                        max={100}
                        step={1}
                        value={this.state.zsize}
                        onChange={this.onChangeZSize.bind(this)}
                    />
                    <span className="input-group-text ml-2">
                        {this.state.zsize}
                    </span>

                </span>
            </div>


            <div>
                Model Rotation:
                <span>
                    <RangeStepInput
                        min={-1}
                        max={1}
                        step={0.0001}
                        value={this.state.xrot}
                        onChange={this.onChangeXRot.bind(this)}
                    />
                    <span className="input-group-text ml-2">
                        {this.state.xrot}
                    </span>
                    <RangeStepInput
                        min={-1}
                        max={1}
                        step={0.0001}
                        value={this.state.yrot}
                        onChange={this.onChangeYRot.bind(this)}
                    />
                    <span className="input-group-text ml-2">
                        {this.state.yrot}
                    </span>

                    <RangeStepInput
                        min={-1}
                        max={1}
                        step={0.0001}
                        value={this.state.zrot}
                        onChange={this.onChangeZRot.bind(this)}
                    />
                    <span className="input-group-text ml-2">
                        {this.state.zrot}
                    </span>

                </span>
            </div>

            <div>
                Model scale:
                <RangeStepInput
                    min={-10}
                    max={10}
                    step={0.001}
                    value={this.state.scale}
                    onChange={this.onChangeScale.bind(this)}
                />
                <span className="input-group-text ml-2"> {this.state.scale}</span>
            </div>

            <div>
                Model size:
                <RangeStepInput
                    min={0.001}
                    max={2}
                    step={0.001}
                    value={this.state.nodeSize}
                    onChange={this.onChangeSize.bind(this)}
                />
                <span className="input-group-text ml-2"> {this.state.nodeSize}</span>
            </div>



        </div >;
    };
    onChangeFOV(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ fov: newVal });
        camera.fov = newVal;
        camera.updateProjectionMatrix();
        //camera.n
        gstate = this.state;
    }
    refreshSize() {
        scene.remove(points);
        points = createPoints(this.state.xsize, this.state.ysize, this.state.zsize, this.state.scale, this.state.nodeSize);
        scene.add(points);
        renderer.render(scene, camera);
        gstate = this.state;
    }
    onChangeXSize(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ xsize: newVal });
        this.refreshSize();

    }
    onChangeYSize(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ ysize: newVal });
        this.refreshSize()
    }
    onChangeZSize(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ zsize: newVal });
        this.refreshSize()
    }

    onChangeXRot(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ xrot: newVal });
    }
    onChangeYRot(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ yrot: newVal });
        gstate = this.state;
    }
    onChangeZRot(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ zrot: newVal });
        gstate = this.state;
    }

    onChangeScale(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ scale: newVal });
        this.refreshSize();
    }
    onChangeSize(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ nodeSize: newVal });
        this.refreshSize();
    }
};


export function createPoints(xsize: number, ysize: number, zsize: number, scale: number, nodeSize: number) {
    var geometry = new THREE.BufferGeometry();
    var vertices_base = [];
    var colors_base = [];
    var masses_base = [];
    var xhalf = Math.floor(xsize / 2) + 1;
    var yhalf = Math.floor(ysize / 2) + 1;
    var zhalf = Math.floor(zsize / 2) + 1;
    //var scale = 0.4;
    console.log("create points", xsize, ysize, zsize, xhalf, yhalf, zhalf, nodeSize, scale);

    for (var i = 0; i < xsize; i++) {
        for (var j = 0; j < ysize; j++) {
            for (var k = 0; k < zsize; k++) {
                var x = (i - xhalf) / scale;
                var y = (j - yhalf) / scale;
                var z = (k - zhalf) / scale;
                vertices_base.push(x, y, z);
                //console.log('point', x, y, z);
                var red = 1.1 - (i / xsize);
                var green = 1.1 - (j / ysize);
                var blue = 1.1 - (k / zsize);
                colors_base.push(
                    red,
                    green,
                    blue);
                masses_base.push(0.3);
            }
        }
    }
    var vertices = new Float32Array(vertices_base);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    var colors = new Float32Array(colors_base);
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    var material = new THREE.PointsMaterial({
        vertexColors: true,
        size: nodeSize,
    });
    var ret = new THREE.Points(geometry, material);
    console.log(ret);
    return ret;
}

/* export class WebGLContent {
 *     constructor() { }
 *     async start(canvas: HTMLCanvasElement) {
 *         renderer = new THREE.WebGL1Renderer({
 *             alpha: true,
 *             antialias: true,
 *             canvas: canvas,
 *         });
 * 
 *         renderer.setPixelRatio(window.devicePixelRatio);
 *         renderer.setClearColor(0x0e0e0e, 1.0);
 *         //points = createPoints(gstate.xsize, gstate.ysize, gstate.zsize, gstate.scale, gstate.nodeSize);
 *         var light = new THREE.AmbientLight('white');
 *         camera.position.x = 15;
 *         camera.position.y = 16;
 *         camera.position.z = 13;
 * 
 *         const geometry = new THREE.BoxBufferGeometry(20, 20, 20);
 * 
 *         // create a default (white) Basic material
 *         const material = new THREE.MeshBasicMaterial();
 * 
 *         // create a Mesh containing the geometry and material
 *         var cube = new THREE.Mesh(geometry, material);
 *         cube.position.set(0, 0, 0);
 *         // add the mesh to the scene
 *         scene.add(cube);
 *         scene.add(light);
 *         scene.add(camera);
 *         camera.lookAt(cube.position);
 *         //scene.add(points);
 * 
 *     }
 *     play() {
 *         clock.start();
 *         this.update();
 *     }
 *     pause() {
 *         clock.stop();
 *     }
 *     update() {
 * 
 *         if (clock.running === false) return;
 * 
 *         //points.rotation.x += 0.01;
 *         //points.rotation.y += 0.003;
 *         //points.rotation.z += 0.001;
 *         //const colorb = points.geometry.attributes.color;
 * 
 *         //var colorsa = colorb.array;
 *         //var len = colorsa.length;
 *         // for (var i = 0; i < colorsa.length; i += 3) {
 *         //     //            var c = palette.next(i + ticker);
 *         //     colorsa[i] = len / i;
 *         //     colorsa[i + 1] = len / i;
 *         //     colorsa[i + 2] = len / i;
 * 
 *         // }
 *         // colorb.needsUpdate = true;
 *         renderer.render(scene, camera);
 *     }
 * 
 *     resize(resolution: THREE.Vector2) {
 *         renderer.setSize(resolution.x, resolution.y);
 *     }
 * };
 * 
 * 
 * export default async function main() {
 *     const webglContent = new WebGLContent();
 *     const resolution = new THREE.Vector2();
 *     const canvas: HTMLCanvasElement | null = document.getElementById('canvas-webgl') as HTMLCanvasElement;
 *     const preloader = document.querySelector('.p-preloader');
 *  */
/* const resizeWindow = () => {
 *     resolution.set(document.body.clientWidth, window.innerHeight);
 *     canvas.width = resolution.x;
 *     canvas.height = resolution.y;
 *     webglContent.resize(resolution);
 * };
 * const on = () => {
 *     window.addEventListener('resize', debounce(resizeWindow, 100));
 * };
 * const update = () => {
 *     webglContent.update();
 *     requestAnimationFrame(update);
 * };

 * if (canvas) {
 *     await webglContent.start(canvas);
 * }
 * on();
 * resizeWindow();
 * if (preloader) {
 *     preloader.classList.add('is-hidden');
 * }
 * webglContent.play();
 * update();
 * //camera.lookAt(cube.position);

 */
/* const container = document.querySelector('#scene-container');
 * 
 * // create a Scene
 * const scene = new THREE.Scene();
 * 
 * // Set the background color
 * scene.background = new THREE.Color('skyblue');
 * 
 * // Create a camera
 * const fov = 35; // AKA Field of View
 * const aspect = container.clientWidth / container.clientHeight;
 * const near = 0.1; // the near clipping plane
 * const far = 100; // the far clipping plane
 * 
 * const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
 * 
 * // every object is initially created at ( 0, 0, 0 )
 * // move the camera back so we can view the scene
 * camera.position.set(0, 0, 10);
 * 
 * // create a geometry
 * const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
 * 
 * // create a default (white) Basic material
 * const material = new THREE.MeshBasicMaterial();
 * 
 * // create a Mesh containing the geometry and material
 * const cube = new THREE.Mesh(geometry, material);
 * 
 * // add the mesh to the scene
 * scene.add(cube);
 * 
 * // create the renderer
 * const renderer = new THREE.WebGLRenderer();
 * 
 * // next, set the renderer to the same size as our container element
 * renderer.setSize(container.clientWidth, container.clientHeight);
 * 
 * // finally, set the pixel ratio so that our scene will look good on HiDPI displays
 * renderer.setPixelRatio(window.devicePixelRatio);
 * 
 * // add the automatically created <canvas> element to the page
 * container.append(renderer.domElement);
 * 
 * // render, or 'create a still image', of the scene
 * renderer.render(scene, camera);
 *  }
 *  *
 *  * main(); 
*/



const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


gstate = {
    fov: 146,
    xsize: 10,
    ysize: 10,
    zsize: 2,

    xrot: 0,
    yrot: 0,
    zrot: 0.0001,

    scale: 0.4,
    nodeSize: 0.1,
};

points = createPoints(gstate.xsize, gstate.ysize, gstate.zsize, gstate.scale, gstate.nodeSize);
scene.add(points)
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    points.rotation.y += gstate.yrot;
    points.rotation.z += gstate.zrot;
    points.rotation.x += gstate.xrot;

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()

ReactDOM.render(<App />, document.getElementById('root'));
