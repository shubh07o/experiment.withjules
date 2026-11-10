import * as THREE from 'three';

export interface PlanetVisualConfig {
  id: string;
  name: string;
  radius: number;
  orbitDistance: number;
  orbitSpeed: number;
  rotationSpeed: number;
  color: number;
  glowColor: number;
  hasRings?: boolean;
  ringsInnerRadius?: number;
  ringsOuterRadius?: number;
  textureType: 'solid' | 'clouds' | 'craters' | 'gas_bands' | 'terrestrial';
}

function createPlanetTexture(type: PlanetVisualConfig['textureType'], baseHex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const baseColor = new THREE.Color(baseHex);
  ctx.fillStyle = `#${baseColor.getHexString()}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (type === 'gas_bands') {
    for (let y = 0; y < canvas.height; y += 4) {
      const n = Math.sin(y * 0.05) * 0.5 + Math.cos(y * 0.02) * 0.3;
      const shade = baseColor.clone().offsetHSL(n * 0.05, 0, (Math.random() - 0.5) * 0.15);
      ctx.fillStyle = `#${shade.getHexString()}`;
      ctx.fillRect(0, y, canvas.width, 4);
    }
    // Great spot feature
    ctx.beginPath();
    ctx.ellipse(600, 320, 60, 35, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#b33927';
    ctx.fill();
  } else if (type === 'clouds' || type === 'terrestrial') {
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 10 + Math.random() * 50;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = type === 'terrestrial' ? 'rgba(34, 139, 34, 0.4)' : 'rgba(255, 255, 255, 0.25)';
      ctx.fill();
    }
  } else if (type === 'craters') {
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 4 + Math.random() * 18;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createOrbitLine(distance: number): THREE.Line {
  const segments = 128;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array((segments + 1) * 3);

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    positions[i * 3] = Math.cos(theta) * distance;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(theta) * distance;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({
    color: 0x336699,
    transparent: true,
    opacity: 0.25,
  });

  return new THREE.Line(geometry, material);
}

export function createPlanetMesh(config: PlanetVisualConfig): {
  group: THREE.Group;
  mesh: THREE.Mesh;
  glowMesh: THREE.Mesh;
} {
  const group = new THREE.Group();
  group.name = `group_${config.id}`;

  const geometry = new THREE.SphereGeometry(config.radius, 48, 48);
  const texture = createPlanetTexture(config.textureType, config.color);

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.7,
    metalness: 0.1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = config.id;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  // Atmospheric Glow
  const glowGeo = new THREE.SphereGeometry(config.radius * 1.12, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: config.glowColor,
    transparent: true,
    opacity: 0.18,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const glowMesh = new THREE.Mesh(glowGeo, glowMat);
  group.add(glowMesh);

  // Planetary Rings (e.g. Saturn)
  if (config.hasRings && config.ringsInnerRadius && config.ringsOuterRadius) {
    const ringGeo = new THREE.RingGeometry(config.ringsInnerRadius, config.ringsOuterRadius, 64);
    ringGeo.rotateX(Math.PI / 2);

    const ringCanvas = document.createElement('canvas');
    ringCanvas.width = 256;
    ringCanvas.height = 1;
    const ringCtx = ringCanvas.getContext('2d')!;
    const grad = ringCtx.createLinearGradient(0, 0, 256, 0);
    grad.addColorStop(0, 'rgba(210, 180, 140, 0)');
    grad.addColorStop(0.3, 'rgba(210, 180, 140, 0.8)');
    grad.addColorStop(0.6, 'rgba(180, 150, 110, 0.3)');
    grad.addColorStop(0.85, 'rgba(210, 180, 140, 0.9)');
    grad.addColorStop(1, 'rgba(210, 180, 140, 0)');
    ringCtx.fillStyle = grad;
    ringCtx.fillRect(0, 0, 256, 1);

    const ringTexture = new THREE.CanvasTexture(ringCanvas);
    const ringMat = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });

    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = THREE.MathUtils.degToRad(18);
    group.add(ringMesh);
  }

  return { group, mesh, glowMesh };
}
