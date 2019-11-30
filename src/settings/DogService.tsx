import Api from './Api';
import { DogCardModel } from '../models/DogCardModel';



export class DogService {
  static getListAllBreeds = async () => {
    return await Api.get(`/breeds/list/all`).then((result) => {
      return result.data.message
    });
  }
  static getDogsByBreed = async (breed: string, count: number) => {

    return await Api.get(`breed/${breed}/images/random/${count}`).then((result) => {
      return result.data.message.map((url: string) => {
        let card: DogCardModel = {}
        card.label = "";
        card.imgUrl = url;
        card.font = { value: "", label: "" };
        card.color = { value: "", label: "" };
        return card
      });
    });

  };
}