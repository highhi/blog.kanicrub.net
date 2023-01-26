const hexToArrayBuffer = (hex: string): ArrayBuffer => {
  const view = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return view.buffer
}

export const verify = async ({sig, secret, payload }: { sig: string; secret: string; payload: string }): Promise<boolean> => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  return crypto.subtle.verify(
    "HMAC",
    key,
    hexToArrayBuffer(sig),
    encoder.encode(payload)
  );
}

