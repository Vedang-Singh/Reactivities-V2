type Activity = {
    id: string
    title: string
    date: Date
    description: string
    category: string
    isCancelled: boolean
    city: string
    venue: string
    latitude: number
    longitude: number
    attendees: Profile[]
    isGoing: boolean
    isHost: boolean
    hostId: string
    hostDisplayName: string
    hostImageUrl?: string
}

type PagedList<T, TCursor> = {
    items: T[]
    nextCursor: TCursor
}

type ChatComment = {
    id: string;
    createdAt: Date;
    body: string;
    userId: string;
    displayName: string;
    imageUrl?: string;
}

type Photo = {
    id: string
    url: string
}

type Profile = {
    id: string
    displayName: string
    imageUrl?: string
    bio?: string
    followersCount?: number
    followingCount?: number
    following?: boolean
}

type User = {
    id: string;
    displayName: string;
    email: string;
    imageUrl?: string;
}

type LocationIQSuggestion = {
    place_id: string
    osm_id: string
    osm_type: string
    licence: string
    lat: string
    lon: string
    boundingbox: string[]
    class: string
    type: string
    display_name: string
    display_place: string
    display_address: string
    address: LocationIQAddress
}

type LocationIQAddress = {
    name: string
    house_number: string
    road: string
    neighbourhood?: string
    suburb?: string
    city?: string
    town?: string
    village?: string
    state: string
    postcode: string
    country: string
    country_code: string
    county?: string
}
