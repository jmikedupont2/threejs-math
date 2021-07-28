import * as THREE from 'three';
import ReactDOM from 'react-dom';
import React from 'react';
//import { RangeStepInput } from 'oreact-range-step-input';

//import PropTypes from 'prop-types';

/* RangeStepInput.propTypes = {
 *     value: PropTypes.number.isRequired,
 *     onChange: PropTypes.func.isRequired,
 *     step: PropTypes.number.isRequired,
 *     className: PropTypes.string,
 *     min: PropTypes.number,
 *     max: PropTypes.number,
 *     id: PropTypes.string,
 *     name: PropTypes.string,
 *     disabled: PropTypes.bool,
 *     style: PropTypes.string,
 * 
 *     // Determines whether the slider changes value when the cursor is
 *     // held on it.
 *     hold: PropTypes.bool
 * };
 *  */
interface MyProps1 {
    max: number;
    min: number;
    step: number;
    value: number;
    name?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange: any;
    onClick?: any;
    hold?: boolean;
}

interface MyState {
    isMouseDown: boolean;
    isDragging: boolean;
}

// lifted from https://reactjsexample.com/a-range-step-input-for-react/
class RangeStepInput extends React.Component<MyProps1, MyState> {
    private domRef: any;
    private holdLoop: any;
    private onClick: any;

    constructor(props) {

        super(props);
        this.state = {
            isMouseDown: false,
            isDragging: false
        };
        this.onInput = this.onInput.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.domRef = React.createRef();
    }
    render() {
        return <input
            type="range"
            ref={this.domRef}
            //            className={this.props.className}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.props.value}
            //            name={this.props.name}
            //            id={this.props.id}
            //            style={this.props.style}
            disabled={this.props.disabled}
            onChange={this.props.onChange}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onMouseMove={this.onMouseMove}
            onClick={this.onClick}
            onInput={this.onInput} />;
    }
    onMouseDown() {
        this.setState({ isMouseDown: true });

        if (this.props.hold) {
            if (this.holdLoop) {
                clearInterval(this.holdLoop);
            }

            let oldVal = this.props.value;

            const self = this;
            setTimeout(function() {
                if (self.holdLoop) {
                    clearInterval(self.holdLoop);
                }
                self.holdLoop = self.makeHoldLoop(oldVal);
                // Add some initial delay on the click-hold functionality.
            }, 250);
        }
    }
    onMouseUp() {
        this.setState({
            isMouseDown: false,
            isDragging: false
        });

        if (this.holdLoop) {
            clearInterval(this.holdLoop);
        }
    }
    onMouseMove() {
        if (this.state.isMouseDown) {
            this.setState({ isDragging: true });
        }
    }
    onInput(e) {
        const step = this.props.step;
        const newVal = forceNumber(e.target.value);
        const oldVal = this.props.value;

        if (
            // Disable the oninput filter with the user is dragging
            // the slider's knob.
            !(this.state.isMouseDown && this.state.isDragging) &&
            oldVal
        ) {
            e.target.value = (newVal > oldVal) ?
                oldVal + step : oldVal - step;
        }
    }
    makeHoldLoop(oldVal) {
        const self = this;

        return setInterval(function() {
            if (!self.state.isMouseDown || self.state.isDragging) {
                // The user isn't holding the cursor anymore, or the cursor
                // is being dragged. Clean up and cancel.
                if (self.holdLoop) {
                    clearInterval(self.holdLoop);
                }
                return false;
            }

            const input = self.domRef.current;
            let newVal = self.props.value;

            if (
                oldVal > newVal &&
                (newVal - self.props.step) >= self.props.min
            ) {
                newVal -= self.props.step;
            } else if (
                oldVal < newVal &&
                (newVal + self.props.step) <= self.props.max
            ) {
                newVal += self.props.step;
            }

            if (oldVal === newVal) {
                return false;
            }

            // Directly setting input.value will cause the new value
            // to not be recognized, because of React.
            // https://stackoverflow.com/a/46012210/173630
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call(input, newVal);

            // Trigger an onChange event.
            const e = new Event('change', { bubbles: true });

            return input.dispatchEvent(e);
        }, 100);
    }
};


/* RangeStepInput.defaultProps = {
 *     hold: true
 * };
 *  */

const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

let points: THREE.Points;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;


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

interface IProps {
    /* fov: number;
     * xsize: number;
     * ysize: number;
     * zsize: number;

     * xrot: number;
     * yrot: number;
     * zrot: number;

     * scale: number;
     * nodeSize: number;
     */
};

class App extends React.Component<IProps, MyProps> {
    state: MyProps = {

        fov: 146,
        xsize: 10,
        ysize: 10,
        zsize: 2,

        xrot: 0,
        yrot: 0,
        zrot: 0.001,

        scale: 0.4,
        nodeSize: 0.1,

    };

    constructor(props: IProps) {
        super(props);
        //this.state = gstate;
        points = createPoints(this.state.xsize,
            this.state.ysize,
            this.state.zsize,
            this.state.scale,
            this.state.nodeSize);
        scene.add(points)

        this.animate()
    }

    animate() {
        requestAnimationFrame(
            () => {
                this.animate()
            });

        points.rotation.y += this.state.yrot;
        points.rotation.z += this.state.zrot;
        points.rotation.x += this.state.xrot;

        this.dorender()
    }

    dorender() {
        if (renderer) {
            renderer.render(scene, camera)
        }
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
                Model Size: (x,y,z)
                <span>
                    <RangeStepInput
                        min={1}
                        max={100}
                        step={1}
                        value={this.state.xsize}
                        onChange={this.onChangeXSize.bind(this)}
                    />
                    X<span className="input-group-text ml-2">
                        {this.state.xsize}
                    </span>
                    <RangeStepInput
                        min={1}
                        max={100}
                        step={1}
                        value={this.state.ysize}
                        onChange={this.onChangeYSize.bind(this)}
                    />
                    Y<span className="input-group-text ml-2">
                        {this.state.ysize}
                    </span>

                    <RangeStepInput
                        min={1}
                        max={100}
                        step={1}
                        value={this.state.zsize}
                        onChange={this.onChangeZSize.bind(this)}
                    />
                    Z<span className="input-group-text ml-2">
                        {this.state.zsize}
                    </span>

                </span>
            </div>

            <div>
                Model Rotation: (x,y,z)
                <span>
                    <RangeStepInput
                        min={-1}
                        max={1}
                        step={0.0001}
                        value={this.state.xrot}
                        onChange={this.onChangeXRot.bind(this)}
                    />
                    X <span className="input-group-text ml-2">
                        {this.state.xrot}
                    </span>
                    <RangeStepInput
                        min={-1}
                        max={1}
                        step={0.0001}
                        value={this.state.yrot}
                        onChange={this.onChangeYRot.bind(this)}
                    />
                    Y <span className="input-group-text ml-2">
                        {this.state.yrot}
                    </span>

                    <RangeStepInput
                        min={-1}
                        max={1}
                        step={0.0001}
                        value={this.state.zrot}
                        onChange={this.onChangeZRot.bind(this)}
                    />
                    Z <span className="input-group-text ml-2">
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
        //gstate = this.state;
    }
    refreshSize() {
        scene.remove(points);
        points = createPoints(this.state.xsize, this.state.ysize, this.state.zsize, this.state.scale, this.state.nodeSize);
        scene.add(points);
        if (renderer) {
            renderer.render(scene, camera);
        }
        //gstate = this.state;
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
        //gstate = this.state;
    }
    onChangeZRot(e: any) {
        const newVal = forceNumber(e.target.value);
        this.setState({ zrot: newVal });
        //        gstate = this.state;
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
    if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    // render()
}



export default function main() {

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    window.addEventListener('resize', onWindowResize, false)
    //animate();

    ReactDOM.render(<App />, document.getElementById('root'));

}


main();
