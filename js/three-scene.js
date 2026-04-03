import * as THREE from 'three';

// --- Background Particle System ---
const bgCanvas = document.getElementById('bg-canvas');
const bgScene = new THREE.Scene();

// We want a very dark background to match --bg-color
bgScene.background = new THREE.Color(0x050510);
// Add a subtle fog to blend particles at depth
bgScene.fog = new THREE.FogExp2(0x050510, 0.001);

const bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
bgCamera.position.z = 1000;

const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, antialias: true });
bgRenderer.setPixelRatio(window.devicePixelRatio);
bgRenderer.setSize(window.innerWidth, window.innerHeight);

// Create Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800;

const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

const color1 = new THREE.Color(0x00f3ff); // Cyan
const color2 = new THREE.Color(0xb026ff); // Purple

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles wide across the screen
    posArray[i] = (Math.random() - 0.5) * 3000;
}

for(let i = 0; i < particlesCount; i++) {
    const mixedColor = color1.clone().lerp(color2, Math.random());
    colorsArray[i * 3] = mixedColor.r;
    colorsArray[i * 3 + 1] = mixedColor.g;
    colorsArray[i * 3 + 2] = mixedColor.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

// Setup material with glow feeling
const particlesMaterial = new THREE.PointsMaterial({
    size: 2.5,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.45
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
bgScene.add(particlesMesh);

// --- Hero Avatar 3D Object ---
const heroAvatarContainer = document.getElementById('hero-3d-avatar');
const avatarScene = new THREE.Scene();

// Camera setup for Avatar
const avatarCamera = new THREE.PerspectiveCamera(50, heroAvatarContainer.clientWidth / heroAvatarContainer.clientHeight, 0.1, 1000);
avatarCamera.position.z = 7;

// Renderer setup for Avatar
const avatarRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
avatarRenderer.setPixelRatio(window.devicePixelRatio);
avatarRenderer.setSize(heroAvatarContainer.clientWidth, heroAvatarContainer.clientHeight);
heroAvatarContainer.appendChild(avatarRenderer.domElement);

// Create Abstract Object (Icosahedron looks futuristic)
const avatarGeometry = new THREE.IcosahedronGeometry(1.4, 1);

// We will use wireframe and a solid interior for a cool aesthetic
const avatarMatSolid = new THREE.MeshPhysicalMaterial({
    color: 0x050510,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
});

const avatarMatWire = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    wireframe: true,
    transparent: true,
    opacity: 0.2
});

const avatarMeshSolid = new THREE.Mesh(avatarGeometry, avatarMatSolid);
const avatarMeshWire = new THREE.Mesh(avatarGeometry, avatarMatWire);
avatarMeshWire.scale.set(1.05, 1.05, 1.05); // slightly larger wireframe
avatarScene.add(avatarMeshSolid);
avatarScene.add(avatarMeshWire);

// Add lighting to Avatar Scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
avatarScene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00f3ff, 2, 50);
pointLight1.position.set(5, 5, 5);
avatarScene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xb026ff, 2, 50);
pointLight2.position.set(-5, -5, 5);
avatarScene.add(pointLight2);


// --- Interaction and Animation ---
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Resize handler
window.addEventListener('resize', () => {
    // BG
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);

    // Avatar
    if (heroAvatarContainer) {
        avatarCamera.aspect = heroAvatarContainer.clientWidth / heroAvatarContainer.clientHeight;
        avatarCamera.updateProjectionMatrix();
        avatarRenderer.setSize(heroAvatarContainer.clientWidth, heroAvatarContainer.clientHeight);
    }
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    // Mouse Parallax easing
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Animate Particles
    particlesMesh.rotation.y += 0.00015;
    particlesMesh.rotation.x += 0.00008;
    
    // Parallax effect on particles based on mouse
    particlesMesh.rotation.y += 0.02 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.02 * (targetY - particlesMesh.rotation.x);

    // Render BG
    bgRenderer.render(bgScene, bgCamera);

    // Animate Avatar Object
    avatarMeshSolid.rotation.y = elapsedTime * 0.08;
    avatarMeshSolid.rotation.x = elapsedTime * 0.06;
    
    avatarMeshWire.rotation.y = elapsedTime * -0.04;
    avatarMeshWire.rotation.x = elapsedTime * -0.08;
    
    // Add anti-gravity floating based on time
    const floatOffset = Math.sin(elapsedTime * 0.8) * 0.12;
    avatarMeshSolid.position.y = floatOffset;
    avatarMeshWire.position.y = floatOffset;
    
    // Avatar follows mouse slightly
    avatarMeshSolid.rotation.z += 0.05 * (targetX * 2 - avatarMeshSolid.rotation.z);
    avatarMeshWire.rotation.z += 0.05 * (targetX * 2 - avatarMeshWire.rotation.z);

    // Render Avatar
    avatarRenderer.render(avatarScene, avatarCamera);
}

animate();
