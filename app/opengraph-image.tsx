import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const alt = `${profile.name} — ${profile.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          color: '#EDEDED',
          padding: '64px 72px',
          border: '2px solid #222222',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #222222',
            paddingBottom: '24px',
            fontFamily: 'monospace',
            fontSize: '20px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#888888',
          }}
        >
          <span>{"// "}SYSTEM_SPEC :: PORTFOLIO</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00FF00' }}>
            <span>[STATUS: OPEN_TO_WORK]</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '76px',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#EDEDED',
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: '32px',
              lineHeight: 1.35,
              color: '#888888',
              maxWidth: '920px',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {profile.summary}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #222222',
            paddingTop: '24px',
            fontFamily: 'monospace',
            fontSize: '20px',
            color: '#888888',
          }}
        >
          <span>
            [{profile.role.toUpperCase()}] // {profile.location.toUpperCase()}
          </span>
          <span style={{ color: '#0055FF' }}>niloykm.vercel.app -&gt;</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
