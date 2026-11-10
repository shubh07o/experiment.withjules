import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createStarfield } from './Starfield';
import { createPlanetMesh, createOrbitLine, type PlanetVisualConfig } from './PlanetMesh';

export const PLANET_VISUAL_CONFIGS: PlanetVisualConfig[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    radius: 1.2,
    orbitDistance: 26,
    orbitSpeed: 0.04,
    rotationSpeed: 0.01,
    color: 0x9e9e9e,
    glowColor: 0xcccccc,
    textureType: 'craters',
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 2.2,
    orbitDistance: 38,
    orbitSpeed: 0.025,
    rotationSpeed: -0.005,
    color: 0xe3bb76,
    glowColor: 0xffaa44,
    textureType: 'clouds',
  },
  {
    id: 'earth',
    name: 'Earth',
    radius: 2.5,
    orbitDistance: 54,
    orbitSpeed: 0.018,
    rotationSpeed: 0.02,
    color: 0x2277bb,
    glowColor: 0x00ffff,
    textureType: 'terrestrial',
  },
  {
    id: 'mars',
    name: 'Mars',
    radius: 1.6,
    orbitDistance: 70,
    orbitSpeed: 0.014,
    rotationSpeed: 0.018,
    color: 0xc1440e,
    glowColor: 0xff5533,
    textureType: 'craters',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    radius: 5.5,
    orbitDistance: 96,
    orbitSpeed: 0.008,
    rotationSpeed: 0.04,
    color: 0xd8ca9d,
    glowColor: 0xffcc88,
    textureType: 'gas_bands',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    radius: 4.6,
    orbitDistance: 126,
    orbitSpeed: 0.0055,
    rotationSpeed: 0.038,
    color: 0xe2bf7d,
    glowColor: 0xddc088,
    hasRings: true,
    ringsInnerRadius: 6.2,
    ringsOuterRadius: 11.5,
    textureType: 'gas_bands',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    radius: 3.4,
    orbitDistance: 156,
    orbitSpeed: 0.0035,
    rotationSpeed: 0.03,
    color: 0x274687,
    glowColor: 0x3388ff,
    textureType: 'clouds',
  },
];

interface SolarSystemCanvasProps {
  selectedPlanetId: string | null;
  onSelectPlanet: (id: string | null) => void;
  speedMultiplier: number;
  isPaused: boolean;
  onHoverPlanet?: (id: string | null) => void;
}

export const SolarSystemCanvas: React.FC<SolarSystemCanvasProps> = ({
  selectedPlanetId,
  onSelectPlanet,
  speedMultiplier,
  isPaused,
  onHoverPlanet,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const planetGroupsRef = useRef<Map<string, { group: THREE.Group; mesh: THREE.Mesh; config: PlanetVisualConfig }>>(
    new Map()
  );
  const orbitAnglesRef = useRef<Map<string, number>>(new Map());

  // Camera targets for smooth lerping
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 75, 175));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Mouse interaction state
  const isDragging = useRef(false);
  const mousePrev = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ radius: 190, theta: THREE.MathUtils.degToRad(45), phi: THREE.MathUtils.degToRad(60) });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030712, 0.002);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 80, 180);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Starfield background
    const starfield = createStarfield(3000, 1100);
    scene.add(starfield);

    // Sun at coordinate center
    const sunGeo = new THREE.SphereGeometry(9, 48, 48);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfff6cf });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.name = 'sun';
    scene.add(sunMesh);

    // Sun Corona & Atmosphere Glow
    const coronaGeo = new THREE.SphereGeometry(12.5, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    scene.add(coronaMesh);

    const outerCoronaGeo = new THREE.SphereGeometry(18, 32, 32);
    const outerCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xff4400,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(outerCoronaGeo, outerCoronaMat));

    // Illumination
    const sunLight = new THREE.PointLight(0xffffff, 2.8, 1200, 0.4);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x223344, 0.45);
    scene.add(ambientLight);

    // Planets & orbits
    PLANET_VISUAL_CONFIGS.forEach((config, idx) => {
      // Orbit Line
      const orbitLine = createOrbitLine(config.orbitDistance);
      scene.add(orbitLine);

      // Planet Mesh & Glow
      const { group, mesh } = createPlanetMesh(config);
      const startAngle = (idx * (Math.PI * 2)) / PLANET_VISUAL_CONFIGS.length;
      orbitAnglesRef.current.set(config.id, startAngle);

      group.position.x = Math.cos(startAngle) * config.orbitDistance;
      group.position.z = Math.sin(startAngle) * config.orbitDistance;
      scene.add(group);

      planetGroupsRef.current.set(config.id, { group, mesh, config });
    });

    // Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Raycasting for planet clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      isDragging.current = true;
      mousePrev.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - mousePrev.current.x;
        const deltaY = e.clientY - mousePrev.current.y;
        mousePrev.current = { x: e.clientX, y: e.clientY };

        sphericalRef.current.theta -= deltaX * 0.005;
        sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, sphericalRef.current.phi - deltaY * 0.005));
      }

      // Check hover
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(planetGroupsRef.current.values()).map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        onHoverPlanet?.(intersects[0].object.name);
      } else {
        onHoverPlanet?.(null);
      }
    };

    const handlePointerUp = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = Math.abs(e.clientX - mousePrev.current.x);
        const deltaY = Math.abs(e.clientY - mousePrev.current.y);
        isDragging.current = false;

        // If it was a click, raycast
        if (deltaX < 3 && deltaY < 3) {
          const rect = container.getBoundingClientRect();
          mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const meshes = Array.from(planetGroupsRef.current.values()).map((p) => p.mesh);
          const intersects = raycaster.intersectObjects(meshes);

          if (intersects.length > 0) {
            onSelectPlanet(intersects[0].object.name);
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      sphericalRef.current.radius = Math.max(30, Math.min(450, sphericalRef.current.radius + e.deltaY * 0.1));
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: true });

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Rotate Sun
      sunMesh.rotation.y += 0.002;
      coronaMesh.rotation.y -= 0.001;

      // Rotate Starfield
      starfield.rotation.y += 0.00015;

      // Update Planet Orbits & Rotations
      planetGroupsRef.current.forEach(({ group, mesh, config }) => {
        mesh.rotation.y += config.rotationSpeed;

        if (!isPaused) {
          const currentAngle = orbitAnglesRef.current.get(config.id) || 0;
          const nextAngle = currentAngle + config.orbitSpeed * delta * speedMultiplier;
          orbitAnglesRef.current.set(config.id, nextAngle);

          group.position.x = Math.cos(nextAngle) * config.orbitDistance;
          group.position.z = Math.sin(nextAngle) * config.orbitDistance;
        }
      });

      // Update Camera Position and Focus
      if (selectedPlanetId && planetGroupsRef.current.has(selectedPlanetId)) {
        const targetGroup = planetGroupsRef.current.get(selectedPlanetId)!.group;
        const targetRadius = planetGroupsRef.current.get(selectedPlanetId)!.config.radius;
        const offset = Math.max(targetRadius * 4.2, 12);

        targetLookAt.current.copy(targetGroup.position);
        targetCamPos.current.set(
          targetGroup.position.x + offset * 0.8,
          targetGroup.position.y + offset * 0.5,
          targetGroup.position.z + offset * 0.8
        );
      } else {
        // Solar system free orbit camera
        const { radius, theta, phi } = sphericalRef.current;
        targetCamPos.current.set(
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.cos(theta)
        );
        targetLookAt.current.set(0, 0, 0);
      }

      // Smooth camera interpolation
      camera.position.lerp(targetCamPos.current, 0.06);
      currentLookAt.current.lerp(targetLookAt.current, 0.06);
      camera.lookAt(currentLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectPlanet, onHoverPlanet, speedMultiplier, isPaused, selectedPlanetId]);

  return <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing select-none" />;
};
