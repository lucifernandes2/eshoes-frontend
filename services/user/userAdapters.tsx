import type IUser from './userEntity'

const userAdapters = {
  fetchUser: (id: unknown) => {
    /* return await backendApi.get('/api/user/:id', {
      id,
    }) */
    return {
      email: 'b@gmail.com',
      id,
      name: 'Beatriz Vidal'
    } as IUser
  },
  getUserByEmail: (email: string) => {
    if (email === 'biavidalf@gmail.com') {
      return {
        email,
        id: '3',
        name: 'Beatriz Vidal'
      } as IUser
    }
    return null
  }
}

export default userAdapters
