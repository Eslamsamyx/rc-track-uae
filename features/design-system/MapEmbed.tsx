interface Props {
  src?: string;
  title?: string;
  className?: string;
  ratio?: "4/3" | "16/9" | "21/9";
}

const DEFAULT_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.42!2d55.275!3d25.20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s!2sDubai!5e0!3m2!1sen!2sae!4v1700000000000";

export function MapEmbed({ src = DEFAULT_SRC, title = "RC Track UAE location", className, ratio = "16/9" }: Props) {
  const ratioClass = ratio === "4/3" ? "aspect-[4/3]" : ratio === "21/9" ? "aspect-[21/9]" : "aspect-[16/9]";
  return (
    <div className={`${ratioClass} w-full overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] ${className ?? ""}`}>
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
