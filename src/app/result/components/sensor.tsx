import React, { useState, useEffect, useCallback } from 'react';

// 振ったと判定するしきい値（m/s^2）。この値を調整することで感度を変更できます。
// 通常、15-20 m/s^2 あたりが適度な感度です。
const SHAKE_THRESHOLD = 15;
const IMAGE_URL = 'https://picsum.photos/400/300'; // 表示したい画像のURL

const ShakeImageDetector = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [showImage, setShowImage] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // 1. デバイスの動きを検出するハンドラー
  const handleDeviceMotion = useCallback((event: { accelerationIncludingGravity: any; }) => {
    const acc = event.accelerationIncludingGravity;

    if (acc) {
      // 現在の加速度を更新（デバッグ用）
      setAcceleration({
        x: acc.x ? acc.x.toFixed(2) : 0,
        y: acc.y ? acc.y.toFixed(2) : 0,
        z: acc.z ? acc.z.toFixed(2) : 0,
      });

      // 「振る」アクションの判定ロジック
      // 3軸の絶対値のいずれかがしきい値を超えているかチェック
      const isShaking = 
        Math.abs(acc.x) > SHAKE_THRESHOLD ||
        Math.abs(acc.y) > SHAKE_THRESHOLD ||
        Math.abs(acc.z) > SHAKE_THRESHOLD;

      if (isShaking) {
        console.log('Shaking detected!');
        setShowImage(true);
      }
    }
  }, []);

  // 2. iOS 13+で必要なパーミッション要求
  const requestPermission = async () => {
    if (
      typeof window !== 'undefined' &&
      'DeviceMotionEvent' in window &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      try {
        const permissionState = await DeviceMotionEvent.requestPermission();
        if (permissionState === 'granted') {
          setPermissionGranted(true);
        } else {
          alert('加速度センサーの利用が拒否されました。設定を確認してください。');
        }
      } catch (error) {
        console.error('パーミッションリクエストエラー:', error);
      }
    } else {
      // iOS 13+以外の環境や、DeviceMotionEvent.requestPermissionがない場合
      setPermissionGranted(true);
    }
  };

  // 3. イベントリスナーの登録と解除
  useEffect(() => {
    if (permissionGranted) {
      // クライアントサイドでのみイベントリスナーを登録
      if (typeof window !== 'undefined' && 'ondevicemotion' in window) {
        window.addEventListener('devicemotion', handleDeviceMotion);
      }
    }

    // クリーンアップ関数
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('devicemotion', handleDeviceMotion);
      }
    };
  }, [permissionGranted, handleDeviceMotion]); // permissionGrantedとhandleDeviceMotionに依存

  // UIレンダリング
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>シェイクで画像表示アプリ</h1>
      <p style={{ fontWeight: 'bold' }}>スマートフォンを持って振ってみてください。</p>

      {!permissionGranted && (
        <button 
          onClick={requestPermission} 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}
        >
          センサーの利用を許可する (iOS 13+ 必須)
        </button>
      )}

      {permissionGranted && (
        <div style={{ marginTop: '20px' }}>
          <p>X軸: {acceleration.x} m/s²</p>
          <p>Y軸: {acceleration.y} m/s²</p>
          <p>Z軸: {acceleration.z} m/s²</p>
        </div>
      )}
      
      {showImage && (
        <div style={{ border: '2px solid green', padding: '10px', marginTop: '30px' }}>
          <h2>🎉 振る動作を検出しました！</h2>
          <img 
            src={IMAGE_URL} 
            alt="シェイクで表示された画像" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <button 
            onClick={() => setShowImage(false)}
            style={{ marginTop: '10px', padding: '5px 15px' }}
          >
            画像を非表示にする
          </button>
        </div>
      )}
    </div>
  );
};

export default ShakeImageDetector;