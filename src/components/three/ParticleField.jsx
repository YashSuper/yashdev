import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Subtle drifting particle field rendered with Three.js.
 * - Lazy-loaded (this module is behind React.lazy)
 * - Particle density scales with the device tier (count prop)
 * - DPR capped at 1.75 to keep GPU cost low
 * - Pauses when the tab is hidden OR the hero is scrolled off-screen
 * - Skipped entirely under prefers-reduced-motion / low-power (parent)
 */
export default function ParticleField({ theme, count = 900 }) {
  const mountRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const COUNT = count;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      speeds[i] = 0.15 + Math.random() * 0.35;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let hidden = document.hidden;
    let onScreen = true;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (hidden || !onScreen) return;

      material.color.set(themeRef.current === "dark" ? 0x818cf8 : 0x4f46e5);

      const t = clock.getElapsedTime();
      const pos = geometry.attributes.position;
      for (let i = 0; i < COUNT; i++) {
        const y = pos.getY(i) + speeds[i] * 0.004;
        pos.setY(i, y > 12 ? -12 : y);
      }
      pos.needsUpdate = true;

      points.rotation.y = t * 0.02 + pointerX * 0.04;
      points.rotation.x = pointerY * 0.03;

      renderer.render(scene, camera);
    };
    tick();

    const onVisibility = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Stop rendering entirely once the hero scrolls out of view.
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [count]);

  return <div ref={mountRef} aria-hidden className="absolute inset-0" />;
}
