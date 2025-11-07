import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Assignment } from "./AssignmentForm";

interface Assignment3DCardProps {
  assignment: Assignment;
}

function FloatingCard({ assignment }: { assignment: Assignment }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Subtle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox
        ref={meshRef}
        args={[4, 5, 0.1]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial color="#f8f5f0" />
      </RoundedBox>
      
      {/* Title */}
      <Text
        position={[0, 2, 0.06]}
        fontSize={0.35}
        color="#1e7e88"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        font="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9eIipYTtVM7fC.woff"
      >
        {assignment.title}
      </Text>
      
      {/* Subject badge */}
      <Text
        position={[0, 1.5, 0.06]}
        fontSize={0.2}
        color="#d97533"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        font="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9eIipYTtVM7fC.woff"
      >
        {assignment.subject}
      </Text>
      
      {/* Description */}
      {assignment.description && (
        <Text
          position={[0, 0.8, 0.06]}
          fontSize={0.15}
          color="#3d2818"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
          font="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9eIipYTtVM7fC.woff"
        >
          {assignment.description}
        </Text>
      )}
      
      {/* Tasks */}
      {assignment.tasks.slice(0, 3).map((task, index) => (
        <Text
          key={index}
          position={[-1.5, -0.2 - index * 0.5, 0.06]}
          fontSize={0.18}
          color="#3d2818"
          anchorX="left"
          anchorY="middle"
          maxWidth={3.5}
          font="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9eIipYTtVM7fC.woff"
        >
          {`${index + 1}. ${task}`}
        </Text>
      ))}
      
      {assignment.tasks.length > 3 && (
        <Text
          position={[0, -2, 0.06]}
          fontSize={0.15}
          color="#6b5745"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9eIipYTtVM7fC.woff"
        >
          {`+ ${assignment.tasks.length - 3} more tasks`}
        </Text>
      )}
    </group>
  );
}

export const Assignment3DCard = ({ assignment }: Assignment3DCardProps) => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-float">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <FloatingCard assignment={assignment} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};
