// import React from "react";
// import Button from "../components/Button";
// import "../components/title.css";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <head>
//         <title>フリフリおみくじ</title>
//       </head>
//       <body>
//         <h1>フリフリ　　　おみくじ</h1>
//         <Image src="/omikuji_hontai.png" className="moving-image" alt="おみくじ本体の画像" width="200" height="250" />
//         <Button />
//       </body>
//     </div>
//   );
// }

// Home.tsx
import React from "react";
import Button from "../components/Button";
import "../components/title.css";
import Image from "next/image";

export default function Home() {
  
  return (
    
    <div>
        <h1>　♡恋みくじ♡</h1>
        <Image src="/omikuji_hontai.png" className="image" alt="おみくじ本体の画像" width="200" height="250" />
          <Button />
      
    </div>
  );
}