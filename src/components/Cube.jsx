import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GlassCube = () => {
  const cubeRef = useRef();

  // Animation loop to rotate the cube
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  // Load textures for each side
  const loader = new THREE.TextureLoader();
  const materials = [
    new THREE.MeshPhysicalMaterial({
      map: loader.load("/img/first.png"),
      transparent: true,
  
      roughness: 0.5,
      metalness: 0.5,
      reflectivity: 1,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshPhysicalMaterial({
      map: loader.load("/img/second.png"),
      transparent: true,
  
      roughness: 0.5,
      metalness: 0.5,
      reflectivity: 1,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshPhysicalMaterial({
      map: loader.load("/img/third.png"),
      transparent: true,
  
      roughness: 0.5,
      metalness: 0.5,
      reflectivity: 1,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshPhysicalMaterial({
      map: loader.load("/img/fourth.png"),
      transparent: true,
  
      roughness: 0.5,
      metalness: 0.5,
      reflectivity: 1,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshPhysicalMaterial({
      map: loader.load("/img/fifth.png"),
      transparent: true,
  
      roughness: 0.5,
      metalness: 0.5,
      reflectivity: 1,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshPhysicalMaterial({
      map: loader.load("/img/six.png"),
      transparent: true,
  
      roughness: 0.5,
      metalness: 0.5,
      reflectivity: 1,
      side: THREE.DoubleSide,
    }),
  ];

  return (
    <mesh ref={cubeRef}>
      <meshStandardMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.5} // Adjust for transparency level
        />
      <boxGeometry args={[1, 1, 1]} />
      {/* Apply materials to each face */}
      {materials.map((material, index) => (
        <primitive key={index} object={material} attach={`material-${index}`} />
      ))}
    </mesh>
  );
};

export default GlassCube;
