import Api from './Api';
 

export class DogService {
    static getListAllBreeds = async () => {
       return await Api.get(`/breeds/list/all`).then((result) => {
            return result.data.message
          });
    }
    static getDogsByBreed = async (breed:string, count:number) => {
      
          return  await Api.get(`breed/${breed}/images/random/${count}`).then((result) => {
            return result.data.message
          });
       
      };
}