import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    //set the initial position of target
    let targetposition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakPoint) targetposition = [0, 0, 2];
      if (isMobile) targetposition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetposition = [0, 0, 2.5];
      else targetposition = [0, 0, 2];
    }
    //set modal camera postion
    easing.damp3(state.camera.position, targetposition, 0.25, delta);

    //set modal rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
