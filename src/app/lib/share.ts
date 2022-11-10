type ShareData = {
  text: string;
  url: string;
};

function createShareData(leftEye: number, rightEye: number): ShareData {
  const text = leftEye === 1 && rightEye === 1 ? 'ゆかりちゃん完成！！！' : 'ゆかりスロット失敗 😥';
  const url = `https://yukari-slot.mizdra.net/share/${leftEye}${rightEye}`;
  return { text, url };
}

function createTweetLink(text: string, url: string) {
  const encodedText = encodeURIComponent(text);
  const encodedHashtags = encodeURIComponent('ゆかりスロット');
  const encodedUrl = encodeURIComponent(url);
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}&url=${encodedUrl}`;
}

export function shareWithTwitterIntent(leftEye: number | undefined, rightEye: number | undefined) {
  if (leftEye === undefined || rightEye === undefined) {
    alert('問題が発生しました。リロードしてからもう一度お試しください。');
    return;
  }
  const { text, url } = createShareData(leftEye, rightEye);
  // navigator.share がない環境やシェアに失敗した場合は
  // Twitter Web Intentにfallbackする
  window.open(createTweetLink(text, url));
}

export async function shareWithWebShareAPI(leftEye: number | undefined, rightEye: number | undefined) {
  if (leftEye === undefined || rightEye === undefined) {
    alert('問題が発生しました。リロードしてからもう一度お試しください。');
    return;
  }
  const { text, url } = createShareData(leftEye, rightEye);
  try {
    await navigator
      // ハッシュタグを付加して共有
      .share({ text: `${text} #ゆかりスロット`, url });
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') return;
  }
}
