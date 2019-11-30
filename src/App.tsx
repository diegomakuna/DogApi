import React from "react";
import { DogService } from "./settings/DogService";
import Select from "react-select";
import Card from "./components/Card";
import { DogCardModel } from "./models/DogCardModel";
import { ToastContainer, toast } from 'react-toastify';
import { IoIosRefreshCircle } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";



export type Props = {};

export type States = {
  isLoading: boolean;
  breeds: Array<{}>;
  dogs: DogCardModel[];
  refreshAnimation: boolean;
  selectBreeds: any

};

export default class AppNavigator extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      breeds: [],
      dogs: [],
      refreshAnimation: false,
      selectBreeds: {}
    };
    this._refreshBreeds = this._refreshBreeds.bind(this);
  }


  renderImage() {
    return (
      <div className="cards">
        {" "}
        {this.state.dogs.map((item, index) => {
          return (
            <Card key={index} cardKey={index} onSave={this._notify} onChange={this.updateCard} onClick={this._clickCard} active={(item.active ? " active" : "")} dogCard={item} />
          )
        })}{" "}
      </div>
    );
  }

  render() {
    return (

      <div className="App">
        <nav className="nav-wrapper">
          <div className="container dflex">
            <h1>Dog Api </h1>
            <div className="select-breeds">
              <Select value={this.state.selectBreeds} options={this.state.breeds} onChange={this._onSelect} />
            </div>
            <div className="count-dogs " >
              <div className={this.state.refreshAnimation ? 'btn-refresh rotate-center' : 'btn-refresh'} onClick={this._refreshBreeds} >
                <IoIosRefreshCircle />
              </div>
            </div>
          </div>
        </nav>
        <section id="search" data-select2-id="search">
          <div className="container">{this.renderImage()}</div>
        </section>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover={false}
        />
        <div className="dog-image"></div>
      </div>


    );
  }

  componentDidMount = async () => {
    await this._load();
  };

  _load = async () => {
    await this._loadBreeds();
  };

  _notify = () => {
    toast.success("saved successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    })
  };

  _refreshBreeds = () => {

    this._loadDogsByBreed(this.state.selectBreeds.value)



  }
  _loadBreeds = async () => {
    let _breeds: any = await DogService.getListAllBreeds();
    let allBreed: Array<{}> = [];

    for (const key in _breeds) {
      if (_breeds[key].length > 0) {
        for (const iterator of _breeds[key]) {
          allBreed.push({
            value: `${key}-${iterator}`,
            label: `${key} ${iterator}`
          });
        }
        allBreed.push({ value: key, label: key });
      }

    }
    await this.setState({
      breeds: allBreed,
      selectBreeds: allBreed[5]
    });
    this._refreshBreeds()
  };

  _onSelect = (option: any) => {
    this.setState({ selectBreeds: option })
    this._loadDogsByBreed(option.value);
  };

  _loadDogsByBreed = async (breed: string) => {
    this.setState({ refreshAnimation: true })
    breed = breed.replace("-", "/");
    let dogs: any = await DogService.getDogsByBreed(breed, 3);



    await this.setState({ dogs: dogs, refreshAnimation: false });
  };
  _clickCard = async (index: number, isActive: boolean) => {
    for (let i = 0; i < this.state.dogs.length; i++) {
      (i === index ? this.state.dogs[i].active = isActive : this.state.dogs[i].active = false);
    }
    await this.setState({ dogs: this.state.dogs })
  }

  updateCard = (index: number, dog: DogCardModel) => {

    this.state.dogs[index] = dog;

    this.setState({ dogs: this.state.dogs })
  }
}
