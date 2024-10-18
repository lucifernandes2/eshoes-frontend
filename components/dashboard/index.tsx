'use client'
import { getUserMeLoader } from '@/app/data/services/get-user-me-loader'
import { listProduct } from '@/app/data/services/product'
import type { ProductDto } from '@/app/data/services/product/dto/product.dto'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import PaginationExample from '../pagination-example/pagination-example'

function Dashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<ProductDto[]>([])
  const [loading, setLoading] = useState(true) // Para controlar o carregamento

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUserMeLoader()
      if (user?.ok === false) {
        router.replace('/sign-in') // Use replace para evitar duplicação de redirecionamento
      }
      setLoading(false) // Desative o carregamento após a verificação
    }

    checkUser()
  }, [router])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await listProduct()
      if (products) {
        setProducts(products)
      }
    }
    if (!loading) {
      fetchProducts() // Apenas busque produtos quando não estiver carregando
    }
  }, [loading])

  if (loading) return <div>Carregando...</div> // Opcional: renderize algo enquanto carrega

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="flex w-full gap-4">
          <PaginationExample productList={products} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
