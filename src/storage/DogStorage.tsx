import { DogCardModel } from "../models/DogCardModel";

export class DogStorage {
  static async setCurrentDog(dog: DogCardModel) {
    let _dogs: DogCardModel[] = await this.getDogs()
    if (!_dogs) { _dogs = [] }

    _dogs.push(dog)
    await localStorage.setItem('dogs', JSON.stringify(_dogs));
  }
  static async getDogs() {
    let _dogs = localStorage.getItem("dogs")

    return _dogs ? JSON.parse(_dogs) : null
  }
}