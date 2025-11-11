import "./result.css";
import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

type ButtonProps = {
    onClick: () => void;
    // 💡 修正点: ページの状態をリセットするための関数を追加

};

export default function Button({ onClick}: ButtonProps) {
    const router = useRouter();
    
    const handleReload = () => {
        // 1. ローカルの状態をリセット
        router.refresh;
        
        // 2. サーバーサイドのデータが必要な場合は refresh を実行
        //    (ただし onReset で全てリセットできるなら不要な場合が多い)
        // router.refresh(); 
    }
    
    return (
        <>
            <button className="button3" onClick={onClick}>
                引く
            </button>
             <Link href="https://localhost:3000"> 
                 <button onClick={handleReload} className="button2">
                    タイトルへ
                 </button>
            </Link>
        </>
    );
}
