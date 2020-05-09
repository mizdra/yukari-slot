type ShareData = {
  text: string;
  url: string;
};

function createShareData(leftEye: number | undefined, rightEye: number | undefined): ShareData {
  const text =
    leftEye === undefined || rightEye === undefined
      ? 'エラー'
      : leftEye === 1 && rightEye === 1
      ? 'ゆかりちゃん完成！！！'
      : 'ゆかりスロット失敗 😥';
  const url = `https://yukari-slot.mizdra.net/share/${leftEye}${rightEye}`;
  return { text, url };
}

function createTweetLink(text: string, url: string) {
  const encodedText = encodeURIComponent(text);
  const encodedHashtags = encodeURIComponent('ゆかりスロット');
  const encodedUrl = encodeURIComponent(url);
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}&url=${encodedUrl}`;
}

export async function shareWithTwitterIntent(leftEye: number | undefined, rightEye: number | undefined) {
  const { text, url } = createShareData(leftEye, rightEye);
  // navigator.share がない環境やシェアに失敗した場合は
  // Twitter Web Intentにfallbackする
  window.open(createTweetLink(text, url));
}

export async function shareWithWebShareAPI(leftEye: number | undefined, rightEye: number | undefined) {
  const { text, url } = createShareData(leftEye, rightEye);
  try {
    await navigator
      // ハッシュタグを付加して共有
      .share({ text: `${text} #ゆかりスロット`, url });
  } catch (e) {
    if (e.name === 'AbortError') return;
  }
}
