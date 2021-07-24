import * as THREE from 'three';
import ReactDOM from 'react-dom';
import React from 'react';
import { RangeStepInput } from 'react-range-step-input';

let points: THREE.Points;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

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


function createPoints(xsize: number, ysize: number, zsize: number, scale: number, nodeSize: number) {
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


export default function main() {

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
    animate();

    ReactDOM.render(<App />, document.getElementById('root'));

}


main();
