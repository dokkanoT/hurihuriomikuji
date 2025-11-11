import  "./title.css";
import Link from "next/link"; // Linkをインポート
export default function Button() {
    
    return (
        <>
            <h2>ボタンをクリックしてあなたの恋愛運をチェック！</h2>
             <Link href="https://172.24.73.80:3000/result"> 
            <button className="button">プレイ</button>
            </Link>
        </>
    );
}
