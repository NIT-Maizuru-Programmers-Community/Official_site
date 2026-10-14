'use client';

import { useEffect, useRef } from 'react';

type ThreeSceneProps = {
  compact?: boolean;
  variant?: string;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uScroll;
  uniform float uVariant;
  uniform float uStrength;

  float band(float distanceToCurve, float width) {
    return exp(-pow(distanceToCurve / width, 2.0));
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.2 + uVariant * 0.55;
    p.x += uPointer.x * 0.035;
    p.y += uPointer.y * 0.035 + uScroll * 0.07;

    float sweep = sin(p.x * 2.1 + t) * 0.19
      + sin(p.x * 0.78 - t * 0.7) * 0.13
      + cos(p.x * 3.4 + uVariant) * 0.028;
    float returnSweep = sweep + 0.2 + sin(p.x * 1.4 - t * 0.8) * 0.055;
    float width = mix(0.022, 0.064, uStrength);
    float d = abs(p.y - sweep);
    float returnDistance = abs(p.y - returnSweep);
    float ends = smoothstep(-aspect * 0.58, -aspect * 0.22, p.x)
      * (1.0 - smoothstep(aspect * 0.3, aspect * 0.56, p.x));
    float returnEnds = smoothstep(-aspect * 0.42, -aspect * 0.08, p.x)
      * (1.0 - smoothstep(aspect * 0.12, aspect * 0.45, p.x));

    float glassBody = 1.0 - smoothstep(width * 0.32, width * 1.08, d);
    float core = band(d, width * 0.56);
    float innerHighlight = band(d - width * 0.7, width * 0.075);
    float lowerEdge = band(d - width * 0.91, width * 0.065);
    float glow = exp(-d / (width * 3.2));
    float returnCore = band(returnDistance, width * 0.54);
    float returnGlow = exp(-returnDistance / (width * 1.9));

    float colorShift = smoothstep(-aspect * 0.32, aspect * 0.36, p.x);
    vec3 charcoal = vec3(0.16, 0.16, 0.17);
    vec3 silver = vec3(0.58, 0.59, 0.62);
    vec3 ice = vec3(0.96, 0.96, 0.98);
    vec3 lightSilver = vec3(0.82, 0.83, 0.86);
    vec3 ribbonColor = mix(charcoal, silver, smoothstep(0.0, 0.68, colorShift));
    ribbonColor = mix(ribbonColor, lightSilver, smoothstep(0.8, 1.0, colorShift) * 0.38);
    ribbonColor = mix(ribbonColor, ice, innerHighlight * 0.78);

    vec3 returningColor = mix(vec3(0.3, 0.3, 0.32), vec3(0.72, 0.73, 0.76), colorShift);
    float halo = exp(-length(vec2(p.x - aspect * 0.05, p.y - sweep)) * 2.3);
    float glintX = sin(t * 0.72 + uVariant) * aspect * 0.28;
    float glintY = sin(glintX * 2.1 + t) * 0.19
      + sin(glintX * 0.78 - t * 0.7) * 0.13;
    float travelingGlint = exp(-pow(length(vec2((p.x - glintX) * 1.2, (p.y - glintY) * 4.2)) / 0.075, 2.0));
    float alpha = ends * (glow * 0.11 + glassBody * 0.13 + core * 0.12
      + innerHighlight * 0.3 + lowerEdge * 0.16)
      + returnEnds * (returnGlow * 0.07 + returnCore * 0.13)
      + halo * ends * 0.035 + travelingGlint * ends * 0.2;
    vec3 color = ribbonColor * (glassBody * 0.24 + core * 0.38
      + innerHighlight * 0.7 + lowerEdge * 0.2 + glow * 0.1)
      + returningColor * (returnCore * 0.3 + returnGlow * 0.07)
      + vec3(0.94, 0.94, 0.96) * travelingGlint * 0.58
      + vec3(0.42, 0.42, 0.45) * halo * 0.11;

    gl_FragColor = vec4(color, clamp(alpha * uStrength, 0.0, 0.78));
  }
`;

export function ThreeScene({
  compact = false,
  variant = '01',
}: ThreeSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const initialize = async () => {
      const THREE = await import('three');
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 5);
      const geometry = new THREE.PlaneGeometry(2, 2);
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const pointer = new THREE.Vector2();
      const uniforms = {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2() },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uVariant: { value: (Number.parseInt(variant, 10) || 1) % 7 },
        uStrength: { value: compact ? 0.6 : 1 },
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });
      const effect = new THREE.Mesh(geometry, material);
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      const reducedRenderTime = (Number.parseInt(variant, 10) || 1) * 1.7;

      camera.position.z = 1;
      scene.add(effect);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);

      const resize = () => {
        const { width, height } = root.getBoundingClientRect();
        if (width < 1 || height < 1) return;

        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio || 1,
            window.innerWidth < 760 ? 1.35 : 1.65,
          ),
        );
        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(width, height);
        renderer.render(scene, camera);
      };

      let isVisible = false;
      let scrollTarget = 0;
      const updateScroll = () => {
        const rect = root.getBoundingClientRect();
        scrollTarget = THREE.MathUtils.clamp(
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
          0,
          1,
        );
      };
      const onPointerMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        pointer.set(
          THREE.MathUtils.clamp(
            ((event.clientX - rect.left) / rect.width - 0.5) * 2,
            -1,
            1,
          ),
          THREE.MathUtils.clamp(
            ((event.clientY - rect.top) / rect.height - 0.5) * 2,
            -1,
            1,
          ),
        );
      };
      const onPointerLeave = () => pointer.set(0, 0);
      const render = (time: number) => {
        uniforms.uTime.value = time * 0.001;
        uniforms.uPointer.value.lerp(pointer, 0.035);
        uniforms.uScroll.value +=
          (scrollTarget - uniforms.uScroll.value) * 0.035;
        renderer.render(scene, camera);
      };
      const syncAnimation = () => {
        if (isVisible && !document.hidden && !media.matches) {
          renderer.setAnimationLoop(render);
        } else {
          renderer.setAnimationLoop(null);
          uniforms.uTime.value = reducedRenderTime;
          renderer.render(scene, camera);
        }
      };

      const intersection = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          syncAnimation();
        },
        { threshold: 0.01 },
      );
      const resizeObserver = new ResizeObserver(resize);
      intersection.observe(root);
      resizeObserver.observe(root);
      resize();
      updateScroll();
      root.addEventListener('pointermove', onPointerMove, { passive: true });
      root.addEventListener('pointerleave', onPointerLeave);
      window.addEventListener('scroll', updateScroll, { passive: true });
      document.addEventListener('visibilitychange', syncAnimation);
      media.addEventListener('change', syncAnimation);
      root.classList.add('is-ready');

      cleanup = () => {
        renderer.setAnimationLoop(null);
        intersection.disconnect();
        resizeObserver.disconnect();
        root.removeEventListener('pointermove', onPointerMove);
        root.removeEventListener('pointerleave', onPointerLeave);
        window.removeEventListener('scroll', updateScroll);
        document.removeEventListener('visibilitychange', syncAnimation);
        media.removeEventListener('change', syncAnimation);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    void initialize().catch(() => {
      root.classList.add('webgl-unavailable');
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [compact, variant]);

  return (
    <div
      ref={rootRef}
      className={`three-scene${compact ? ' three-scene--compact' : ''}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
