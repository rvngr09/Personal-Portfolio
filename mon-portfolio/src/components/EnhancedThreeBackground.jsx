// components/EnhancedThreeBackground.jsx
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shared mouse projection helper (projected into 3D world space at scene depth)
function useMouseWorld() {
  const { camera, pointer } = useThree();
  const mouseWorldRef = useRef(new THREE.Vector3());

  useFrame(() => {
    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
    vector.unproject(camera);
    const direction = vector.sub(camera.position).normalize();
    mouseWorldRef.current.copy(camera.position).add(direction.multiplyScalar(9)); // tuned to scene scale
  });

  return mouseWorldRef;
}

// Camera with smooth parallax (makes the whole scene feel alive and responsive)
function CameraController() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 1, 12));

  useFrame((state) => {
    // Gentle parallax based on normalized mouse (R3F pointer)
    targetPos.current.x = THREE.MathUtils.lerp(targetPos.current.x, state.pointer.x * 2.8, 0.08);
    targetPos.current.y = THREE.MathUtils.lerp(targetPos.current.y, 1 + state.pointer.y * 1.8, 0.08);

    camera.position.lerp(targetPos.current, 0.12);
    camera.lookAt(0, 0.2, 0); // slight upward tilt for depth
  });

  return null;
}

// === UPGRADED: Dynamic Aura Particles (4000 particles) ===
// Now fully simulated with velocity + strong mouse repulsion + spring-back to ring shape
// This creates fluid, interactive "energy waves" when you move your mouse
function AuraParticles() {
  const groupRef = useRef();
  const geometryRef = useRef();
  const { camera } = useThree(); // for mouse projection
  const mouseWorld = useMouseWorld();

  const count = 5200; // richer look
  const positionsArray = useMemo(() => new Float32Array(count * 3), []);
  const velocitiesRef = useRef(new Float32Array(count * 3));
  const basePositionsRef = useRef(new Float32Array(count * 3));

  // Initialize ring-layered base positions + tiny velocities
  useMemo(() => {
    const base = basePositionsRef.current;
    const vel = velocitiesRef.current;

    for (let i = 0; i < count; i++) {
      const layer = Math.floor(Math.random() * 4); // 4 layers for more depth
      let radius = 5.2 + Math.random() * 5.5;
      if (layer === 0) radius = 5.2 + Math.random() * 1.4;
      else if (layer === 1) radius = 7 + Math.random() * 2;
      else if (layer === 2) radius = 9.5 + Math.random() * 2.2;
      else radius = 12 + Math.random() * 2.8;

      const angle = Math.random() * Math.PI * 2;
      const yRange = layer === 0 ? 2.2 : layer === 1 ? 3.5 : layer === 2 ? 4.5 : 5.5;
      const y = (Math.random() - 0.5) * yRange;

      const i3 = i * 3;
      base[i3] = Math.cos(angle) * radius;
      base[i3 + 1] = y;
      base[i3 + 2] = Math.sin(angle) * radius;

      // tiny starting velocity
      vel[i3] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    positionsArray.set(base); // initial copy
  }, [positionsArray]);

  useFrame((state) => {
    if (!geometryRef.current) return;

    const positions = geometryRef.current.attributes.position.array;
    const velocities = velocitiesRef.current;
    const base = basePositionsRef.current;
    const mousePos = mouseWorld.current;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      let px = positions[i3];
      let py = positions[i3 + 1];
      let pz = positions[i3 + 2];

      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      // === STRONG MOUSE REPULSION (the "wow" interactive part) ===
      const dx = px - mousePos.x;
      const dy = py - mousePos.y;
      const dz = pz - mousePos.z;
      const distSq = dx * dx + dy * dy + dz * dz + 0.001; // avoid divide by zero
      const force = 2.8 / (distSq * 0.6 + 1); // very strong near mouse

      vx += (dx / Math.sqrt(distSq)) * force * 0.028;
      vy += (dy / Math.sqrt(distSq)) * force * 0.028;
      vz += (dz / Math.sqrt(distSq)) * force * 0.028;

      // gentle damping + orbital drift
      vx *= 0.935;
      vy *= 0.935;
      vz *= 0.935;

      // update position
      px += vx;
      py += vy;
      pz += vz;

      // Spring back to original ring shape (keeps the beautiful aura rings while allowing interaction)
      const bx = base[i3];
      const by = base[i3 + 1];
      const bz = base[i3 + 2];
      px += (bx - px) * 0.038;
      py += (by - py) * 0.038;
      pz += (bz - pz) * 0.038;

      // write back
      positions[i3] = px;
      positions[i3 + 1] = py;
      positions[i3 + 2] = pz;

      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;
    }

    geometryRef.current.attributes.position.needsUpdate = true;

    // overall gentle group rotation (still feels cosmic)
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.018;
      groupRef.current.rotation.x = Math.sin(time * 0.09) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positionsArray}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#a78bff"
          size={0.045}
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthTest={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// === UPGRADED: Glowing Orbs (now 12 orbs with mouse repulsion + size reaction) ===
function GlowingOrbs() {
  const orbsRef = useRef([]);
  const mouseWorld = useMouseWorld();
  const count = 12;

  const orbsData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      baseRadius: 5.8 + Math.random() * 4.2,
      speed: 0.25 + Math.random() * 0.55,
      angle: (i / count) * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * 3.5,
      baseSize: 0.09 + Math.random() * 0.13,
      color: i % 4 === 0 ? '#b388ff' : i % 4 === 1 ? '#64ffda' : i % 4 === 2 ? '#ff6b9d' : '#00f7ff',
      velocity: new THREE.Vector3(),
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mousePos = mouseWorld.current;

    orbsData.forEach((orb, i) => {
      const mesh = orbsRef.current[i];
      if (!mesh) return;

      // base orbital movement
      let angle = orb.angle + time * orb.speed;
      let x = Math.cos(angle) * orb.baseRadius;
      let z = Math.sin(angle) * orb.baseRadius;
      let y = Math.sin(time * 0.9 + i) * 1.8 + orb.yOffset;

      // === Mouse repulsion on orbs ===
      const dx = mesh.position.x - mousePos.x;
      const dy = mesh.position.y - mousePos.y;
      const dz = mesh.position.z - mousePos.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;
      const repelForce = 1.8 / (dist * dist + 1);

      x += dx * repelForce * 0.04;
      y += dy * repelForce * 0.04;
      z += dz * repelForce * 0.04;

      mesh.position.set(x, y, z);

      // Mouse proximity makes orbs brighter + bigger (super satisfying feedback)
      const proximity = Math.max(0, 1.6 - dist * 0.18);
      mesh.scale.setScalar(orb.baseSize * (1 + proximity * 1.4));
      mesh.material.emissiveIntensity = 0.7 + proximity * 2.2;
    });
  });

  return (
    <>
      {orbsData.map((orb, i) => (
        <mesh key={i} ref={(el) => (orbsRef.current[i] = el)}>
          <sphereGeometry args={[orb.baseSize, 24, 24]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.7}
            transparent
            opacity={0.92}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>
      ))}
    </>
  );
}

// === UPGRADED: Outer Rings (more dynamic pulsing + mouse-driven rotation boost) ===
function OuterRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const mouseWorld = useMouseWorld();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mousePos = mouseWorld.current;

    // subtle mouse influence on ring rotation speed
    const mouseInfluence = mousePos.x * 0.6 + mousePos.z * 0.3;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = time * 0.08 + mouseInfluence * 0.04;
      ring1Ref.current.rotation.x = Math.sin(time * 0.25) * 0.12;
      ring1Ref.current.material.emissiveIntensity = 0.4 + Math.sin(time * 2) * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.045 + mouseInfluence * 0.03;
      ring2Ref.current.rotation.z = Math.cos(time * 0.3) * 0.15;
      ring2Ref.current.material.emissiveIntensity = 0.35 + Math.sin(time * 1.7) * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.11 + mouseInfluence * 0.05;
      ring3Ref.current.rotation.z = time * 0.06;
      ring3Ref.current.material.emissiveIntensity = 0.3 + Math.sin(time * 2.3) * 0.18;
    }
  });

  return (
    <>
      {/* Ring 1 - closest */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[5.5, 0.035, 128, 320]} />
        <meshStandardMaterial
          color="#a78bff"
          emissive="#c084ff"
          emissiveIntensity={0.4}
          metalness={0.95}
          roughness={0.15}
          transparent
          opacity={0.75}
        />
      </mesh>
      {/* Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[7.2, 0.028, 128, 340]} />
        <meshStandardMaterial
          color="#5e17eb"
          emissive="#8b2aff"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.68}
        />
      </mesh>
      {/* Ring 3 - farthest */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[9.1, 0.032, 128, 400]} />
        <meshStandardMaterial
          color="#1e0a4f"
          emissive="#4a1a9e"
          emissiveIntensity={0.3}
          metalness={0.85}
          roughness={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>
    </>
  );
}

// === UPGRADED: Floating Crystal (higher detail + mouse-reactive glow) ===
function FloatingCrystal() {
  const meshRef = useRef();
  const mouseWorld = useMouseWorld();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mousePos = mouseWorld.current;

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.12;
      meshRef.current.rotation.y = time * 0.18;
      meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.1;

      meshRef.current.position.y = Math.sin(time * 0.9) * 0.18;

      // Mouse makes crystal pulse brighter when close
      const dist = meshRef.current.position.distanceTo(mousePos);
      const proximityBoost = Math.max(0, 2.5 - dist * 0.3);
      meshRef.current.material.emissiveIntensity = 0.6 + Math.sin(time * 3) * 0.3 + proximityBoost * 1.8;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.50, 4]} /> {/* higher detail */}
      <meshStandardMaterial
        color="#1a171e"
        emissive="#2f071d"
        emissiveIntensity={0.6}
        metalness={0.95}
        roughness={0.05}
        flatShading={false}
      />
    </mesh>
  );
}

// === Dust Particles (subtle background, now with very light mouse drift) ===
function DustParticles() {
  const particlesRef = useRef();
  const geometryRef = useRef();
  const count = 12000;
  const positionsArray = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24 - 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positionsArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e0d4ff"
        size={0.018}
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// === NEW: 3D Mouse Cursor (visual feedback that proves it's truly interactive) ===
function MouseCursor() {
  const meshRef = useRef();
  const mouseWorld = useMouseWorld();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(mouseWorld.current);
      meshRef.current.scale.setScalar(0.15 + Math.sin(Date.now() * 0.008) * 0.04);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthTest={false}
      />
    </mesh>
  );
}

// Main Scene
export default function EnhancedThreeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 1, 12], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* === LIGHTING (richer and more atmospheric) === */}
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 6, 6]} intensity={0.8} color="#c084ff" distance={30} decay={1.2} />
        <pointLight position={[-5, -3, 8]} intensity={0.7} color="#64ffda" distance={30} decay={1.2} />
        <pointLight position={[0, 4, -6]} intensity={0.5} color="#00f7ff" distance={25} decay={1} />
        <directionalLight position={[2, 3, 2]} intensity={0.4} color="#ffffff" />
        <hemisphereLight args={['#2a1a4f', '#0a0a1f', 0.45]} />

        {/* === 3D ELEMENTS === */}
        {/* <CameraController /> */}
        {/* <OuterRings /> */}
        <AuraParticles />
        <GlowingOrbs />
        {/* <FloatingCrystal /> */}
        <DustParticles />
        <MouseCursor />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a1f', 8, 35]} />
      </Canvas>
    </div>
  );
}