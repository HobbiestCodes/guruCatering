import React, { useRef } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useScroll } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { motion } from "framer-motion-3d";

export function Model(props) {
  const { scene } = useGLTF("/Model.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const scroll = useScroll();
  const ref = useRef();
  const chair3 = useRef();
  const candles1 = useRef();
  const candles2 = useRef();
  const candles3 = useRef();

  const chair_right = useRef();
  const init_chair_right = 3.746;
  const init_chair_left = -4.642;
  const chair_left = useRef();

  const initZ_3 = -0.831;

  useFrame(() => {
    const maxScale = 0.026; // Maximum scale value
    const scaleFactor = 1 - scroll.offset; // Calculate scale factor based on scroll
    ref.current.intensity = scroll.offset * 1;
    candles1.current.scale.set(
      maxScale * scaleFactor,
      maxScale * scaleFactor,
      maxScale * scaleFactor
    );
    candles2.current.scale.set(
      maxScale * scaleFactor,
      maxScale * scaleFactor,
      maxScale * scaleFactor
    );
    candles3.current.scale.set(
      maxScale * scaleFactor,
      maxScale * scaleFactor,
      maxScale * scaleFactor
    );

    chair3.current.position.z = initZ_3 + scroll.offset * -7;
    chair_left.current.position.x = init_chair_left + scroll.offset * -7;
    chair_right.current.position.x = init_chair_right + scroll.offset * 7;
  });




  return (
    <group {...props} dispose={null}>
      <pointLight
        intensity={6}
        decay={2}
        position={[1.023, 2.658, -3.068]}
        rotation={[-2.25, 0.727, 2.453]}
      />
      <directionalLight
        intensity={6}
        decay={2}
        position={[-1.206, 7.049, -1.602]}
        rotation={[-1.806, -0.308, -2.24]}
        target={nodes["TriLamp-Back001"].target}
      >
        <primitive
          object={nodes["TriLamp-Back001"].target}
          position={[0, 0, -1]}
        />
      </directionalLight>
      <directionalLight
      ref={ref}
        intensity={6}
        decay={2}
        position={[-7.233, 7.207, 4.936]}
        rotation={[-0.868, -0.723, -0.663]}
        target={nodes["TriLamp-Back002"].target}
      >
        <primitive
          object={nodes["TriLamp-Back002"].target}
          position={[0, 0, -1]}
        />
      </directionalLight>
      <pointLight
        intensity={4}
        decay={2}
        position={[-0.41, 2.558, -2.332]}
        rotation={[-2.25, 0.727, 2.453]}
      />
      <pointLight
        intensity={4}
        decay={2}
        position={[4.171, 2.808, -0.496]}
        rotation={[-2.25, 0.727, 2.453]}
      />
      <pointLight
        intensity={4}
        decay={2}
        position={[-4.755, 2.658, -0.576]}
        rotation={[-2.25, 0.727, 2.453]}
      />
      <pointLight
        intensity={4}
        decay={2}
        position={[0.811, 0.701, 0.45]}
        rotation={[-0.388, 0.413, 0.162]}
      />
      <pointLight
        intensity={6}
        decay={2}
        position={[-1.672, 0.701, 0.45]}
        rotation={[-0.388, -0.734, -0.267]}
      />
      <pointLight
        intensity={4}
        decay={2}
        color="#ffcf00"
        position={[4.654, 3.717, -3.401]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <pointLight
        intensity={4}
        decay={2}
        color="#ffcf00"
        position={[4.997, 3.717, -3.401]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <pointLight
        intensity={4}
        decay={2}
        color="#ffcf00"
        position={[-5.577, 3.717, -3.401]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <pointLight
        intensity={4}
        decay={2}
        color="#ffcf00"
        position={[-5.234, 3.717, -3.401]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <motion.group
        initial={{ rotate: 180, scale: 0, y: 10 }}
        animate={{ rotate: 0, scale: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.7, damping: 0.3 }}
      >
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials.dull_mat}
          position={[-0.464, 1.233, -0.016]}
        />
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials["Material.001"]}
          position={[-0.464, 1.271, -3.954]}
        />
        <mesh
          geometry={nodes.Cube003.geometry}
          material={materials.golden}
          position={[-0.463, 1.359, -0.017]}
        />
      </motion.group>

      <group position={[-0.418, 0.694, 0.001]} scale={[0.795, 0.594, 0.6]} >
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, delay: 0 }}
          geometry={nodes.Cylinder004.geometry}
          material={materials.golden}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, delay: 0 }}
          geometry={nodes.Cylinder004_1.geometry}
          material={materials.dull_mat}
        />
      </group>

      <mesh
        geometry={nodes.Plane.geometry}
        material={materials["Material.005"]}
        scale={[-6.437, -8.614, -2.552]}
      />

      <group position={[2.329, 0.013, -0.831]} scale={0.018} ref={chair3}>
        <motion.mesh
          initial={{ rotate: 360, y: -300, opacity: 0 }}
          animate={{ rotate: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, damping: 0.5 }}
          geometry={nodes.meshChair.geometry}
          material={materials.dull_mat}
        />
        <motion.mesh
          initial={{ rotate: 360, y: -300, opacity: 0 }}
          animate={{ rotate: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, damping: 0.5 }}
          geometry={nodes.meshChair_1.geometry}
          material={materials["Material.003"]}
        />
        <motion.mesh
          initial={{ rotate: 360, y: -300, opacity: 0 }}
          animate={{ rotate: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, damping: 0.5 }}
          geometry={nodes.meshChair_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
      <group
        position={[3.746, 0.013, 0.012]}
        rotation={[0, -1.571, 0]}
        scale={0.018}
        ref={chair_right}
      >
        <motion.mesh
          initial={{ rotate: 360, z: -300, opacity: 0 }}
          animate={{ rotate: 0, z: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, damping: 0.5 }}
          geometry={nodes.meshChair002.geometry}
          material={materials.dull_mat}
        />
        <motion.mesh
          initial={{ rotate: 360, z: -300, opacity: 0 }}
          animate={{ rotate: 0, z: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, damping: 0.5 }}
          geometry={nodes.meshChair002_1.geometry}
          material={materials["Material.003"]}
        />
        <motion.mesh
          initial={{ rotate: 360, z: -300, opacity: 0 }}
          animate={{ rotate: 0, z: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, damping: 0.5 }}
          geometry={nodes.meshChair002_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
      <group
        position={[-4.642, 0.013, 0.012]}
        rotation={[0, 1.571, 0]}
        scale={0.018}
        ref={chair_left}
      >
        <motion.mesh
          initial={{ rotate: 360, z: -300, opacity: 0 }}
          animate={{ rotate: 0, z: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, damping: 0.5 }}
          geometry={nodes.meshChair001.geometry}
          material={materials.dull_mat}
        />
        <motion.mesh
          initial={{ rotate: 360, z: -300, opacity: 0 }}
          animate={{ rotate: 0, z: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, damping: 0.5 }}
          geometry={nodes.meshChair001_1.geometry}
          material={materials["Material.003"]}
        />
        <motion.mesh
          initial={{ rotate: 360, z: -300, opacity: 0 }}
          animate={{ rotate: 0, z: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, damping: 0.5 }}
          geometry={nodes.meshChair001_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
      <group position={[-0.472, 1.368, 0]} scale={0.026}
      ref={candles1}
      >
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh002.geometry}
          material={materials["Material.002"]}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh002_1.geometry}
          material={materials.candle_holder}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh002_2.geometry}
          material={materials.dull_mat}
        />
      </group>

      <group ref={candles2} position={[0.953, 1.368, 0]} scale={0.026}>
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh003.geometry}
          material={materials["Material.002"]}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh003_1.geometry}
          material={materials.candle_holder}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh003_2.geometry}
          material={materials.dull_mat}
        />
      </group>
      <group ref={candles3} position={[-1.907, 1.368, 0]} scale={0.026}>
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh004.geometry}
          material={materials["Material.002"]}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh004_1.geometry}
          material={materials.candle_holder}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.Mesh004_2.geometry}
          material={materials.dull_mat}
        />
      </group>
      <mesh
        geometry={nodes.Plane001.geometry}
        material={materials["Material.004"]}
        scale={[-6.437, -8.614, -2.552]}
      />
      <group
        position={[-0.289, 3.774, -3.656]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.035, 0.035, 0.044]}
      >
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.lamp_1.geometry}
          material={materials.glass}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.lamp_2.geometry}
          material={materials["black metal"]}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.lamp_3.geometry}
          material={materials["GOld metal"]}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.lamp_4.geometry}
          material={materials["Material.006"]}
        />
        <motion.mesh
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          geometry={nodes.lamp_5.geometry}
          material={materials.clearMarble}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Model.glb");
