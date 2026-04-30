'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Terrain() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.04;
  });
  // displaced plane for rolling hills
  const geo = new THREE.PlaneGeometry(40, 40, 64, 64);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = Math.sin(x * 0.3) * 0.6 + Math.cos(y * 0.25) * 0.8 + Math.sin((x + y) * 0.15) * 0.5;
    pos.setZ(i, z);
  }
  geo.computeVertexNormals();
  return (
    <mesh ref={ref} geometry={geo} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2.4, 0]}>
      <meshStandardMaterial color="#3d5942" flatShading roughness={0.9} />
    </mesh>
  );
}

function Trees() {
  const trees: { x: number; z: number; s: number }[] = [];
  let s = 7;
  for (let i = 0; i < 26; i++) {
    s = (s * 9301 + 49297) % 233280; const x = (s / 233280 - 0.5) * 30;
    s = (s * 9301 + 49297) % 233280; const z = (s / 233280 - 0.5) * 14 - 4;
    s = (s * 9301 + 49297) % 233280; const sc = 0.6 + (s / 233280) * 0.8;
    trees.push({ x, z, s: sc });
  }
  return (
    <group>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, -1.6, t.z]} scale={t.s}>
          <mesh position={[0, 0.4, 0]}>
            <coneGeometry args={[0.5, 1.6, 6]} />
            <meshStandardMaterial color="#243321" flatShading />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 6]} />
            <meshStandardMaterial color="#3a2e22" flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Sun() {
  return (
    <mesh position={[6, 4, -8]}>
      <sphereGeometry args={[1.1, 24, 24]} />
      <meshBasicMaterial color="#f3e4c4" />
    </mesh>
  );
}

function LowPolyBike() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.3 + 0.4;
    ref.current.position.y = Math.sin(t * 1.2) * 0.08;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ref} position={[0, 0.2, 1.5]} scale={0.9}>
        {/* wheels */}
        <mesh position={[-1.1, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.06, 8, 24]} />
          <meshStandardMaterial color="#1f2418" flatShading />
        </mesh>
        <mesh position={[1.1, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.06, 8, 24]} />
          <meshStandardMaterial color="#1f2418" flatShading />
        </mesh>
        {/* frame triangles */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[1.2, 0.06, 0.06]} />
          <meshStandardMaterial color="#b96f3a" flatShading />
        </mesh>
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[1.0, 0.06, 0.06]} />
          <meshStandardMaterial color="#b96f3a" flatShading />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, 0.9]}>
          <boxGeometry args={[1.0, 0.06, 0.06]} />
          <meshStandardMaterial color="#b96f3a" flatShading />
        </mesh>
        {/* seat post + saddle */}
        <mesh position={[-0.1, 0.45, 0]}>
          <boxGeometry args={[0.04, 0.5, 0.04]} />
          <meshStandardMaterial color="#1f2418" />
        </mesh>
        <mesh position={[-0.1, 0.7, 0]}>
          <boxGeometry args={[0.32, 0.06, 0.12]} />
          <meshStandardMaterial color="#1f2418" />
        </mesh>
        {/* handlebars */}
        <mesh position={[0.95, 0.55, 0]}>
          <boxGeometry args={[0.04, 0.4, 0.04]} />
          <meshStandardMaterial color="#1f2418" />
        </mesh>
        <mesh position={[0.95, 0.78, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.45]} />
          <meshStandardMaterial color="#1f2418" />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <fog attach="fog" args={['#dfe2cc', 8, 28]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 3]} intensity={1.1} color="#f3e4c4" />
      <hemisphereLight args={['#e8d9b8', '#3d5942', 0.5]} />
      <Sun />
      <Terrain />
      <Trees />
      <LowPolyBike />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}
