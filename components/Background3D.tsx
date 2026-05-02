"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

const SEPARATION = 1.5;
const AMOUNTX = 60;
const AMOUNTY = 60;

function Particles({ resolvedTheme }: { resolvedTheme?: string }) {
  const points = useRef<THREE.Points>(null!);
  const count = AMOUNTX * AMOUNTY;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0, ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        pos[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
        pos[i + 1] = 0; // y
        pos[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
        i += 3;
      }
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const isDark = resolvedTheme === "dark";
    const primaryColor = new THREE.Color("#009FE3");
    const secondaryColor = isDark ? new THREE.Color("#FFFFFF") : new THREE.Color("#3C3C3B");

    for (let i = 0; i < count; i++) {
      const mixedColor = new THREE.Color().lerpColors(
        primaryColor, 
        secondaryColor, 
        Math.random() * 0.5
      );
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return col;
  }, [count, resolvedTheme]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    const mouse = state.pointer;

    for (let i = 0, ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const index = i + 1;
        // Wave logic
        const wave1 = Math.sin((ix + time) * 0.3) * 2;
        const wave2 = Math.sin((iy + time) * 0.5) * 2;
        const distToMouse = Math.sqrt(Math.pow(ix - (mouse.x + 1) * 30, 2) + Math.pow(iy - (mouse.y + 1) * 30, 2));
        const mouseEffect = Math.max(0, (20 - distToMouse) * 0.5);
        
        pos[index] = wave1 + wave2 + mouseEffect;
        i += 3;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Tilt the whole system slightly based on mouse
    points.current.rotation.x = -Math.PI / 4 + mouse.y * 0.1;
    points.current.rotation.z = mouse.x * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={resolvedTheme === "dark" ? 0.15 : 0.2}
        vertexColors
        transparent
        opacity={resolvedTheme === "dark" ? 0.8 : 0.4}
        sizeAttenuation
        blending={resolvedTheme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export default function Background3D() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className={`fixed inset-0 -z-20 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-15'}`}>
      <Canvas camera={{ position: [0, 15, 25], fov: 50 }}>
        <Suspense fallback={null}>
          <Particles resolvedTheme={resolvedTheme} />
          <fog attach="fog" args={[isDark ? "#121212" : "#FFFFFF", 20, 60]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
