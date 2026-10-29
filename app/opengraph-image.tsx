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
          backgroundColor: '#F4F3EF',
          color: '#14130F',
          padding: '64px 72px',
          border: '1px solid #DEDCD4',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #DEDCD4',
            paddingBottom: '24px',
            fontFamily: 'monospace',
            fontSize: '20px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#5E5C55',
          }}
        >
          <span>Spec Sheet · Portfolio</span>
          <span style={{ color: '#2F7D4F' }}>● Open to work</span>
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
              fontSize: '78px',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              color: '#14130F',
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: '34px',
              lineHeight: 1.35,
              color: '#3B3933',
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
            borderTop: '1px solid #DEDCD4',
            paddingTop: '24px',
            fontFamily: 'monospace',
            fontSize: '20px',
            color: '#5E5C55',
          }}
        >
          <span>
            {profile.role} · {profile.location}
          </span>
          <span style={{ color: '#14130F' }}>niloykm.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
