export interface Camera {
    id: number | undefined,
    rover: number | undefined,
    name: string,
    full_name: string
}
export interface Rover {
    id: number,
    name: string,
    landing_date: string,
    launch_date: string,
    status: string,
    max_sol: number,
    max_date: string,
    total_photos: number,
    cameras: Camera[]
}
export interface InfoResponse {
    rover: Rover
}
export interface PhotosResponse {
    photos: Photo[]
}
export interface Photo {
    id: number,
    sol: number,
    camera: Camera,
    img_src: string,
    earth_date: string,
    rover: Rover
}