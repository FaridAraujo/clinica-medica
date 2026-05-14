interface MapEmbedProps {
  src: string;
  title: string;
  height?: number;
  aspectRatio?: string;
}

export default function MapEmbed({ src, title, height, aspectRatio = '16/9' }: MapEmbedProps) {
  const containerStyle = height ? { height } : { aspectRatio };

  return (
    <div style={containerStyle} className="w-full overflow-hidden">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
