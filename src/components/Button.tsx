import  "./title.css";
import Link from "next/link"; // Linkをインポート
export default function Button() {
    
    return (
        <>
            <h2>ボタンをクリックしてあなたの恋愛運をチェック！</h2>
             <Link href="https://hurihuriomikuji-pi.vercel.app/result"> 
            <button className="button">プレイ</button>
            </Link>
        </>
    );
}
