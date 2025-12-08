import Image from "next/image"

// Logo GP - usando imagem direta
export function GPLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/images/logo.svg"
      alt="GP Logo"
      width={32}
      height={32}
      className={className}
    />
  )
}

// Logo GP - versão branca para fundos escuros
export function GPLogoWhite({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/images/logo.svg"
      alt="GP Logo"
      width={36}
      height={36}
      className={className}
    />
  )
}
