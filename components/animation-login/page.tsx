'use client'
import Image from 'next/image'
import * as React from 'react'

const images = [
  { alt: 'Ambiente corporativo amigável', src: '/first-slide.svg' },
  { alt: 'Funcionários sorrindo', src: '/second-slide.svg' },
  { alt: 'Time brainstorming', src: '/third-slide.svg' }
]

export default function FadeinImages() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0) // Armazena o indice da primeira imagem começando em indice 0
  const [fade, setFade] = React.useState(false) // Inicia o efeito de fadein desabilitado

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Cria função para alternar as imagens de forma repetida
      setFade(true) // Fade out quando fade for true
      setTimeout(() => {
        // Tempo de exibição das imagens
        setCurrentImageIndex(
          prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1) // Se a imagem for a última da lista, inicia o indice denovo, senão vai pra prox
        )
        setFade(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval) // Limpa o intervalo quando reiniciado
  }, [])

  return (
    <div className="relative flex h-[700px] w-full overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={index}
          width={900}
          height={900}
          src={image.src}
          alt={image.alt}
          priority={index === 0}
          className={`absolute flex h-full w-full object-cover transition-opacity duration-500 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          } ${fade ? 'opacity-0' : ''}`}
        />
      ))}
    </div>
  )
}
