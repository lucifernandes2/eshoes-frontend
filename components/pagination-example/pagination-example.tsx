'use client'
import { deleteProduct, findByNamesProduct, listProduct, saveProduct, updateProduct } from '@/app/data/services/product'
import type { ProductDto } from '@/app/data/services/product/dto/product.dto'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { set } from 'zod'

import EditProductModal from '../modal-dialog/modal-dialog'
import { Dialog, DialogTrigger } from '../ui/dialog'

interface ProductProps {
  productList: ProductDto[]
}

export default function PaginationExample({ productList }: ProductProps) {
  const [products, setProducts] = useState(productList)
  const [visibleCount, setVisibleCount] = useState(5)
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null)
  const [modalMode, setModalMode] = useState<'edit' | 'add'>('add')
  const [searchTerm, setSearchTerm] = useState('')
  const [hasSaveError, setHasSaveError] = useState('')
  const [hasEditError, setHasEditError] = useState('')

  useEffect(() => {
    setProducts(productList)
  }, [productList])

  const loadMoreItems = useCallback(() => {
    if (visibleCount < products.length) {
      setVisibleCount(prevCount => Math.min(prevCount + 5, products.length))
    }
  }, [visibleCount, products.length])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      if (scrollY + windowHeight >= documentHeight - 10) {
        loadMoreItems()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleCount, products, loadMoreItems])

  const handleEditProduct = async (updatedProduct: ProductDto) => {
    const newProductList = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    const result = await updateProduct(updatedProduct.id, updatedProduct)
    //@ts-ignore
    if (!result?.error) {
      setProducts(newProductList)
    }
    //@ts-ignore
    setHasEditError(result?.error)
  }

  const handleRemoveProduct = (id: number): void => {
    const newProductList = products.filter(product => product.id !== id)
    deleteProduct(id)
    setProducts(newProductList)
  }

  const handleAddProduct = async (newProduct: Omit<ProductDto, 'id'>) => {
    const result = await saveProduct(newProduct)
    //@ts-ignore
    // if (result?.error)
    if (!result?.error) {
      setProducts(prevProducts => [...prevProducts, result as ProductDto])
    }
    //@ts-ignore
    setHasSaveError(result.error)
  }

  // Função para buscar produtos com base no nome
  const handleSearch = async (name: string) => {
    setSearchTerm(name)
    if (name) {
      const result = await findByNamesProduct(name)
      if (result) {
        setProducts(result)
      }
    } else {
      // Se o campo de busca estiver vazio, restaurar a lista original
      setProducts(productList)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Lista de produtos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="flex justify-between items-center gap-3"
              onClick={() => {
                setSelectedProduct(null)
                setModalMode('add')
              }}
            >
              Adicionar Produto
              <PlusIcon />
            </button>
          </DialogTrigger>
          <EditProductModal
            mode={modalMode}
            error={hasSaveError}
            product={selectedProduct as ProductDto}
            onChange={modalMode === 'add' ? handleAddProduct : handleEditProduct}
          />
        </Dialog>
      </div>

      <div className="relative mb-4">
        <Input type="text" value={searchTerm} onChange={e => handleSearch(e.target.value)} />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid gap-4 mb-4">
        {products.length > 0 ? (
          products.slice(0, visibleCount).map(product => (
            <div key={product.id} className="flex border p-4 rounded-lg shadow justify-between">
              <div>
                <h2 className="text-lg font-semibold">{product.nome}</h2>
                <p className="text-gray-600">R$ {product.preco}</p>
                <p className="text-gray-600">Tamanho {product.tamanho}</p>
              </div>
              <div className="flex justify-evenly gap-3">
                <button onClick={() => handleRemoveProduct(product.id)}>
                  <TrashIcon />
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                    <button onClick={() => setSelectedProduct(product)}>
                      <Pencil1Icon />
                    </button>
                  </DialogTrigger>
                  <EditProductModal
                    mode={'edit'}
                    error={hasEditError}
                    product={product as ProductDto}
                    // onChange={(updatedProduct: ProductDto) => handleEditProduct(updatedProduct)}
                    onChange={(updatedProduct: ProductDto) => handleEditProduct(updatedProduct)}
                  />
                </Dialog>
              </div>
            </div>
          ))
        ) : (
          <h2>Não foram encontrados produtos</h2>
        )}
      </div>
      {visibleCount < products.length && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={e => {
                  e.preventDefault()
                  loadMoreItems()
                }}
              >
                <PlusIcon />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
