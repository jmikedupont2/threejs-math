import * as THREE from 'three';
import { debounce } from "ts-debounce";
console.log("loading");
let renderer: THREE.WebGL1Renderer;
const scene = new THREE.Scene();
const size = 90;
const camera = new THREE.PerspectiveCamera(2000, 0.45, 1, 1000);

const clock = new THREE.Clock();
let points: THREE.Points;

export function createPoints() {
    var geometry = new THREE.BufferGeometry();
    var vertices_base = [];
    var colors_base = [];
    var masses_base = [];
    var half = Math.floor(size / 2);
    var scale = 0.4;
    var col = 0;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            for (var k = 0; k < 2; k++) {
                var k = 1;
                col = col + 1;
                vertices_base.push(
                    (i - half) / scale,
                    (j - half) / scale,
                    (k - half) / scale
                );
                colors_base.push(
                    size / i,
                    size / j,
                    size / k);
                masses_base.push(0.3);
            }
        }
    }
    var vertices = new Float32Array(vertices_base);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    var colors = new Float32Array(colors_base);
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    var material = new THREE.PointsMaterial({
        //map : tex,
        vertexColors: true,
        size: 0.1,
    });
    return new THREE.Points(geometry, material);
}

export class WebGLContent {
    constructor() {
    }
    async start(canvas: HTMLCanvasElement) {
        renderer = new THREE.WebGL1Renderer({
            alpha: true,
            antialias: true,
            canvas: canvas,
        });

        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x0e0e0e, 1.0);
        points = createPoints();

        var light = new THREE.AmbientLight('white');
        scene.add(light);
        scene.add(camera);
        scene.add(points);

    }
    play() {
        clock.start();
        this.update();
    }
    pause() {
        clock.stop();
    }
    update() {
        // When the clock is stopped, it stops the all rendering too.
        if (clock.running === false) return;

        //points.rotation.x += 0.01;
        //points.rotation.y += 0.003;
        points.rotation.z += 0.001;
        //const colorb = points.geometry.attributes.color;

        //var colorsa = colorb.array;
        //var len = colorsa.length;
        // for (var i = 0; i < colorsa.length; i += 3) {
        //     //            var c = palette.next(i + ticker);
        //     colorsa[i] = len / i;
        //     colorsa[i + 1] = len / i;
        //     colorsa[i + 2] = len / i;

        // }
        // colorb.needsUpdate = true;
        renderer.render(scene, camera);
    }

    resize(resolution: THREE.Vector2) {
        renderer.setSize(resolution.x, resolution.y);
    }
};


export default async function main() {
    const webglContent = new WebGLContent();
    const resolution = new THREE.Vector2();
    const canvas: HTMLCanvasElement | null = document.getElementById('canvas-webgl') as HTMLCanvasElement;
    const preloader = document.querySelector('.p-preloader');

    const resizeWindow = () => {
        resolution.set(document.body.clientWidth, window.innerHeight);
        canvas.width = resolution.x;
        canvas.height = resolution.y;
        webglContent.resize(resolution);
    };
    const on = () => {
        window.addEventListener('resize', debounce(resizeWindow, 100));
    };
    const update = () => {
        webglContent.update();
        requestAnimationFrame(update);
    };

    if (canvas) {
        await webglContent.start(canvas);
    }
    on();
    resizeWindow();
    if (preloader) {
        preloader.classList.add('is-hidden');
    }
    webglContent.play();
    update();
}

main();
