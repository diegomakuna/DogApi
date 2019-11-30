import React from "react";
import Select from "react-select";
import { CoresEnum } from "../models/coresEnum";
import { FontsEnum } from "../models/fontsEnum";
import { DogCardModel } from "../models/DogCardModel";
import { DogStorage } from "../storage/DogStorage";

export type Props = {
  cardKey: number;
  dogCard: DogCardModel;
  onChange: Function;
  onClick: Function;
  active?: string;
  onSave: Function;
};

export type States = {};

export default class Card extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {};

    this._onChange = this._onChange.bind(this);
  }

  _coresOptions = [
    { value: CoresEnum.Magenta.key, label: CoresEnum.Magenta.value },
    { value: CoresEnum.Yellow.key, label: CoresEnum.Yellow.value },
    { value: CoresEnum.White.key, label: CoresEnum.White.value },
    { value: CoresEnum.Red.key, label: CoresEnum.Red.value },
    { value: CoresEnum.Lime.key, label: CoresEnum.Lime.value }
  ];
  _fontsOptions = [
    { value: FontsEnum.Oswald.key, label: FontsEnum.Oswald.value },
    { value: FontsEnum.Pacifico.key, label: FontsEnum.Pacifico.value },
    { value: FontsEnum.Righteous.key, label: FontsEnum.Righteous.value },
    { value: FontsEnum.Permanent.key, label: FontsEnum.Permanent.value },
    { value: FontsEnum.AlfaSlabOne.key, label: FontsEnum.AlfaSlabOne.value }
  ];



  render() {
    return (
      <div
        className={"card" + this.props.active}
        onClick={() => {
          this.props.onClick(this.props.cardKey, true);
        }}
      >
        <div className="card-container">
          <div className="card-image">
            <img src={this.props.dogCard.imgUrl} alt="" />
            <div
              className={
                "img-text " +
                (this.props.dogCard.font ? this.props.dogCard.font.value : "")
              }
              style={{
                color: this.props.dogCard.color
                  ? this.props.dogCard.color.value
                  : ""
              }}
            >
              {this.props.dogCard.label}
            </div>
          </div>
          <div className="card-edit">
            <input
              placeholder="Text.."
              value={this.props.dogCard.label}
              onChange={value => this._onChange(value)}
            />
            <Select
              placeholder="Font"
              value={this.props.dogCard.font}
              options={this._fontsOptions}
              onChange={this._selectFont}
            />

            <Select
              placeholder="Color"
              value={this.props.dogCard.color}
              options={this._coresOptions}
              onChange={this._selectColor}
            />
            <button className="btn-save" onClick={this._save}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  _onChange = (e: React.FormEvent<HTMLInputElement>) => {
    let card = { ...this.props.dogCard };
    card.label = e.currentTarget.value;

    this.props.onChange(this.props.cardKey, card);
  };
  _selectFont = (select: any) => {
    this.props.onChange(this.props.cardKey, {
      ...this.props.dogCard,
      font: select
    });
  };
  _selectColor = (select: any) => {
    this.props.onChange(this.props.cardKey, {
      ...this.props.dogCard,
      color: select
    });
  };
  _save = () => {
    if (this.props.dogCard.label === "") {
      return false;
    }
    let _dog = { ...this.props.dogCard };
    const datetime = new Date();
    _dog.lastupdate = datetime.toISOString();
    const filename = this._fileNameFromUrl(_dog.imgUrl);
    _dog.finename = filename ? filename : "";
    _dog.active = false;
    DogStorage.setCurrentDog(_dog);

    this._clearState();
    this.props.onSave();
  };

  _fileNameFromUrl = (url?: string) => {
    if (!url) {
      return null;
    }
    const matches = url.match(/\/([^\/?#]+)[^\/]*$/);
    if (!(matches && matches.length > 1)) {
      return null;
    } else {
      return matches[1];
    }
  };

  _clearState = () => {
    let card = { ...this.props.dogCard };
    card.label = "";
    card.font = { value: "", label: "" };
    card.color = { value: "", label: "" };
    card.active = false;
    card.finename = "";
    this.props.onChange(this.props.cardKey, card);
  };

}
