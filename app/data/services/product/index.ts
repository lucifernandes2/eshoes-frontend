'use server'
import { backendApi } from '@/services'
import { cookies } from 'next/headers'

import type { ProductDto } from './dto/product.dto'

export async function listProduct() {
  {
    try {
      const response = await backendApi.get('/produto/findAll', {
        headers: {
          Authorization: `Bearer ${cookies().get('jwt')?.value}`
        }
      })
      const { data } = response
      return data as ProductDto[]
    } catch (error) {
      console.error('Product Service Error:', error)
      return null
    }
  }
}

export async function saveProduct(product: Omit<ProductDto, 'id'>) {
  console.log('product', product)
  try {
    const response = await backendApi.post('/produto/save', product, {
      headers: {
        Authorization: `Bearer ${cookies().get('jwt')?.value}`
      }
    })

    const { data } = response
    return data as ProductDto
  } catch (error) {
    //@ts-ignore
    console.error('Product Service Error:', error.response?.data)
    //@ts-ignore
    return { error: error?.response?.data.description }
  }
}

export async function deleteProduct(id: number) {
  try {
    const response = await backendApi.delete(`/produto/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies().get('jwt')?.value}`
      }
    })

    const { data } = response
    return data as ProductDto
  } catch (error) {
    //@ts-ignore
    console.error('Product Service Error:', error.response?.data)
    //@ts-ignore
    return error?.response?.data.description
  }
}

export async function updateProduct(id: number, product: ProductDto) {
  console.log('opa')
  try {
    const response = await backendApi.patch(`/produto/edit/${id}`, product, {
      headers: {
        Authorization: `Bearer ${cookies().get('jwt')?.value}`
      }
    })

    const { data } = response
    return data as ProductDto
  } catch (error) {
    //@ts-ignore
    console.error('Product Service Error:', error.response?.data)
    //@ts-ignore
    return { error: error?.response?.data.description }
  }
}

export async function findByNamesProduct(name: string) {
  try {
    const response = await backendApi.get(`/produto/findBy/${name}`, {
      headers: {
        Authorization: `Bearer ${cookies().get('jwt')?.value}`
      }
    })

    const { data } = response
    return data as ProductDto[]
  } catch (error) {
    //@ts-ignore
    console.error('Product Service Error:', error.response?.data)
    //@ts-ignore
    return error?.response?.data.description
  }
}
