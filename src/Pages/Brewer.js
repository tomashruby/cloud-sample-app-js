import React, { Component } from 'react';
import BrewerStore from "../Stores/Brewer";

let getState = (props) => {
  return {
    brewer: BrewerStore.getBrewer(props.params.brewerCodename)
  };
};

class Brewer extends Component {

  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BrewerStore.addChangeListener(this.onChange);
    BrewerStore.provideBrewer(this.props.params.brewerId);
  }

  componentWillUnmount() {
    BrewerStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    if (!this.state.brewer) {
      return (
        <div className="container"></div>
      );
    }

    let e = this.state.brewer.elements;
    let name = e.product_name.value;
    let imageLink = e.image.value[0].url;
    let description = e.long_description.value;

    return (
      <div className="container">
        <article className="product-detail">
          <div className="row">
            <div className="col-md-12">
              <header>
                <h2>{name}</h2>
              </header>
            </div>
          </div>
          <div className="row-fluid">
            <div className="col-lg-7 col-md-6">
              <figure className="image">
                <img alt={name} className="" src={imageLink} title={name} />
              </figure>
              <div className="description">
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Brewer;