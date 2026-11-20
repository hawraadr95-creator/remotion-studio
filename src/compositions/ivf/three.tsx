import React, {useMemo} from 'react';
import * as THREE from 'three';
import {ThreeCanvas} from '@remotion/three';
import {Easing, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp} from './common';

/* ------------------------------------------------------------------ */
/* Stage: canvas + warm cinematic lighting                             */
/* ------------------------------------------------------------------ */

export const Stage: React.FC<{children: React.ReactNode; z?: number; fov?: number}> = ({children, z = 7, fov = 35}) => {
	const {width, height} = useVideoConfig();
	return (
		<ThreeCanvas width={width} height={height} camera={{position: [0, 0, z], fov}} gl={{antialias: true, alpha: true}} style={{position: 'absolute', inset: 0}}>
			<ambientLight intensity={0.35} color="#ffe9d6" />
			<hemisphereLight args={['#fff1dc', '#3a1f1a', 0.6]} />
			<directionalLight position={[3, 4, 6]} intensity={2.2} color="#ffe2b8" />
			<pointLight position={[-4, -1.5, 3]} intensity={25} distance={14} color="#ff9fbf" />
			<pointLight position={[3.5, -3, -2]} intensity={18} distance={12} color="#ffd59a" />
			{children}
		</ThreeCanvas>
	);
};

/* ------------------------------------------------------------------ */
/* Procedural textures                                                 */
/* ------------------------------------------------------------------ */

const useGranularTexture = (seed: string, dots = 2600) =>
	useMemo(() => {
		const c = document.createElement('canvas');
		c.width = 512;
		c.height = 256;
		const g = c.getContext('2d')!;
		g.fillStyle = '#808080';
		g.fillRect(0, 0, 512, 256);
		for (let i = 0; i < dots; i++) {
			const x = random(`${seed}x${i}`) * 512;
			const y = random(`${seed}y${i}`) * 256;
			const r = 0.6 + random(`${seed}r${i}`) * 2.6;
			const v = Math.floor(90 + random(`${seed}v${i}`) * 140);
			g.fillStyle = `rgba(${v},${v},${v},0.55)`;
			g.beginPath();
			g.arc(x, y, r, 0, Math.PI * 2);
			g.fill();
		}
		const t = new THREE.CanvasTexture(c);
		t.wrapS = THREE.RepeatWrapping;
		t.wrapT = THREE.RepeatWrapping;
		return t;
	}, [seed, dots]);

/* ------------------------------------------------------------------ */
/* Fresnel rim glow (gives membranes a translucent, microscopic feel)  */
/* ------------------------------------------------------------------ */

const fresnelVS = `
varying vec3 vN; varying vec3 vV;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const fresnelFS = `
uniform vec3 uColor; uniform float uPower; uniform float uIntensity;
varying vec3 vN; varying vec3 vV;
void main(){
  float f = pow(1.0 - abs(dot(vN, vV)), uPower);
  gl_FragColor = vec4(uColor * f * uIntensity, f * uIntensity);
}`;

export const Rim: React.FC<{r: number; color?: string; power?: number; intensity?: number; opacity?: number}> = ({
	r,
	color = '#ffe2b0',
	power = 2.4,
	intensity = 1.1,
	opacity = 1,
}) => {
	const uniforms = useMemo(
		() => ({uColor: {value: new THREE.Color(color)}, uPower: {value: power}, uIntensity: {value: intensity * opacity}}),
		[color, power, intensity, opacity],
	);
	return (
		<mesh>
			<sphereGeometry args={[r, 64, 64]} />
			<shaderMaterial vertexShader={fresnelVS} fragmentShader={fresnelFS} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
		</mesh>
	);
};

/* ------------------------------------------------------------------ */
/* Floating micro particles                                            */
/* ------------------------------------------------------------------ */

export const Dust: React.FC<{count?: number; spread?: number; seed?: string; color?: string}> = ({count = 220, spread = 6, seed = 'd', color = '#ffe3b5'}) => {
	const frame = useCurrentFrame();
	const geo = useMemo(() => {
		const pos = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			pos[i * 3] = (random(`${seed}a${i}`) - 0.5) * spread;
			pos[i * 3 + 1] = (random(`${seed}b${i}`) - 0.5) * spread * 1.6;
			pos[i * 3 + 2] = (random(`${seed}c${i}`) - 0.5) * spread - 1;
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
		return g;
	}, [count, spread, seed]);
	return (
		<points geometry={geo} position={[0, (frame * 0.002) % 1, 0]} rotation={[0, frame * 0.0015, 0]}>
			<pointsMaterial size={0.025} color={color} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
		</points>
	);
};

/* ------------------------------------------------------------------ */
/* Cells                                                               */
/* ------------------------------------------------------------------ */

export const Cell: React.FC<{
	r: number;
	position?: [number, number, number];
	color?: string;
	opacity?: number;
	seed?: string;
	scale?: [number, number, number];
}> = ({r, position = [0, 0, 0], color = '#efd2ad', opacity = 1, seed = 'c', scale}) => {
	const tex = useGranularTexture(seed, 1800);
	if (opacity <= 0.01) return null;
	return (
		<group position={position} scale={scale}>
			<mesh>
				<sphereGeometry args={[r, 64, 64]} />
				<meshPhysicalMaterial
					color={color}
					roughness={0.45}
					metalness={0}
					clearcoat={0.6}
					clearcoatRoughness={0.4}
					sheen={1}
					sheenColor="#ffd9c7"
					bumpMap={tex}
					bumpScale={0.6}
					map={tex}
					transparent
					opacity={0.88 * opacity}
				/>
			</mesh>
			<Rim r={r * 1.01} color="#fff0d2" intensity={0.8} opacity={opacity} />
		</group>
	);
};

/* Zona pellucida: thick translucent glassy shell */
export const Zona: React.FC<{r: number; thickness?: number; opacity?: number}> = ({r, thickness = 0.12, opacity = 1}) => (
	<group>
		<mesh>
			<sphereGeometry args={[r, 96, 96]} />
			<meshPhysicalMaterial color="#fff4e2" roughness={0.15} transmission={0.85} thickness={thickness * 4} transparent opacity={0.22 * opacity} depthWrite={false} />
		</mesh>
		<Rim r={r} color="#ffe6bc" power={3} intensity={1.4} opacity={opacity} />
		<Rim r={r - thickness} color="#ffd0dc" power={4} intensity={0.6} opacity={opacity} />
	</group>
);

/* Mature oocyte: cytoplasm + polar body + zona (+ optional cumulus cells) */
export const Oocyte: React.FC<{position?: [number, number, number]; scale?: number; cumulus?: boolean; rotate?: number}> = ({
	position = [0, 0, 0],
	scale = 1,
	cumulus = false,
	rotate = 0,
}) => {
	const frame = useCurrentFrame();
	return (
		<group position={position} scale={scale} rotation={[0.2, rotate + frame * 0.003, 0]}>
			<Cell r={0.92} color="#ecd0a8" seed="oo" />
			<Cell r={0.14} position={[0.62, 0.72, 0.2]} color="#f2dbbd" seed="pb" />
			<Zona r={1.18} thickness={0.16} />
			{cumulus && <Cumulus />}
		</group>
	);
};

const Cumulus: React.FC = () => {
	const frame = useCurrentFrame();
	const pts = useMemo(() => {
		const n = 90;
		return [...Array(n)].map((_, i) => {
			const y = 1 - (i / (n - 1)) * 2;
			const rr = Math.sqrt(1 - y * y);
			const th = i * 2.399963;
			const R = 1.32 + random(`cu${i}`) * 0.3;
			return {p: [Math.cos(th) * rr * R, y * R, Math.sin(th) * rr * R] as [number, number, number], s: 0.035 + random(`cs${i}`) * 0.03, ph: random(`cp${i}`) * 6};
		});
	}, []);
	return (
		<group>
			{pts.map((c, i) => (
				<mesh key={i} position={[c.p[0], c.p[1] + Math.sin(frame / 25 + c.ph) * 0.02, c.p[2]]}>
					<sphereGeometry args={[c.s, 16, 16]} />
					<meshStandardMaterial color="#f6e2c6" roughness={0.6} transparent opacity={0.5} />
				</mesh>
			))}
		</group>
	);
};

/* ------------------------------------------------------------------ */
/* Sperm: head + midpiece + undulating tail (tube)                     */
/* ------------------------------------------------------------------ */

export const Sperm: React.FC<{
	head: THREE.Vector3;
	dir: THREE.Vector3; // swimming direction
	phase: number;
	size?: number;
	opacity?: number;
}> = ({head, dir, phase, size = 1, opacity = 1}) => {
	const d = dir.clone().normalize();
	const perp = new THREE.Vector3(-d.y, d.x, 0).normalize();
	const seg = 0.045 * size;
	const n = 26;
	const pts: THREE.Vector3[] = [];
	for (let k = 0; k <= n; k++) {
		const amp = 0.09 * size * (k / n);
		pts.push(head.clone().addScaledVector(d, -(0.1 * size + k * seg)).addScaledVector(perp, Math.sin(phase - k * 0.55) * amp));
	}
	const curve = new THREE.CatmullRomCurve3(pts);
	const tube = new THREE.TubeGeometry(curve, 40, 0.008 * size, 6, false);
	const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), d);
	return (
		<group>
			<mesh position={head} quaternion={q} scale={[0.11 * size, 0.07 * size, 0.055 * size]}>
				<sphereGeometry args={[1, 24, 24]} />
				<meshPhysicalMaterial color="#f4e6d2" roughness={0.3} clearcoat={1} transparent opacity={opacity} />
			</mesh>
			<mesh geometry={tube}>
				<meshStandardMaterial color="#f1e2cc" roughness={0.5} transparent opacity={0.85 * opacity} />
			</mesh>
		</group>
	);
};

/* Sperm that swims along a quadratic path from a → c through control b */
export const SwimmingSperm: React.FC<{a: number[]; b: number[]; c: number[]; from: number; to: number; seed: string; size?: number}> = ({a, b, c, from, to, seed, size = 1}) => {
	const frame = useCurrentFrame();
	const t = interpolate(frame, [from, to], [0, 1], {...clamp, easing: Easing.inOut(Easing.sin)});
	const A = new THREE.Vector3(...a);
	const B = new THREE.Vector3(...b);
	const Cc = new THREE.Vector3(...c);
	const curve = new THREE.QuadraticBezierCurve3(A, B, Cc);
	const p = curve.getPoint(t);
	const tan = curve.getTangent(Math.min(t, 0.999));
	return <Sperm head={p} dir={tan} phase={frame * 0.9 + random(seed) * 6} size={size} />;
};

/* ------------------------------------------------------------------ */
/* Ovary with follicles                                                */
/* ------------------------------------------------------------------ */

const useOvaryGeometry = () =>
	useMemo(() => {
		const g = new THREE.SphereGeometry(1, 160, 160);
		const p = g.attributes.position as THREE.BufferAttribute;
		const v = new THREE.Vector3();
		for (let i = 0; i < p.count; i++) {
			v.fromBufferAttribute(p, i);
			const n = 0.035 * Math.sin(v.x * 7.1 + 1.3) * Math.sin(v.y * 6.3) * Math.sin(v.z * 5.7 + 0.4) + 0.02 * Math.sin(v.x * 17 + v.y * 13);
			v.multiplyScalar(1 + n);
			p.setXYZ(i, v.x, v.y, v.z);
		}
		g.computeVertexNormals();
		return g;
	}, []);

export const FOLLICLES: {dir: [number, number, number]; delay: number; max: number}[] = [
	{dir: [0.35, 0.55, 0.75], delay: 0, max: 0.3},
	{dir: [-0.45, 0.35, 0.82], delay: 10, max: 0.27},
	{dir: [0.0, -0.4, 0.92], delay: 18, max: 0.28},
	{dir: [0.72, -0.15, 0.68], delay: 26, max: 0.3},
	{dir: [-0.75, -0.3, 0.6], delay: 34, max: 0.28},
	{dir: [-0.2, 0.85, 0.48], delay: 42, max: 0.26},
	{dir: [0.5, 0.2, 0.85], delay: 50, max: 0.22},
];

export const Ovary: React.FC<{growth: (i: number) => number; rotY?: number; position?: [number, number, number]}> = ({growth, rotY = 0, position = [0, 0, 0]}) => {
	const geo = useOvaryGeometry();
	const tex = useGranularTexture('ov', 3500);
	const S: [number, number, number] = [1.45, 0.95, 0.8];
	return (
		<group position={position} rotation={[0.15, rotY, -0.12]}>
			<mesh geometry={geo} scale={S}>
				<meshPhysicalMaterial color="#dca393" roughness={0.6} sheen={1} sheenColor="#ffd3c4" clearcoat={0.35} clearcoatRoughness={0.5} bumpMap={tex} bumpScale={1.2} />
			</mesh>
			<Rim r={1.0} color="#ffc9b8" intensity={0.5} />
			{FOLLICLES.map((f, i) => {
				const s = growth(i);
				if (s <= 0.01) return null;
				const d = new THREE.Vector3(...f.dir).normalize();
				const surf = new THREE.Vector3(d.x * S[0], d.y * S[1], d.z * S[2]).multiplyScalar(0.93);
				return (
					<group key={i} position={surf}>
						<mesh>
							<sphereGeometry args={[s, 48, 48]} />
							<meshPhysicalMaterial color="#ffe6bf" roughness={0.12} transmission={0.6} thickness={0.5} clearcoat={1} transparent opacity={0.92} />
						</mesh>
						<Rim r={s * 1.02} color="#fff1d6" intensity={1.1} />
						{/* oocyte speck inside follicle */}
						<mesh position={[s * 0.35, -s * 0.2, s * 0.3]}>
							<sphereGeometry args={[s * 0.16, 16, 16]} />
							<meshStandardMaterial color="#fff6e6" emissive="#ffd9a0" emissiveIntensity={0.4} />
						</mesh>
					</group>
				);
			})}
		</group>
	);
};

/* Follicle world position helper (for needle targeting) */
export const folliclePos = (i: number, rotY: number, position: [number, number, number]) => {
	const S = [1.45, 0.95, 0.8];
	const f = FOLLICLES[i];
	const d = new THREE.Vector3(...f.dir).normalize();
	const v = new THREE.Vector3(d.x * S[0], d.y * S[1], d.z * S[2]).multiplyScalar(0.93);
	v.applyEuler(new THREE.Euler(0.15, rotY, -0.12));
	return v.add(new THREE.Vector3(...position));
};

/* ------------------------------------------------------------------ */
/* Glass pipettes / needles                                            */
/* ------------------------------------------------------------------ */

export const Glass: React.FC<{from: THREE.Vector3; to: THREE.Vector3; r0: number; r1: number; metal?: boolean}> = ({from, to, r0, r1, metal}) => {
	const len = from.distanceTo(to);
	const mid = from.clone().add(to).multiplyScalar(0.5);
	const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
	return (
		<mesh position={mid} quaternion={q}>
			<cylinderGeometry args={[r1, r0, len, 32, 1, false]} />
			{metal ? (
				<meshStandardMaterial color="#e9e3da" metalness={0.95} roughness={0.18} />
			) : (
				<meshPhysicalMaterial color="#dff0ff" roughness={0.1} metalness={0.1} transparent opacity={0.45} clearcoat={1} emissive="#9fc8e8" emissiveIntensity={0.25} depthWrite={false} />
			)}
		</mesh>
	);
};

/* ------------------------------------------------------------------ */
/* Embryo stages                                                       */
/* ------------------------------------------------------------------ */

const fib = (n: number, R: number) =>
	[...Array(n)].map((_, i) => {
		const y = 1 - (i / (n - 1)) * 2;
		const rr = Math.sqrt(1 - y * y);
		const th = i * 2.399963;
		return new THREE.Vector3(Math.cos(th) * rr * R, y * R, Math.sin(th) * rr * R);
	});

const STAGE_POS: THREE.Vector3[][] = [
	[new THREE.Vector3(0, 0, 0)],
	[new THREE.Vector3(-0.42, 0.05, 0), new THREE.Vector3(0.42, -0.05, 0)],
	[new THREE.Vector3(-0.38, 0.3, 0.12), new THREE.Vector3(-0.38, -0.3, -0.12), new THREE.Vector3(0.38, 0.28, -0.14), new THREE.Vector3(0.38, -0.3, 0.14)],
	[
		[-1, 1, 1],
		[-1, 1, -1],
		[-1, -1, 1],
		[-1, -1, -1],
		[1, 1, 1],
		[1, 1, -1],
		[1, -1, 1],
		[1, -1, -1],
	].map(([x, y, z]) => new THREE.Vector3(x * 0.3, y * 0.3, z * 0.3)),
];
const STAGE_R = [0.88, 0.6, 0.48, 0.38];

/**
 * progress: 0 = zygote, 1 = 2-cell, 2 = 4-cell, 3 = 8-cell, 4 = morula, 5 = blastocyst
 */
export const Embryo: React.FC<{progress: number; position?: [number, number, number]}> = ({progress, position = [0, 0, 0]}) => {
	const frame = useCurrentFrame();
	const cleave = Math.min(progress, 3);
	const st = Math.floor(cleave);
	const t = Easing.inOut(Easing.cubic)(cleave - st);
	const morula = interpolate(progress, [3.2, 4], [0, 1], clamp);
	const blast = interpolate(progress, [4.2, 5], [0, 1], clamp);
	const zonaR = interpolate(blast, [0, 1], [1.18, 1.32]);

	// cleavage cells (fade out as morula forms)
	const cleavageCells: React.ReactNode[] = [];
	if (morula < 1) {
		const next = Math.min(st + 1, 3);
		const nCells = STAGE_POS[next].length;
		for (let j = 0; j < (st === 3 ? 8 : nCells); j++) {
			const parent = st === 3 ? j : Math.floor(j / 2);
			const p0 = STAGE_POS[st][Math.min(parent, STAGE_POS[st].length - 1)];
			const p1 = st === 3 ? STAGE_POS[3][j] : STAGE_POS[next][j];
			const pos = p0.clone().lerp(p1, st === 3 ? 0 : t);
			const r = st === 3 ? STAGE_R[3] : interpolate(t, [0, 1], [STAGE_R[st], STAGE_R[next]]);
			cleavageCells.push(<Cell key={`c${j}`} r={r} position={[pos.x, pos.y, pos.z]} seed={`e${j}`} opacity={1 - morula} />);
		}
	}

	// morula: compact ball of ~20 cells
	const morulaPts = useMemo(() => fib(20, 0.52), []);
	// blastocyst: trophectoderm shell + inner cell mass
	const tePts = useMemo(() => fib(60, 1.0), []);
	const icm = useMemo(() => [...Array(12)].map((_, i) => new THREE.Vector3(-0.45 + random(`icm${i}`) * 0.32, 0.4 + random(`icmy${i}`) * 0.3, (random(`icmz${i}`) - 0.5) * 0.4)), []);

	return (
		<group position={position} rotation={[0.25, frame * 0.004, 0]}>
			{cleavageCells}
			{st === 0 && progress < 0.6 && (
				<group>
					<Cell r={0.12} position={[-0.14, 0.05, 0.5]} color="#f7e4c9" seed="pn1" opacity={1 - progress / 0.6} />
					<Cell r={0.12} position={[0.14, -0.02, 0.5]} color="#f7e4c9" seed="pn2" opacity={1 - progress / 0.6} />
				</group>
			)}
			{morula > 0 &&
				morulaPts.map((p, i) => (
					<Cell key={`m${i}`} r={0.3} position={[p.x * (1 - blast), p.y * (1 - blast), p.z * (1 - blast)]} seed={`m${i}`} opacity={morula * (1 - blast)} />
				))}
			{blast > 0 && (
				<group>
					{/* trophectoderm: thin translucent epithelial shell */}
					<mesh scale={0.4 + 0.6 * blast}>
						<sphereGeometry args={[1.0, 96, 96]} />
						<meshPhysicalMaterial color="#efcfa8" roughness={0.4} sheen={1} sheenColor="#ffd9c7" transparent opacity={0.28 * blast} depthWrite={false} side={THREE.DoubleSide} />
					</mesh>
					<Rim r={(0.4 + 0.6 * blast) * 1.0} color="#ffe4bd" power={2} intensity={1.3} opacity={blast} />
					{tePts.map((p, i) => (
						<mesh key={`t${i}`} position={[p.x * (0.4 + 0.6 * blast), p.y * (0.4 + 0.6 * blast), p.z * (0.4 + 0.6 * blast)]}>
							<sphereGeometry args={[0.07, 12, 12]} />
							<meshStandardMaterial color="#f6dcb8" transparent opacity={0.55 * blast} />
						</mesh>
					))}
					{/* inner cell mass */}
					{icm.map((p, i) => (
						<Cell key={`i${i}`} r={0.17} position={[p.x, p.y, p.z]} color="#f3c39c" seed={`i${i}`} opacity={blast} />
					))}
				</group>
			)}
			<Zona r={zonaR} thickness={interpolate(blast, [0, 1], [0.16, 0.08])} />
		</group>
	);
};
