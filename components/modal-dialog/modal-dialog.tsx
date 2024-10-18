import type { ProductDto } from '@/app/data/services/product/dto/product.dto'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { set } from 'zod'

interface EditProductModalProps {
  mode: 'edit' | 'add'
  onChange: (product: any) => void
  product: ProductDto
  error: string
}

//@ts-ignore
export default function EditProductModal({ error, mode, onChange, product }: EditProductModalProps) {
  const [nome, setName] = useState(product?.nome || '')
  const [preco, setPrice] = useState<number>(product?.preco || 0)
  const [estoque, setStock] = useState<number>(product?.estoque || 0)
  const [tamanho, setSize] = useState<string>(product?.tamanho || '')

  useEffect(() => {
    if (product) {
      setName(product.nome)
      setPrice(product.preco)
      setStock(product.estoque)
      setSize(product.tamanho)
    } else {
      setName('')
      setPrice(0)
      setStock(0)
      setSize('')
    }
  }, [product])

  const handleSaveChanges = () => {
    const updatedProduct = {
      ...product,
      estoque,
      nome,
      preco,
      tamanho
    }
    onChange(updatedProduct)
    if (mode === 'add') {
      setName('')
      setPrice(0)
      setStock(0)
      setSize('')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{mode === 'edit' ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input id="name" value={nome} className="col-span-3" onChange={e => setName(e.target.value)} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Preço
          </Label>
          <Input id="price" value={preco} type="number" className="col-span-3" onChange={e => setPrice(+e.target.value)} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">
            Estoque
          </Label>
          <Input id="stock" type="number" value={estoque} className="col-span-3" onChange={e => setStock(+e.target.value)} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="size" className="text-right">
            Tamanho
          </Label>
          <Input id="size" value={tamanho} className="col-span-3" onChange={e => setSize(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-between">
        <Label className="text-red-500 mx-8 p-3">{error}</Label>
        <DialogFooter>
          <div className="flex justify-between">
            <Button type="submit" onClick={handleSaveChanges}>
              {mode === 'edit' ? 'Salvar Alterações' : 'Adicionar Produto'}
            </Button>
          </div>
        </DialogFooter>
      </div>
    </DialogContent>
  )
}
