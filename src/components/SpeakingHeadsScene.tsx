import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Procedural Anatomical 3D Mannequin Head Geometry
 * Features realistic skull vault, forehead, brow ridge, eye sockets,
 * nasal bridge & projected tip, nostril wings, lips, chin, sculpted jawline,
 * cheekbones, ears, and neck.
 */
function createMannequinHeadGeometry(H = 64, W = 64): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= H; i++) {
    const v = i / H;
    const y = -2.0 + v * 3.65;

    for (let j = 0; j <= W; j++) {
      const u = j / W;
      const theta = u * Math.PI * 2 - Math.PI;

      let x = 0;
      let z = 0;

      if (y < -0.85) {
        // Neck & cervical base zone
        const t = (y - (-2.0)) / 1.15;
        const rNeck = 0.52 + 0.16 * (1 - t);
        const dMuscle = 0.04 * Math.exp(-Math.pow((Math.abs(theta) - 0.7) / 0.3, 2)) * t;
        const zNeck = -0.15 * (1 - t) - 0.05;
        x = (rNeck + dMuscle) * Math.sin(theta);
        z = (rNeck + dMuscle) * Math.cos(theta) + zNeck;
      } else {
        // Cranial vault & facial structure
        const h = (y - (-0.85)) / 2.50;
        const capFactor = Math.sqrt(Math.max(0.0001, 1 - Math.pow(Math.max(0, h - 0.55) / 0.45, 2)));
        const baseWidth = 0.82 * capFactor;
        const baseDepth = 1.02 * capFactor;
        const zCenter = -0.12 + 0.15 * h;

        const x0 = baseWidth * Math.sin(theta);
        const z0 = baseDepth * Math.cos(theta) + zCenter;

        // 1. Chin (Mental Protuberance)
        const dChin = Math.exp(-Math.pow((y - (-0.70)) / 0.14, 2)) * Math.exp(-Math.pow(theta / 0.32, 2));
        const deltaZChin = 0.34 * dChin;

        // 2. Jawline & Mandible Angle
        const dJaw = Math.exp(-Math.pow((y - (-0.62)) / 0.22, 2)) * Math.exp(-Math.pow((Math.abs(theta) - 1.45) / 0.35, 2));
        const deltaXJaw = 0.14 * Math.sign(theta) * dJaw;

        // 3. Sub-labial sulcus (depression under lower lip)
        const dSulcus = Math.exp(-Math.pow((y - (-0.52)) / 0.06, 2)) * Math.exp(-Math.pow(theta / 0.28, 2));
        const deltaZSulcus = -0.07 * dSulcus;

        // 4. Lower Lip
        const dLlip = Math.exp(-Math.pow((y - (-0.42)) / 0.055, 2)) * Math.exp(-Math.pow(theta / 0.26, 2));
        const deltaZLlip = 0.16 * dLlip;

        // 5. Mouth cleft
        const dCleft = Math.exp(-Math.pow((y - (-0.35)) / 0.035, 2)) * Math.exp(-Math.pow(theta / 0.30, 2));
        const deltaZCleft = -0.05 * dCleft;

        // 6. Upper Lip
        const dUlip = Math.exp(-Math.pow((y - (-0.28)) / 0.055, 2)) * Math.exp(-Math.pow(theta / 0.26, 2));
        const deltaZUlip = 0.18 * dUlip;

        // 7. Subnasale (base of nose)
        const dSubnasale = Math.exp(-Math.pow((y - (-0.18)) / 0.06, 2)) * Math.exp(-Math.pow(theta / 0.22, 2));
        const deltaZSubnasale = 0.12 * dSubnasale;

        // 8. Nose Tip (projected forward)
        const dTip = Math.exp(-Math.pow((y - (-0.04)) / 0.12, 2)) * Math.exp(-Math.pow(theta / 0.16, 2));
        const deltaZTip = 0.52 * dTip;

        // 9. Dorsal Bridge of Nose
        const dBridge = Math.exp(-Math.pow((y - 0.16) / 0.14, 2)) * Math.exp(-Math.pow(theta / 0.12, 2));
        const deltaZBridge = 0.38 * dBridge;

        // 10. Nostril Wings (Alae)
        const dAla = Math.exp(-Math.pow((y - (-0.08)) / 0.07, 2)) * Math.exp(-Math.pow((Math.abs(theta) - 0.20) / 0.10, 2));
        const deltaZAla = 0.22 * dAla;
        const deltaXAla = 0.06 * Math.sign(theta) * dAla;

        // 11. Cheekbones (Zygoma)
        const dCheek = Math.exp(-Math.pow((y - 0.02) / 0.20, 2)) * Math.exp(-Math.pow((Math.abs(theta) - 0.72) / 0.30, 2));
        const deltaZCheek = 0.18 * dCheek;
        const deltaXCheek = 0.12 * Math.sign(theta) * dCheek;

        // 12. Eye Socket Hollows (Orbits)
        const dOrbit = Math.exp(-Math.pow((y - 0.24) / 0.10, 2)) * Math.exp(-Math.pow((Math.abs(theta) - 0.36) / 0.16, 2));
        const deltaZOrbit = -0.16 * dOrbit;

        // 13. Brow Ridge (Supraorbital Torus)
        const dBrow = Math.exp(-Math.pow((y - 0.44) / 0.09, 2)) * Math.exp(-Math.pow(theta / 0.60, 2));
        const deltaZBrow = 0.22 * dBrow;

        // 14. Forehead
        const dForehead = Math.exp(-Math.pow((y - 0.82) / 0.22, 2)) * Math.exp(-Math.pow(theta / 0.68, 2));
        const deltaZForehead = 0.14 * dForehead;

        // 15. Auricular / Ear Contours
        const dEar = Math.exp(-Math.pow((y - 0.0) / 0.22, 2)) * Math.exp(-Math.pow((Math.abs(theta) - 1.57) / 0.20, 2));
        const deltaXEar = 0.16 * Math.sign(theta) * dEar;
        const deltaZEar = -0.06 * dEar;

        // 16. Occiput (Back of skull)
        const dOcciput = Math.exp(-Math.pow((y - 0.45) / 0.35, 2)) * Math.exp(-Math.pow((Math.abs(theta) - Math.PI) / 0.55, 2));
        const deltaZOcciput = -0.22 * dOcciput;

        // Smooth dome closure at crown
        const crownScale = h > 0.92 ? Math.cos(((h - 0.92) / 0.08) * (Math.PI / 2)) : 1.0;

        x = (x0 + deltaXJaw + deltaXAla + deltaXCheek + deltaXEar) * crownScale;
        z = (z0 + deltaZChin + deltaZSulcus + deltaZLlip + deltaZCleft + deltaZUlip + deltaZSubnasale + deltaZTip + deltaZBridge + deltaZAla + deltaZCheek + deltaZOrbit + deltaZBrow + deltaZForehead + deltaZEar + deltaZOcciput) * crownScale;
      }

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  // Generate triangles
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      const p1 = i * (W + 1) + j;
      const p2 = i * (W + 1) + j + 1;
      const p3 = (i + 1) * (W + 1) + j;
      const p4 = (i + 1) * (W + 1) + j + 1;

      indices.push(p1, p3, p2);
      indices.push(p2, p3, p4);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

export const SpeakingHeadsScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Renderer
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 10.5);

    // Shared Head Geometry
    const headGeometry = createMannequinHeadGeometry(64, 64);

    // ── LEFT HEAD: Royal Blue Metallic Ceramic Mannequin ──
    const leftHeadMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1458d6,
      roughness: 0.24,
      metalness: 0.60,
      clearcoat: 0.95,
      clearcoatRoughness: 0.12,
      reflectivity: 0.85,
    });
    const headLeft = new THREE.Mesh(headGeometry, leftHeadMaterial);
    
    // Left ear accent ring
    const ringGeo = new THREE.TorusGeometry(0.32, 0.035, 16, 32);
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x00d4e8 });
    const violetGlowMat = new THREE.MeshBasicMaterial({ color: 0x904cfc });

    const leftEarRing = new THREE.Mesh(ringGeo, cyanGlowMat);
    leftEarRing.position.set(0.96, 0.05, -0.05);
    leftEarRing.rotation.y = Math.PI / 2;
    headLeft.add(leftEarRing);

    // ── RIGHT HEAD: Electric Violet Metallic Ceramic Mannequin ──
    const rightHeadMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x581bbd,
      roughness: 0.24,
      metalness: 0.60,
      clearcoat: 0.95,
      clearcoatRoughness: 0.12,
      reflectivity: 0.85,
    });
    const headRight = new THREE.Mesh(headGeometry, rightHeadMaterial);

    const rightEarRing = new THREE.Mesh(ringGeo, violetGlowMat);
    rightEarRing.position.set(-0.96, 0.05, -0.05);
    rightEarRing.rotation.y = -Math.PI / 2;
    headRight.add(rightEarRing);

    // Group wrappers for smooth independent transforms & rotation
    const groupLeft = new THREE.Group();
    groupLeft.add(headLeft);
    scene.add(groupLeft);

    const groupRight = new THREE.Group();
    groupRight.add(headRight);
    scene.add(groupRight);

    // Initial positioning & orientation facing inward towards each other
    const updateLayout = () => {
      const width = container.clientWidth;
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      if (isMobile) {
        camera.position.z = 12.5;
        groupLeft.position.set(-2.8, 0.5, -1.8);
        groupRight.position.set(2.8, 0.5, -1.8);
        groupLeft.scale.setScalar(0.72);
        groupRight.scale.setScalar(0.72);
        // Face inward with slight 3D perspective towards camera
        headLeft.rotation.set(0, Math.PI / 2 - 0.25, 0);
        headRight.rotation.set(0, -Math.PI / 2 + 0.25, 0);
      } else if (isTablet) {
        camera.position.z = 11.5;
        groupLeft.position.set(-4.2, 0.3, -1.2);
        groupRight.position.set(4.2, 0.3, -1.2);
        groupLeft.scale.setScalar(0.85);
        groupRight.scale.setScalar(0.85);
        headLeft.rotation.set(0, Math.PI / 2 - 0.28, 0);
        headRight.rotation.set(0, -Math.PI / 2 + 0.28, 0);
      } else {
        camera.position.z = 10.5;
        groupLeft.position.set(-5.6, 0.2, -0.6);
        groupRight.position.set(5.6, 0.2, -0.6);
        groupLeft.scale.setScalar(1.0);
        groupRight.scale.setScalar(1.0);
        headLeft.rotation.set(0, Math.PI / 2 - 0.32, 0);
        headRight.rotation.set(0, -Math.PI / 2 + 0.32, 0);
      }
    };
    updateLayout();

    // ── LIGHTING SETUP: Multi-directional studio lighting with vivid rim light ──
    const ambientLight = new THREE.AmbientLight(0x0e244d, 1.4);
    scene.add(ambientLight);

    // Royal Blue Key Light from top-left
    const keyLight = new THREE.DirectionalLight(0x1769f8, 3.2);
    keyLight.position.set(-8, 8, 6);
    scene.add(keyLight);

    // Cyan Fill Light from bottom-center
    const fillLight = new THREE.DirectionalLight(0x00d4e8, 2.8);
    fillLight.position.set(0, -4, 5);
    scene.add(fillLight);

    // Electric Violet Rim Light from top-right-back
    const rimLight = new THREE.DirectionalLight(0x8234f8, 4.2);
    rimLight.position.set(8, 7, -5);
    scene.add(rimLight);

    // Backstage Cyan Rim Light
    const backLight = new THREE.DirectionalLight(0x00d4e8, 2.5);
    backLight.position.set(-6, 4, -6);
    scene.add(backLight);

    // Dynamic Acoustic Mouth Glow Lights
    const mouthLightLeft = new THREE.PointLight(0x00d4e8, 2.5, 7);
    scene.add(mouthLightLeft);

    const mouthLightRight = new THREE.PointLight(0x6d28d9, 2.5, 7);
    scene.add(mouthLightRight);

    // ── ANIMATED 3D SOUND WAVES FLOWING BETWEEN THE HEADS ──
    const WAVE_POINTS = 96;
    
    // Wave 1: Primary Cyan Ribbon
    const wave1Geo = new THREE.BufferGeometry();
    const wave1Positions = new Float32Array(WAVE_POINTS * 3);
    wave1Geo.setAttribute('position', new THREE.BufferAttribute(wave1Positions, 3));
    const wave1Mat = new THREE.LineBasicMaterial({
      color: 0x00d4e8,
      linewidth: 2.5,
      transparent: true,
      opacity: 0.85,
    });
    const wave1Line = new THREE.Line(wave1Geo, wave1Mat);
    scene.add(wave1Line);

    // Wave 2: Royal Blue Harmonic Counter-Wave
    const wave2Geo = new THREE.BufferGeometry();
    const wave2Positions = new Float32Array(WAVE_POINTS * 3);
    wave2Geo.setAttribute('position', new THREE.BufferAttribute(wave2Positions, 3));
    const wave2Mat = new THREE.LineBasicMaterial({
      color: 0x1769f8,
      linewidth: 2.0,
      transparent: true,
      opacity: 0.75,
    });
    const wave2Line = new THREE.Line(wave2Geo, wave2Mat);
    scene.add(wave2Line);

    // Wave 3: Electric Violet Resonant Strand
    const wave3Geo = new THREE.BufferGeometry();
    const wave3Positions = new Float32Array(WAVE_POINTS * 3);
    wave3Geo.setAttribute('position', new THREE.BufferAttribute(wave3Positions, 3));
    const wave3Mat = new THREE.LineBasicMaterial({
      color: 0x904cfc,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.65,
    });
    const wave3Line = new THREE.Line(wave3Geo, wave3Mat);
    scene.add(wave3Line);

    // Particle nodes traveling along the sound wave
    const particleGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const particleMatLeft = new THREE.MeshBasicMaterial({ color: 0x00d4e8 });
    const particleMatRight = new THREE.MeshBasicMaterial({ color: 0x904cfc });

    const particleLeft = new THREE.Mesh(particleGeo, particleMatLeft);
    const particleRight = new THREE.Mesh(particleGeo, particleMatRight);
    scene.add(particleLeft);
    scene.add(particleRight);

    // ── SCROLL-DRIVEN VERTICAL ROTATION (GSAP ScrollTrigger) ──
    let targetPitchLeft = 0;
    let targetPitchRight = 0;
    let currentPitchLeft = 0;
    let currentPitchRight = 0;

    const heroSection = document.getElementById('hero-section') || container;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: prefersReducedMotion ? false : 0.6,
      onUpdate: (self) => {
        const progress = self.progress; // 0 (top) to 1 (scrolled through hero)
        // Controlled pitching motion between 15° and 28° (0.26 to 0.48 rad)
        // Heads pitch down smoothly as user scrolls down, and reverse as user scrolls up
        targetPitchLeft = Math.sin(progress * Math.PI) * 0.44;
        targetPitchRight = Math.sin(progress * Math.PI * 0.96) * 0.38;
      },
    });

    // Fallback direct scroll tracking
    const handleScrollFallback = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = heroSection.clientHeight || 700;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      targetPitchLeft = Math.sin(progress * Math.PI) * 0.44;
      targetPitchRight = Math.sin(progress * Math.PI * 0.96) * 0.38;
    };
    window.addEventListener('scroll', handleScrollFallback, { passive: true });

    // ── RENDER LOOP ──
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp vertical rotation (pitch)
      currentPitchLeft += (targetPitchLeft - currentPitchLeft) * 0.08;
      currentPitchRight += (targetPitchRight - currentPitchRight) * 0.08;

      // Subtle idle breathing motion (nod and sway)
      const idleLeft = prefersReducedMotion ? 0 : Math.sin(elapsedTime * 1.2) * 0.035;
      const idleRight = prefersReducedMotion ? 0 : Math.cos(elapsedTime * 1.1) * 0.035;

      headLeft.rotation.x = currentPitchLeft + idleLeft;
      headRight.rotation.x = currentPitchRight + idleRight;

      // Subtle horizontal track sway
      headLeft.rotation.z = Math.sin(elapsedTime * 0.8) * 0.02;
      headRight.rotation.z = -Math.sin(elapsedTime * 0.8) * 0.02;

      // Update mouth node coordinates
      const mouthX1 = groupLeft.position.x + 1.25 * groupLeft.scale.x;
      const mouthY1 = groupLeft.position.y - 0.25 * groupLeft.scale.y;
      const mouthZ1 = groupLeft.position.z + 0.1;

      const mouthX2 = groupRight.position.x - 1.25 * groupRight.scale.x;
      const mouthY2 = groupRight.position.y - 0.25 * groupRight.scale.y;
      const mouthZ2 = groupRight.position.z + 0.1;

      mouthLightLeft.position.set(mouthX1, mouthY1, mouthZ1 + 0.3);
      mouthLightRight.position.set(mouthX2, mouthY2, mouthZ2 + 0.3);

      // Modulate mouth point light intensity
      mouthLightLeft.intensity = 1.8 + Math.sin(elapsedTime * 4.0) * 0.9;
      mouthLightRight.intensity = 1.8 + Math.cos(elapsedTime * 3.8) * 0.9;

      // ── UPDATE DYNAMIC 3D SOUND WAVES ──
      const pos1 = wave1Geo.attributes.position.array as Float32Array;
      const pos2 = wave2Geo.attributes.position.array as Float32Array;
      const pos3 = wave3Geo.attributes.position.array as Float32Array;

      // Alternating conversational pulse (Left to Right, then Right to Left)
      const conversationCycle = Math.sin(elapsedTime * 0.9);
      const isLeftTurn = conversationCycle >= 0;
      const waveFlowSpeed = elapsedTime * 4.2;

      for (let k = 0; k < WAVE_POINTS; k++) {
        const t = k / (WAVE_POINTS - 1); // 0 at left mouth, 1 at right mouth

        // Linear interpolation between the two mouth positions
        const x = mouthX1 + t * (mouthX2 - mouthX1);
        const yBase = mouthY1 + t * (mouthY2 - mouthY1);
        const zBase = mouthZ1 + t * (mouthZ2 - mouthZ1);

        // Bell envelope: swells at center, clamps to 0 at mouth origins
        const envelope = Math.sin(t * Math.PI);

        // Amplitude modulates with conversational flow
        const amp = 0.42 * envelope * (1 + 0.25 * Math.sin(elapsedTime * 2.5));

        // Wave 1: Cyan primary wave
        const y1 = yBase + Math.sin(t * 14 - waveFlowSpeed) * amp;
        const z1 = zBase + Math.cos(t * 10 - waveFlowSpeed * 0.8) * amp * 0.55;

        // Wave 2: Royal blue counter-harmonic wave (flowing reverse)
        const y2 = yBase + Math.sin(t * 18 + waveFlowSpeed * 0.9 + Math.PI / 3) * (amp * 0.85);
        const z2 = zBase + Math.cos(t * 12 + waveFlowSpeed * 0.7) * (amp * 0.6);

        // Wave 3: Electric violet resonant frequency wave
        const y3 = yBase + Math.sin(t * 24 - waveFlowSpeed * 1.3 + Math.PI / 2) * (amp * 0.55);
        const z3 = zBase + Math.sin(t * 16 - waveFlowSpeed) * (amp * 0.4);

        const idx = k * 3;
        pos1[idx] = x;
        pos1[idx + 1] = y1;
        pos1[idx + 2] = z1;

        pos2[idx] = x;
        pos2[idx + 1] = y2;
        pos2[idx + 2] = z2;

        pos3[idx] = x;
        pos3[idx + 1] = y3;
        pos3[idx + 2] = z3;
      }

      wave1Geo.attributes.position.needsUpdate = true;
      wave2Geo.attributes.position.needsUpdate = true;
      wave3Geo.attributes.position.needsUpdate = true;

      // Update traveling energy quanta along waves
      // Particle 1 travels L -> R
      const tPulse1 = (elapsedTime * 0.45) % 1;
      const xPulse1 = mouthX1 + tPulse1 * (mouthX2 - mouthX1);
      const env1 = Math.sin(tPulse1 * Math.PI);
      const yPulse1 = mouthY1 + tPulse1 * (mouthY2 - mouthY1) + Math.sin(tPulse1 * 14 - waveFlowSpeed) * 0.42 * env1;
      const zPulse1 = mouthZ1 + tPulse1 * (mouthZ2 - mouthZ1);
      particleLeft.position.set(xPulse1, yPulse1, zPulse1);
      particleLeft.scale.setScalar(env1 * (isLeftTurn ? 1.6 : 0.85) + 0.1);

      // Particle 2 travels R -> L
      const tPulse2 = 1 - ((elapsedTime * 0.40 + 0.5) % 1);
      const xPulse2 = mouthX1 + tPulse2 * (mouthX2 - mouthX1);
      const env2 = Math.sin(tPulse2 * Math.PI);
      const yPulse2 = mouthY1 + tPulse2 * (mouthY2 - mouthY1) + Math.sin(tPulse2 * 18 + waveFlowSpeed * 0.9) * 0.35 * env2;
      const zPulse2 = mouthZ1 + tPulse2 * (mouthZ2 - mouthZ1);
      particleRight.position.set(xPulse2, yPulse2, zPulse2);
      particleRight.scale.setScalar(env2 * (!isLeftTurn ? 1.6 : 0.85) + 0.1);

      renderer.render(scene, camera);
    };

    animate();

    // ── RESIZE OBSERVER ──
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateLayout();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // ── CLEANUP ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScrollFallback);
      resizeObserver.disconnect();
      scrollTriggerInstance.kill();

      headGeometry.dispose();
      leftHeadMaterial.dispose();
      rightHeadMaterial.dispose();
      ringGeo.dispose();
      cyanGlowMat.dispose();
      violetGlowMat.dispose();
      wave1Geo.dispose();
      wave1Mat.dispose();
      wave2Geo.dispose();
      wave2Mat.dispose();
      wave3Geo.dispose();
      wave3Mat.dispose();
      particleGeo.dispose();
      particleMatLeft.dispose();
      particleMatRight.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
