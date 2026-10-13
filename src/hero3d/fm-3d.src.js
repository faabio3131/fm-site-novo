// Hero 3D da FM Tecnologia: marca FM extrudada em metal, com o núcleo verde brilhante.
// Fonte do bundle assets/fm-3d.js  ->  npm run build:3d
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Shape, ExtrudeGeometry, Mesh,
  MeshPhysicalMaterial, MeshStandardMaterial, PointLight, DirectionalLight, AmbientLight,
  PMREMGenerator, Color, ACESFilmicToneMapping, SRGBColorSpace, CanvasTexture, Sprite,
  SpriteMaterial, AdditiveBlending, PlaneGeometry, MeshBasicMaterial, BufferGeometry,
  Float32BufferAttribute, Points, PointsMaterial, DoubleSide
} from 'three';

// Contornos da marca (px de 860x456, extraídos da logo oficial)
const M = [[105,143],[180,62],[420,62],[540,185],[690,62],[750,60],[748,403],[668,403],[660,185],[532,300],[382,143]];
const G = [[365,170],[378,210],[438,252],[442,440],[372,398],[366,390]];
const CX = 412, CY = 250, S = 0.0058;

function poly(pts) {
  const s = new Shape();
  pts.forEach(([x, y], i) => (i ? s.lineTo(x - CX, CY - y) : s.moveTo(x - CX, CY - y)));
  s.closePath();
  return s;
}
function fShape() {
  const p = (x, y) => [x - CX, CY - y];
  const s = new Shape();
  s.moveTo(...p(75, 405)); s.lineTo(...p(75, 262));
  s.quadraticCurveTo(...p(75, 190), ...p(152, 190));
  s.lineTo(...p(306, 190)); s.lineTo(...p(306, 268)); s.lineTo(...p(160, 270)); s.lineTo(...p(157, 405));
  s.closePath();
  return s;
}
const extrude = (shape, depth, bevel) => {
  const g = new ExtrudeGeometry(shape, {
    depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * 0.9,
    bevelSegments: 4, curveSegments: 18
  });
  g.translate(0, 0, -depth / 2);
  return g;
};

function glowTexture(rgb) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d'), g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, `rgba(${rgb},0.95)`); g.addColorStop(0.25, `rgba(${rgb},0.38)`); g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  return new CanvasTexture(c);
}

// Ambiente de estúdio (softboxes) para o reflexo do metal, sem depender de arquivos externos
function studioEnv(renderer) {
  const env = new Scene();
  env.background = new Color(0x05080d);
  const box = (w, h, x, y, z, col, k) => {
    const m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: new Color(col).multiplyScalar(k), side: DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  };
  box(16, 6, 0, 9, 4, 0xffffff, 5.5);
  box(6, 14, -9, 1, 3, 0xdce8ff, 4);
  box(6, 12, 9, 0, 1, 0xffffff, 3);
  box(12, 3, 0, -7, 5, 0x77ff3d, 1.2);
  box(10, 4, 0, 2, -9, 0x8fb4ff, 1.2);
  const pm = new PMREMGenerator(renderer);
  const tex = pm.fromScene(env, 0.03).texture;
  pm.dispose();
  return tex;
}

export function mount(host) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = matchMedia('(max-width: 640px)').matches;
  const canvas = host.querySelector('canvas');
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, narrow ? 1.5 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new Scene();
  scene.environment = studioEnv(renderer);
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0.1, 9.2);

  const rig = new Group(); scene.add(rig);
  const logo = new Group(); logo.scale.setScalar(S); rig.add(logo);

  const metal = new MeshPhysicalMaterial({
    color: 0xe4e8ec, metalness: 0.85, roughness: 0.24, clearcoat: 0.7, clearcoatRoughness: 0.18, envMapIntensity: 3.4
  });
  const metalDark = metal.clone(); metalDark.color = new Color(0xc2c8cf);
  const top = new Mesh(extrude(poly(M), 70, 7), metal);
  const fArm = new Mesh(extrude(fShape(), 70, 7), metalDark);
  const core = new Mesh(extrude(poly(G), 38, 4), new MeshStandardMaterial({
    color: 0x35bd08, emissive: 0x2fe000, emissiveIntensity: 0.95, roughness: 0.4, metalness: 0
  }));
  core.position.z = 4;
  logo.add(top, fArm, core);

  // brilho verde do núcleo (luz + halo)
  const coreWorld = { x: (402 - CX) * S, y: (CY - 300) * S };
  const green = new PointLight(0x62ff2a, 3.2, 2.6, 1.8); green.position.set(coreWorld.x, coreWorld.y, 0.9); rig.add(green);
  const halo = new Sprite(new SpriteMaterial({ map: glowTexture('110,255,60'), blending: AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.85 }));
  halo.scale.set(2.6, 2.6, 1); halo.position.set(coreWorld.x, coreWorld.y, -0.2); rig.add(halo);

  const key = new DirectionalLight(0xffffff, 2.6); key.position.set(-4, 5, 6); scene.add(key);
  const rim = new DirectionalLight(0x9cc2ff, 1.4); rim.position.set(6, 1, -4); scene.add(rim);
  scene.add(new AmbientLight(0xffffff, 0.25));

  // sombra de contato
  const sh = new Sprite(new SpriteMaterial({ map: glowTexture('0,0,0'), transparent: true, opacity: 0.55, depthWrite: false }));
  sh.scale.set(4.2, 0.55, 1); sh.position.set(0, -1.5, -0.3); rig.add(sh);

  // partículas sutis
  const n = narrow ? 40 : 90, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { pos[i*3] = (Math.random()-.5)*6; pos[i*3+1] = (Math.random()-.5)*4.2; pos[i*3+2] = (Math.random()-.5)*3 - 0.5; }
  const pg = new BufferGeometry(); pg.setAttribute('position', new Float32BufferAttribute(pos, 3));
  const dust = new Points(pg, new PointsMaterial({ color: 0x8dff55, size: 0.028, transparent: true, opacity: 0.55, depthWrite: false, blending: AdditiveBlending }));
  scene.add(dust);

  const state = { tx: 0, ty: 0, x: 0, y: 0, vis: false, raf: 0 };
  const t0 = performance.now();

  function size() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w / h < 1.15 ? 9.2 * (1.15 / (w / h)) ** 0.8 : 9.2;
    camera.updateProjectionMatrix();
    if (!state.raf) draw(0);
  }

  function draw(t) {
    state.x += (state.tx - state.x) * 0.07; state.y += (state.ty - state.y) * 0.07;
    const sway = reduce ? 0 : Math.sin(t * 0.55) * 0.28;
    rig.rotation.y = -0.32 + sway + state.x * 0.5;
    rig.rotation.x = 0.06 + (reduce ? 0 : Math.sin(t * 0.43) * 0.04) + state.y * 0.26;
    rig.position.y = reduce ? 0 : Math.sin(t * 0.8) * 0.06;
    green.intensity = 3.2 + (reduce ? 0 : Math.sin(t * 1.7) * 0.9);
    halo.material.opacity = 0.8 + (reduce ? 0 : Math.sin(t * 1.7) * 0.08);
    dust.rotation.y = t * 0.02; dust.position.y = Math.sin(t * 0.3) * 0.05;
    renderer.render(scene, camera);
  }
  function loop() { state.raf = requestAnimationFrame(loop); draw((performance.now() - t0) / 1000); }
  function run() { if (!reduce && !state.raf && state.vis && !document.hidden) loop(); }
  function stop() { cancelAnimationFrame(state.raf); state.raf = 0; }

  new ResizeObserver(size).observe(host);
  new IntersectionObserver(([e]) => { state.vis = e.isIntersecting; state.vis ? run() : stop(); }).observe(host);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : run()));
  if (!reduce) {
    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect();
      state.tx = ((e.clientX - r.left) / r.width - 0.5) * 2; state.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    host.addEventListener('pointerleave', () => { state.tx = 0; state.ty = 0; });
  }
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); stop(); host.classList.remove('is3d'); });
  size(); draw(0);
  host.classList.add('is3d');
  window.__fm3d = { scene, camera, rig, renderer, draw };
}
