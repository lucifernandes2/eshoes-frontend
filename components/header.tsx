'use client'

function Header() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <header className="flex w-full flex-wrap items-center justify-center gap-y-4 bg-blue-100 px-8 py-4 text-tertiary shadow-md sm:justify-between dark:bg-gray-900 dark:text-gray-100">
      <h1 className="flex font-medium leading-7">
        Bem-vindo!{' '}
      </h1>
    </header>
  )
}

export default Header
