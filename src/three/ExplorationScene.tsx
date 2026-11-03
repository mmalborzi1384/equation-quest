import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';
import { landmarks, type Landmark } from '../data/exploration';
import type { Point } from '../features/exploration/movement';

const colors = ['#65b89b', '#927dbb', '#426d83', '#bd9456'];
function Marker({
  landmark,
  index,
  onInspect,
  selected,
}: {
  landmark: Landmark;
  index: number;
  onInspect: (id: string) => void;
  selected: boolean;
}) {
  const color = colors[index];
  return (
    <group position={[landmark.x, 0, landmark.z]}>
      <mesh receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.16, 8]} />
        <meshStandardMaterial color={selected ? '#e9b968' : '#253d4e'} />
      </mesh>
      <group
        onClick={(event) => {
          event.stopPropagation();
          onInspect(landmark.id);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = '';
        }}
      >
        <mesh castShadow position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.7, 0.85, 0.8, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {index === 0 ? (
          <>
            <mesh castShadow position={[0, 1.1, 0]}>
              <boxGeometry args={[1.7, 0.13, 0.18]} />
              <meshStandardMaterial color="#f0e9d8" />
            </mesh>
            {[-0.65, 0.65].map((x) => (
              <mesh key={x} castShadow position={[x, 0.85, 0]}>
                <cylinderGeometry args={[0.35, 0.29, 0.12, 12]} />
                <meshStandardMaterial color="#e9b968" />
              </mesh>
            ))}
          </>
        ) : index === 1 ? (
          <>
            <mesh castShadow position={[0, 1.1, 0]}>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshStandardMaterial color="#f0e9d8" />
            </mesh>
            <mesh castShadow position={[0.6, 0.88, -0.4]}>
              <coneGeometry args={[0.38, 0.9, 5]} />
              <meshStandardMaterial color="#325b58" />
            </mesh>
          </>
        ) : index === 2 ? (
          <mesh castShadow position={[0, 1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.53, 0.15, 8, 20]} />
            <meshStandardMaterial color="#f0e9d8" />
          </mesh>
        ) : (
          <>
            {[-0.4, 0.4].map((x) => (
              <mesh key={x} castShadow position={[x, 1.08, 0]}>
                <boxGeometry args={[0.37, 0.52, 0.48]} />
                <meshStandardMaterial color="#f0e9d8" />
              </mesh>
            ))}
            <mesh castShadow position={[0, 1.33, 0]}>
              <boxGeometry args={[1.25, 0.13, 0.54]} />
              <meshStandardMaterial color="#e9b968" />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
}
function Walker({ position }: { position: Point }) {
  const group = useRef<Group>(null);
  useFrame(() => {
    if (group.current) group.current.position.set(position.x, 0, position.z);
  });
  return (
    <group ref={group} position={[position.x, 0, position.z]}>
      <mesh castShadow position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.34, 0.38, 0.65, 8]} />
        <meshStandardMaterial color="#172a46" />
      </mesh>
      <mesh castShadow position={[0, 0.99, 0]}>
        <sphereGeometry args={[0.31, 12, 8]} />
        <meshStandardMaterial color="#e9b968" />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.49, 16]} />
        <meshBasicMaterial color="#172a46" />
      </mesh>
    </group>
  );
}
function FollowCamera({ position, reducedMotion }: { position: Point; reducedMotion: boolean }) {
  const { size } = useThree();
  useFrame(({ camera }, delta) => {
    const tx = position.x + 8,
      tz = position.z + 8;
    const t = reducedMotion ? 1 : Math.min(1, delta * 5);
    camera.position.x += (tx - camera.position.x) * t;
    camera.position.z += (tz - camera.position.z) * t;
    camera.lookAt(position.x, 0, position.z);
    camera.updateProjectionMatrix();
  });
  return (
    <OrthographicCamera
      makeDefault
      position={[8, 10, 8]}
      zoom={Math.min(60, Math.max(28, size.width / 18))}
      near={0.1}
      far={100}
    />
  );
}
function Island({ quality }: { quality: 'low' | 'balanced' | 'high' }) {
  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.23, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#476975" />
      </mesh>
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[12, 0.28, 12]} />
        <meshStandardMaterial color="#dfd7bd" roughness={1} />
      </mesh>
      <mesh receiveShadow position={[0, 0.105, 0]}>
        <boxGeometry args={[1.05, 0.035, 11]} />
        <meshStandardMaterial color="#b5a987" />
      </mesh>
      <mesh receiveShadow position={[0, 0.105, 0]}>
        <boxGeometry args={[11, 0.035, 1.05]} />
        <meshStandardMaterial color="#b5a987" />
      </mesh>
      {quality !== 'low' &&
        [-5, 5].flatMap((x) =>
          [-5, 5].map((z) => (
            <mesh key={`${x}-${z}`} castShadow position={[x, 0.37, z]}>
              <coneGeometry args={[0.6, 1.2, 5]} />
              <meshStandardMaterial color="#386a62" />
            </mesh>
          )),
        )}
      <mesh receiveShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.14, 8]} />
        <meshStandardMaterial color="#172a46" />
      </mesh>
    </>
  );
}
export default function ExplorationScene({
  position,
  selected,
  quality,
  reducedMotion,
  paused,
  onInspect,
  onContextLost,
}: {
  position: Point;
  selected: string | null;
  quality: 'low' | 'balanced' | 'high';
  reducedMotion: boolean;
  paused: boolean;
  onInspect: (id: string) => void;
  onContextLost: () => void;
}) {
  const ratio = { low: 1, balanced: 1.5, high: 2 }[quality];
  return (
    <Canvas
      aria-label="نمای سه‌بعدی جزیره و چهار نشان منطقه"
      shadows={quality === 'high'}
      dpr={[1, ratio]}
      frameloop={paused ? 'demand' : 'always'}
      gl={{
        antialias: quality !== 'low',
        powerPreference: quality === 'low' ? 'low-power' : 'high-performance',
      }}
      onCreated={({ gl }) =>
        gl.domElement.addEventListener('webglcontextlost', onContextLost, { once: true })
      }
    >
      <color attach="background" args={['#c6d9d8']} />
      <ambientLight intensity={2.1} />
      <directionalLight
        position={[5, 10, 3]}
        intensity={2.2}
        castShadow={quality === 'high'}
        shadow-mapSize={[512, 512]}
      />
      <FollowCamera position={position} reducedMotion={reducedMotion} />
      <Island quality={quality} />
      {landmarks.map((landmark, index) => (
        <Marker
          key={landmark.id}
          landmark={landmark}
          index={index}
          onInspect={onInspect}
          selected={landmark.id === selected}
        />
      ))}
      <Walker position={position} />
    </Canvas>
  );
}
