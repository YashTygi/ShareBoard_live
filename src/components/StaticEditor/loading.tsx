'use client'
export default function Loading() {
    return (
    <div className='load'>
        <style jsx>{`
        .load {
            --dot-bg: #faf8f8;
    --dot-color: #222222;
    --dot-size: 2px;
    --dot-space: 15px;
    background:
      linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
      linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
      var(--dot-color);
        }
      `}</style>
    </div>
)
}