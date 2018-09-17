export interface Encuentro {
  author: string,
  date: Date,
  description: string,
  img: string,
  title: string
  guests: Guest[]
}

export interface Guest {
  description: string,
  name: string
}

