export interface Encuentro {
  creator: string,
  created: Date,
  editor?: string,
  edited?: Date,
  description: string,
  img: string,
  name: string
  guests: Guest[]
}

export interface Guest {
  description: string,
  name: string
}

