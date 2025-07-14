// // src/types/react-viro.d.ts

// import React from 'react';
// import {
//   ViroARScene,
//   ViroAmbientLight,
//   ViroText,
//   Viro3DObject,
// } from '@reactvision/react-viro';

// export default function ProductScene() {
//   return (
//     <ViroARScene>
//       <ViroAmbientLight color="#ffffff" />

//       <ViroText
//         text="Go to Aisle E1"
//         scale={[0.4, 0.4, 0.4]}
//         position={[0, 0.2, -1]}
//         color="#3a86ff"
//         fontFamily="Arial"
//         fontSize={40}
//       />

//       <Viro3DObject
//         source={require('./arrow.obj')}
//         resources={[require('./arrow.mtl')]}
//         type="OBJ"
//         position={[0, -0.1, -1]}
//         scale={[0.2, 0.2, 0.2]}
//       />
//     </ViroARScene>
//   );
// }
