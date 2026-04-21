export default function AuthorSignoff() {
  return (
    <div className="mt-14 border-t border-t-[#d8defa] pt-8 font-sans text-sm leading-[1.8] text-[#4d5b9a]">
      <p className="font-semibold text-[#0f172a]">&mdash; Orlando Osorio &amp; Alberto Sadde</p>
      <div className="mt-1 flex items-center gap-2">
        <a
          href="https://x.com/orlandosorio_"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 no-underline hover:underline"
        >
          @orlandosorio_
        </a>
        <span className="text-brand-300">&middot;</span>
        <a
          href="https://x.com/aesadde"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 no-underline hover:underline"
        >
          @aesadde
        </a>
      </div>
    </div>
  );
}
