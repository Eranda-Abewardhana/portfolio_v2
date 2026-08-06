import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#07090e',
          borderRadius: '8px',
          border: '1.5px solid #e06b3a',
          color: '#f59e0b',
          fontWeight: 900,
          fontSize: '16px',
          letterSpacing: '-1px',
        }}
      >
        ES
      </div>
    ),
    { ...size }
  );
}
