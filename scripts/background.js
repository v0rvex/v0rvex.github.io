
var sdf = `
    // http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm

    float sdSphere( vec3 p, float s )
    {
        return length(p)-s;
    }
    
    // honestly stolen from here https://www.shadertoy.com/view/MlGGDh
    mat3 rotationMatrix(vec3 m,float a) {
        m = normalize(m);
        float c = cos(a),s=sin(a);
        return mat3(
            c+(1.-c)*m.x*m.x,     (1.-c)*m.x*m.y-s*m.z, (1.-c)*m.x*m.z+s*m.y,
            (1.-c)*m.x*m.y+s*m.z, c+(1.-c)*m.y*m.y,     (1.-c)*m.y*m.z-s*m.x,
            (1.-c)*m.x*m.z-s*m.y, (1.-c)*m.y*m.z+s*m.x, c+(1.-c)*m.z*m.z);
    }
    
    mat3 rotate(vec3 val){
        mat3 matX = rotationMatrix(vec3(1, 0, 0), val.x);
        mat3 matY = rotationMatrix(vec3(0, 1, 0), val.y);
        mat3 matZ = rotationMatrix(vec3(0, 0, 1), val.z);
        return matX * matY * matZ;
    }
`;

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x160016);

let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 4, 43);

let renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.domElement.classList.add('hidden');
document.body.appendChild(renderer.domElement);

let time = 0;

let heartGeometry, heartMaterial, heart;

function initHeart() {
    let positions = [];
    let speed = [];
    let xSize = 50; // Увеличение размера массива точек
    let ySize = 50; // Увеличение размера массива точек
    let zSize = 50; // Увеличение размера массива точек
    let n = xSize * ySize * zSize;

    for (let i = 0; i < n; i++) {
        let x = Math.random();
        let y = Math.random();
        let z = Math.random();
        positions.push(new THREE.Vector3(x, y, z).multiplyScalar(100));
        speed.push(Math.random() * 10 + 5);
    }

    heartGeometry = new THREE.BufferGeometry().setFromPoints(positions);
    heartGeometry.setAttribute("speed", new THREE.BufferAttribute(new Float32Array(speed), 1));
    heartGeometry.center();

    heartMaterial = new THREE.ShaderMaterial({
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        uniforms: {
            time: {
                value: 0
            },
            size: {
                value: 0.125
            },
        },
        vertexShader: `
            #define PI 3.1415926  

            uniform float time;
            uniform float size;

            attribute float speed;

            varying vec3 vC;
            varying float vDiscard;
            ${sdf}
            void main(){
                vec3 pos = position;

                float start = position.y +50.;
                float way = speed * time;
                float totalWay = start + way;
                float modulo = mod(totalWay, 100.);
                pos.y = modulo - 50.;

                vec3 vPos = pos;

                vPos *= rotate(vec3(0, time, 0));

                vec3 h = vPos / 2.5;
                h.y = 4. + 1.2 * h.y - abs(h.x) * sqrt(max((20. - abs(h.x)) / 15., 0.));
                h.z = h.z * (2. - h.y / 15.);
                float r = 15. + 3. * pow(0.5 + 0.5 * sin(2. * PI * time + h.y / 25.), 4.);
                float heart = sdSphere(h, r);        

                bool boolDiscard = heart > 0.0 || heart < -2.;

                vec3 c = vec3(1.,0.412,0.706);
                if (heart > -0.125) c = vec3(1);

                vC = c;        
                vDiscard = boolDiscard == true ? 1. : 0.;

                vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
                gl_PointSize = size * ( 300.0 / -mvPosition.z );
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vC;
            varying float vDiscard;

            void main(){
                if ( vDiscard > 0.5 ) {discard;}
                if (length(gl_PointCoord - 0.5) > 0.5) {discard;}
                gl_FragColor = vec4( vC, 1.0);
            }
        `,
    });

    heart = new THREE.Points(heartGeometry, heartMaterial);
    heart.rotation.z = 0.2;
    heart.scale.set(0.2, 0.2, 0.2);
    scene.add(heart);
}

initHeart();

let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
    let t = clock.getElapsedTime() * 0.5;
    time = t * Math.PI;
    heart.material.uniforms.time.value = time;
    scene.rotation.y = t * 0.05;

    renderer.render(scene, camera);
});
