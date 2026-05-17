import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import "./PixilaClone.css";

function LoadingFallback() {
  return (
    <Html center className="pixila-loader">
      Carregando experiência 3D…
    </Html>
  );
}

function PixilaModel({ modelPath }) {
  const { scene } = useGLTF(modelPath, true, true, (loader) => {
    loader.setDecoderPath("/draco/");
  });

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return <primitive object={clonedScene} scale={1.45} position={[0, -1.2, 0]} />;
}

function FallbackOrb() {
  return (
    <Float speed={2.2} rotationIntensity={0.7} floatIntensity={0.9}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.35, 4]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#26105c"
          metalness={0.35}
          roughness={0.28}
        />
      </mesh>
      <mesh rotation={[0.65, 0.35, 0]}>
        <torusGeometry args={[1.85, 0.035, 16, 160]} />
        <meshStandardMaterial color="#67e8f9" emissive="#164e63" />
      </mesh>
    </Float>
  );
}

function Scene() {
  const configuredModelPath = import.meta.env.VITE_PIXILA_MODEL || "";

  return (
    <Canvas shadows dpr={[1, 2]} className="pixila-canvas">
      <PerspectiveCamera makeDefault position={[0, 0.7, 5.2]} fov={42} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} castShadow />
      <pointLight position={[-3, 2, 4]} color="#8b5cf6" intensity={2.2} />
      <Suspense fallback={<LoadingFallback />}>
        {configuredModelPath ? <PixilaModel modelPath={configuredModelPath} /> : <FallbackOrb />}
        <Environment preset="city" />
        <ContactShadows position={[0, -1.55, 0]} opacity={0.35} blur={2.8} scale={7} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={3.4}
        maxDistance={7}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}

export default function PixilaClone() {
  const highlights = ["Assets públicos prontos", "Cena Three.js", "Layout Vite/React"];

  return (
    <main className="pixila-shell">
      <section className="pixila-hero" aria-labelledby="pixila-title">
        <div className="pixila-copy">
          <p className="pixila-eyebrow">Pixila clone</p>
          <h1 id="pixila-title">Experiência interativa preparada para seus assets.</h1>
          <p className="pixila-description">
            Este projeto já está estruturado como um app React/Vite. Copie as pastas
            <code> public/draco</code>, <code>public/models</code> e <code>public/pictures</code>
            para substituir o placeholder pela experiência Pixila completa. Defina VITE_PIXILA_MODEL=/models/seu-arquivo.glb para carregar o GLB.
          </p>
          <div className="pixila-actions">
            <a href="#asset-layout" className="pixila-button pixila-button--primary">
              Ver estrutura
            </a>
            <a href="https://vite.dev" className="pixila-button pixila-button--ghost">
              Docs Vite
            </a>
          </div>
          <ul className="pixila-highlights" aria-label="Recursos configurados">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="pixila-stage" aria-label="Prévia 3D Pixila">
          <Scene />
        </div>
      </section>

      <section id="asset-layout" className="pixila-panel">
        <h2>Onde colocar os assets</h2>
        <pre>{`public/
  draco/
  models/
  pictures/`}</pre>
        <p>
          A pasta <code>_astro</code> não é necessária para rodar esta versão React; mantenha-a fora
          do app até decidir quais scripts ou estilos originais precisam ser migrados.
        </p>
      </section>
    </main>
  );
}
