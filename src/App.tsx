import React from 'react';

import './App.css';
import { DogService } from './settings/DogService';
import Select, { ValueType } from 'react-select';



export type Props = {}

export type States = {
  isLoading: boolean,
  breeds: Array<{}>
  dogs: string[]
}


export default class AppNavigator extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      breeds: [],
      dogs: ["0"]
    };
  }

  renderImage() {
    return ( <div className="cards"> {this.state.dogs.map((item, index) => { return <div className="card-image"> <img key={index} src={item} /></div>})} </div> )
  }


  render() {



    return (
      <div className="App">
        <header className="App-header">

          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React dsfsfd
        </a>
          <Select options={this.state.breeds} onChange={this._onSelect} />
        </header>

        
        {this.renderImage()}
       
       
      </div>
    );
  }

  componentDidMount = async () => {
    await this._load()
  }

  _load = async () => {
    await this._loadBreeds();
  }

  _loadBreeds = async () => {
    let _breeds: any = await DogService.getListAllBreeds();
    let allbreed: Array<{}> = []

    for (const key in _breeds) {
      if (_breeds[key].length > 0) {
        for (const iterator of _breeds[key]) {
          allbreed.push({ value: `${key}-${iterator}`, label: `${key} ${iterator}` })
        }
        allbreed.push({ value: key, label: key })
      }

    }
    await this.setState({ breeds: allbreed })


  }

  _onSelect = (option: any) => {
    this._loadDogsByBreed(option.value)
  }

  _loadDogsByBreed = async (breed: string) => {
    breed = breed.replace("-", "/")
    let dogs: any = await DogService.getDogsByBreed(breed, 20);
    console.log(dogs)
    await this.setState({ dogs: dogs })
  }

}

